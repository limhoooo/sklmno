<template>
	<div>
		<div class="new-mainCont posR disFx">
			<div class="new-filterCont posA">
				<button id="initBtn1" @click="filterInit" class="mainBlue1">
					필터 초기화
				</button>
				<label for="initBtn1"></label>
			</div>
			<div class="filterLeftCont" @keyup.enter='getList(filterData)'>
				<div class="inStockLeftRowCont disFx h40 mb10">
					<p class="disIn w20P lh40">입고일</p>
					<date-picker2
						:dataType="'inStockRegiDate'"
						:dateReset="dateResetData"
						@datePickerData="dateData"
					></date-picker2>
					<div class="w50P ml10">
						<v-select
							attach
							outlined
							:items="telecomItems"
							item-text="codeNm"
							item-value="codeSeq"
							@change="selectListdata"
							label="통신사"
							v-model.trim="filterData.telecom"
						>
						</v-select>
					</div>
					<div class="w100P ml10 AutoCompleteCustom">
						<multi-search-input
							:items="provItems"
							itemText="provName"
							itemValue="provId"
							itemLabel="공급처"
							@inputValue="provValue"
							:multiReset="multiResetData"
						></multi-search-input>
					</div>
					<div class="w100P ml10 AutoCompleteCustom">
						<multi-search-input
							:items="stockItems"
							itemText="stockName"
							itemValue="stockId"
							itemLabel="보유처"
							@inputValue="stockValue"
							:multiReset="multiResetData"
						></multi-search-input>
					</div>
					<div class="w50P ml10">
						<v-select
							attach
							label="재고구분"
							outlined
							item-text="name"
							item-value="value"
							:items="stockStatStrItems"
							v-model.trim="filterData.statusStr"
						></v-select>
					</div>
				</div>
				<div class="inStockLeftRowCont disFx h40 mb10">
					<div class="w100P">
						<v-select
							attach
							label="제조사"
							outlined
							:items="makerItems"
							item-text="codeNm"
							item-value="codeSeq"
							v-model.trim="filterData.maker"
							@change="deviceList"
						></v-select>
					</div>
					<div class="w100P ml10">
						<v-autocomplete
							style="font-size: 12px"
							label="기기명"
							outlined
							item-text="modelName"
							item-value="goodsId"
							:items="deviceItems"
							v-model.trim="filterData.goodsId"
							@change="capacityList"
							return-object
						></v-autocomplete>
					</div>
					<div class="w100P ml10">
						<v-select
							attach
							label="용량"
							outlined
							:items="capacityItems"
							item-text="capacity"
							v-model.trim="filterData.capacity"
							@change="getDeviceColorList"
						></v-select>
					</div>
					<div class="w100P ml10">
						<v-select
							attach
							label="색상"
							outlined
							:items="colorItems"
							item-text="colorName"
							v-model.trim="filterData.colorName"
						></v-select>
					</div>
					<div class="w100P ml10">
						<v-select
							attach
							label="기기타입"
							outlined
							:items="goodsTypeItems"
							v-model.trim="filterData.goodsType"
							item-text="name"
							item-value="value"
						></v-select>
					</div>
				</div>
				<div class="inStockLeftRowCont disFx h40">
					<div class="w100P">
						<v-select
							attach
							label="입고상태"
							outlined
							item-text="name"
							item-value="value"
							:items="inStockStatusItems"
							v-model.trim="filterData.inStockStatus"
						></v-select>
					</div>
					<div class="w100P ml10">
						<v-select
							attach
							label="제품상태"
							outlined
							item-text="name"
							item-value="value"
							:items="productFaultyYnItems"
							v-model.trim="filterData.productFaultyYn"
						></v-select>
					</div>
					<div class="w100P ml10">
						<v-select
							attach
							label="외장상태"
							outlined
							:items="deviceExtrrStatusItems"
							v-model.trim="filterData.extrrStatus"
							item-text="name"
							item-value="value"
						></v-select>
					</div>
					<div class="w100P ml10">
						<v-text-field
							label="일련번호 입력"
							v-model.trim="filterData.barcode"
							outlined
							@keyup.enter="getList(filterData)"
						></v-text-field>
					</div>
				</div>
			</div>
			<div class="inStockButtonCont ml40 disFx flexDColC">
				<button
					class="backColorMint1 mainWhite w100P disIn borderRadi3Px h90"
					@click="getList(filterData)"
				>
					검색
				</button>
			</div>
		</div>
	</div>
</template>

<script>
import DatePicker2 from '../../../../../components/DatePicker2.vue';
import MultiSearchInput from '../../../../../components/MultiSearchInput.vue';

