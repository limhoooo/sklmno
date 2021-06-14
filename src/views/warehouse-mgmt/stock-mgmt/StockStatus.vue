<template>
	<div class="wrapper">
		<div class="routerCont">
			<router-link class="routerStyle" style="color: #003a53" to=""
				>재고현황</router-link
			>
		</div>
		<StockStatusFilter></StockStatusFilter>
		<stock-status-list></stock-status-list>
	</div>
</template>

<script>
import StockStatusFilter from './StockStatus/StockStatusFilter';
import StockStatusList from './StockStatus/StockStatusList';

export default {
	components: {
		StockStatusFilter,
		StockStatusList,
	},
};
</script>
