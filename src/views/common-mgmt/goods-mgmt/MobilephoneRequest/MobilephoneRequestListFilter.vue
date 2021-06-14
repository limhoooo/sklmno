<template>
	<div class="Cont1">
		<div id="SearchBoxCont">
			<div>
				<div class="devideCont">
					<p>상품명</p>
					<v-col>
						<v-text-field
							class="input_custom1"
							v-model.trim="filterData.goodsName"
							outlined
						>
						</v-text-field>
					</v-col>
				</div>
				<div class="checkCont devideCont">
					<p>모델명</p>
					<v-col>
						<v-text-field
							class="input_custom1"
							v-model.trim="filterData.modelName"
							outlined
						>
						</v-text-field>
					</v-col>
				</div>
			</div>
			<div>
				<div class="devideCont">
					<p>제조사</p>
					<v-select
						class="select_custom1"
						:items="codeList.maker"
						item-text="codeNm"
						item-value="codeSeq"
						outlined
						v-model.trim="filterData.maker"
						name="division"
					>
					</v-select>
				</div>
				<div>
					<p>통신망</p>
					<v-select
						class="select_custom1"
						:items="codeList.network"
						item-text="codeNm"
						item-value="codeSeq"
						outlined
						name="division"
						v-model.trim="filterData.network"
					>
					</v-select>
				</div>
			</div>
			<div>
				<div class="devideCont">
					<p>통신사</p>
					<v-select
						class="select_custom1"
						:items="codeList.telecom"
						item-text="codeNm"
						item-value="codeSeq"
						outlined
						name="division"
						v-model.trim="filterData.telecom"
					>
					</v-select>
				</div>
				<div>
					<p>상태</p>
					<input
						type="radio"
						value="0"
						v-model.trim="filterData.reqStatus"
						id="total"
						name="status"
					/><label for="total">전체</label>
					<input
						type="radio"
						value="1"
						v-model.trim="filterData.reqStatus"
						id="wait"
						name="status"
					/><label for="wait">대기</label>
					<input
						type="radio"
						value="6"
						v-model.trim="filterData.reqStatus"
						id="aprv"
						name="status"
					/><label for="aprv">승인</label>
					<input
						type="radio"
						value="9"
						v-model.trim="filterData.reqStatus"
						id="reject"
						name="status"
					/><label for="reject">반려</label>
				</div>
			</div>
			<div>
				<p>등록일</p>
				<date-picker
					:dateReset="dateResetData"
					@datePickerData="dateData"
				></date-picker>
			</div>
		</div>
		<div id="BtnCont">
			<v-btn @click="filterSubmit">검색</v-btn>
			<v-btn @click="filterInit">초기화</v-btn>
		</div>
	</div>
</template>

<script>
import DatePicker from '../../../../components/DatePicker.vue';
import {commonCodeListFnc} from '../../../../common/common';

export default {
	components: {
		DatePicker,
	},

	computed: {
		role() {
			return this.$store.state.role;
		},
		dateResetData: {
			get() {
				return this.$store.state.MobilephoneRequestModule.dateResetData;
			},
			set(newValue) {
				this.$store.state.MobilephoneRequestModule.dateResetData = newValue;
			},
		},
		codeList: {
			get() {
				return this.$store.state.MobilephoneRequestModule.codeList;
			},
			set(newValue) {
				this.$store.state.MobilephoneRequestModule.codeList = newValue;
			},
		},
		filterData: {
			get() {
				return this.$store.state.MobilephoneRequestModule.filterData;
			},
			set(newValue) {
				this.$store.state.MobilephoneRequestModule.filterData = newValue;
			},
		},
		pagingData() {
			return this.$store.state.MobilephoneRequestModule.pagingData;
		},
	},
	methods: {
		dateData(date) {
			console.log(date);
			this.dateResetData = false;
			this.filterData.srhStartDate = date.start_dt;
			this.filterData.srhEndDate = date.end_dt;
		},
		filterSubmit() {
      if (this.filterData.srhStartDate && !this.filterData.srhEndDate) {
        alert('완료날짜를 입력해주세요.');
        return;
      }
      if (!this.filterData.srhStartDate && this.filterData.srhEndDate) {
        alert('등록날짜를 입력해주세요.');
        return;
      }
			this.filterData.perPageCnt = this.pagingData.perPageCnt;
			this.filterData.pageNo = 1;
			this.getList(this.filterData);
		},
		filterInit() {
			this.$store.commit('MobilephoneRequestModule/filterInit');
		},
		async commonCodeListFnc() {
			let data = {
				initData: ['storeList'],
				code: ['NETWORK', 'TELECOM', 'MAKER'],
			};
			const commonCodeList = await commonCodeListFnc(data);

			this.storeSelectList = commonCodeList.storeList;
			this.codeList.telecom = commonCodeList.codeList.TELECOM;
			this.codeList.maker = commonCodeList.codeList.MAKER;
			this.codeList.network = commonCodeList.codeList.NETWORK;
			this.codeList.telecom.unshift({ codeNm: '전체', codeSeq: '0' });
			this.codeList.maker.unshift({ codeNm: '전체', codeSeq: '0' });
			this.codeList.network.unshift({ codeNm: '전체', codeSeq: '0' });
			this.filterData.telecom = this.codeList.telecom[0].codeSeq;
			this.filterData.maker = this.codeList.maker[0].codeSeq;
			this.filterData.network = this.codeList.network[0].codeSeq;
		},
		async getList(data) {
			this.getRegReqList = [];
			await this.$store.dispatch('MobilephoneRequestModule/getList', data);
		},
	},
	async created() {
		await this.commonCodeListFnc();
		await this.getList();
	},
};
</script>

<style></style>
