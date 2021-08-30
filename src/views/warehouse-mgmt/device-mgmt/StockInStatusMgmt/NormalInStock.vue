<template>
	<div>
		<book-mark path="/device/normal-in-stock"></book-mark>
		<normal-in-stock-form></normal-in-stock-form>
		<normal-in-stock-list></normal-in-stock-list>
	</div>
</template>

<script>
import NormalInStockForm from './NormalInStock/NormalInStockForm.vue';
import NormalInStockList from './NormalInStock/NormalInStockList.vue';
import BookMark from '../../../../components/BookMark';

export default {
	components: { BookMark, NormalInStockList, NormalInStockForm },
	data: () => ({}),
};
</script>
