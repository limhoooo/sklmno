<template>
	<div>
		<device-status-filter></device-status-filter>
		<device-status-list></device-status-list>
	</div>
</template>

<script>
import DeviceStatusFilter from './DeviceStatus/DeviceStatusFilter.vue';
import DeviceStatusList from './DeviceStatus/DeviceStatusList.vue';

export default {
	components: {
		DeviceStatusFilter,
		DeviceStatusList,
	},
};
</script>

<style></style>
