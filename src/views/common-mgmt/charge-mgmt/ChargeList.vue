<template>
	<div>
		<charge-list-filter></charge-list-filter>
		<charge-list-list></charge-list-list>
	</div>
</template>

<script>
import ChargeListFilter from './ChargeList/ChargeListFilter.vue';
import ChargeListList from './ChargeList/ChargeListList.vue';

export default {
	components: {
		ChargeListFilter,
		ChargeListList,
	},
};
</script>
