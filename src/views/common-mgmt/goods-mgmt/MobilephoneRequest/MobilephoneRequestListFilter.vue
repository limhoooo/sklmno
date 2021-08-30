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
							label="상품명"
							v-model.trim="filterData.goodsName"
							outlined
						>
						</v-text-field>
					</div>
					<div class="w100P ml10">
						<v-text-field
							label="모델명"
							v-model.trim="filterData.modelName"
							outlined
						>
						</v-text-field>
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
import DatePicker from '../../../../components/DatePicker.vue';
import { commonCodeListFnc } from '../../../../common/common';

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
