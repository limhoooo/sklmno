<template>
	<div>
		<div class="new-mainCont posR disFx borderContColor1 borderRadi3Px mt30">
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
							style="width: 160px; padding-top: 2px"
							outlined
							:items="[
								{ name: '접수일자', value: 'consultRegiDateTime' },
								{ name: '개통일자', value: 'openingDate' },
								{ name: '진행상태변경일자', value: 'consultUpdDateTime' },
								{ name: '배송날짜', value: 'dlvrDate' },
								{ name: '철회완료', value: 'cancelDate' },
							]"
							item-text="name"
							item-value="value"
							label="기간검색"
							v-model.trim="dateFilter"
							@change="dateFilterFnc"
						>
						</v-select>
					</div>
					<DatePicker
						class="ml10"
						:dateReset="dateResetData"
						@datePickerData="dateData"
					>
					</DatePicker>
					<!--					<DatePicker2
						dataType="rcptDate"
						:dateReset="dateResetData"
						@datePickerData="dateData"
					>
					</DatePicker2>-->
					<div class="ml20 w150">
						<v-select
							label="개통상태"
							outlined
							:items="statusList.OpeningTaskStatus"
							item-text="name"
							item-value="value"
							v-model.trim="filterData.OpeningTaskStatus"
						></v-select>
					</div>
					<div class="ml10 w150">
						<v-select
							label="상담상태"
							outlined
							:items="statusList.ConsultTaskStatus"
							item-text="name"
							item-value="value"
							v-model.trim="filterData.ConsultTaskStatus"
						></v-select>
					</div>
					<div class="ml10 w150">
						<v-select
							label="물류상태"
							outlined
							:items="statusList.LogisticsTaskStatus"
							item-text="name"
							item-value="value"
							v-model.trim="filterData.LogisticsTaskStatus"
						></v-select>
					</div>
				</div>
				<div class="inStockLeftRowCont disFx h40 mb10">
					<div class="w170">
						<v-autocomplete
							style="font-size: 12px"
							label="영업점"
							outlined
							:items="saleStoreList"
							item-text="storeName"
							item-value="storeId"
							v-model.trim="filterData.saleStoreId"
							@change="saleStoreFnc"
							:attach="true"
						></v-autocomplete>
					</div>
					<div class="ml10 w170">
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
					<div class="ml10 w220">
						<v-select
							outlined
							:items="saleStoreList"
							item-text="storeName"
							item-value="storeId"
							label="관리점"
							v-model.trim="filterData.searchStoreId"
						>
						</v-select>
					</div>
					<div class="ml10">
						<input
							class="borderRadi5Px borderContColor3 padW10 lh36"
							type="text"
							placeholder="고객명(법인명)"
							v-model.trim="filterData.cusName"
						/>
					</div>
					<div class="ml10">
						<input
							class="borderRadi5Px borderContColor3 padW10 lh36"
							type="text"
							placeholder="연락처"
							v-model.trim="filterData.cusPhone"
						/>
					</div>
					<div class="ml10">
						<input
							class="borderRadi5Px borderContColor3 padW10 lh36"
							type="text"
							placeholder="주소"
							v-model.trim="filterData.addr"
							style="width: 320px"
						/>
					</div>
				</div>
				<div class="inStockLeftRowCont disFx h40 mb10">
					<div class="w100P">
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
					<div class="w100P ml10" style="width: 150px">
						<v-autocomplete
							style="font-size: 12px"
							class="AutoCompleteCustom"
							outlined
							:items="codeList.deviceList"
							v-model.trim="filterData.goodsName"
							item-text="goodsName"
							label="기기명"
						>
						</v-autocomplete>
					</div>
					<div class="w100P ml10">
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
					<div class="w100P ml10">
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
					<div class="w100P ml10">
						<v-select
							outlined
							:items="statusList.UsimPaymentType"
							item-text="name"
							item-value="value"
							label="유심타입"
							v-model.trim="filterData.usimPaymentType"
						>
						</v-select>
					</div>
					<div class="w220 ml10">
						<input
							class="borderRadi5Px borderContColor3 padW10 lh36"
							type="text"
							placeholder="기기 일련번호"
							v-model.trim="filterData.barcode"
						/>
					</div>
					<div class="w220 ml10">
						<input
							class="borderRadi5Px borderContColor3 padW10 lh36"
							type="text"
							placeholder="유심일련번호"
							v-model.trim="filterData.usimRawBarcode"
						/>
					</div>
				</div>
				<div class="inStockLeftRowCont disFx h40 mb10">
					<div class="w170">
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
					<div class="selectCustom ml10">
						<v-select
							label="배송방법"
							:items="statusList.DeliveryType"
							outlined
							item-text="name"
							item-value="value"
							v-model.trim="filterData.deliveryType"
						></v-select>
					</div>
					<!--					<span class="ml10 mr10 lh36"> 배송날짜 </span>-->
					<!--					<DatePicker2-->
					<!--						:dataType="'dlvrDate'"-->
					<!--						:dateReset="dateResetData"-->
					<!--						@datePickerData="dateData"-->
					<!--					>-->
					<!--					</DatePicker2>-->
					<div class="w220 ml10">
						<input
							class="borderRadi5Px borderContColor3 padW10 lh36"
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
	</div>
</template>

<script>
import DatePicker2 from '../../../components/DatePicker2.vue';
import DatePicker from '../../../components/DatePicker.vue';

