<template>
	<div class="Cont1">
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
					/><label for="allTel">전체</label>
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
					<p>요금제명</p>
					<v-col>
						<v-text-field
							class="input_custom1"
							outlined
							v-model.trim="filterData.chargeName"
						></v-text-field>
					</v-col>
				</div>

				<!-- <div>
          <p>카테고리</p>
          <v-text-field
            class="input_custom1"
            outlined
            v-model.trim="filterData.category"
          ></v-text-field>
        </div> -->
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
import {commonCodeListFnc} from '../../../../common/common.js';

export default {
	components: {
		DatePicker,
	},
	data: () => ({}),
	computed: {
		codeList: {
			get() {
				return this.$store.state.ChargeListModule.codeList;
			},
			set(newValue) {
				this.$store.state.ChargeListModule.codeList = newValue;
			},
		},
		dateResetData: {
			get() {
				return this.$store.state.ChargeListModule.dateResetData;
			},
			set(newValue) {
				this.$store.state.ChargeListModule.dateResetData = newValue;
			},
		},
		filterData: {
			get() {
				return this.$store.state.ChargeListModule.filterData;
			},
			set(newValue) {
				this.$store.state.ChargeListModule.filterData = newValue;
			},
		},
		getListData: {
			get() {
				return this.$store.state.ChargeListModule.getListData;
			},
			set(newValue) {
				this.$store.state.ChargeListModule.getListData = newValue;
			},
		},
		pagingData() {
			return this.$store.state.ChargeListModule.pagingData;
		},
		roleVal() {
			return this.$store.state.role;
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
			this.$store.commit('ChargeListModule/filterInit');
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
		async commonCodeListFnc() {
			let data = {
				code: ['NETWORK', 'TELECOM'],
			};
			const commonCodeList = await commonCodeListFnc(data);
			this.codeList.telecom = commonCodeList.codeList.TELECOM;
			this.codeList.network = commonCodeList.codeList.NETWORK;
			this.codeList.network.unshift({ codeNm: '전체', codeSeq: 0 });
			this.filterData.telecom = ['5', '6', '7'];
			this.filterData.network = this.codeList.network[0].codeSeq;
		},
		async getList(data) {
			this.getListData = [];
			await this.$store.dispatch('ChargeListModule/getList', data);
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
	},
	async created() {
		await this.commonCodeListFnc();
		await this.filterInit();
		await this.getList();
	},
};
</script>

<style></style>
