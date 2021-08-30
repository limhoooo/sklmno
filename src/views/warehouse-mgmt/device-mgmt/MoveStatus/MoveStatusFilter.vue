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
					<div class="w100P mr10">
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
					<p class="lh40 w30P">입고일</p>
					<DatePicker2
						:dataType="'inStockRegiDate'"
						:dateReset="dateResetData"
						@datePickerData="dateData"
					></DatePicker2>
					<p class="lh40 ml10 w30P">출고일</p>
					<DatePicker2
						:dataType="'moveRegiDate'"
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
					<!--todo: 개통점 추가-->
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
							:items="codeList.moveStockStatStrItems"
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
							label="배송방법"
							v-model.trim="filterData.deliveryType"
							outlined
							:items="codeList.deliveryType"
							item-text="name"
							item-value="value"
						></v-select>
					</div>
					<div class="w100P ml10">
						<v-select
							attach
							label="배송상태"
							v-model.trim="filterData.deliveryStatus"
							outlined
							:items="codeList.deliveryStatus"
							item-text="name"
							item-value="value"
						></v-select>
					</div>
					<p class="lh40 ml10 w40P">배송날짜</p>
					<DatePicker2
						:dataType="'deliveryDate'"
						:dateReset="dateResetData"
						@datePickerData="dateData"
					></DatePicker2>
					<div class="w100P ml10">
						<v-select
							attach
							label="입고상태"
							v-model.trim="filterData.inStockStatus"
							outlined
							:items="codeList.inStockStatusItems"
							item-text="name"
							item-value="value"
						></v-select>
					</div>
					<div class="w100P ml10">
						<v-select
							attach
							label="제품상태"
							v-model.trim="filterData.productFaultyYn"
							outlined
							:items="codeList.productFaultyYnItems"
							item-text="name"
							item-value="value"
						></v-select>
					</div>
				</div>
				<div class="inStockLeftRowCont disFx h40">
					<div class="w100P">
						<v-select
							attach
							label="외장상태"
							v-model.trim="filterData.extrrStatus"
							outlined
							:items="codeList.deviceExtrrStatusItems"
							item-text="name"
							item-value="value"
						></v-select>
					</div>
					<div class="w100P ml10">
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
					<div class="w100P ml10">
						<v-text-field
							label="일련번호 입력"
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
		filterData: {
			get() {
				return this.$store.state.MoveStatusModule.filterData;
			},
			set(newValue) {
				this.$store.state.MoveStatusModule.filterData = newValue;
			},
		},
		enumCodeList() {
			return this.$store.state.MoveStatusModule.enumCodeList;
		},
	},
	methods: {
		stockItemsList() {
			this.$store.dispatch('CodeModule/getStockListFnc', 0);
		},
		provValue(item) {
			this.multiResetData = false;
			this.filterData.provIds = item;
		},
		stockValue(item) {
			this.multiResetData = false;
			this.filterData.stockIds = item;
		},
		openStoreValue(item) {
			this.multiResetData = false;
			this.filterData.openingHistoryStoreIds = item;
		},
		stockTypeValue(item) {
			this.multiResetData = false;
			this.filterData.stockTypes = item;
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
			const data = this.$store.state.MoveStatusModule.filterData;
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
				this.filterData.moveRegiDate,
				this.filterData.moveEndDate,
			);
			this.dateEndValFnc(
				this.filterData.moveRegiDate,
				this.filterData.moveEndDate,
			);
			// 배송날짜
			this.dateStartValFnc(
				this.filterData.deliveryStartDate,
				this.filterData.deliveryEndDate,
			);
			this.dateEndValFnc(
				this.filterData.deliveryStartDate,
				this.filterData.deliveryEndDate,
			);
			await this.$store.dispatch('MoveStatusModule/getList', data);
		},
		async createFilterInit() {
			this.$store.commit('MoveStatusModule/filterInit');
			this.stockItemsList();
		},
		filterInit() {
			this.multiResetData = true;
			this.dateResetData = true;
			this.createFilterInit();
			this.getCodeList();
		},
		commonFilterInit() {
			this.$store.commit('CodeModule/filterInit');
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
			this.codeList.inStockStatusItems.unshift({ name: '전체', value: '' });
			this.codeList.productFaultyYnItems.unshift({ name: '전체', value: '' });
			this.codeList.deviceExtrrStatusItems.unshift({ name: '전체', value: '' });
			this.codeList.deliveryType.unshift({ name: '전체', value: '' });
			this.codeList.deliveryStatus.unshift({ name: '전체', value: '' });
			this.codeList.provList.unshift({ provName: '전체', provId: '' });
		},
		async getCodeList() {
			await this.getCommonCodeList();
			await this.getEnumCommonCodeList();

			// 보유처 용량 색상 초기 전체 INSERT
			this.codeList.capacityList.unshift({ capacity: '전체' });
			this.codeList.colorList.unshift({ colorName: '전체' });
		},
		getEnumCommonCodeList() {
			this.$store.dispatch('MoveStatusModule/commonCodeEnumList');
		},
		dateData(item) {
			this.dateResetData = false;
			if (item.dataType === 'inStockRegiDate') {
				this.filterData.inStockRegiDate = item.start_dt;
				this.filterData.inStockEndDate = item.end_dt;
			} else if (item.dataType === 'moveRegiDate') {
				this.filterData.moveRegiDate = item.start_dt;
				this.filterData.moveEndDate = item.end_dt;
			} else if (item.dataType === 'deliveryDate') {
				this.filterData.deliveryStartDate = item.start_dt;
				this.filterData.deliveryEndDate = item.end_dt;
			} else {
				this.filterData.openingStartDateTime = item.start_dt;
				this.filterData.openingEndDateTime = item.end_dt;
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
