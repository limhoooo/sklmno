<template>
	<div class="searchingCont SellStatus StockStatusCont">
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
						item-text="codeNm"
						item-value="codeSeq"
						label="개통처"
					>
					</v-select>
				</div>
				<div class="selectCustom">
					<v-select
						label="영업점"
						outlined
						item-text="stockName"
						item-value="stockId"
					></v-select>
				</div>
				<div class="selectCustom">
					<v-select
						label="개통상태"
						outlined
						:items="codeList.openingStatus"
						item-text="name"
						item-value="value"
					></v-select>
				</div>
				<div class="selectCustom">
					<v-select
						label="업무진행상태"
						outlined
						item-text="codeNm"
						item-value="codeSeq"
					></v-select>
				</div>
				<div class="selectCustom">
					<v-select
						label="배송상태"
						outlined
						item-text="modelName"
						item-value="goodsId"
					></v-select>
				</div>
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
				<div class="selectCustom">
					<v-select
						outlined
						item-text="codeNm"
						item-value="codeSeq"
						label="가입유형"
					>
					</v-select>
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
					>
					</v-select>
				</div>
			</div>
			<div class="contRow contRowStyle2">
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
						label="기간검색"
						outlined
						item-text="name"
						item-value="value"
					></v-select>
				</div>
				<div class="datePickerCustom ml-0 ht48 dateContCustom">
					<div class="dateCustom dateStyle1 ht48" style="display: inline-block">
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
									class="datePickerInput input_custom1"
								></v-text-field>
							</template>
							<v-date-picker
								@input="menu1 = false"
								locale="ko-KR"
							></v-date-picker>
						</v-menu>
					</div>
				</div>
				<div class="datePickerCustom ml-0 ht48 dateContCustom">
					<div class="dateCustom dateStyle1 ht48" style="display: inline-block">
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
									v-bind="attrs"
									v-on="on"
									class="datePickerInput input_custom1"
								></v-text-field>
							</template>
							<v-date-picker
								@input="menu2 = false"
								locale="ko-KR"
							></v-date-picker>
						</v-menu>
					</div>
				</div>
				<div class="selectCustom dateRadioStyle1">
					<input type="radio" id="radio1" name="date" /><label
						for="radio1"
						class="cur_p"
						>어제</label
					>
					<input type="radio" id="radio2" name="date" /><label
						for="radio2"
						class="cur_p"
						>오늘</label
					>
					<input type="radio" id="radio3" name="date" /><label
						for="radio3"
						class="cur_p"
						>전월</label
					>
					<input type="radio" id="radio4" name="date" /><label
						for="radio4"
						class="cur_p"
						>당월</label
					>
				</div>
				<div class="selectCustom">
					<v-select
						label="검색기준"
						outlined
						item-text="name"
						item-value="value"
					></v-select>
				</div>
				<div class="selectCustom searchingBarStyle ml-0">
					<input type="text" placeholder="검색어 입력" />
				</div>
			</div>
		</div>
		<div class="searchBoxCont">
			<div class="searchBox" @click="filterSubmit">검색</div>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import {filterData} from '../../../store/interface/supply-chain-mgmt/sell-status/sellStatusInterface';
import filterCodeListMixin from '../../../common/filterCodeListMixin';

let menu1: boolean = false;
let menu2: boolean = false;
export default Vue.extend({
	name: 'SellStatusFilter',
	data: () => ({
		menu1: menu1,
		menu2: menu2,
	}),
	mixins: [filterCodeListMixin],
	computed: {
		codeList(): any {
			return this.$store.state.CodeModule.codeList;
		},
		filterData: {
			get(): filterData {
				return this.$store.state.SellStatusModule.filterData;
			},
			set(newValue: filterData) {
				this.$store.state.SellStatusModule.filterData = newValue;
			},
		},
	},
	methods: {
		async getCommonCodeList() {
			let data = {
				initData: ['provList'],
				code: ['TELECOM'],
			};
			await this.$store.dispatch('CodeModule/getCommonCodeList', data);
			this.codeList.telecom.unshift({ codeNm: '전체', codeSeq: '' });
			this.codeList.maker.unshift({ codeNm: '전체', codeSeq: '' });
		},
		filterInit() {
			this.$store.commit('SellStatusModule/filterInit');
		},
		async getCodeList() {
			await this.getCommonCodeList();
			// @ts-ignore
			await this.getDeviceListFnc();

			// 보유처 용량 색상 초기 전체 INSERT
			this.codeList.capacityList.unshift({ capacity: '전체' });
			this.codeList.colorList.unshift({ colorName: '전체' });
		},
		async filterSubmit() {
			const data: filterData = this.filterData;
			data.pageNo = 1;
			await this.$store.dispatch('SellStatusModule/getList', data);
		},
	},
	async created() {
		await this.filterInit();
		// @ts-ignore
		await this.commonFilterInit();
		await this.getCodeList();
	},
});
</script>

<style></style>
