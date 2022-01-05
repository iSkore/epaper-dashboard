export default {
    async getConfig( context ) {
        this.$logger.info( 'action.getConfig' );
        try {
            const { data } = await this.$axios.get( 'config.json' );
            context.commit( 'commitConfig', data );
        }
        catch ( e ) {
            this.$logger.error( e );
        }
    }
};
