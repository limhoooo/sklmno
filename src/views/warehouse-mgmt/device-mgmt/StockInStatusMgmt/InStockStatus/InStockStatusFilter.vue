<template>
	<div class="searchingCont MoveStatus StockStatusCont">
		<div class="filterCont">
			<v-btn icon>
				<v-icon style="color: #7e7e7e">mdi-cached</v-icon>
				<span style="color: #7e7e7e; font-weight: bold" @click="filterInit"
					>필터 초기화</span
				>
			</v-btn>
		</div>
		<div class="boxRow">
			<div class="contRow firstRow">
				<div class="datePickerCustom" style="margin-left: 0">
					<div class="dateCustom" style="display: inline-block">
						<v-menu
							v-model.trim="menu1"
							:close-on-content-click="false"
							:nudge-right="40"
							transition="scale-transition"
							offset-y
						>
							<template v-slot:activator="{ on, attrs }">
								<v-text-field
									outlined
									readonly
									v-model.trim="filterData.inStockRegiDate"
									v-bind="attrs"
									v-on="on"
									class="datePickerInput input_custom1"
									label="입고일"
								></v-text-field>
							</template>
							<v-date-picker
								v-model.trim="filterData.inStockRegiDate"
								@input="menu1 = false"
								locale="ko-KR"
							></v-date-picker>
						</v-menu>
					</div>
				</div>
				<div class="selectCustom">
					<v-select
						:items="provItems"
						label="공급처"
						outlined
						item-text="provName"
						item-value="provId"
						v-model.trim="filterData.provId"
					></v-select>
				</div>
				<div class="selectCustom">
					<v-select
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
				<div class="selectCustom">
					<v-select
						:items="stockItems"
						label="보유처"
						outlined
						item-text="stockName"
						item-value="stockId"
						v-model.trim="filterData.stockId"
					></v-select>
				</div>
				<div class="selectCustom">
					<v-select
						label="재고구분"
						outlined
						item-text="name"
						item-value="value"
						:items="stockStatStrItems"
						v-model.trim="filterData.statusStr"
					></v-select>
				</div>
				<div class="selectCustom" style="width: 225px">
					<v-select
						label="제조사"
						outlined
						:items="makerItems"
						item-text="codeNm"
						item-value="codeSeq"
						v-model.trim="filterData.maker"
						@change="deviceList"
					></v-select>
				</div>
			</div>
			<div class="contRow itemSevenCustom">
				<div class="selectCustom">
					<v-select
						label="기기명"
						outlined
						item-text="modelName"
						item-value="goodsId"
						:items="deviceItems"
						v-model.trim="filterData.goodsId"
						@change="capacityList"
					></v-select>
				</div>
				<div class="selectCustom">
					<v-select
						label="용량"
						outlined
						:items="capacityItems"
						item-text="capacity"
						v-model.trim="filterData.capacity"
						@change="getDeviceColorList"
					></v-select>
				</div>
				<div class="selectCustom">
					<v-select
						label="색상"
						outlined
						:items="colorItems"
						item-text="colorName"
						v-model.trim="filterData.colorName"
					></v-select>
				</div>
				<div class="selectCustom">
					<v-select
						label="입고상태"
						outlined
						item-text="name"
						item-value="value"
						:items="inStockStatusItems"
						v-model.trim="filterData.inStockStatus"
					></v-select>
				</div>
				<div class="selectCustom">
					<v-select
						label="제품상태"
						outlined
						item-text="name"
						item-value="value"
						:items="productFaultyYnItems"
						v-model.trim="filterData.productFaultyYn"
					></v-select>
				</div>
				<div class="selectCustom">
					<v-select
						label="외장상태"
						outlined
						:items="deviceExtrrStatusItems"
						v-model.trim="filterData.extrrStatus"
						item-text="name"
						item-value="value"
					></v-select>
				</div>
				<div class="selectCustom" style="width: 385px !important">
					<v-text-field
						label="일련번호 입력"
						v-model.trim="filterData.barcode"
						outlined
					></v-text-field>
				</div>
			</div>
		</div>
		<div class="searchBoxCont">
			<div class="searchBox" @click="getList(filterData)">검색</div>
		</div>
	</div>
</template>

<script>
export default {
	data: () => ({
		menu1: false,
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
	},
	methods: {
		async filterInit() {
			await this.$store.commit('InStockMgmtModule/filterInit');
		},
		async selectListdata() {
			this.stockItems = [];
			const data = this.filterData.telecom;
			await this.deviceList();
			this.capacityItems = [];
			this.capacityItems.unshift({ capacity: '전체', value: '' });
			this.colorItems = [];
			this.colorItems.unshift({ colorName: '전체', value: '' });
			if (data === '') {
				return;
			}
			await this.$store.dispatch('InStockMgmtModule/selectCodeList', data);
			if (this.stockItems !== undefined) {
				this.stockItems.unshift({ stockName: '전체', stockId: '' });
			}
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
		async capacityList() {
			let data = this.filterData.goodsId;
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
		async getList(data) {
			if (data) {
				data.pageNo = 1;
			}
			await this.$store.dispatch('InStockMgmtModule/getInStockList', data);
		},
		codeListFnc() {
			this.getCodeList();
			this.deviceList();
			this.addTotalFnc();
			this.filterInit();
		},
	},
	async created() {
		await this.codeListFnc();
		await this.filterInit();
		await this.getList();
	},
};
</script>
