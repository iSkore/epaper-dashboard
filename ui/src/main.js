import Vue     from 'vue';

import '@/plugins';
import vuetify from '@/plugins/vuetify';

import App      from '@/App.vue';
import store    from '@/store';
import router   from '@/router';
import { sync } from 'vuex-router-sync';

sync( store, router );

Vue.config.productionTip = false;

new Vue( {
    vuetify,
    router,
    store,
    render: h => h( App )
} ).$mount( '#app' );
