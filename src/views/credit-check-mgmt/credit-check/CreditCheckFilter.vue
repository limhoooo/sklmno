<template>
	<div
		class="creditCheck new-mainCont posR borderRadi3Px borderContColor1 pad0"
	>
		<div class="disFx" style="margin: 20px 40px">
			<div class="new-filterCont posA">
				<button id="initBtn1" class="mainBlue1" @click="filterInit">
					필터 초기화
				</button>
				<label for="initBtn1"></label>
			</div>
			<div class="filterLeftCont">
				<div class="inStockLeftRowCont disFx h40 mb10">
					<p class="lh40">등록일</p>
					<date-picker
						:dateReset="dateResetData"
						@datePickerData="dateData"
						class="ml10"
					></date-picker>
				</div>
				<div class="inStockLeftRowCont disFx h40">
					<div class="w140">
						<v-select
							label="통신사"
							multiple
							outlined
							item-text="codeNm"
							item-value="codeSeq"
							:items="codeList.telecomItems"
							return-object
							v-model.trim="selectedData.telecom"
						>
							<template v-slot:selection="{ item, index }">
								<span
									v-if="index === 0"
									style="font-size: 13px; margin-right: 2px"
									>{{ item.codeNm }}</span
								>
								<span v-if="index === 1" class="grey--text caption">
									(+{{ selectedData.telecom.length - 1 }})</span
								>
							</template>
							></v-select
						>
					</div>
					<div class="w160 ml10">
						<v-select
							label="개통점"
							multiple
							outlined
							item-text="openStoreName"
							item-value="openStoreId"
							:items="codeList.openStoreItems"
							return-object
							v-model.trim="selectedData.openingStore"
						>
							<template v-slot:selection="{ item, index }">
								<span
									v-if="index === 0"
									style="font-size: 13px; margin-right: 2px"
									>{{ item.openStoreName }}</span
								>
								<span v-if="index === 1" class="grey--text caption">
									(+{{ selectedData.openingStore.length - 1 }})</span
								>
							</template>
							></v-select
						>
					</div>
					<div class="w200 ml10">
						<v-select
							label="영업점"
							multiple
							outlined
							:items="codeList.saleStoreItems"
							item-text="storeName"
							item-value="storeId"
							return-object
							v-model.trim="selectedData.saleStore"
						>
							<template v-slot:selection="{ item, index }">
								<span
									v-if="index === 0"
									style="font-size: 13px; margin-right: 2px"
									>{{ item.storeName }}</span
								>
								<span v-if="index === 1" class="grey--text caption">
									(+{{ selectedData.saleStore.length - 1 }})</span
								>
							</template>
						</v-select>
					</div>
					<div class="w160 ml10">
						<v-select
							label="가입유형"
							multiple
							outlined
							:items="codeList.joinTypeItems"
							item-text="name"
							item-value="value"
							return-object
							v-model.trim="selectedData.joinType"
						>
							<template v-slot:selection="{ item, index }">
								<span
									v-if="index === 0"
									style="font-size: 13px; margin-right: 2px"
									>{{ item.name }}</span
								>
								<span v-if="index === 1" class="grey--text caption">
									(+{{ selectedData.joinType.length - 1 }})</span
								>
							</template>
						</v-select>
					</div>
					<div class="w160 ml10">
						<v-select
							label="고객유형"
							multiple
							outlined
							:items="codeList.customerTypeItems"
							item-text="name"
							item-value="value"
							return-object
							v-model.trim="selectedData.customerType"
						>
							<template v-slot:selection="{ item, index }">
								<span
									v-if="index === 0"
									style="font-size: 13px; margin-right: 2px"
									>{{ item.name }}</span
								>
								<span v-if="index === 1" class="grey--text caption">
									(+{{ selectedData.customerType.length - 1 }})</span
								>
							</template>
						</v-select>
					</div>
					<div class="w120 ml10">
						<v-select
							label="진행상황"
							multiple
							outlined
							:items="codeList.procStatusItems"
							item-text="name"
							item-value="value"
							return-object
							v-model.trim="selectedData.creditProcStatus"
						>
							<template v-slot:selection="{ item, index }">
								<span
									v-if="index === 0"
									style="font-size: 13px; margin-right: 2px"
									>{{ item.name }}</span
								>
								<span v-if="index === 1" class="grey--text caption">
									(+{{ selectedData.creditProcStatus.length - 1 }})</span
								>
							</template>
						</v-select>
					</div>
					<div class="w140 ml10">
						<v-select
							label="검색기준"
							outlined
							item-text="name"
							item-value="value"
							:items="codeList.searchTypeItems"
							v-model.trim="filterData.srhType"
						></v-select>
					</div>
					<input
						type="text"
						class="w160 lh40 borderRadi3Px borderContColor3 padW10 ml10"
						v-model.trim="filterData.srhKeyword"
					/>
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
		<div
			class="tagCont1 font-size-12"
			style="border-top: 1px solid #eeeeee; padding-bottom: 2px"
		>
			<div class="tagArea1">
				<filter-tag
					:optionList="selectedData.telecom"
					tagText="codeNm"
				></filter-tag>
				<filter-tag
					:optionList="selectedData.openingStore"
					tagText="openStoreName"
				></filter-tag>
				<filter-tag
					:optionList="selectedData.saleStore"
					tagText="storeName"
				></filter-tag>
				<filter-tag :optionList="selectedData.joinType"></filter-tag>
				<filter-tag :optionList="selectedData.customerType"></filter-tag>
				<filter-tag :optionList="selectedData.creditProcStatus"></filter-tag>
			</div>
		</div>
	</div>
