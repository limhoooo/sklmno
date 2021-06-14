<template>
	<div>
		<div id="SearchBoxCont">
			<div>
				<div class="devideCont">
					<p>통신사</p>
					<input
						type="checkbox"
						id="allTel"
						value="0"
						v-model.trim="filterData.telecomAll"
						@click="checkAll"
					/>
					<label for="allTel">전체</label>
					<span v-for="item in codeList.telecom" :key="item.id">
						<input
							:id="item.codeNm"
							type="checkbox"
							:value="item.codeSeq"
							v-model.trim="filterData.telecom"
							@change="telecomFnc"
						/>
						<label :for="item.codeNm">{{ item.codeNm }}</label>
					</span>
				</div>

				<div class="checkCont">
					<p>카테고리</p>
					<v-select
						class="select_custom1"
						:items="codeList.addSvcType"
						item-text="name"
						item-value="value"
						outlined
						v-model.trim="filterData.addSvcType"
					>
					</v-select>
				</div>
				<!-- <div class="checkCont">
					<p>요금</p>
					<v-text-field
						class="input_custom1"
						outlined
						v-model.trim="filterData.addSvcCharge"
					>
					</v-text-field>
				</div> -->
			</div>
			<div>
				<div class="devideCont">
					<p>부가서비스명</p>
					<v-col>
						<v-text-field
							class="input_custom1"
							outlined
							v-model.trim="filterData.addSvcName"
						></v-text-field>
					</v-col>
				</div>
				<div class="devideCont">
					<p>사용 여부</p>
					<input
						type="radio"
						id="allVote"
						value="all"
						v-model.trim="filterData.useYn"
						name="vote"
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
import DatePicker from '../../../../components/DatePicker.vue';
import {commonCodeListFnc} from '../../../../common/common';

export default {
	components: {
		DatePicker,
	},
	data: () => ({}),
	computed: {
		roleVal() {
			let result;
			if (!this.$store.state.role) {
				result = true;
			} else {
				result = false;
			}
			return result;
		},
		codeList: {
			get() {
				return this.$store.state.AdditionServiceModule.codeList;
			},
			set(newValue) {
				this.$store.state.AdditionServiceModule.codeList = newValue;
			},
		},

		getListData: {
			get() {
				return this.$store.state.AdditionServiceModule.getListData;
			},
			set(newValue) {
				this.$store.state.AdditionServiceModule.getListData = newValue;
			},
		},
		filterData: {
			get() {
				return this.$store.state.AdditionServiceModule.filterData;
			},
			set(newValue) {
				this.$store.state.AdditionServiceModule.filterData = newValue;
			},
		},
		dateResetData: {
			get() {
				return this.$store.state.AdditionServiceModule.dateResetData;
			},
			set(newValue) {
				this.$store.state.AdditionServiceModule.dateResetData = newValue;
			},
		},
		addSvcList() {
			return this.$store.state.CodeModule.codeList;
		},
		pagingData() {
			return this.$store.state.AdditionServiceModule.pagingData;
		},
	},
	methods: {
		telecomFnc() {
			if (this.filterData.telecom.length === 3) {
				this.filterData.telecomAll = true;
			} else {
				this.filterData.telecomAll = false;
			}
		},

		dateData(date) {
			// 날짜 데이터 받은 데이터 폼데이터에 저장
			// 이벤트 버스로부터 받은 객체
			this.dateResetData = false;
			this.filterData.srhStartDate = date.start_dt;
			this.filterData.srhEndDate = date.end_dt;
		},
		filterInit() {
			this.$store.commit('AdditionServiceModule/filterInit');
			this.codeList.addSvcType = this.addSvcList.addSvcTypeList;
			this.codeList.addSvcType.unshift({ name: '전체', value: '' });
			this.filterData.addSvcType = this.codeList.addSvcType[0].value;
		},
		checkAll() {
			// 체크박스 체크메소드
			if (this.filterData.telecom.length < 3) {
				this.filterData.telecom = [];
				this.filterData.telecom.push('5', '6', '7');
			} else {
				this.filterData.telecom = [];
			}
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

			if (
				this.filterData.telecom.length === 3 ||
				this.filterData.telecom.length === 0
			) {
				this.filterData.telecom = 0;
			}
			await this.getList(this.filterData);
			if (this.filterData.telecom === 0) {
				this.filterData.telecomAll = true;
				this.filterData.telecom = ['5', '6', '7'];
			}
		},
		async getList(data) {
			this.getListData = [];
			await this.$store.dispatch('AdditionServiceModule/getList', data);
		},
		async commonCodeListFnc() {
			let data = {
				initData: ['storeList'],
				code: ['TELECOM'],
			};
			const commonCodeList = await commonCodeListFnc(data);
			this.storeSelectList = commonCodeList.storeList;
			this.codeList.telecom = commonCodeList.codeList.TELECOM;
		},
	},
	async created() {
		await this.commonCodeListFnc();
		await this.getList();
		await this.filterInit();
		// await this.checkAll();
	},
};
</script>

<style></style>
