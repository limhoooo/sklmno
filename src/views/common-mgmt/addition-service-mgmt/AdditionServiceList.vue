<template>
	<div>
		<addition-service-list-filter></addition-service-list-filter>
		<addition-service-list-list></addition-service-list-list>
	</div>
</template>

<script>
import AdditionServiceListFilter from './AdditonService/AdditionServiceListFilter.vue';
import AdditionServiceListList from './AdditonService/AdditionServiceListList.vue';

export default {
	components: {
		AdditionServiceListFilter,
		AdditionServiceListList,
	},
};
</script>
