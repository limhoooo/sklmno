<template>
	<div class="wrapper">
		<book-mark path="/move-stock-rtngud"></book-mark>
		<div class="mb20 mainBlack">
			<router-link to="" class="mainBlack titleFontS boldWt"
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
import BookMark from '../../../components/BookMark';

export default {
	components: {
		BookMark,
		MoveStockRtngudFilter,
		MoveStockRtngudList,
	},
};
</script>
