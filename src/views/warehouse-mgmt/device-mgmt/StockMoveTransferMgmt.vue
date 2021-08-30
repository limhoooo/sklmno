<template>
	<div>
		<div class="wrapper newWrap">
			<div class="new-mainRoute">
				<router-link
					class="new-router-style1 w180 h45 lh45 borderSubRoute1 borderRadi3PxTop"
					to="/stock-move-transfer/stock-move"
					>이동재고</router-link
				>
				<router-link
					class="new-router-style1 w180 h45 lh45 ml5 borderSubRoute1 borderRadi3PxTop"
					to="/stock-move-transfer/stock-transfer"
					>재고이관</router-link
				>
				<router-link
					class="new-router-style1 w180 h45 lh45 ml5 borderSubRoute1 borderRadi3PxTop"
					to="/stock-move-transfer/faulty-transfer"
					>불량이관</router-link
				>
				<router-link
					class="new-router-style1 w180 h45 lh45 ml5 borderSubRoute1 borderRadi3PxTop"
					to="/stock-move-transfer/sales-transfer"
					>판매이관</router-link
				>
				<router-link
					class="new-router-style1 w180 h45 lh45 ml5 borderSubRoute1 borderRadi3PxTop"
					to="/stock-move-transfer/rtn-transfer"
					>반품이관</router-link
				>
				<!--	v-if="sct === 'CW'" 판매이동 분기 임시 해제-->
				<!--	v-if="this.$store.state.st === '3b14c9d61a1ce5782698616844edc9ee'" 대마 일경우	-->
				<router-link
					v-if="this.$store.state.st === '3b14c9d61a1ce5782698616844edc9ee'"
					class="new-router-style1 w180 h45 lh45 ml5 borderSubRoute1 borderRadi3PxTop"
					to="/stock-move-transfer/sales-move"
					>판매이동</router-link
				>
				<span class="posA fakeRoutesLine1"></span>
			</div>
			<router-view></router-view>
		</div>
	</div>
</template>
<script>
export default {
	computed: {
		formData: {
			get() {
				return this.$store.state.StockMoveFilterCommonModules;
			},
			set(newValue) {
				this.$store.state.StockMoveFilterCommonModules = newValue;
			},
		},
		sct() {
			return this.$store.state.sct;
		},
	},
};
</script>
