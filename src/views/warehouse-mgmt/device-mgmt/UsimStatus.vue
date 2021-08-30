<template>
	<div>
		<usim-status-filter></usim-status-filter>
		<usim-status-list></usim-status-list>
	</div>
</template>

<script>
import UsimStatusFilter from '../../../views/warehouse-mgmt/device-mgmt/UsimStatus/UsimStatusFilter.vue';
import UsimStatusList from '../../../views/warehouse-mgmt/device-mgmt/UsimStatus/UsimStatusList.vue';

export default {
	name: 'UsimStatus',
	components: { UsimStatusFilter, UsimStatusList },
};
</script>

<style scoped></style>
