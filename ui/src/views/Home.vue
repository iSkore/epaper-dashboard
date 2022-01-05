<template>
    <v-container>
        <v-flex xs12>
            <span class="headline">{{ now }}</span>
        </v-flex>
    </v-container>
</template>

<script>
import moment       from 'moment';
import { mapState } from 'vuex';

export default {
    name: 'Home',
    data() {
        return {
            version: `v${ process.env.VUE_APP_VERSION }`,
            repoUrl: process.env.VUE_APP_REPOSITORY || '/',
            now: moment().format( 'D MMM YYYY, HH:mm' )
        };
    },
    mounted() {
        this.timeInterval = setInterval(
            () => this.now = moment().format( 'D MMM YYYY, HH:mm' ),
            60
        );
    },
    beforeDestroy() {
        clearInterval( this.timeInterval );
    },
    computed: {
        ...mapState( [ 'footer' ] )
    }
};
</script>
