<template>
	<div class="wrapper">
		<div class="routerCont">
			<router-link class="routerStyle" style="color: #003a53" to=""
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

export default {
	components: {
		FaultyDeviceStatusFilter,
		FaultyDeviceStatusList,
	},
};
</script>
