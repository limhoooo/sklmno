<template>
	<div style="font-size: 10px">
		<stats-filter></stats-filter>
		<stats-list></stats-list>
	</div>
</template>

<script>
import StatsFilter from '../../views/supply-chain-mgmt/stats-mgmt/StatsFilter.vue';
import StatsList from '../../views/supply-chain-mgmt/stats-mgmt/StatsList.vue';

export default {
	name: 'StatsMgmt',
	components: {
		StatsFilter,
		StatsList,
	},
};
</script>

<style scoped>

</style>