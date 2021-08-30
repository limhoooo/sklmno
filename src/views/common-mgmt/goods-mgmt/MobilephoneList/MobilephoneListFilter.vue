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
						<v-text-field
							outlined
							placeholder="상품명"
							v-model.trim="filterData.goodsName"
						></v-text-field>
					</div>
					<div class="w100P ml10">
						<v-text-field
							outlined
							placeholder="모델명"
							v-model.trim="filterData.modelName"
						></v-text-field>
					</div>
					<div class="w100P ml10">
						<v-select
							attach
							label="제조사"
							:items="codeList.maker"
							item-text="codeNm"
							item-value="codeSeq"
							outlined
							v-model.trim="filterData.maker"
							name="division"
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
import { commonCodeListFnc } from '../../../../common/common';

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
			return this.$store.state.role === 'A';
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