</template>

<script>
import DatePicker from '../../../components/DatePicker.vue';
import FilterTag from '../../../components/filter/filterTag.vue';

export default {
	name: 'CreditCheckFilter',
	data: () => ({}),
	watch: {
		selectedData: {
			deep: true,
			handler: function (newValue) {
				let telecom = newValue.telecom.map(item => item.codeSeq);
				let openingStore = newValue.openingStore.map(item => item.openStoreId);
				let saleStore = newValue.saleStore.map(item => item.storeId);
				let joinType = newValue.joinType.map(item => item.value);
				let customerType = newValue.customerType.map(item => item.value);
				let creditProcStatus = newValue.creditProcStatus.map(
					item => item.value,
				);
				this.filterData = {
					...this.filterData,
					telecom,
					openingStore,
					saleStore,
					joinType,
					customerType,
					creditProcStatus,
				};
			},
		},
	},
	components: {
		FilterTag,
		DatePicker,
	},
	computed: {
		storeVal() {
			return this.$store.state.sg;
		},
		filterData: {
			get() {
				return this.$store.state.CreditCheckModule.filterData;
			},
			set(newValue) {
				this.$store.state.CreditCheckModule.filterData = newValue;
			},
		},
		selectedData: {
			get() {
				return this.$store.state.CreditCheckModule.selectedData;
			},
			set(newValue) {
				this.$store.state.CreditCheckModule.selectedData = newValue;
			},
		},
		pagingData: {
			get() {
				return this.$store.state.CreditCheckModule.pagingData;
			},
			set(newValue) {
				this.$store.state.CreditCheckModule.pagingData = newValue;
			},
		},
		cardPagingData: {
			get() {
				return this.$store.state.CreditCheckModule.cardPagingData;
			},
			set(newValue) {
				this.$store.state.CreditCheckModule.cardPagingData = newValue;
			},
		},
		codeList: {
			get() {
				return this.$store.state.CreditCheckModule.codeList;
			},
			set(newValue) {
				this.$store.state.CreditCheckModule.codeList = newValue;
			},
		},
		countData() {
			return this.$store.state.CreditCheckModule.countData;
		},
		dateResetData: {
			get() {
				return this.$store.state.CreditCheckModule.dateResetData;
			},
			set(newValue) {
				this.$store.state.CreditCheckModule.dateResetData = newValue;
			},
		},
		selectedCard: {
			get() {
				return this.$store.state.CreditCheckModule.selectedCard;
			},
			set(newValue) {
				this.$store.state.CreditCheckModule.selectedCard = newValue;
			},
		},
		openingRequestDialog: {
			get() {
				return this.$store.state.CreditCheckModule.openingRequestDialog;
			},
			set(newValue) {
				this.$store.state.CreditCheckModule.openingRequestDialog = newValue;
			},
		},
	},
	methods: {
		addAllSelectFnc() {
			if (this.codeList.telecomItems[0].codeNm !== '전체') {
				this.codeList.telecomItems.unshift({ codeNm: '전체', codeSeq: '' });
			}
		},
		// delAllSelectFnc() {
		// 	if (this.codeList.telecomItems[0].codeNm === '전체') {
		// 		this.codeList.telecomItems.splice(0, 1);
		// 	}
		// },
		filterInit() {
			for (let data in this.selectedData) {
				this.selectedData[data] = [];
			}
			this.$store.commit('CreditCheckModule/filterInit');
		},
		async filterSubmit() {
			if (this.filterData.srhStartDate && !this.filterData.srhEndDate) {
				alert('종료일을 입력해주세요.');
				return;
			}
			if (!this.filterData.srhStartDate && this.filterData.srhEndDate) {
				alert('시작일을 입력해주세요.');
				return;
			}
			this.openingRequestDialog = false;
			let data = { ...this.filterData };
			data.pageNo = 1;
			data.perPageCnt = this.pagingData.perPageCnt;
			data.cusType = data.customerType;
			if (this.filterData.telecom.indexOf('') >= 0) {
				data.telecom = [5, 6, 7];
			}
			await this.getList(data);
			await this.getCreditInquireStatusCount(data);
			if (this.storeVal === 'StoreGrade_M') {
				await this.getListCardData(data);
				this.selectedCard = null;
				// 카드리스트 왼쪽으로 초기화
				document.getElementById('scrollBox').scrollLeft = 0;
			}
		},
		dateData(date) {
			this.filterData.srhStartDate = date.start_dt;
			this.filterData.srhEndDate = date.end_dt;
			this.dateResetData = false;
		},
		async getList(data) {
			await this.$store.dispatch(
				'CreditCheckModule/getCreditInquireList',
				data,
			);
		},
		async getListCardData(data) {
			let reqData = { ...data };
			reqData['creditProcStatus'] = 'REQ';
			await this.$store.dispatch(
				'CreditCheckModule/getCreditInquireCardList',
				reqData,
			);
		},
		getCreditInquireStatusCount(data) {
			this.$store.dispatch(
				'CreditCheckModule/getCreditInquireStatusCount',
				data,
			);
		},
		// 통신사 Enum
		commonCodeList() {
			this.$store.dispatch('CreditCheckModule/commonCodeList');
		},
		// 영업점 Enum
		getSaleStoreList() {
			this.$store.dispatch('CreditCheckModule/getSaleStoreList');
		},
		// 개통점 Enum
		getOpeningStoreList() {
			this.$store.dispatch('CreditCheckModule/getOpeningStoreList');
		},
		// 공통 Enum
		commonCodeEnumList() {
			this.$store.dispatch('CreditCheckModule/commonCodeEnumList');
		},
		renderingData() {
			// 랜더링시 코드리스트 호출, 필터 리셋
			this.getSaleStoreList();
			this.getOpeningStoreList();
			this.commonCodeList();
			this.commonCodeEnumList();
			this.filterInit();
		},
	},
	async created() {
		await this.renderingData();
	},
};
</script>

<style scoped></style>
