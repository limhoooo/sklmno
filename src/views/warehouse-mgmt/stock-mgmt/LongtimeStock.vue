<template>
	<div class="wrapper">
		<book-mark path="/longtime-stock"></book-mark>
		<div class="mb20 mainBlack">
			<router-link class="mainBlack titleFontS boldWt" to=""
				>장기재고현황</router-link
			>
		</div>
		<longtime-stock-filter></longtime-stock-filter>
		<longtime-stock-list></longtime-stock-list>
	</div>
</template>

<script>
import LongtimeStockFilter from './LongtimeStock/LongtimeStockFilter';
import LongtimeStockList from './LongtimeStock/LongtimeStockList';
import BookMark from '../../../components/BookMark';

export default {
	name: 'LongtimeStock',
	components: {
		BookMark,
		LongtimeStockFilter,
		LongtimeStockList,
	},
};
</script>
