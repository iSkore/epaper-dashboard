import Vue   from 'vue';
import axios from 'axios';

Vue.use( {
    install() {
        Vue.prototype.$axios = axios;

        Vue.prototype.$installAxios = function() {
            this.$store.$axios = Vue.prototype.$axios;
        };
    }
} );
