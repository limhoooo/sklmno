<template>
	<div>
		<div>
			<div class="new-mainCont posR disFx borderRadi3Px borderContColor1">
				<div class="new-filterCont posA">
					<button id="initBtn1" @click="filterInit" class="mainBlue1">
						필터 초기화
					</button>
					<label for="initBtn1"></label>
				</div>
				<div class="filterLeftCont" @keyup.enter='filterSubmit'>
					<div class="inStockLeftRowCont disFx h40 mb10">
						<div class="w220">
							<v-select
								attach
								outlined
								:items="codeList.telecom"
								v-model.trim="filterData.telecom"
								item-text="codeNm"
								item-value="codeSeq"
								label="통신사"
							>
							</v-select>
						</div>
						<p class="lh40 ml10 mr10 w50">입고일</p>
						<date-picker2
							:dataType="'inStockRegiDate'"
							:dateReset="dateResetData"
							@datePickerData="dateData"
						></date-picker2>
						<p class="lh40 ml10 mr10 w50">출고일</p>
						<date-picker2
							:dataType="'returnStockRegiDate'"
							:dateReset="dateResetData"
							@datePickerData="dateData"
						></date-picker2>
					</div>
					<div class="inStockLeftRowCont disFx h40 mb10">
						<div class="w100P AutoCompleteCustom">
							<multi-search-input
								:items="codeList.provList"
								itemText="provName"
								itemValue="provId"
								itemLabel="공급처"
								@inputValue="provValue"
								:multiReset="multiResetData"
							></multi-search-input>
						</div>
						<div class="w100P ml10 AutoCompleteCustom">
							<multi-search-input
								:items="codeList.stockNameList"
								itemText="stockName"
								itemValue="stockId"
								itemLabel="보유처"
								@inputValue="stockValue"
								:multiReset="multiResetData"
							></multi-search-input>
						</div>
						<div class="w100P ml10 AutoCompleteCustom">
							<multi-search-input
								:items="codeList.openingStoreList"
								itemText="openStoreName"
								itemValue="openStoreId"
								itemLabel="개통점"
								@inputValue="openStoreValue"
								:multiReset="multiResetData"
							></multi-search-input>
						</div>
					</div>
					<div class="inStockLeftRowCont disFx h40">
						<div class="w220">
							<v-select
								attach
								label="제조사"
								outlined
								:items="codeList.maker"
								v-model.trim="filterData.maker"
								item-text="codeNm"
								item-value="codeSeq"
							></v-select>
						</div>
						<div class="w220 ml10 AutoCompleteCustom">
							<v-autocomplete
								style="font-size: 12px"
								outlined
								:items="codeList.deviceList"
								v-model.trim="filterData.goodsName"
								item-text="goodsName"
								label="기기명"
							>
							</v-autocomplete>
						</div>
						<div class="w220 ml10 AutoCompleteCustom">
							<v-autocomplete
								style="font-size: 12px"
								label="용량"
								:items="codeList.capacityList"
								v-model.trim="filterData.capacity"
								outlined
								item-text="capacity"
							>
							</v-autocomplete>
						</div>
						<div class="w220 ml10 AutoCompleteCustom">
							<v-autocomplete
								style="font-size: 12px"
								label="색상"
								:items="codeList.colorList"
								v-model.trim="filterData.colorName"
								outlined
								item-text="colorName"
							>
							</v-autocomplete>
						</div>
						<div class="w220 ml10">
							<v-select
								attach
								label="기기타입"
								outlined
								:items="enumCodeList.goodsTypeItems"
								v-model.trim="filterData.goodsType"
								item-text="name"
								item-value="value"
							></v-select>
						</div>
						<div class="ml10">
							<v-text-field
								label="일련번호 입력"
								outlined
								v-model.trim="filterData.barcode"
								@keyup.enter="filterSubmit"
							></v-text-field>
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
	</div>
</template>

<script>
import DatePicker2 from '../../../../components/DatePicker2.vue';
import MultiSearchInput from '../../../../components/MultiSearchInput.vue';

