<template>
	<div>
		<sales-move-filter></sales-move-filter>
		<sales-move-list></sales-move-list>
	</div>
</template>

<script>
import SalesMoveFilter from './common/SalesMoveFilter';
import SalesMoveList from './common/SalesMoveList';

export default {
	components: { SalesMoveFilter, SalesMoveList },
};
</script>
