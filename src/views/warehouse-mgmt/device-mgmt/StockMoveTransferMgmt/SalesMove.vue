<template>
	<div>
		<book-mark path="/stock-move-transfer/sales-move"></book-mark>
		<sales-move-filter></sales-move-filter>
		<sales-move-list></sales-move-list>
	</div>
</template>

<script>
import SalesMoveFilter from './common/SalesMoveFilter';
import SalesMoveList from './common/SalesMoveList';
import BookMark from '../../../../components/BookMark';

export default {
	components: { BookMark, SalesMoveFilter, SalesMoveList },
};
</script>
