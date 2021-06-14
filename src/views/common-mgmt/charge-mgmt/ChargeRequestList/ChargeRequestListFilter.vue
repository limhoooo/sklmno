<template>
	<div class="Cont1" style="display: block">
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
					<v-text-field
						class="input_custom1"
						outlined
						v-model.trim="filterData.chargeName"
					></v-text-field>
				</div>
				<div class="devideCont">
					<p>상태</p>
					<input
						type="radio"
						id="statusAll"
						value="0"
						v-model.trim="filterData.reqStatus"
						name="stat"
						checked
					/>
					<label for="statusAll">전체</label>
					<input
						type="radio"
						value="1"
						id="statusWait"
						name="stat"
						v-model.trim="filterData.reqStatus"
					/><label for="statusWait">대기</label>
					<input
						type="radio"
						value="6"
						id="statusAprv"
						name="stat"
						v-model.trim="filterData.reqStatus"
					/><label for="statusAprv">승인</label>
					<input
						type="radio"
						value="9"
						id="statusReject"
						name="stat"
						v-model.trim="filterData.reqStatus"
					/><label for="statusReject">반려</label>
				</div>
				<!-- <div>
          <p>카테고리</p>
          <v-select
            class="select_custom1"
            :items="categoryData"
            item-text="name"
            item-value="value"
            outlined
            multiple
            name="division"
            v-model.trim="filterData.category"
          >
          </v-select>
        </div> -->
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
		dateResetData: {
			get() {
				return this.$store.state.ChargeRequestModule.dateResetData;
			},
			set(newValue) {
				this.$store.state.ChargeRequestModule.dateResetData = newValue;
			},
		},
		codeList: {
			get() {
				return this.$store.state.ChargeRequestModule.codeList;
			},
			set(newValue) {
				this.$store.state.ChargeRequestModule.codeList = newValue;
			},
		},
		getRegReqListData: {
			get() {
				return this.$store.state.ChargeRequestModule.getRegReqListData;
			},
			set(newValue) {
				this.$store.state.ChargeRequestModule.getRegReqListData = newValue;
			},
		},
		filterData: {
			get() {
				return this.$store.state.ChargeRequestModule.filterData;
			},
			set(newValue) {
				this.$store.state.ChargeRequestModule.filterData = newValue;
			},
		},
		pagingData() {
			return this.$store.state.ChargeRequestModule.pagingData;
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
		checkAll() {
			// 체크박스 체크메소드
			if (this.filterData.telecom.length < 3) {
				this.filterData.telecom = [];
				this.filterData.telecom.push('5', '6', '7');
			} else {
				this.filterData.telecom = [];
			}
		},
		filterInit() {
			this.$store.commit('ChargeRequestModule/filterInit');
		},
		async commonCodeListFnc() {
			let data = {
				code: ['NETWORK', 'TELECOM'],
			};
			const commonCodeList = await commonCodeListFnc(data);
			this.codeList.telecom = commonCodeList.codeList.TELECOM;
			this.codeList.network = commonCodeList.codeList.NETWORK;
			this.codeList.network.unshift({ codeNm: '전체', codeSeq: '0' });
			this.filterData.network = this.codeList.network[0].codeSeq;
			this.filterData.telecom = ['5', '6', '7'];
		},
		async getList(data) {
			this.getRegReqListData = [];
			await this.$store.dispatch('ChargeRequestModule/getList', data);
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
		await this.getList();
		await this.filterInit();
	},
};
</script>

<style></style>
