<template>
	<div>
		<book-mark path="/stock-move-transfer/sales-move"></book-mark>
		<filter-items></filter-items>
		<list-items></list-items>
	</div>
</template>

<script>
import filterItems from './common/FilterItems.vue';
import ListItems from './common/ListItems.vue';
import BookMark from '../../../../components/BookMark';

export default {
	name: 'RtnTransfer.vue',
	components: { BookMark, ListItems, filterItems },
	data: () => ({}),
	computed: {},
	methods: {},
	async created() {},
};
</script>

<style scoped></style>
