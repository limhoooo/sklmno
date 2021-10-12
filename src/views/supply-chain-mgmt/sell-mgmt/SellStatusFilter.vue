<template>
	<div>
		<div class="new-mainCont posR disFx borderContColor1 borderRadi3Px">
			<div class="new-filterCont posA">
				<button id="initBtn1" @click="filterInit" class="mainBlue1">
					필터 초기화
				</button>
				<label for="initBtn1"></label>
			</div>
			<div class="filterLeftCont" @keyup.enter="filterSubmit">
				<div class="inStockLeftRowCont disFx h40 mb10">
					<div>
						<v-select
							style="width: 180px; padding-top: 2px"
							outlined
							:items="[
								{ name: '접수일자', value: 'consultRegiDateTime' },
								{ name: '개통일자', value: 'openingDate' },
								{ name: '진행상태변경일자', value: 'consultUpdDateTime' },
								{ name: '철회완료일자', value: 'cancelDate' },
							]"
							item-text="name"
							item-value="value"
							label="기간검색"
							v-model.trim="dateFilter"
							@change="dateFilterFnc"
						>
						</v-select>
					</div>
					<!--					<DatePicker2 :dateReset="dateResetData" @datePickerData="dateData">
					</DatePicker2>-->
					<DatePicker :dateReset="dateResetData" @datePickerData="dateData">
					</DatePicker>
					<div class="w150 ml30">
						<v-select
							label="영업점"
							outlined
							:items="saleStoreList"
							item-text="storeName"
							item-value="storeId"
							v-model.trim="filterData.saleStoreId"
							@change="saleStoreFnc"
						></v-select>
					</div>
					<div class="ml10 w150">
						<v-select
							outlined
							:items="openingStoreList"
							item-text="openStoreName"
							item-value="openStoreId"
							label="개통점"
							v-model.trim="filterData.openingStoreId"
						>
						</v-select>
					</div>
				</div>
				<div class="inStockLeftRowCont disFx h40 mb10">
					<div>
						<v-select
							outlined
							:items="useYn"
							item-text="name"
							item-value="value"
							label="사전예약"
							v-model.trim="filterData.beforeReserveYn"
						>
						</v-select>
					</div>
					<div class="ml10">
						<v-select
							outlined
							:items="statusList.JoinType"
							item-text="name"
							item-value="value"
							label="가입유형"
							v-model.trim="filterData.JoinType"
						>
						</v-select>
					</div>
					<div class="ml10">
						<v-select
							label="개통상태"
							outlined
							:items="statusList.OpeningTaskStatus"
							item-text="name"
							item-value="value"
							v-model.trim="filterData.OpeningTaskStatus"
						></v-select>
					</div>
					<div class="ml10">
						<v-select
							label="상담상태"
							outlined
							:items="statusList.ConsultTaskStatus"
							item-text="name"
							item-value="value"
							v-model.trim="filterData.ConsultTaskStatus"
						></v-select>
					</div>
					<div class="ml10">
						<v-select
							label="물류상태"
							outlined
							:items="statusList.LogisticsTaskStatus"
							item-text="name"
							item-value="value"
							v-model.trim="filterData.LogisticsTaskStatus"
						></v-select>
					</div>
					<div class="ml10">
						<v-select
							outlined
							v-model.trim="filterData.existTelecom"
							:items="exisTelecomData"
							item-text="codeNm"
							item-value="codeSeq"
							label="기존통신사"
						>
						</v-select>
					</div>
					<div class="ml10">
						<v-select
							v-model.trim="filterData.telecom"
							:items="codeList.telecom"
							outlined
							item-text="codeNm"
							item-value="codeSeq"
							label="개통통신사"
						>
						</v-select>
					</div>
				</div>
				<div class="inStockLeftRowCont disFx h40">
					<div>
						<input
							class="newInput1"
							type="text"
							placeholder="고객명(법인명)"
							v-model.trim="filterData.cusName"
						/>
					</div>
					<div class="ml10">
						<input
							class="newInput1"
							type="text"
							placeholder="연락처"
							v-model.trim="filterData.cusPhone"
						/>
					</div>
					<div class="ml10">
						<v-autocomplete
							style="font-size: 13px"
							class="AutoCompleteCustom"
							outlined
							:items="codeList.deviceList"
							v-model.trim="filterData.goodsName"
							item-text="goodsName"
							label="기기명"
							@keypress="deviceFnc($event.target.value)"
							@keyup.enter="keypressFnc"
						>
						</v-autocomplete>
					</div>
					<div class="ml10">
						<v-autocomplete
							style="font-size: 12px"
							class="AutoCompleteCustom"
							label="용량"
							v-model.trim="filterData.capacity"
							outlined
							:items="codeList.capacityList"
							item-text="capacity"
						>
						</v-autocomplete>
					</div>
					<div class="ml10">
						<v-autocomplete
							style="font-size: 12px"
							class="AutoCompleteCustom"
							label="색상"
							v-model.trim="filterData.colorName"
							outlined
							:items="codeList.colorList"
							item-text="colorName"
						>
						</v-autocomplete>
					</div>
					<div class="ml10">
						<input
							class="newInput1"
							type="text"
							placeholder="기기 일련번호"
							v-model.trim="filterData.barcode"
						/>
					</div>
					<div class="ml10">
						<input
							class="newInput1"
							type="text"
							placeholder="유심 일련번호"
							v-model.trim="filterData.usimBarcode"
						/>
					</div>
					<div class="ml10">
						<input
							class="newInput1"
							type="text"
							placeholder="송장번호"
							v-model.trim="filterData.invoiceNum"
						/>
					</div>
				</div>
			</div>

			<div class="inStockButtonCont ml40 disFx flexDColC">
				<button
					class="backColorMint1 mainWhite w100P disIn borderRadi3Px h90"
					@click="filterSubmit"
				>
					검색
				</button>
			</div>
		</div>
		<!--		<div class="boxRow" style="width: 110%">
			<div class="contRow">
				<span class="ml10">접수일</span>
				<DatePicker2 :dateReset="dateResetData" @datePickerData="dateData">
				</DatePicker2>
				<div class="selectCustom">
					<v-select
						label="영업점"
						outlined
						:items="saleStoreList"
						item-text="storeName"
						item-value="storeId"
						v-model.trim="filterData.saleStoreId"
						@change="saleStoreFnc"
					></v-select>
				</div>
				<div class="selectCustom">
					<v-select
						outlined
						:items="openingStoreList"
						item-text="openStoreName"
						item-value="openStoreId"
						label="개통점"
						v-model.trim="filterData.openingStoreId"
					>
					</v-select>
				</div>
			</div>
			<div class="contRow contRowStyle2">
				<div class="selectCustom">
					<v-select
						label="개통상태"
						outlined
						:items="statusList.OpeningTaskStatus"
						item-text="name"
						item-value="value"
						v-model.trim="filterData.OpeningTaskStatus"
					></v-select>
				</div>
				<div class="selectCustom">
					<v-select
						label="상담상태"
						outlined
						:items="statusList.ConsultTaskStatus"
						item-text="name"
						item-value="value"
						v-model.trim="filterData.ConsultTaskStatus"
					></v-select>
				</div>
				<div class="selectCustom">
					<v-select
						label="물류상태"
						outlined
						:items="statusList.LogisticsTaskStatus"
						item-text="name"
						item-value="value"
						v-model.trim="filterData.LogisticsTaskStatus"
					></v-select>
				</div>
				<div class="selectCustom searchingBarStyle">
					<input
						type="text"
						placeholder="송장번호"
						v-model.trim="filterData.invoiceNum"
					/>
				</div>
				<div class="selectCustom">
					<v-select
						v-model.trim="filterData.telecom"
						outlined
						:items="telecomList"
						item-text="codeNm"
						item-value="codeSeq"
						label="통신사"
					>
					</v-select>
				</div>
				<div class="selectCustom" style="width: 150px">
					<v-autocomplete
						class="AutoCompleteCustom"
						outlined
						:items="codeList.deviceList"
						v-model.trim="filterData.goodsName"
						item-text="goodsName"
						label="기기명"
					>
					</v-autocomplete>
				</div>
				<div class="selectCustom">
					<v-autocomplete
						class="AutoCompleteCustom"
						label="용량"
						v-model.trim="filterData.capacity"
						outlined
						:items="codeList.capacityList"
						item-text="capacity"
					>
					</v-autocomplete>
				</div>
				<div class="selectCustom">
					<v-autocomplete
						class="AutoCompleteCustom"
						label="색상"
						v-model.trim="filterData.colorName"
						outlined
						:items="codeList.colorList"
						item-text="colorName"
					>
					</v-autocomplete>
				</div>
			</div>
			<div class="contRow contRowStyle2">
				<div class="selectCustom">
					<v-select
						outlined
						:items="statusList.JoinType"
						item-text="name"
						item-value="value"
						label="가입유형"
						v-model.trim="filterData.JoinType"
					>
					</v-select>
				</div>
				<div class="selectCustom searchingBarStyle w130">
					<input
						type="text"
						placeholder="기기 일련번호"
						v-model.trim="filterData.barcode"
					/>
				</div>
				<div class="selectCustom searchingBarStyle w130">
					<input
						type="text"
						placeholder="유심 일련번호"
						v-model.trim="filterData.usimBarcode"
					/>
				</div>
				<div class="selectCustom searchingBarStyle">
					<input
						type="text"
						placeholder="고객명"
						v-model.trim="filterData.cusName"
					/>
				</div>
				<div class="selectCustom searchingBarStyle">
					<input
						type="text"
						placeholder="연락처"
						v-model.trim="filterData.cusPhone"
					/>
				</div>
			</div>
		</div>-->
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import { filterData } from '../../../store/interface/supply-chain-mgmt/sell-status/sellStatusInterface';
import DatePicker from '../../../components/DatePicker.vue';

