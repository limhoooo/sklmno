<template>
	<div>
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
								label="통신망"
								:items="codeList.network"
								item-text="codeNm"
								item-value="codeSeq"
								outlined
								name="division"
								v-model.trim="filterData.network"
							>
							</v-select>
						</div>
						<div class="w100P ml10">
							<v-text-field
								label="요금제"
								outlined
								v-model.trim="filterData.chargeName"
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
	</div>
</template>

<script>
import DatePicker from '../../../../components/DatePicker.vue';
import { commonCodeListFnc } from '../../../../common/common';

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
			return this.$store.state.role === 'A';
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
