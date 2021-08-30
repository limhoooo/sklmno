<template>
	<div>
		<book-mark path="/device/normal-in-stock"></book-mark>
		<in-stock-status-form></in-stock-status-form>
		<in-stock-status-list></in-stock-status-list>
	</div>
</template>

<script>
import InStockStatusForm from './InStockStatus/InStockStatusFilter';
import InStockStatusList from './InStockStatus/InStockStatusList';
import BookMark from '../../../../components/BookMark';

export default {
	components: { BookMark, InStockStatusList, InStockStatusForm },
};
</script>