export default {
	components: { DatePicker2, MultiSearchInput },
	data: () => ({
		menu1: false,
		menu2: false,
		dateResetData: false,
		multiResetData: false,
	}),
	computed: {
		codeList() {
			return this.$store.state.CodeModule.codeList;
		},
		enumCodeList() {
			return this.$store.state.MoveStockRtngudModule.enumCodeList;
		},
		filterData: {
			get() {
				return this.$store.state.MoveStockRtngudModule.filterData;
			},
			set(newValue) {
				this.$store.state.MoveStockRtngudModule.filterData = newValue;
			},
		},
	},
	methods: {
		stockItemsList() {
			this.$store.dispatch('CodeModule/getStockListFnc', 0);
		},
		stockValue(item) {
			this.multiResetData = false;
			this.filterData.nextStockIds = item;
		},
		openStoreValue(item) {
			this.multiResetData = false;
			this.filterData.openingHistoryStoreIds = item;
		},
		provValue(item) {
			this.multiResetData = false;
			this.filterData.provIds = item;
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
		async filterSubmit() {
			const data = this.$store.state.MoveStockRtngudModule.filterData;
			data.pageNo = 1;
			// 입고일
			this.dateStartValFnc(
				this.filterData.inStockRegiDate,
				this.filterData.inStockEndDate,
			);
			this.dateEndValFnc(
				this.filterData.inStockRegiDate,
				this.filterData.inStockEndDate,
			);
			// 출고일
			this.dateStartValFnc(
				this.filterData.returnStockRegiDate,
				this.filterData.returnStockEndDate,
			);
			this.dateEndValFnc(
				this.filterData.returnStockRegiDate,
				this.filterData.returnStockEndDate,
			);
			await this.$store.dispatch(
				'MoveStockRtngudModule/getReturnStockList',
				data,
			);
		},
		async createFilterInit() {
			await this.$store.commit('MoveStockRtngudModule/filterInit');
			await this.stockItemsList();
		},
		filterInit() {
			this.multiResetData = true;
			this.createFilterInit();
			this.dateResetData = true;
		},
		commonFilterInit() {
			this.$store.commit('CodeModule/filterInit');
		},
		async getCommonCodeList() {
			let data = {
				initData: ['provList'],
				code: ['TELECOM', 'MAKER'],
			};
			await this.getUsimTypeItems();
			await this.$store.dispatch('CodeModule/getCommonCodeList', data);
			await this.$store.dispatch('CodeModule/getSessOpeningStoreList');
			this.codeList.telecom.unshift({ codeNm: '전체', codeSeq: '' });
			this.codeList.maker.unshift({ codeNm: '전체', codeSeq: '' });
		},
		getUsimTypeItems() {
			this.$store.dispatch('MoveStockRtngudModule/commonCodeEnumList');
		},
		async getCodeList() {
			await this.getCommonCodeList();
			this.codeList.colorList.unshift({ colorName: '전체', goodsOptionId: '' });
		},
		dateData(item) {
			this.dateResetData = false;
			if (item.dataType === 'inStockRegiDate') {
				this.filterData.inStockRegiDate = item.start_dt;
				this.filterData.inStockEndDate = item.end_dt;
			} else if (item.dataType === 'returnStockRegiDate') {
				this.filterData.returnStockRegiDate = item.start_dt;
				this.filterData.returnStockEndDate = item.end_dt;
			}
		},
		async deviceCodeData() {
			await this.$store.dispatch('CodeModule/getGoodsNameList');
			await this.$store.dispatch('CodeModule/getCapacityList', '0');
			await this.$store.dispatch('CodeModule/getDeviceColorList');
			this.codeList.deviceList.unshift({ goodsName: '전체' });
			this.codeList.capacityList.unshift({ capacity: '전체' });
			this.codeList.colorList.unshift({ colorName: '전체' });
		},
	},
	async created() {
		await this.commonFilterInit();
		await this.createFilterInit();
		await this.getCodeList();
		await this.deviceCodeData();
	},
};
</script>

<style scoped>
.selectCustom {
	width: 15%;
	margin-left: 15px;
}
.datePickerCustom {
	margin-left: 15px;
}
</style>
