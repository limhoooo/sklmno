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
					<div class="selectCustom">
						<v-select
							label="보유처"
							:items="codeList.stockNameList"
							v-model="filterData.prevStockId"
							outlined
							item-text="stockName"
							item-value="stockId"
						></v-select>
					</div>
					<div class="selectCustom">
						<v-select
							outlined
							:items="codeList.provList"
							v-model.trim="filterData.provId"
							item-text="provName"
							item-value="provId"
							label="공급처명"
						></v-select>
					</div>
					<div class="selectCustom">
						<v-select
							label="재고구분"
							:items="stockStatStrItems"
							v-model.trim="filterData.statusStr"
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
				<div class="contRow">
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
							label="배송상태"
							:items="codeList.deliveryStatus"
							v-model.trim="filterData.deliveryStatus"
							outlined
							item-text="name"
							item-value="value"
						></v-select>
					</div>
					<div class="selectCustom">
						<v-select
							label="판정상태"
							:items="codeList.judgementStatus"
							v-model.trim="filterData.judgeStatus"
							outlined
							item-text="name"
							item-value="value"
						></v-select>
					</div>
					<div class="selectCustom" style="width: 200px">
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
		stockStatStrItems: [{ name: '전체', value: '' }],
	}),
	computed: {
		codeList() {
			return this.$store.state.CodeModule.codeList;
		},
		filterData: {
			get() {
				return this.$store.state.FaultyDeviceStatusModule.filterData;
			},
			set(newValue) {
				this.$store.state.FaultyDeviceStatusModule.filterData = newValue;
			},
		},
		perPageCnt: {
			get() {
				return this.$store.state.FaultyDeviceStatusModule.filterData.perPageCnt;
			},
			set(newValue) {
				this.$store.state.FaultyDeviceStatusModule.filterData.perPageCnt = newValue;
			},
		},
	},
	methods: {
		async filterSubmit() {
			const data = this.$store.state.FaultyDeviceStatusModule.filterData;
			data.pageNo = 1;
			await this.$store.dispatch('FaultyDeviceStatusModule/getList', data);
		},
		filterInit() {
			this.$store.commit('FaultyDeviceStatusModule/filterInit');
			this.getCodeList();
			this.getStockListFnc();
		},
		async getCommonCodeList() {
			let data = {
				initData: ['provList'],
				code: ['TELECOM', 'MAKER'],
			};
			await this.$store.dispatch('CodeModule/getCommonCodeList', data);
			this.codeList.provList.unshift({ provName: '전체', provId: '' });
			this.codeList.telecom.unshift({ codeNm: '전체', codeSeq: '' });
			this.codeList.maker.unshift({ codeNm: '전체', codeSeq: '' });
			this.codeList.deliveryStatus.unshift({ name: '전체', value: '' });
			this.codeList.judgementStatus.unshift({ name: '전체', value: '' });
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
<style scoped>
.selectCustom {
	width: 15%;
}
.datePickerCustom .v-input {
	width: 200px;
}
</style>
