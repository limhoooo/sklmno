<template>
	<div>
		<div class="wrapper">
			<book-mark path="/openingstore-mgmt"></book-mark>
			<div class="pageTitle"><h2>개통점 관리</h2></div>
			<opening-store-mgmt-filter></opening-store-mgmt-filter>
			<opening-store-mgmt-list></opening-store-mgmt-list>
		</div>
	</div>
</template>

<script>
import OpeningStoreMgmtFilter from './OpeningStoreMgmt/OpeningStoreMgmtFilter.vue';
import OpeningStoreMgmtList from './OpeningStoreMgmt/OpeningStoreMgmtList.vue';
import BookMark from '../../../components/BookMark';

export default {
	components: {
		BookMark,
		OpeningStoreMgmtFilter,
		OpeningStoreMgmtList,
	},
};
</script>

<style></style>
