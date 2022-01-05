<template>
	<v-navigation-drawer
		app
		v-model="sidebar.model"
		:clipped="sidebar.clipped"
		:floating="sidebar.floating"
		:mini-variant="sidebar.mini"
		:permanent="sidebar.type === 'permanent'"
		:temporary="sidebar.type === 'temporary'"
		overflow
	/>
</template>

<script>
import { mapState } from 'vuex';

export default {
    name: 'Sidebar',
    data() {
        return {};
    },
    methods: {},
    computed: {
		...mapState( [ 'sidebar' ] )
    }
};
</script>
