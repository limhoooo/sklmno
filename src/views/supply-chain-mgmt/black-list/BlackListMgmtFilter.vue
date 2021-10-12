<template>
	<div class="new-mainCont posR disFx borderContColor1 borderRadi3Px">
		<div class="new-filterCont posA">
			<button id="initBtn1" @click="filterInit" class="mainBlue1">
				필터 초기화
			</button>
			<label for="initBtn1"></label>
		</div>
		<div class="filterLeftCont" @keyup.enter='filterSubmit'>
			<div class="inStockLeftRowCont disFx h40">
				<p class="mr10 lh40">등록일</p>
				<DatePicker2 :dateReset="dateResetData" @datePickerData="dateData">
				</DatePicker2>
				<div class="ml10">
					<input
						class="newInput1"
						type="text"
						placeholder="고객명"
						v-model.trim="filterData.blackName"
					/>
				</div>
				<div class="ml10">
					<input
						class="newInput1"
						type="text"
						placeholder="연락처"
						v-model.trim="filterData.blackPhone"
					/>
				</div>
        <div class="ml10">
          <input
              class="newInput1"
              type="text"
              placeholder="주소"
              v-model.trim="filterData.blackAddr"
          />
        </div>
			</div>
		</div>
		<!--		<div class="boxRow" style="width: 110%">
			<div class="contRow contRowStyle2">
				<DatePicker2 :dateReset="dateResetData" @datePickerData="dateData">
				</DatePicker2>
				<div class="selectCustom searchingBarStyle">
					<input
						type="text"
						placeholder="고객명"
						v-model.trim="filterData.blackName"
					/>
				</div>
				<div class="selectCustom searchingBarStyle">
					<input
						type="text"
						placeholder="연락처"
						v-model.trim="filterData.blackPhone"
					/>
				</div>
			</div>
		</div>-->
		<div class="inStockButtonCont ml40 disFx flexDColC">
			<button
				class="backColorMint1 mainWhite w100P disIn borderRadi3Px h40 lh40"
				@click="filterSubmit"
			>
				검색
			</button>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import {filterData} from '../../../store/interface/supply-chain-mgmt/sell-status/sellStatusInterface';
import filterCodeListMixin from '../../../common/filterCodeListMixin';
import DatePicker2 from '../../../components/DatePicker2.vue';

let menu1: boolean = false;
let menu2: boolean = false;
export default Vue.extend({
	name: 'BlackListMgmtFilter',
	components: {
		DatePicker2,
	},
	data: () => ({
		menu1: menu1,
		menu2: menu2,
	}),
	mixins: [filterCodeListMixin],
	computed: {
		filterData: {
			get(): filterData {
				return this.$store.state.BlackListModule.filterData;
			},
			set(newValue: filterData) {
				this.$store.state.BlackListModule.filterData = newValue;
			},
		},
		dateResetData: {
			get(): any {
				return this.$store.state.BlackListModule.dateResetData;
			},
			set(newValue: any) {
				this.$store.state.BlackListModule.dateResetData = newValue;
			},
		},
		blackTypeCount: {
			get(): number {
				return this.$store.state.BlackListModule.blackTypeCount;
			},
			set(newValue: any) {
				this.$store.state.BlackListModule.blackTypeCount = newValue;
			},
		},
		totalCnt(): number {
			return this.$store.state.BlackListModule.totalCnt;
		},
	},
	methods: {
		dateData(date: any) {
			this.dateResetData = false;
			this.filterData.srhStartDate = date.start_dt;
			this.filterData.srhEndDate = date.end_dt;
		},
		filterInit() {
			// @ts-ignore
			this.$store.commit('BlackListModule/filterInit');
		},
		async filterSubmit() {
			if (this.filterData.srhStartDate && !this.filterData.srhEndDate) {
				alert('종료일을 입력해주세요.');
				return;
			}
			if (!this.filterData.srhStartDate && this.filterData.srhEndDate) {
				alert('시작일을 입력해주세요.');
				return;
			}
			const data: filterData = this.filterData;
			data.pageNo = 1;
			data.blackType = '';
			await this.$store.dispatch('BlackListModule/getList', data);
			this.blackTypeCount = this.totalCnt;
		},
	},
	async created() {
		await this.filterInit();
	},
});
</script>

<style>
.searchingBarStyle {
	width: 150px !important;
}
.searchingBarStyle input {
	width: 150px;
}
.searchBoxCont:before {
	top: 0;
	height: 60px;
}
</style>
