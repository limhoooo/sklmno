<template>
	<div>
		<book-mark path="/device/normal-in-stock"></book-mark>
		<open-in-stock-form></open-in-stock-form>
		<open-in-stock-list></open-in-stock-list>
	</div>
</template>

<script>
import OpenInStockForm from './OpenInStock/OpenInStockForm.vue';
import OpenInStockList from './OpenInStock/OpenInStockList.vue';
import BookMark from '../../../../components/BookMark';

export default {
	components: { BookMark, OpenInStockList, OpenInStockForm },
};
</script>
