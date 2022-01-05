const { devices, init } = require( 'epaperjs' );

const render = ( page, ws ) => {
    // Forward frontend console output to Node.js console
    page.onConsoleLog( console.log );

    // When recieving 'render' from frontend, update display
    ws.on( 'message', async ( message ) => {
        console.log( message );
        if ( message === 'render' ) {
            await page.display();
        }
    } );

    // forward keypresses to the frontend over WebSocket
    process.stdin.addListener( 'keypress', ( key, data ) => {
        if ( data.name === 'left' ) {
            ws.send( 'left' );
        }
        if ( data.name === 'right' ) {
            ws.send( 'right' );
        }
    } );
};

init( devices.waveshare7in5v2Horizontal, {}, render );
