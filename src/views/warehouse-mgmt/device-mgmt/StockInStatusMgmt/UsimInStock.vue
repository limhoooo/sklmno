<template>
	<div>
		<book-mark path="/device/normal-in-stock"></book-mark>
		<usim-in-stock-form></usim-in-stock-form>
		<usim-in-stock-list></usim-in-stock-list>
	</div>
</template>

<script>
import UsimInStockForm from '../StockInStatusMgmt/UsimInStock/UsimInStockForm.vue';
import UsimInStockList from '../StockInStatusMgmt/UsimInStock/UsimInStockList.vue';
import BookMark from '../../../../components/BookMark';

export default {
	name: 'UsimInStock',
	components: { BookMark, UsimInStockForm, UsimInStockList },
};
</script>

<style scoped></style>
