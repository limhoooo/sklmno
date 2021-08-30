<template>
	<div>
		<div class="new-mainCont posR disFx borderRadi3Px borderContColor1">
			<div class="new-filterCont posA">
				<button id="initBtn1" @click="filterInit" class="mainBlue1">
					필터 초기화
				</button>
				<label for="initBtn1"></label>
			</div>
			<div class="filterLeftCont" @keyup.enter='filterSubmit'>
				<div class="inStockLeftRowCont disFx h40 mb10 w70P">
					<div class="w100P">
						<v-select
							attach
							v-model.trim="filterData.telecom"
							outlined
							:items="codeList.telecom"
							item-text="codeNm"
							item-value="codeSeq"
							label="통신사"
						>
						</v-select>
					</div>
					<p class="lh40 ml10 w30P">입고일</p>
					<DatePicker2
						:dataType="'inStockRegiDate'"
						:dateReset="dateResetData"
						@datePickerData="dateData"
					></DatePicker2>
					<p class="lh40 ml10 w30P">개통일</p>
					<DatePicker2
						:dataType="'openingDate'"
						:dateReset="dateResetData"
						@datePickerData="dateData"
					></DatePicker2>
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
					<div class="w100P ml10 AutoCompleteCustom">
						<multi-search-input
							:items="codeList.deviceMoveStockStatStrItems"
							itemText="name"
							itemValue="value"
							itemLabel="재고구분"
							@inputValue="stockTypeValue"
							:multiReset="multiResetData"
						></multi-search-input>
					</div>
				</div>
				<div class="inStockLeftRowCont disFx h40 mb10">
					<div class="w100P">
						<v-select
							attach
							label="제조사"
							v-model.trim="filterData.maker"
							outlined
							:items="codeList.maker"
							item-text="codeNm"
							item-value="codeSeq"
						></v-select>
					</div>
					<div class="w100P ml10">
						<v-select
							attach
							v-model.trim="filterData.openingStatus"
							:items="codeList.openingStatus"
							label="철회상태"
							outlined
							item-text="name"
							item-value="value"
						></v-select>
					</div>
					<p class="lh40 ml10 w30P">철회날짜</p>
					<DatePicker2
						:dataType="'returnDate'"
						:dateReset="dateResetData"
						@datePickerData="dateData"
					></DatePicker2>
					<div class="w100P ml10">
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
				</div>
				<div class="inStockLeftRowCont disFx h40">
					<div class="w100P">
						<v-autocomplete
							style="font-size: 12px"
							class="AutoCompleteCustom"
							outlined
							:items="codeList.deviceList"
							v-model.trim="filterData.goodsName"
							item-text="goodsName"
							label="기기명"
						></v-autocomplete>
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
						></v-autocomplete>
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
						></v-autocomplete>
					</div>
					<div class="w100P ml10">
						<v-text-field
							label="고객명"
							v-model.trim="filterData.cusName"
							outlined
						></v-text-field>
					</div>
					<div class="w100P ml10">
						<v-text-field
							label="전화번호"
							v-model.trim="filterData.cusPhone"
							outlined
						></v-text-field>
					</div>
					<div class="w100P ml10">
						<v-text-field
							label="일련번호"
							v-model.trim="filterData.barcode"
							outlined
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
</template>

<script lang="ts">
import Vue from 'vue';
import DatePicker2 from '../../../../components/DatePicker2.vue';
import { filterData } from '../../../../store/interface/warehouse-mgmt/interface';
import MultiSearchInput from '../../../../components/MultiSearchInput.vue';

