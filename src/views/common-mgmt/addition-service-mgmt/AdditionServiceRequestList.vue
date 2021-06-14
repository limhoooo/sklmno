<template>
	<div>
		<addition-service-request-list-filter></addition-service-request-list-filter>
		<addition-service-request-list-list></addition-service-request-list-list>
	</div>
</template>

<script>
import AdditionServiceRequestListFilter from './AdditonServiceRequest/AdditionServiceRequestListFilter.vue';
import AdditionServiceRequestListList from './AdditonServiceRequest/AdditionServiceRequestListList.vue';

export default {
	components: {
		AdditionServiceRequestListFilter,
		AdditionServiceRequestListList,
	},
};
</script>
