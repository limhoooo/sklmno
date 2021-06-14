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
				<div class="datePickerCustom ml10P">
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
									v-bind="attrs"
									v-on="on"
									v-model.trim="filterData.inStockRegiDate"
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
				<div class="datePickerCustom ml10P">
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
									v-model.trim="filterData.openingDate"
									v-bind="attrs"
									v-on="on"
									class="datePickerInput input_custom1"
									label="개통일"
								></v-text-field>
							</template>
							<v-date-picker
								@input="menu2 = false"
								v-model.trim="filterData.openingDate"
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
						:items="codeList.deviceMoveStockStatStrItems"
						item-text="name"
						item-value="value"
					></v-select>
				</div>
				<div class="selectCustom" style="width: 225px">
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
			</div>
			<div class="contRow firstRow">
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
				<div class="selectCustom" style="width: 100px">
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
				<div class="selectCustom" style="width: 130px">
					<v-select
						v-model.trim="filterData.openingStatus"
						:items="codeList.openingStatus"
						label="철회상태"
						outlined
						item-text="name"
						item-value="value"
					></v-select>
				</div>
				<div class="selectCustom" style="width: 180px !important">
					<v-text-field
						label="고객명"
						v-model.trim="filterData.cusName"
						outlined
					></v-text-field>
				</div>
				<div class="selectCustom" style="width: 180px !important">
					<v-text-field
						label="전화번호"
						v-model.trim="filterData.cusPhone"
						outlined
					></v-text-field>
				</div>
				<div class="selectCustom" style="width: 180px !important">
					<v-text-field
						label="일련번호"
						v-model.trim="filterData.barcode"
						outlined
					></v-text-field>
				</div>
			</div>
		</div>
		<div class="searchBoxCont">
			<div @click="filterSubmit" class="searchBox">검색</div>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import filterCodeListMixin from '../../../../common/filterCodeListMixin';
import { filterData } from '../../../../store/interface/warehouse-mgmt/interface';

interface dataType {
	menu1: boolean;
	menu2: boolean;
}
export default Vue.extend({
	name: 'OpenStoreDeviceStatusFilter',
	data: (): dataType => ({
		menu1: false,
		menu2: false,
	}),
	mixins: [filterCodeListMixin],

	computed: {
		codeList(): any {
			return this.$store.state.CodeModule.codeList;
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
		async filterSubmit() {
			const data: filterData = this.filterData;
			data.pageNo = 1;
			await this.$store.dispatch('OpenStoreDeviceStatusModule/getList', data);
		},
		async getStockListFnc() {
			// get 보유처
			if (this.filterData.stockId) {
				this.filterData.stockId = '';
			}
			const data = this.filterData.telecom;
			await this.$store.dispatch('CodeModule/getStockListFnc', data);
			// @ts-ignore
			await this.getDeviceListFnc();
			this.codeList.stockNameList.unshift({ stockName: '전체', stockId: '' });
		},
		filterInit() {
			this.$store.commit('OpenStoreDeviceStatusModule/filterInit');
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
			this.codeList.deviceMoveStockStatStrItems.unshift({
				name: '전체',
				value: '',
			});
			this.codeList.openingStatus.unshift({ name: '전체', value: '' });
		},

		async getCodeList() {
			await this.getCommonCodeList();
			// @ts-ignore
			await this.getDeviceListFnc();

			// 보유처 용량 색상 초기 전체 INSERT
			this.codeList.stockNameList.unshift({ stockName: '전체', stockId: '' });
			this.codeList.capacityList.unshift({ capacity: '전체' });
			this.codeList.colorList.unshift({ colorName: '전체' });
		},
	},
	async created() {
		// @ts-ignore
		await this.commonFilterInit();
		await this.filterInit();
		await this.getCodeList();
	},
});
</script>
