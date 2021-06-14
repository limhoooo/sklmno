<template>
	<div class="wrapper">
		<div class="routerCont">
			<router-link class="routerStyle" style="color: #003a53" to=""
				>반품현황</router-link
			>
		</div>
		<move-stock-rtngud-filter></move-stock-rtngud-filter>
		<move-stock-rtngud-list></move-stock-rtngud-list>
	</div>
</template>

<script>
import MoveStockRtngudFilter from './MoveStockRtngud/MoveStockRtngudFilter';
import MoveStockRtngudList from './MoveStockRtngud/MoveStockRtngudList';

export default {
	components: {
		MoveStockRtngudFilter,
		MoveStockRtngudList,
	},
};
</script>
