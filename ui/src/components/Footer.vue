<template>
	<v-footer
		app
		class="pt-0 pb-0"
		:inset="footer.inset"
		:height="footer.height"
	>
		<span class="px-3">&copy; {{ new Date().getFullYear() }}</span>

		<v-spacer></v-spacer>

		<v-btn
			:height="footer.height"
			:width="footer.height"
			class="mr-5"
			tile
			icon
			x-small
			aria-label="invert-colors"
			@click.stop="$vuetify.theme.dark = !$vuetify.theme.dark"
		>
			<v-icon>mdi-invert-colors</v-icon>
		</v-btn>

		<v-btn
			:height="footer.height"
			:width="footer.height"
			class="mr-5"
			tile
			x-small
			aria-label="app-version"
			:href="repoUrl"
		>
			{{ version }}
		</v-btn>

		<span class="overline">{{ now }}</span>
	</v-footer>
</template>

<script>
import { mapState } from 'vuex';
import moment       from 'moment';

export default {
    name: 'Footer',
    data() {
        return {
            version: `v${ process.env.VUE_APP_VERSION }`,
            repoUrl: process.env.VUE_APP_REPOSITORY || '/',
            now: moment().format( 'D MMM YYYY, HH:mm:ss' )
        };
    },
    mounted() {
        this.timeInterval = setInterval(
            () => this.now = moment().format( 'D MMM YYYY, HH:mm:ss' ),
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
