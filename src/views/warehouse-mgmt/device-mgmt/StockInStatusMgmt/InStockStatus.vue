<template>
	<div>
		<in-stock-status-form></in-stock-status-form>
		<in-stock-status-list></in-stock-status-list>
	</div>
</template>

<script>
import InStockStatusForm from './InStockStatus/InStockStatusFilter';
import InStockStatusList from './InStockStatus/InStockStatusList';

export default {
	components: { InStockStatusList, InStockStatusForm },
};
</script>
