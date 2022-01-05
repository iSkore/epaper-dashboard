'use strict';

const { expect }     = require( 'chai' );
const { When, Then } = require( '@cucumber/cucumber' );

const pack = require( '../../../package.json' );

When( 'the footer renders', async function() {
    const footer    = await this.page.$( 'footer' );
    const eleHeight = await this.page.evaluate( ( ele ) => ele.offsetHeight, footer );

    expect( eleHeight ).to.eq( 26 );

    return true;
} );

Then( 'the copyright should be visible', async function() {
    const element = await this.page.$( 'footer > span' );
    const eleText = await this.page.evaluate( ( ele ) => ele.textContent.trim(), element );

    expect( eleText ).to.eq( `© ${ new Date().getFullYear() }` );

    return true;
} );

Then( 'the dark mode selection button should be visible', async function() {
    const elementButton = await this.page.$( 'footer > button .v-icon' );
    const elementIcon   = await this.page.evaluate( ( ele ) => ele.classList, elementButton );
    const classVals     = Object.values( elementIcon );

    expect( classVals ).to.include( 'v-icon' );

    return true;
} );

Then( 'should change the application from dark mode to light mode when clicked', async function() {
    const elementApp = await this.page.$( '.v-application' );

    // class list before the dark mode button is clicked
    const appClassListBeforeDarkModeClicked = await this.page.evaluate( ( ele ) => ele.classList, elementApp );
    const classValsBeforeClick              = Object.values( appClassListBeforeDarkModeClicked );

    expect( classValsBeforeClick )
        .to.include( 'theme--dark' )
        .and.not.include( 'theme--light' );

    // make the click
    const elementButton = await this.page.$( 'footer > button' );
    await this.page.evaluate( ( ele ) => ele.click(), elementButton );

    // class list after the dark mode button is clicked
    const appClassListAfterDarkModeClicked = await this.page.evaluate( ( ele ) => ele.classList, elementApp );
    const classValsAfterClick              = Object.values( appClassListAfterDarkModeClicked );

    expect( classValsAfterClick )
        .to.include( 'theme--light' )
        .and.not.include( 'theme--dark' );

    return true;
} );

Then( 'should change the application from light mode to dark mode when clicked', async function() {
    const elementApp = await this.page.$( '.v-application' );

    // class list before the dark mode button is clicked
    const appClassListBeforeDarkModeClicked = await this.page.evaluate( ( ele ) => ele.classList, elementApp );
    const classValsBeforeClick              = Object.values( appClassListBeforeDarkModeClicked );

    expect( classValsBeforeClick )
        .to.include( 'theme--light' )
        .and.not.include( 'theme--dark' );

    // make the click
    const elementButton = await this.page.$( 'footer > button' );
    await this.page.evaluate( ( ele ) => ele.click(), elementButton );

    // class list after the dark mode button is clicked
    const appClassListAfterDarkModeClicked = await this.page.evaluate( ( ele ) => ele.classList, elementApp );
    const classValsAfterClick              = Object.values( appClassListAfterDarkModeClicked );

    expect( classValsAfterClick )
        .to.include( 'theme--dark' )
        .and.not.include( 'theme--light' );

    return true;
} );

Then( 'the version should be visible', async function() {
    const elementButton = await this.page.$( 'footer > a' );
    const eleHref       = await this.page.evaluate( ( ele ) => ele.getAttribute( 'href' ), elementButton );

    expect( eleHref ).to.eq( pack.homepage );

    const elementText = await this.page.$( 'footer > a > span' );
    const eleText     = await this.page.evaluate( ( ele ) => ele.textContent.trim(), elementText );

    expect( eleText ).to.eq( `v${ pack.version }` );

    return true;
} );

Then( 'the time should be visible', async function() {
    const element     = await this.page.$$( 'footer > span' );
    const lastElement = element[ element.length - 1 ];
    const eleText     = await this.page.evaluate( ( ele ) => ele.textContent.trim(), lastElement );

    expect( Math.abs( new Date( eleText ) - Date.now() ) ).to.be.lessThan( 5000 );

    return true;
} );
