<template>
	<div>
		<filter-type-a
			:filterData="filterData"
			@filterSubmit="filterSubmit"
		></filter-type-a>
		<mgmt-target-device-list></mgmt-target-device-list>
	</div>
</template>

<script>
import FilterTypeA from '../../../../components/filter/FilterTypeA.vue';
import MgmtTargetDeviceList from '../MgmtTargetDevice/MgmtTargetDeviceMgmt/MgmtTargetDeviceList.vue';

export default {
	name: 'MgmtTargetDeviceMgmt',
	components: { MgmtTargetDeviceList, FilterTypeA },
	computed: {
		filterData: {
			get() {
				return this.$store.state.MgmtTargetDeviceModule.filterData;
			},
			set(newValue) {
				this.$store.state.MgmtTargetDeviceModule.filterData = newValue;
			},
		},
	},
	methods: {
		getList(data) {
			this.$store.dispatch(
				'MgmtTargetDeviceModule/getMgmtTargetDevicePage',
				data,
			);
		},
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
			if (filterData.capacity === '전체' || filterData.colorName === '전체') {
				filterData.capacity = '';
				filterData.colorName = '';
			}
			filterData.pageNo = 1;
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
			this.getList(filterData);
		},
	},
	created() {
		this.getList();
	},
};
</script>

<style scoped></style>
