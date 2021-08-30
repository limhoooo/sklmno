<template>
	<div>
		<div class="wrapper">
			<book-mark path="/salestore-mgmt"></book-mark>
			<div class="pageTitle"><h2>영업점 관리</h2></div>
			<sale-store-mgmt-filter></sale-store-mgmt-filter>
			<sale-store-mgmt-list></sale-store-mgmt-list>
		</div>
	</div>
</template>
<script>
import SaleStoreMgmtFilter from './SaleStoreMgmt/SaleStoreMgmtFilter.vue';
import SaleStoreMgmtList from './SaleStoreMgmt/SaleStoreMgmtList.vue';
import BookMark from '../../../components/BookMark';

export default {
	components: {
		BookMark,
		SaleStoreMgmtFilter,
		SaleStoreMgmtList,
	},
};
</script>

<style></style>
