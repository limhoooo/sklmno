<template>
	<div class="wrapper">
		<div class="routerCont">
			<router-link class="routerStyle" style="color: #003a53" to=""
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

export default {
	name: 'LongtimeStock',
	components: {
		LongtimeStockFilter,
		LongtimeStockList,
	},
};
</script>
