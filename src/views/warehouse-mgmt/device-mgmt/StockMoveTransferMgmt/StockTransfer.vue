<template>
	<div>
		<filter-items></filter-items>
		<list-items></list-items>
	</div>
</template>

<script>
import filterItems from './common/FilterItems.vue';
import ListItems from './common/ListItems.vue';

export default {
	components: { filterItems, ListItems },
	data: () => ({}),
	computed: {},
	methods: {},
	async created() {},
};
</script>
