<template>
	<div class="Cont1">
		<div id="SearchBoxCont">
			<div>
				<div class="devideCont">
					<p>상품명</p>
					<v-text-field
						class="input_custom1"
						outlined
						v-model.trim="filterData.goodsName"
					></v-text-field>
				</div>
				<div class="checkCont devideCont">
					<p>모델명</p>
					<v-text-field
						class="input_custom1"
						outlined
						v-model.trim="filterData.modelName"
					></v-text-field>
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
					<p>사용여부</p>
					<input
						type="radio"
						id="allVote"
						name="vote"
						value="all"
						v-model.trim="filterData.useYn"
						checked
					/><label for="allVote">전체</label>
					<input
						type="radio"
						value="Y"
						id="voteYes"
						name="vote"
						v-model.trim="filterData.useYn"
					/><label for="voteYes">Y</label>
					<input
						type="radio"
						value="N"
						id="voteNo"
						name="vote"
						v-model.trim="filterData.useYn"
					/><label for="voteNo">N</label>
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
import DatePicker from '../../../../components/DatePicker';
import {commonCodeListFnc} from '../../../../common/common';

export default {
	components: {
		DatePicker,
	},

	data: () => ({
		storeSelectList: [],
	}),

	computed: {
		dateResetData: {
			get() {
				return this.$store.state.MobilephoneListModule.dateResetData;
			},
			set(newValue) {
				this.$store.state.MobilephoneListModule.dateResetData = newValue;
			},
		},
		codeList: {
			get() {
				return this.$store.state.MobilephoneListModule.codeList;
			},
			set(newValue) {
				this.$store.state.MobilephoneListModule.codeList = newValue;
			},
		},
		filterData: {
			get() {
				return this.$store.state.MobilephoneListModule.filterData;
			},
			set(newValue) {
				this.$store.state.MobilephoneListModule.filterData = newValue;
			},
		},
		getListData: {
			get() {
				return this.$store.state.MobilephoneListModule.getListData;
			},
			set(newValue) {
				this.$store.state.MobilephoneListModule.getListData = newValue;
			},
		},
		pagingData() {
			return this.$store.state.MobilephoneListModule.pagingData;
		},
		roleVal() {
			return this.$store.state.role;
		},
	},

	methods: {
		dateData(date) {
			// 이벤트 버스로부터 받은 객체
			this.dateResetData = false;
			this.filterData.srhStartDate = date.start_dt;
			this.filterData.srhEndDate = date.end_dt;
		},
		filterInit() {
			this.$store.commit('MobilephoneListModule/filterInit');
		},
		async getList(data) {
			this.getListData = [];
			await this.$store.dispatch('MobilephoneListModule/getList', data);
		},
		async filterSubmit() {
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
			await this.getList(this.filterData);
		},
		async commonCodeListFnc() {
			let data;
			if (this.roleVal) {
				data = {
					initData: ['storeList'],
					code: ['TELECOM', 'MAKER', 'NETWORK'],
				};
			} else {
				data = {
					code: ['TELECOM', 'MAKER', 'NETWORK'],
				};
			}
			const commonCodeList = await commonCodeListFnc(data);
			if (this.roleVal) {
				this.storeSelectList = commonCodeList.storeList;
			}
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
	},
	async created() {
		await this.commonCodeListFnc();
		await this.getList();
		await this.filterInit();
	},
};
</script>

<style scoped></style>