export default {
	components: { DatePicker2, MultiSearchInput },
	data: () => ({
		menu1: false,
		dateResetData: false,
		multiResetData: false,
	}),
	computed: {
		filterData() {
			return this.$store.state.InStockMgmtModule.filterData;
		},
		provItems() {
			return this.$store.state.InStockMgmtModule.codeList.prov;
		},
		telecomItems() {
			return this.$store.state.InStockMgmtModule.codeList.telecom;
		},
		stockItems: {
			get() {
				return this.$store.state.InStockMgmtModule.codeList.stock;
			},
			set(newValue) {
				return (this.$store.state.InStockMgmtModule.codeList.stock = newValue);
			},
		},
		deviceExtrrStatusItems: {
			get() {
				return this.$store.state.CodeModule.codeList.deviceExtrrStatusItems;
			},
			set(newValue) {
				return (this.$store.state.CodeModule.codeList.deviceExtrrStatusItems = newValue);
			},
		},
		productFaultyYnItems: {
			get() {
				return this.$store.state.CodeModule.codeList.productFaultyYnItems;
			},
			set(newValue) {
				return (this.$store.state.CodeModule.codeList.productFaultyYnItems = newValue);
			},
		},
		inStockStatusItems: {
			get() {
				return this.$store.state.CodeModule.codeList.inStockStatusItems;
			},
			set(newValue) {
				return (this.$store.state.CodeModule.codeList.inStockStatusItems = newValue);
			},
		},
		stockStatStrItems: {
			get() {
				return this.$store.state.CodeModule.codeList.stockStatStrItems;
			},
			set(newValue) {
				return (this.$store.state.CodeModule.codeList.stockStatStrItems = newValue);
			},
		},
		capacityItems: {
			get() {
				return this.$store.state.InStockMgmtModule.capacityItems;
			},
			set(newValue) {
				return (this.$store.state.InStockMgmtModule.capacityItems = newValue);
			},
		},
		colorItems: {
			get() {
				return this.$store.state.InStockMgmtModule.colorItems;
			},
			set(newValue) {
				return (this.$store.state.InStockMgmtModule.colorItems = newValue);
			},
		},
		deviceItems: {
			get() {
				return this.$store.state.InStockMgmtModule.deviceItems;
			},
			set(newValue) {
				return (this.$store.state.InStockMgmtModule.deviceItems = newValue);
			},
		},
		makerItems() {
			return this.$store.state.InStockMgmtModule.codeList.maker;
		},
		goodsTypeItems() {
			return this.$store.state.InStockMgmtModule.codeList.goodsTypeItems;
		},
	},
	methods: {
		provValue(item) {
			this.multiResetData = false;
			this.filterData.provIds = item;
		},
		stockValue(item) {
			this.multiResetData = false;
			this.filterData.stockIds = item;
		},
		async filterInit() {
			this.dateResetData = true;
			this.multiResetData = true;
			await this.$store.commit('InStockMgmtModule/filterInit');
		},
		async stockItemsList() {
			await this.$store.dispatch('InStockMgmtModule/selectCodeList', 0);
		},
		async selectListdata() {
			this.stockItems = [];
			await this.deviceList();
			this.capacityItems = [];
			this.capacityItems.unshift({ capacity: '전체', value: '' });
			this.colorItems = [];
			this.colorItems.unshift({ colorName: '전체', value: '' });
		},
		async deviceList() {
			this.capacityItems = [];
			this.colorItems = [];
			let data = {
				telecomId: this.filterData.telecom,
				makerId: this.filterData.maker,
			};
			await this.$store.dispatch('InStockMgmtModule/getDeviceList', data);
			this.filterData.goodsId = '';
			this.filterData.capacity = '';
			this.filterData.colorName = '';
		},
		async capacityList(item) {
			if (item.modelName.indexOf('유심') !== -1) {
				this.capacityItems = [];
				this.capacityItems.unshift({ capacity: '전체', value: '' });
				this.colorItems = [];
				this.colorItems.unshift({ colorName: '전체', value: '' });
				return;
			}
			let data = this.filterData.goodsId.goodsId;
			if (data === '') {
				this.capacityItems = [];
				this.capacityItems.unshift({ capacity: '전체', value: '' });
				return;
			}
			await this.$store.dispatch('InStockMgmtModule/getCapacityList', data);
			this.capacityItems.unshift({ capacity: '전체', value: '' });
		},
		async getDeviceColorList() {
			let data = {
				goodsId: this.filterData.goodsId,
				capacity: this.filterData.capacity,
			};
			this.colorItems = [];
			if (data.capacity === '') {
				this.colorItems = [];
				this.colorItems.unshift({ colorName: '전체', value: '' });
				return;
			}
			await this.$store.dispatch('InStockMgmtModule/getDeviceColorList', data);
		},
		addTotalFnc() {
			this.stockStatStrItems.unshift({ name: '전체', value: '' });
			this.inStockStatusItems.unshift({ name: '전체', value: '' });
			this.productFaultyYnItems.unshift({ name: '전체', value: '' });
			this.deviceExtrrStatusItems.unshift({ name: '전체', value: '' });
		},
		async getCodeList() {
			await this.$store.dispatch('InStockMgmtModule/getCommonCodeList');
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
		async getList(data) {
			if (data) {
				data.pageNo = 1;
				data.goodsId = data.goodsId.goodsId;
				if (data.goodsId === undefined) data.goodsId = '';
			}
			this.dateStartValFnc(
				this.filterData.inStockRegiDate,
				this.filterData.inStockEndDate,
			);
			this.dateEndValFnc(
				this.filterData.inStockRegiDate,
				this.filterData.inStockEndDate,
			);
			await this.$store.dispatch('InStockMgmtModule/getInStockList', data);
		},
		commonCodeEnumList() {
			this.$store.dispatch('InStockMgmtModule/commonCodeEnumList');
		},
		async codeListFnc() {
			await this.commonCodeEnumList();
			await this.getCodeList();
			await this.deviceList();
			await this.addTotalFnc();
			await this.filterInit();
		},
		dateData(item) {
			this.dateResetData = false;
			if (item.dataType === 'inStockRegiDate') {
				this.filterData.inStockRegiDate = item.start_dt;
				this.filterData.inStockEndDate = item.end_dt;
			}
		},
	},
	async created() {
		await this.codeListFnc();
		await this.filterInit();
		await this.stockItemsList();
		await this.getList();
	},
};
</script>
