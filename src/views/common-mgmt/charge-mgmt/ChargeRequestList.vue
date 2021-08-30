<template>
	<div>
		<charge-request-list-filter></charge-request-list-filter>
		<charge-request-list-list></charge-request-list-list>
	</div>
</template>

<script>
import ChargeRequestListFilter from './ChargeRequestList/ChargeRequestListFilter.vue';
import ChargeRequestListList from './ChargeRequestList/ChargeRequestListList.vue';

export default {
	components: {
		ChargeRequestListFilter,
		ChargeRequestListList,
	},
};
</script>

<style></style>
