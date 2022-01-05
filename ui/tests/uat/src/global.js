const { BeforeAll, AfterAll, When } = require( '@cucumber/cucumber' );
const http                          = require( 'http' );
const path                          = require( 'path' );
const mime                          = require( 'mime-types' );
const { promises: fs }              = require( 'fs' );
const { chromium }                  = require( 'playwright' );
const { expect }                    = require( 'chai' );

const appPath = path.join( process.cwd(), 'dist' );
const PORT    = 33333;
let server;
let browser;

BeforeAll( async () => {
    server = http.createServer( async ( request, response ) => {
        let filePath = `.${ request.url }`;
        if ( filePath === './' ) {
            filePath = './index.html';
        }

        filePath = path.join( appPath, filePath );

        try {
            const contentType = mime.lookup( filePath );
            const data        = await fs.readFile( filePath );
            response.writeHead( 200, { 'Content-Type': contentType } );
            response.end( data, 'utf-8' );
        }
        catch ( e ) {
            if ( e.code === 'ENOENT' ) {
                response.writeHead( 404, { 'Content-Type': 'application/json' } );
                response.end( JSON.stringify( { error: `cannot find file ${ request.url }` } ) );
            }
            else {
                response.writeHead( 500, { 'Content-Type': 'application/json' } );
                response.end( JSON.stringify( { error: `check with the site admin for error: ${ e.code }` } ) );
            }
        }
    } ).listen( PORT );

    browser = await chromium.launch( {
        // headless: true,
        // args: [ `--no-sandbox` ],
        // slowMo: 50
    } );
} );

AfterAll( async () => {
    await browser.close();
    server.close();
} );

When( 'the web app renders', async function() {
    const startHrtime = process.hrtime();

    this.context = await browser.newContext();
    this.page    = await this.context.newPage();
    await this.page.goto( `http://localhost:${ PORT }` );
    await this.page.screenshot( { path: 'screenshot.png' } );

    expect( process.hrtime( startHrtime )[ 1 ] ).to.be.lessThan( 1e9 );

    return true;
} );
