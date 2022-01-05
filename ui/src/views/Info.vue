<template>
	<v-container>
		<v-flex xs12>
			<v-list
				v-for="(val, key) in data"
				:key="key"
			>
				<v-subheader>{{ key }}</v-subheader>

				<v-list-item-group color="primary">
					<v-list-item
						v-for="(sVal, sKey) in val"
						:key="sKey"
					>
						<v-list-item-content>
							<div>
								<code>{{ sKey }}</code>
								:
								<kbd class="font-weight-light">{{ sVal }}</kbd>
							</div>
						</v-list-item-content>
					</v-list-item>
				</v-list-item-group>
			</v-list>
		</v-flex>
	</v-container>
</template>

<script>
export default {
    name: 'Info',
    data() {
        return {
            data: {
                env: process.env
            }
        };
    }
};
</script>
