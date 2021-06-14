<template>
	<div>
		<normal-in-stock-form></normal-in-stock-form>
		<normal-in-stock-list></normal-in-stock-list>
	</div>
</template>

<script>
import NormalInStockForm from './NormalInStock/NormalInStockForm.vue';
import NormalInStockList from './NormalInStock/NormalInStockList.vue';

export default {
	components: { NormalInStockList, NormalInStockForm },
	data: () => ({}),
};
</script>
