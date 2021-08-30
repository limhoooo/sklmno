<template>
	<div>
		<FilterTypeA
			:filterData="filterData"
			@filterSubmit="filterSubmit"
		></FilterTypeA>
		<mediation-release-list></mediation-release-list>
	</div>
</template>

<script>
import FilterTypeA from '../../../../components/filter/FilterTypeA.vue';
import MediationReleaseList from '../MgmtTargetDevice/MediationRelease/MediationReleaseList.vue';

export default {
	name: 'MediationRelease',
	components: { FilterTypeA, MediationReleaseList },
	data: () => ({
		listData: [
			{
				title: '통신사',
			},
		],
	}),
	computed: {
		filterData: {
			get() {
				return this.$store.state.MediationReleaseModule.filterData;
			},
			set(newValue) {
				this.$store.state.MediationReleaseModule.filterData = newValue;
			},
		},
	},
	methods: {
		dateStartValFnc(startDt, endDt) {
			if (!startDt && endDt) {
				alert('시작일을 입력해주세요.');
				return;
			}
		},
		dateEndValFnc(startDt, endDt) {
			if (startDt && !endDt) {
				alert('종료일을 입력해주세요.');
				return;
			}
		},
		async filterSubmit(filterData) {
			// 입고일
			this.dateStartValFnc(
				filterData.inStockStartRegiDate,
				filterData.inStockEndRegiDate,
			);
			this.dateEndValFnc(
				filterData.inStockStartRegiDate,
				filterData.inStockEndRegiDate,
			);
			// 이동일
			this.dateStartValFnc(
				filterData.moveStartRegiDate,
				filterData.moveEndRegiDate,
			);
			this.dateEndValFnc(
				filterData.moveStartRegiDate,
				filterData.moveEndRegiDate,
			);
			this.$store.dispatch(
				'MediationReleaseModule/getMadiationOutPage',
				filterData,
			);
		},
	},
};
</script>

<style scoped></style>
