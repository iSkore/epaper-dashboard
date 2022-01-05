import Vue  from 'vue';
import pino from 'pino';

Vue.use( {
    install() {
        Vue.prototype.$logger = pino( {
            level: process.env.NODE_ENV === 'production' ? 'error' : 'trace'
        } );

        Vue.prototype.$installLogger = function() {
            this.$store.$logger = Vue.prototype.$logger;
        };
    }
} );