export default {
	name: 'ApplicationMatchingFilter',
	data: () => ({
		menu1: false,
		menu2: false,
		useYn: [
			{ name: '전체', value: '전체' },
			{ name: 'Y', value: 'Y' },
			{ name: 'N', value: 'N' },
		],
		telecomList: [],
		dateFilter: 'consultRegiDateTime',
	}),
	components: {
		DatePicker,
		DatePicker2,
	},
	computed: {
		codeList() {
			return this.$store.state.CodeModule.codeList;
		},
		statusList() {
			return this.$store.state.ApplicationMatchingModule.statusList;
		},
		saleStoreList() {
			return this.$store.state.ApplicationMatchingModule.saleStoreList;
		},
		openingStoreList: {
			get() {
				return this.$store.state.ApplicationMatchingModule.openingStoreList;
			},
			set(newValue) {
				this.$store.state.ApplicationMatchingModule.openingStoreList = newValue;
			},
		},
		filterData: {
			get() {
				return this.$store.state.ApplicationMatchingModule.filterData;
			},
			set(newValue) {
				this.$store.state.ApplicationMatchingModule.filterData = newValue;
			},
		},
		dateResetData: {
			get() {
				return this.$store.state.ApplicationMatchingModule.dateResetData;
			},
			set(newValue) {
				this.$store.state.ApplicationMatchingModule.dateResetData = newValue;
			},
		},
	},
	methods: {
		async beginningOpeningStoreFnc() {
			await this.$store.dispatch(
				'ApplicationMatchingModule/getOpeningStoreList',
			);
		},
		dateFilterFnc() {
			this.dateResetData = true;
			delete this.filterData.consultRegiStartDateTime;
			delete this.filterData.consultRegiEndDateTime;
			delete this.filterData.openingStartDateTime;
			delete this.filterData.openingEndDateTime;
			delete this.filterData.consultUpdStartDateTime;
			delete this.filterData.consultUpdEndDateTime;
			delete this.filterData.dlvrStartDate;
			delete this.filterData.dlvrEndDate;
		},
		dateData(date) {
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
			} else if (this.dateFilter === 'dlvrDate') {
				this.filterData.dlvrStartDate = date.start_dt;
				this.filterData.dlvrEndDate = date.end_dt;
			} else if (this.dateFilter === 'cancelDate') {
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
					'UsimPaymentType',
					'DeliveryType',
				],
			};
			await this.$store.dispatch(
				'ApplicationMatchingModule/getStatusList',
				data,
			);
		},
		async getCommonCodeList2() {
			let data = {
				initData: ['provList'],
				code: ['EXISTELECOM'],
			};
			await this.$store.dispatch('CodeModule/getCommonCodeList', data);
			this.codeList.exisTelecom.unshift({ codeNm: '전체', codeSeq: '' });
		},
		async filterInit() {
			this.dateFilter = 'consultRegiDateTime';
			// @ts-ignore
			await this.getOpeningStoreListFnc();
			await this.$store.commit('ApplicationMatchingModule/filterInit');
			await this.getCodeList();
			await this.beginningOpeningStoreFnc();
		},
		async getCodeList() {
			await this.getCommonCodeList();
			await this.getCommonCodeList2();
		},
		async getOpeningStoreListFnc() {
			await this.$store.dispatch('ApplicationMatchingModule/getSaleStoreList');
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
			await this.$store.dispatch(
				'ApplicationMatchingModule/getOpeningStoreList',
				data,
			);
			this.openingStoreList.unshift({ openStoreName: '전체', openStoreId: '' });
		},
		async filterSubmit() {
			if (this.filterData.rcptStartDate && !this.filterData.rcptEndDate) {
				alert('접수 종료일을 입력해주세요.');
				return;
			}
			if (!this.filterData.rcptStartDate && this.filterData.rcptEndDate) {
				alert('접수 시작일을 입력해주세요.');
				return;
			}
			if (this.filterData.dlvrStartDate && !this.filterData.dlvrEndDate) {
				alert('배송 종료일을 입력해주세요.');
				return;
			}
			if (!this.filterData.dlvrStartDate && this.filterData.dlvrEndDate) {
				alert('배송 시작일을 입력해주세요.');
				return;
			}
			const data = this.filterData;
			data.pageNo = 1;
			await this.$store.dispatch('ApplicationMatchingModule/getList', data);
		},
		async deviceCodeData() {
			await this.$store.dispatch('CodeModule/getGoodsNameList');
			await this.$store.dispatch('CodeModule/getCapacityList', '0');
			await this.$store.dispatch('CodeModule/getDeviceColorList');
			this.codeList.deviceList.unshift({ goodsName: '전체' });
			this.codeList.capacityList.unshift({ capacity: '전체' });
			this.codeList.colorList.unshift({ colorName: '전체' });
		},
		async getList(data) {
			await this.$store.dispatch('ApplicationMatchingModule/getList', data);
		},
	},
	async created() {
		await this.filterInit();
		await this.deviceCodeData();
		await this.getList();
		// codeList 에서 직접 호출이 안되는 버그로 인하여 변수에 담음
		this.telecomList = this.codeList.exisTelecom;
	},
};
</script>

<style>
.searchBoxCont:before {
	display: none;
}

.searchingBarStyle {
	width: 150px !important;
}
.searchingBarStyle input {
	width: 150px;
}
</style>
