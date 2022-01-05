import Vuex                             from 'vuex';
import chai, { expect }                 from 'chai';
import sinon                            from 'sinon';
import sinonChai                        from 'sinon-chai';
import { createLocalVue, shallowMount } from '@vue/test-utils';

import Footer     from '@/components/Footer.vue';
import { footer } from '@/store/state.js';

chai.use( sinonChai );

const localVue = createLocalVue();
localVue.use( Vuex );
localVue.component( 'Footer', Footer );

describe( 'Footer.vue', () => {
    let store;
    let component;
    // const mockMethod = sinon.spy();

    beforeEach( () => {
        store = new Vuex.Store( {
            state: {
                footer
            }
        } );

        component = shallowMount( Footer, {
            store,
            localVue
        } );
    } );

    describe( 'can display information in footer', () => {
        it( 'footer height is pulled from state', () => {
            const x = component.find( '.v-footer' );
            console.log( x );
            console.log( x.height() );
            console.log( store );
            // expect( x.height() ).to.eq( store.state.footer.height );
        } );
    } );

    // it( 'renders props.msg when passed', () => {
    //     const msg     = 'new message';
    //     const wrapper = shallowMount( Footer, {
    //         // _stateData: { msg }
    //     } );
    //     console.log( wrapper );
    //     expect( wrapper.text() ).to.include( msg );
    // } );
} );
