<template>
	<div>
		<div class="wrapper">
			<div class="pageTitle"><h2>개통점 관리</h2></div>
			<opening-store-mgmt-filter></opening-store-mgmt-filter>
			<opening-store-mgmt-list></opening-store-mgmt-list>
		</div>
	</div>
</template>

<script>
import OpeningStoreMgmtFilter from './OpeningStoreMgmt/OpeningStoreMgmtFilter.vue';
import OpeningStoreMgmtList from './OpeningStoreMgmt/OpeningStoreMgmtList.vue';

export default {
	components: {
		OpeningStoreMgmtFilter,
		OpeningStoreMgmtList,
	},
};
</script>

<style></style>
