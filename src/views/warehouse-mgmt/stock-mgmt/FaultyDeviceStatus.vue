<template>
	<div class="wrapper">
		<book-mark path="/faulty-device-status"></book-mark>
		<div class="mb20 mainBlack">
			<router-link class="mainBlack titleFontS boldWt" to=""
				>불량기기현황</router-link
			>
		</div>
		<faulty-device-status-filter></faulty-device-status-filter>
		<faulty-device-status-list></faulty-device-status-list>
	</div>
</template>

<script>
import FaultyDeviceStatusFilter from './FaultyDeviceStatus/FaultyDeviceStatusFilter';
import FaultyDeviceStatusList from './FaultyDeviceStatus/FaultyDeviceStatusList';
import BookMark from '../../../components/BookMark';

export default {
	components: {
		BookMark,
		FaultyDeviceStatusFilter,
		FaultyDeviceStatusList,
	},
};
</script>
