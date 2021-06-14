<template>
	<div>
		<div class="searchingCont StockStatusCont">
			<div class="filterCont">
				<v-btn icon>
					<v-icon style="color: #7e7e7e">mdi-cached</v-icon>
					<span style="color: #7e7e7e; font-weight: bold" @click="filterInit"
						>필터 초기화</span
					>
				</v-btn>
			</div>
			<div class="boxRow">
				<div class="contRow">
					<div class="selectCustom">
						<v-select
							outlined
							:items="codeList.telecom"
							v-model.trim="filterData.telecom"
							@change="getStockListFnc"
							item-text="codeNm"
							item-value="codeSeq"
							label="통신사"
						>
						</v-select>
					</div>
					<div class="datePickerCustom">
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
					<div class="datePickerCustom">
						<div class="dateCustom" style="display: inline-block">
							<v-menu
								v-model.trim="menu2"
								:close-on-content-click="false"
								:nudge-right="40"
								transition="scale-transition"
								offset-y
							>
								<template v-slot:activator="{ on, attrs }">
									<v-text-field
										outlined
										readonly
										v-model.trim="filterData.moveStockRegiDate"
										v-bind="attrs"
										v-on="on"
										label="출고일"
										class="datePickerInput input_custom1"
									></v-text-field>
								</template>
								<v-date-picker
									v-model.trim="filterData.moveStockRegiDate"
									@input="menu2 = false"
									locale="ko-KR"
								></v-date-picker>
							</v-menu>
						</div>
					</div>
					<div class="selectCustom">
						<v-select
							label="보유처"
							:items="codeList.stockNameList"
							outlined
							v-model.trim="filterData.nextStockId"
							item-text="stockName"
							item-value="stockId"
						></v-select>
					</div>
					<div class="selectCustom">
						<v-select
							label="재고구분"
							v-model.trim="filterData.statusStr"
							:items="codeList.stockStatStrItems"
							outlined
							item-text="name"
							item-value="value"
						></v-select>
					</div>
					<div class="selectCustom">
						<v-select
							label="제조사"
							outlined
							:items="codeList.maker"
							v-model.trim="filterData.maker"
							@change="getDeviceListFnc"
							item-text="codeNm"
							item-value="codeSeq"
						></v-select>
					</div>
				</div>
				<div class="contRow itemSevenCustom">
					<div class="selectCustom">
						<v-select
							outlined
							:items="codeList.deviceList"
							v-model.trim="filterData.goodsId"
							item-text="modelName"
							item-value="goodsId"
							label="기기명"
							@change="getCapacityListFnc()"
						>
						</v-select>
					</div>
					<div class="selectCustom">
						<v-select
							label="용량"
							:items="codeList.capacityList"
							v-model.trim="filterData.capacity"
							outlined
							@change="getDeviceColorList()"
							item-text="capacity"
						></v-select>
					</div>
					<div class="selectCustom">
						<v-select
							label="색상"
							:items="codeList.colorList"
							v-model.trim="filterData.colorName"
							outlined
							item-text="colorName"
						></v-select>
					</div>
					<div class="selectCustom">
						<v-select
							label="입고상태"
							:items="codeList.inStockStatusItems"
							v-model.trim="filterData.inStockStatus"
							outlined
							item-text="name"
							item-value="value"
						></v-select>
					</div>
					<div class="selectCustom">
						<v-select
							label="제품상태"
							:items="codeList.productFaultyYnItems"
							v-model.trim="filterData.productFaultyYn"
							outlined
							item-text="name"
							item-value="value"
						></v-select>
					</div>
					<div class="selectCustom">
						<v-select
							label="외장상태"
							:items="codeList.deviceExtrrStatusItems"
							v-model.trim="filterData.extrrStatus"
							outlined
							item-text="name"
							item-value="value"
						></v-select>
					</div>
					<div class="selectCustom" style="width: 325px">
						<v-text-field
							label="일련번호 입력"
							v-model.trim="filterData.barcode"
							outlined
						></v-text-field>
					</div>
				</div>
			</div>
			<div class="searchBoxCont">
				<div class="searchBox" @click="filterSubmit">검색</div>
			</div>
		</div>
	</div>
</template>

<script>
import filterCodeListMixin from '../../../../common/filterCodeListMixin';

export default {
	mixins: [filterCodeListMixin],

	data: () => ({
		menu1: false,
		menu2: false,
	}),
	computed: {
		codeList() {
			return this.$store.state.CodeModule.codeList;
		},
		filterData: {
			get() {
				return this.$store.state.LongtimeStockModule.filterData;
			},
			set(newValue) {
				this.$store.state.LongtimeStockModule.filterData = newValue;
			},
		},
	},
	methods: {
		async filterSubmit() {
			const data = this.$store.state.LongtimeStockModule.filterData;
			data.pageNo = 1;
			await this.$store.dispatch('LongtimeStockModule/getList', data);
		},
		filterInit() {
			this.$store.commit('LongtimeStockModule/filterInit');
			this.getCodeList();
			this.getStockListFnc();
		},
		async getCommonCodeList() {
			let data = {
				initData: ['provList'],
				code: ['TELECOM', 'MAKER'],
			};
			await this.$store.dispatch('CodeModule/getCommonCodeList', data);
			this.codeList.telecom.unshift({ codeNm: '전체', codeSeq: '' });
			this.codeList.maker.unshift({ codeNm: '전체', codeSeq: '' });
			this.codeList.stockStatStrItems.unshift({ name: '전체', value: '' });
			this.codeList.inStockStatusItems.unshift({ name: '전체', value: '' });
			this.codeList.productFaultyYnItems.unshift({ name: '전체', value: '' });
			this.codeList.deviceExtrrStatusItems.unshift({ name: '전체', value: '' });
		},
		async getCodeList() {
			await this.getCommonCodeList();
			await this.getDeviceListFnc();

			// 보유처 용량 색상 초기 전체 INSERT
			this.codeList.stockNameList.unshift({ stockName: '전체', stockId: '' });
			this.codeList.capacityList.unshift({ capacity: '전체' });
			this.codeList.colorList.unshift({ colorName: '전체' });
		},
	},

	async created() {
		await this.commonFilterInit();
		await this.filterInit();
		await this.getCodeList();
	},
};
</script>
