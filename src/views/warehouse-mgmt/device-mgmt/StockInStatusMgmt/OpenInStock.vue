<template>
	<div>
		<open-in-stock-form></open-in-stock-form>
		<open-in-stock-list></open-in-stock-list>
	</div>
</template>

<script>
import OpenInStockForm from './OpenInStock/OpenInStockForm.vue';
import OpenInStockList from './OpenInStock/OpenInStockList.vue';

export default {
	components: { OpenInStockList, OpenInStockForm },
};
</script>
