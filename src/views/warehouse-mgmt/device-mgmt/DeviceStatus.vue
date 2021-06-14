<template>
	<div class="wrapper">
		<div class="routerCont">
			<router-link class="routerStyle" style="color: #003a53" to=""
				>기기현황</router-link
			>
		</div>
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
