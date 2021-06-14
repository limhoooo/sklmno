<template>
	<div class="wrapper">
		<div class="routerCont">
			<router-link class="routerStyle" style="color: #003a53" to=""
				>개통이력기기현황</router-link
			>
		</div>
		<open-store-device-status-filter></open-store-device-status-filter>
		<open-store-device-status-list></open-store-device-status-list>
	</div>
</template>

<script>
import OpenStoreDeviceStatusFilter from './OpenStoreDeviceStatus/OpenStoreDeviceStatusFilter.vue';
import OpenStoreDeviceStatusList from './OpenStoreDeviceStatus/OpenStoreDeviceStatusList.vue';

export default {
	name: 'OpenStoreDeviceStatus',
	components: { OpenStoreDeviceStatusFilter, OpenStoreDeviceStatusList },
};
</script>

<style scoped></style>