interface dataType {
	menu1: boolean;
	menu2: boolean;
	dateResetData: boolean;
	multiResetData: boolean;
}
export default Vue.extend({
	name: 'OpenStoreDeviceStatusFilter',
	components: { DatePicker2, MultiSearchInput },
	data: (): dataType => ({
		menu1: false,
		menu2: false,
		dateResetData: false,
		multiResetData: false,
	}),
	computed: {
		codeList(): any {
			return this.$store.state.CodeModule.codeList;
		},
		enumCodeList(): any {
			return this.$store.state.OpenStoreDeviceStatusModule.enumCodeList;
		},
		filterData: {
			get(): filterData {
				return this.$store.state.OpenStoreDeviceStatusModule.filterData;
			},
			set(newValue: filterData) {
				this.$store.state.OpenStoreDeviceStatusModule.filterData = newValue;
			},
		},
	},
	methods: {
		stockItemsList() {
			this.$store.dispatch('CodeModule/getStockListFnc', 0);
		},
		provValue(item: any) {
			this.multiResetData = false;
			this.filterData.provIds = item;
		},
		stockValue(item: any) {
			this.multiResetData = false;
			this.filterData.stockIds = item;
		},
		openStoreValue(item: any) {
			this.multiResetData = false;
			this.filterData.openingHistoryStoreIds = item;
		},
		stockTypeValue(item: any) {
			this.multiResetData = false;
			this.filterData.stockTypes = item;
		},
		dateStartValFnc(startDt: any, endDt: any) {
			if (!startDt && endDt) {
				alert('시작일을 입력해주세요.');
				return true;
			}
		},
		dateEndValFnc(startDt: any, endDt: any) {
			if (startDt && !endDt) {
				alert('종료일을 입력해주세요.');
				return true;
			}
		},
		async filterSubmit() {
			const data: filterData = this.filterData;
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
			// 개통일
			this.dateStartValFnc(
				this.filterData.openingDate,
				this.filterData.openingEndDate,
			);
			this.dateEndValFnc(
				this.filterData.openingDate,
				this.filterData.openingEndDate,
			);
			// 철회일자
			this.dateStartValFnc(
				this.filterData.cancelDate,
				this.filterData.cancelEndDate,
			);
			this.dateEndValFnc(
				this.filterData.cancelDate,
				this.filterData.cancelEndDate,
			);
			await this.$store.dispatch('OpenStoreDeviceStatusModule/getList', data);
		},
		async createFilterInit() {
			this.$store.commit('OpenStoreDeviceStatusModule/filterInit');
			this.stockItemsList();
		},
		filterInit() {
			this.multiResetData = true;
			this.dateResetData = true;
			this.createFilterInit();
			this.getCodeList();
		},
		async getCommonCodeList() {
			let data = {
				initData: ['provList'],
				code: ['TELECOM', 'MAKER'],
			};
			await this.$store.dispatch('CodeModule/getCommonCodeList', data);
			await this.$store.dispatch('CodeModule/getSessOpeningStoreList');
			this.codeList.telecom.unshift({ codeNm: '전체', codeSeq: '' });
			this.codeList.maker.unshift({ codeNm: '전체', codeSeq: '' });
			this.codeList.openingStatus.unshift({ name: '전체', value: '' });
		},

		async getCodeList() {
			await this.getUsimTypeItems();
			await this.getCommonCodeList();
			// 보유처 용량 색상 초기 전체 INSERT
			this.codeList.capacityList.unshift({ capacity: '전체' });
			this.codeList.colorList.unshift({ colorName: '전체' });
		},
		async getUsimTypeItems() {
			await this.$store.dispatch(
				'OpenStoreDeviceStatusModule/commonCodeEnumList',
			);
		},

		dateData(item: any) {
			this.dateResetData = false;
			if (item.dataType === 'inStockRegiDate') {
				this.filterData.inStockRegiDate = item.start_dt;
				this.filterData.inStockEndDate = item.end_dt;
			} else if (item.dataType === 'openingDate') {
				this.filterData.openingDate = item.start_dt;
				this.filterData.openingEndDate = item.end_dt;
			} else {
				this.filterData.cancelDate = item.start_dt;
				this.filterData.cancelEndDate = item.end_dt;
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
		commonFilterInit() {
			this.$store.commit('CodeModule/filterInit');
		},
	},
	async created() {
		// @ts-ignore
		await this.commonFilterInit();
		await this.createFilterInit();
		await this.getCodeList();
		await this.deviceCodeData();
	},
});
</script>
