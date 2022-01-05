<template>
	<v-app-bar
		app
		:clipped-left="appbar.clipped"
		:dense="appbar.dense"
	>
		<v-app-bar-nav-icon
			aria-label="nav"
			@click="sidebar.model = !sidebar.model"
		/>

		<v-toolbar-title class="headline">
			<span>{{ VUE_APP_TITLE }}</span>
			<span class="font-weight-light">{{ VUE_APP_VERSION }}</span>
		</v-toolbar-title>

		<v-spacer></v-spacer>

		<v-toolbar-items class="hidden-sm-and-down">
			<v-btn to="/" tile aria-label="home">
				Home
			</v-btn>
			<v-btn to="/info" tile aria-label="info">
				Info
			</v-btn>
		</v-toolbar-items>

	</v-app-bar>
</template>

<script>
import { mapState } from 'vuex';

export default {
    name: 'Toolbar',
    data() {
        return {
            VUE_APP_TITLE: process.env.VUE_APP_TITLE,
            VUE_APP_VERSION: `v${ process.env.VUE_APP_VERSION }`
        };
    },
    computed: {
		...mapState( [ 'appbar', 'sidebar' ] )
    }
};
</script>
