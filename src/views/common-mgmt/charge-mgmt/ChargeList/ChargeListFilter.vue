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
							outlined
							:items="codeList.useYn"
							item-text="name"
							item-value="value"
							label="사용여부"
							v-model.trim="filterData.useYn"
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
import DatePicker from '../../../../components/DatePicker';
import { commonCodeListFnc } from '../../../../common/common.js';

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
