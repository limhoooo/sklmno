<template>
	<div>
		<div class="wrapper">
			<div class="pageTitle"><h2>영업점 관리</h2></div>
			<sale-store-mgmt-filter></sale-store-mgmt-filter>
			<sale-store-mgmt-list></sale-store-mgmt-list>
		</div>
	</div>
</template>
<script>
import SaleStoreMgmtFilter from './SaleStoreMgmt/SaleStoreMgmtFilter.vue';
import SaleStoreMgmtList from './SaleStoreMgmt/SaleStoreMgmtList.vue';

export default {
	components: {
		SaleStoreMgmtFilter,
		SaleStoreMgmtList,
	},
};
</script>

<style></style>