let menu1: boolean = false;
let menu2: boolean = false;

export default Vue.extend({
	name: 'SellStatusFilter',
	data: () => ({
		menu1: menu1,
		menu2: menu2,
		useYn: [
			{ name: '전체', value: '전체' },
			{ name: 'Y', value: 'Y' },
			{ name: 'N', value: 'N' },
		],
		telecomList: [],
		dateFilter: 'consultRegiDateTime',
		deviceData: '',
	}),
	components: {
		DatePicker,
	},
	computed: {
		exisTelecomData(): any {
			return this.$store.state.CodeModule.codeList.exisTelecomSellList;
		},
		filterInitChk: {
			get(): any {
				return this.$store.state.SellStatusModule.filterInitChk;
			},
			set(newValue: any) {
				this.$store.state.SellStatusModule.filterInitChk = newValue;
			},
		},
		checkListIdArray: {
			get(): any {
				return this.$store.state.SellStatusModule.checkListIdArray;
			},
			set(newValue: any) {
				this.$store.state.SellStatusModule.checkListIdArray = newValue;
			},
		},
		allCheckedBox: {
			get(): any {
				return this.$store.state.SellStatusModule.allCheckedBox;
			},
			set(newValue: any) {
				this.$store.state.SellStatusModule.allCheckedBox = newValue;
			},
		},
		codeList(): any {
			return this.$store.state.CodeModule.codeList;
		},
		statusList(): any {
			return this.$store.state.SellStatusModule.statusList;
		},
		saleStoreList(): any {
			return this.$store.state.SellStatusModule.saleStoreList;
		},
		openingStoreList: {
			get(): any {
				return this.$store.state.SellStatusModule.openingStoreList;
			},
			set(newValue: any) {
				this.$store.state.SellStatusModule.openingStoreList = newValue;
			},
		},
		filterData: {
			get(): filterData {
				return this.$store.state.SellStatusModule.filterData;
			},
			set(newValue: filterData) {
				this.$store.state.SellStatusModule.filterData = newValue;
			},
		},
		dateResetData: {
			get(): any {
				return this.$store.state.SellStatusModule.dateResetData;
			},
			set(newValue: any) {
				this.$store.state.SellStatusModule.dateResetData = newValue;
			},
		},
	},
	methods: {
		deviceFnc(event: any) {
			this.deviceData = event;
		},
		async keypressFnc() {
			this.filterData.goodsName = this.deviceData;
			const data: filterData = this.filterData;
			data.pageNo = 1;
			await this.$store.dispatch('SellStatusModule/getSellCurrentPage', data);
			/*this.codeList.deviceList.push({ goodsName: this.deviceData });
			this.filterData.goodsName = this.deviceData;*/
		},
		async beginningOpeningStoreFnc() {
			await this.$store.dispatch('SellStatusModule/getOpeningStoreList');
		},
		dateFilterFnc() {
			this.dateResetData = true;
			delete this.filterData.consultRegiStartDateTime;
			delete this.filterData.consultRegiEndDateTime;
			delete this.filterData.openingStartDateTime;
			delete this.filterData.openingEndDateTime;
			delete this.filterData.consultUpdStartDateTime;
			delete this.filterData.consultUpdEndDateTime;
		},
		dateData(date: any) {
			if (this.dateFilter === 'consultRegiDateTime') {
				// 접수일자
				this.filterData.consultRegiStartDateTime = date.start_dt;
				this.filterData.consultRegiEndDateTime = date.end_dt;
			} else if (this.dateFilter === 'openingDate') {
				// 개통일자
				this.filterData.openingStartDateTime = date.start_dt;
				this.filterData.openingEndDateTime = date.end_dt;
			} else if (this.dateFilter === 'consultUpdDateTime') {
				// 진행상태변경일자
				this.filterData.consultUpdStartDateTime = date.start_dt;
				this.filterData.consultUpdEndDateTime = date.end_dt;
			} else if (this.dateFilter === 'cancelDate') {
				//철회완료일자
				this.filterData.cancelStartDate = date.start_dt;
				this.filterData.cancelEndDate = date.end_dt;
			}
			this.dateResetData = false;
		},
		async getCommonCodeList() {
			let data = {
				initEnumData: [
					'OpeningTaskStatus',
					'ConsultTaskStatus',
					'LogisticsTaskStatus',
					'JoinType',
				],
			};
			await this.$store.dispatch('SellStatusModule/getStatusList', data);
			this.statusList.OpeningTaskStatus.unshift({ name: '전체', value: '' });
			this.statusList.ConsultTaskStatus.unshift({ name: '전체', value: '' });
			this.statusList.LogisticsTaskStatus.unshift({ name: '전체', value: '' });
			this.statusList.JoinType.unshift({ name: '전체', value: '' });
		},
		async getCommonCodeList2() {
			let data = {
				initData: ['provList'],
				code: ['EXISTELECOM', 'TELECOM'],
			};
			await this.$store.dispatch('CodeModule/getCommonCodeList', data);
			this.codeList.exisTelecom.unshift({ codeNm: '전체', codeSeq: '' });
			this.codeList.telecom.unshift({ codeNm: '전체', codeSeq: '' });
		},
		async filterInit() {
			// 엑셀 전체체크박스 초기화
			this.allCheckedBox = false;
			this.checkListIdArray = [];
			this.dateFilter = 'consultRegiDateTime';
			// @ts-ignore
			await this.$store.commit('SellStatusModule/filterInit');
			await this.getCodeList();
		},
		async getCodeList() {
			await this.getOpeningStoreListFnc();
			await this.beginningOpeningStoreFnc();
			await this.getCommonCodeList();
			await this.getCommonCodeList2();
			// @ts-ignore
			//await this.getDeviceListFnc();

			// 보유처 용량 색상 초기 전체 INSERT
			//this.codeList.capacityList.unshift({ capacity: '전체' });
			//this.codeList.colorList.unshift({ colorName: '전체' });
		},
		async getOpeningStoreListFnc() {
			await this.$store.dispatch('SellStatusModule/getSaleStoreList');
			this.saleStoreList.unshift({ storeName: '전체', storeId: '' });
		},
		async saleStoreFnc() {
			if (!this.filterData.saleStoreId) {
				this.filterData.openingStoreId = '';
				this.openingStoreList = [];
				return;
			}
			let data = {
				storeId: this.filterData.saleStoreId,
			};
			this.filterData.openingStoreId = '';
			await this.$store.dispatch('SellStatusModule/getOpeningStoreList', data);
			this.openingStoreList.unshift({ openStoreName: '전체', openStoreId: '' });
		},
		async filterSubmit() {
			// 엑셀 체크리스트 해제 allCheckedBox checkListIdArray
			this.allCheckedBox = false;
			this.checkListIdArray = [];
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
			await this.$store.dispatch('SellStatusModule/getSellCurrentPage', data);
		},
		async deviceCodeData() {
			await this.$store.dispatch('CodeModule/getGoodsNameList');
			await this.$store.dispatch('CodeModule/getCapacityList', '0');
			await this.$store.dispatch('CodeModule/getDeviceColorList');
			this.codeList.deviceList.unshift({ goodsName: '전체' });
			this.codeList.capacityList.unshift({ capacity: '전체' });
			this.codeList.colorList.unshift({ colorName: '전체' });
		},
		commonFilterInit() {
			this.$store.commit('CodeModule/filterInit');
		},
		async getList(data?: filterData) {
			await this.$store.dispatch('SellStatusModule/getSellCurrentPage', data);
		},
		filterInitCheckFnc() {
			// 동기처리를 위해 setTimeout 100
			// filterInitChk 가 false 일때 ( 신청서에서 들어온게 아닐시 ) 에만 필터초기화
			// sellstatus.vue 에 작업
			let vm = this;
			setTimeout(() => {
				if (!vm.filterInitChk) {
					vm.filterInit();
				}
			}, 100);
		},
	},
	async created() {
		await this.filterInitCheckFnc();
		await this.commonFilterInit();
		await this.getCodeList();
		await this.deviceCodeData();
		const data: filterData = this.$store.state.SellStatusModule.filterData;
		await this.getList(data);
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
</style>
