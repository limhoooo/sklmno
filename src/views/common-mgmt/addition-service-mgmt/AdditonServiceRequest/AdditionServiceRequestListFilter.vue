<template>
	<div>
		<div class="new-mainCont posR disFx">
			<div class="new-filterCont posA">
				<button id="initBtn1" @click="filterInit" class="mainBlue1">
					필터 초기화
				</button>
				<label for="initBtn1"></label>
			</div>
			<div class="filterLeftCont" @keyup.enter='filterSubmit'>
				<div class="inStockLeftRowCont disFx h40 mb10">
					<div class="w100P">
						<v-select
							attach
							label="통신사"
							:items="codeList.telecom"
							item-text="codeNm"
							item-value="codeSeq"
							outlined
							name="division"
							v-model.trim="filterData.telecom"
						>
						</v-select>
					</div>
					<div class="w100P ml10">
						<v-select
							attach
							label="카테고리"
							:items="codeList.addSvcType"
							item-text="name"
							item-value="value"
							outlined
							v-model.trim="filterData.addSvcType"
						>
						</v-select>
					</div>
					<div class="w100P ml10">
						<v-text-field
							label="부가서비스명"
							outlined
							v-model.trim="filterData.addSvcName"
						></v-text-field>
					</div>
					<div class="w100P ml10">
						<v-select
							attach
							label="상태"
							:items="codeList.reqStatus"
							item-text="name"
							item-value="value"
							outlined
							name="division"
							v-model.trim="filterData.reqStatus"
						>
						</v-select>
					</div>
				</div>
				<div class="inStockLeftRowCont disFx h40">
					<p class="lh40 mr10">등록일</p>
					<date-picker
						:dateReset="dateResetData"
						@datePickerData="dateData"
					></date-picker>
				</div>
			</div>
			<div class="inStockButtonCont ml40 disFx flexDColC">
				<button
					class="backColorMint1 mainWhite w100P disIn borderRadi3Px h90"
					@click="filterSubmit"
				>
					검색
				</button>
			</div>
		</div>
	</div>
</template>

<script>
import { commonCodeListFnc } from '../../../../common/common';
import DatePicker from '../../../../common/../components/DatePicker.vue';

export default {
	components: {
		DatePicker,
	},
	data: () => ({}),
	computed: {
		dateResetData: {
			get() {
				return this.$store.state.AdditionServiceRequestModule.dateResetData;
			},
			set(newValue) {
				this.$store.state.AdditionServiceRequestModule.dateResetData = newValue;
			},
		},
		getRegReqData: {
			get() {
				return this.$store.state.AdditionServiceRequestModule.getRegReqData;
			},
			set(newValue) {
				this.$store.state.AdditionServiceRequestModule.getRegReqData = newValue;
			},
		},
		codeList: {
			get() {
				return this.$store.state.AdditionServiceRequestModule.codeList;
			},
			set(newValue) {
				this.$store.state.AdditionServiceRequestModule.codeList = newValue;
			},
		},
		filterData: {
			get() {
				return this.$store.state.AdditionServiceRequestModule.filterData;
			},
			set(newValue) {
				this.$store.state.AdditionServiceRequestModule.filterData = newValue;
			},
		},
		addSvcList() {
			return this.$store.state.CodeModule.codeList;
		},
		totalCnt() {
			return this.$store.state.AdditionServiceRequestModule.totalCnt;
		},
		pagingData() {
			return this.$store.state.AdditionServiceRequestModule.pagingData;
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
		checkAll() {
			// 체크박스 체크메소드
			if (this.filterData.telecom.length < 3) {
				this.filterData.telecom = [];
				this.filterData.telecom.push('5', '6', '7');
			} else {
				this.filterData.telecom = [];
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
			this.$store.commit('AdditionServiceRequestModule/filterInit');
			this.codeList.addSvcType = this.addSvcList.addSvcTypeList;
			this.codeList.addSvcType.unshift({ name: '전체', value: '' });
			this.filterData.addSvcType = this.codeList.addSvcType[0].value;
		},
		async getList(data) {
			this.getRegReqData = [];
			await this.$store.dispatch('AdditionServiceRequestModule/getList', data);
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
		async commonCodeListFnc() {
			let data = {
				code: ['TELECOM'],
			};
			const commonCodeList = await commonCodeListFnc(data);
			this.codeList.telecom = commonCodeList.codeList.TELECOM;
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
