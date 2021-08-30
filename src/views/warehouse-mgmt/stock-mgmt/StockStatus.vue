<template>
	<div class="wrapper newWrap">
		<book-mark path="/stock-status"></book-mark>
		<div class="new-mainRoute">
			<a
				class="new-router-style1 w180 h45 lh45 borderSubRoute1 borderRadi3PxTop"
				:class="activeClass.ALL"
				@click="stockTitleFnc('ALL')"
				>재고현황({{ headerCount.totalStoreStockCnt || 0 }}건)</a
			>
			<a
				class="new-router-style1 w180 h45 lh45 ml5 borderSubRoute1 borderRadi3PxTop"
				:class="activeClass.AUTO"
				@click="stockTitleFnc('AUTO')"
				>재고자동검수({{ headerCount.AUTOcnt || 0 }}건)</a
			>
			<a
				class="new-router-style1 w180 h45 lh45 ml5 borderSubRoute1 borderRadi3PxTop"
				:class="activeClass.MANUAL"
				@click="stockTitleFnc('MANUAL')"
				>재고수동검수({{ headerCount.MANUALcnt || 0 }}건)</a
			><a
				class="new-router-style1 w180 h45 lh45 ml5 borderSubRoute1 borderRadi3PxTop"
				:class="activeClass.NONE"
				@click="stockTitleFnc('NONE')"
				>재고미검수({{ headerCount.NONEcnt || 0 }}건)</a
			>
			<span class="posA fakeRoutesLine1"></span>
		</div>
		<StockStatusFilter></StockStatusFilter>
		<stock-status-list></stock-status-list>
	</div>
</template>

<script>
import StockStatusFilter from './StockStatus/StockStatusFilter';
import StockStatusList from './StockStatus/StockStatusList';
import BookMark from '../../../components/BookMark';

export default {
	components: {
		BookMark,
		StockStatusFilter,
		StockStatusList,
	},
	data: () => ({
		activeClass: {
			ALL: 'activeBg',
			AUTO: '',
			MANUAL: '',
			NONE: '',
		},
	}),
	computed: {
		filterData: {
			get() {
				return this.$store.state.StockStatusModule.filterData;
			},
			set(newValue) {
				this.$store.state.StockStatusModule.filterData = newValue;
			},
		},
		headerCount() {
			return this.$store.state.StockStatusModule.headerCount;
		},
	},
	methods: {
		stockTitleFnc(type) {
			for (let data in this.activeClass) {
				this.activeClass[data] = '';
			}
			this.$set(this.activeClass, type, 'activeBg');
			this.filterData.stockTab = type === 'ALL' ? '' : type;
			this.filterSubmit(this.filterData);
		},
		async filterSubmit(data) {
			let dataObj = {
				data: data,
				checkStoreStockChk: false,
			};
			data.pageNo = 1;
			await this.$store.dispatch('StockStatusModule/getList', dataObj);
		},
	},
};
</script>
<style scoped>
.activeBg {
	position: relative;
	background-color: #fff;
	border-top: 2px solid #007ef2;
	border-left: 2px solid #007ef2;
	border-right: 2px solid #007ef2;
	font-weight: bold;
}
.activeBg:before {
	display: block;
	content: '';
	position: absolute;
	width: 176px;
	height: 2px;
	background-color: #fff;
	left: 0;
	top: 41px;
	z-index: 100;
}
.titleColor {
	color: #003a53;
}
</style>
