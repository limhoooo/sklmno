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
			<div class="contRow">
				<div class="selectCustom">
					<v-select
						v-model.trim="filterData.telecom"
						outlined
						:items="codeList.telecom"
						item-text="codeNm"
						item-value="codeSeq"
						label="통신사"
						@change="getStockListFnc"
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
									v-model.trim="filterData.moveRegiDate"
									v-bind="attrs"
									v-on="on"
									label="출고일"
									class="datePickerInput input_custom1"
								></v-text-field>
							</template>
							<v-date-picker
								v-model.trim="filterData.moveRegiDate"
								@input="menu2 = false"
								locale="ko-KR"
							></v-date-picker>
						</v-menu>
					</div>
				</div>
				<div class="selectCustom">
					<v-select
						label="보유처"
						v-model.trim="filterData.stockId"
						outlined
						:items="codeList.stockNameList"
						item-text="stockName"
						item-value="stockId"
					></v-select>
				</div>
				<div class="selectCustom">
					<v-select
						label="재고구분"
						v-model.trim="filterData.stockType"
						outlined
						:items="codeList.moveStockStatStrItems"
						item-text="name"
						item-value="value"
					></v-select>
				</div>
				<div class="selectCustom">
					<v-select
						label="제조사"
						v-model.trim="filterData.maker"
						outlined
						:items="codeList.maker"
						item-text="codeNm"
						item-value="codeSeq"
						@change="getDeviceListFnc()"
					></v-select>
				</div>
				<div class="selectCustom">
					<v-select
						label="기기명"
						v-model.trim="filterData.goodsId"
						outlined
						:items="codeList.deviceList"
						item-text="modelName"
						item-value="goodsId"
						@change="getCapacityListFnc()"
					></v-select>
				</div>
			</div>
			<div class="contRow itemSevenCustom">
				<div class="selectCustom">
					<v-select
						label="용량"
						v-model.trim="filterData.capacity"
						outlined
						:items="codeList.capacityList"
						item-text="capacity"
						@change="getDeviceColorList()"
					></v-select>
				</div>
				<div class="selectCustom">
					<v-select
						label="색상"
						v-model.trim="filterData.colorName"
						outlined
						:items="codeList.colorList"
						item-text="colorName"
					></v-select>
				</div>
				<div class="selectCustom">
					<v-select
						label="입고상태"
						v-model.trim="filterData.inStockStatus"
						outlined
						:items="codeList.inStockStatusItems"
						item-text="name"
						item-value="value"
					></v-select>
				</div>
				<div class="selectCustom">
					<v-select
						label="제품상태"
						v-model.trim="filterData.productFaultyYn"
						outlined
						:items="codeList.productFaultyYnItems"
						item-text="name"
						item-value="value"
					></v-select>
				</div>
				<div class="selectCustom">
					<v-select
						label="외장상태"
						v-model.trim="filterData.extrrStatus"
						outlined
						:items="codeList.deviceExtrrStatusItems"
						item-text="name"
						item-value="value"
					></v-select>
				</div>
				<div class="selectCustom">
					<v-select
						label="배송방법"
						v-model.trim="filterData.deliveryType"
						outlined
						:items="codeList.deliveryType"
						item-text="name"
						item-value="value"
					></v-select>
				</div>
				<div class="selectCustom">
					<v-select
						label="배송상태"
						v-model.trim="filterData.deliveryStatus"
						outlined
						:items="codeList.deliveryStatus"
						item-text="name"
						item-value="value"
					></v-select>
				</div>
				<div class="selectCustom" style="width: 235px !important">
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
</template>

<script>
import filterCodeListMixin from '../../../../common/filterCodeListMixin';

export default {
	components: {},
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
				return this.$store.state.MoveStatusModule.filterData;
			},
			set(newValue) {
				this.$store.state.MoveStatusModule.filterData = newValue;
			},
		},
	},
	mixins: [filterCodeListMixin],

	methods: {
		async filterSubmit() {
			const data = this.$store.state.MoveStatusModule.filterData;
			data.pageNo = 1;
			await this.$store.dispatch('MoveStatusModule/getList', data);
		},
		filterInit() {
			this.$store.commit('MoveStatusModule/filterInit');
			this.getCodeList();
			this.getStockListFnc();
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
			this.codeList.telecom.unshift({ codeNm: '전체', codeSeq: '' });
			this.codeList.maker.unshift({ codeNm: '전체', codeSeq: '' });
			this.codeList.moveStockStatStrItems.unshift({ name: '전체', value: '' });
			this.codeList.inStockStatusItems.unshift({ name: '전체', value: '' });
			this.codeList.productFaultyYnItems.unshift({ name: '전체', value: '' });
			this.codeList.deviceExtrrStatusItems.unshift({ name: '전체', value: '' });
			this.codeList.deliveryType.unshift({ name: '전체', value: '' });
			this.codeList.deliveryStatus.unshift({ name: '전체', value: '' });
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
