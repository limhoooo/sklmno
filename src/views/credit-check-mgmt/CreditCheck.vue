<template>
	<div class="wrapper">
		<book-mark path="/credit-check"></book-mark>
		<div class="mb20 mainBlack">
			<router-link class="mainBlack titleFontS boldWt" to=""
				>신용조회</router-link
			>
		</div>
		<credit-check-sale-info
			v-if="storeVal === 'StoreGrade_S'"
		></credit-check-sale-info>
		<credit-check-filter></credit-check-filter>
		<credit-check-infor v-if="storeVal === 'StoreGrade_M'"></credit-check-infor>
		<credit-check-list></credit-check-list>
		<credit-check-sale-list v-if="flag"></credit-check-sale-list>
	</div>
</template>

<script>
import CreditCheckFilter from '../credit-check-mgmt/credit-check/CreditCheckFilter.vue';
import CreditCheckInfor from '../credit-check-mgmt/credit-check/CreditCheckInfor.vue';
import CreditCheckList from '../credit-check-mgmt/credit-check/CreditCheckList.vue';
import CreditCheckSaleInfo from '../credit-check-mgmt/credit-check/CreditCheckSaleInfo.vue';
import CreditCheckSaleList from '../credit-check-mgmt/credit-check/CreditCheckSaleList.vue';
import BookMark from '../../components/BookMark.vue';

export default {
	name: 'CreditCheck',
	components: {
		CreditCheckFilter,
		CreditCheckInfor,
		CreditCheckList,
		CreditCheckSaleInfo,
		CreditCheckSaleList,
		BookMark,
	},
	computed: {
		storeVal() {
			return this.$store.state.sg;
		},
	},
	data: () => ({
		// 컴포넌트 노출조건
		flag: false,
	}),
};
</script>

<style scoped></style>
