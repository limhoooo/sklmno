<template>
	<div class="wrapper">
		<div class="routerCont">
			<router-link class="routerStyle" style="color: #003a53" to=""
				>판매현황</router-link
			>
		</div>
		<sell-status-filter></sell-status-filter>
		<sell-status-list></sell-status-list>
	</div>
</template>

<script>
import SellStatusFilter from './sell-mgmt/SellStatusFilter.vue';
import SellStatusList from './sell-mgmt/SellStatusList.vue';

export default {
	name: 'SellMgmt',
	components: { SellStatusFilter, SellStatusList },
};
</script>

<style scoped></style>
