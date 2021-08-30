<template>
	<div class="wrapper">
		<book-mark path="/open-store-device-status"></book-mark>
		<div class="mb20 mainBlack">
			<router-link class="mainBlack titleFontS boldWt" to=""
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
import BookMark from '../../../components/BookMark';

export default {
	name: 'OpenStoreDeviceStatus',
	components: {
		BookMark,
		OpenStoreDeviceStatusFilter,
		OpenStoreDeviceStatusList,
	},
};
</script>

<style scoped></style>
