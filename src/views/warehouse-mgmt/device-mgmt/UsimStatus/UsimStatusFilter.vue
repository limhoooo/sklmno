<template>
	<div>
		<div class="new-mainCont posR disFx">
			<div class="new-filterCont posA">
				<button id="initBtn1" @click="filterInit" class="mainBlue1">
					필터 초기화
				</button>
				<label for="initBtn1"></label>
			</div>
			<div class="filterLeftCont" @keyup.enter="filterSubmit">
				<div class="inStockLeftRowCont disFx h40 mb10">
					<div class="w100P">
						<v-select
							v-model.trim="filterData.telecom"
							outlined
							:items="codeList.telecom"
							item-text="codeNm"
							item-value="codeSeq"
							label="통신사"
						>
						</v-select>
					</div>
					<p class="w30P lh40 ml10">입고일</p>
					<DatePicker2
						:dataType="'inStockRegiDate'"
						:dateReset="dateResetData"
						@datePickerData="dateData"
					></DatePicker2>
					<p class="w50P lh40 ml10">상태변경일</p>
					<DatePicker2
						:dataType="'moveRegiDate'"
						:dateReset="dateResetData"
						@datePickerData="dateData"
					></DatePicker2>
					<div class="w100P ml10">
						<v-select
							label="공급처"
							v-model.trim="filterData.provId"
							outlined
							:items="codeList.provList"
							item-text="provName"
							item-value="provId"
						></v-select>
					</div>
					<div class="w100P ml10">
						<v-autocomplete
							style="font-size: 12px"
							class="AutoCompleteCustom"
							label="보유처"
							v-model.trim="filterData.nextStockId"
							outlined
							:items="codeList.stockNameList"
							item-text="stockName"
							item-value="stockId"
						></v-autocomplete>
					</div>
					<div class="w100P ml10">
						<v-select
							label="개통점"
							v-model.trim="filterData.openingHistoryStoreId"
							outlined
							:items="codeList.openingStoreList"
							item-text="openStoreName"
							item-value="openStoreId"
						></v-select>
					</div>
				</div>
				<div class="inStockLeftRowCont disFx h40 mb10">
					<div class="w100P">
						<v-select
							label="재고구분"
							v-model.trim="filterData.stockType"
							outlined
							:items="codeList.deviceMoveStockStatStrItems"
							item-text="name"
							item-value="value"
						></v-select>
					</div>
					<div class="w100P ml10">
						<v-select
							label="제조사"
							v-model.trim="filterData.maker"
							outlined
							:items="codeList.maker"
							item-text="codeNm"
							item-value="codeSeq"
						></v-select>
					</div>
					<div class="w100P ml10">
						<v-autocomplete
							style="font-size: 12px"
							class="AutoCompleteCustom"
							outlined
							:items="codeList.deviceList"
							v-model.trim="filterData.goodsName"
							item-text="goodsName"
							label="기기명"
						></v-autocomplete>
					</div>
					<div class="w100P ml10">
						<v-select
							style="font-size: 12px"
							label="입고상태"
							v-model.trim="filterData.inStockStatus"
							outlined
							:items="codeList.inStockStatusItems"
							item-text="name"
							item-value="value"
						></v-select>
					</div>
					<div class="w100P ml10">
						<v-select
							style="font-size: 12px"
							label="제품상태"
							v-model.trim="filterData.productFaultyYn"
							outlined
							:items="codeList.productFaultyYnItems"
							item-text="name"
							item-value="value"
						></v-select>
					</div>
					<div class="w100P ml10">
						<v-select
							label="외장상태"
							v-model.trim="filterData.extrrStatus"
							outlined
							:items="codeList.deviceExtrrStatusItems"
							item-text="name"
							item-value="value"
						></v-select>
					</div>
				</div>
				<div class="inStockLeftRowCont disFx h40">
					<div class="w100P">
						<v-select
							label="개통상태"
							outlined
							item-text="name"
							:items="enumCodeList.openingTextItems"
							v-model.trim="filterData.openingText"
							item-value="value"
						></v-select>
					</div>
					<p class="lh40 w40P ml10">개통일</p>
					<DatePicker2
						:dateReset="dateResetData"
						@datePickerData="dateData"
					></DatePicker2>
					<div class="w100P ml10">
						<v-select
							label="배송방법"
							v-model.trim="filterData.deliveryType"
							outlined
							:items="codeList.deliveryType"
							item-text="name"
							item-value="value"
						></v-select>
					</div>
					<div class="w100P ml10">
						<v-select
							label="배송상태"
							v-model.trim="filterData.deliveryStatus"
							outlined
							:items="codeList.deliveryStatus"
							item-text="name"
							item-value="value"
						></v-select>
					</div>
					<p class="lh40 w40P ml10">배송일</p>
					<DatePicker2
						:dataType="'deliveryDate'"
						:dateReset="dateResetData"
						@datePickerData="dateData"
					></DatePicker2>
					<div class="w100P ml10">
						<v-text-field
							label="일련번호 입력"
							v-model="filterData.barcode"
							outlined
							@keyup.enter="filterSubmit"
						></v-text-field>
					</div>
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
import DatePicker2 from '../../../../components/DatePicker2.vue';

export default {
	components: { DatePicker2 },
	data: () => ({
		menu1: false,
		menu2: false,
		dateResetData: false,
	}),
	computed: {
		codeList() {
			return this.$store.state.CodeModule.codeList;
		},
		enumCodeList() {
			return this.$store.state.DeviceStatusModule.enumCodeList;
		},
		filterData: {
			get() {
				return this.$store.state.DeviceStatusModule.filterData;
			},
			set(newValue) {
				this.$store.state.DeviceStatusModule.filterData = newValue;
			},
		},
	},
	methods: {
		stockItemsList() {
			this.$store.dispatch('CodeModule/getStockListFnc', 0);
		},
		dateStartValFnc(startDt, endDt) {
			if (!startDt && endDt) {
				alert('시작일을 입력해주세요.');
				return;
			}
		},
		dateEndValFnc(startDt, endDt) {
			if (startDt && !endDt) {
				alert('종료일을 입력해주세요.');
				return;
			}
		},
		async filterSubmit() {
			const data = this.$store.state.DeviceStatusModule.filterData;
			data.goodsType = 'USIM';
			data.pageNo = 1;
			// 입고일
			this.dateStartValFnc(
				this.filterData.inStockRegiDate,
				this.filterData.inStockEndDate,
			);
			this.dateEndValFnc(
				this.filterData.inStockRegiDate,
				this.filterData.inStockEndDate,
			);
			// 상태변경일
			this.dateStartValFnc(
				this.filterData.moveRegiDate,
				this.filterData.moveEndDate,
			);
			this.dateEndValFnc(
				this.filterData.moveRegiDate,
				this.filterData.moveEndDate,
			);
			// 개통일
			this.dateStartValFnc(
				this.filterData.openingStartDateTime,
				this.filterData.openingEndDateTime,
			);
			this.dateEndValFnc(
				this.filterData.openingStartDateTime,
				this.filterData.openingEndDateTime,
			);
			// 배송일
			this.dateStartValFnc(
				this.filterData.deliveryStartDate,
				this.filterData.deliveryEndDate,
			);
			this.dateEndValFnc(
				this.filterData.deliveryStartDate,
				this.filterData.deliveryEndDate,
			);
			await this.$store.dispatch('DeviceStatusModule/getList', data);
		},
		async createFilterInit() {
			this.$store.commit('DeviceStatusModule/filterInit');
			this.stockItemsList();
		},
		filterInit() {
			this.dateResetData = true;
			this.createFilterInit();
			this.getCodeList();
		},
		commonFilterInit() {
			this.$store.commit('CodeModule/filterInit');
		},
		async getCommonCodeList() {
			let data = {
				initData: ['provList'],
				code: ['TELECOM', 'MAKER'],
			};
			await this.getEnumCommonCodeList();
			await this.$store.dispatch('CodeModule/getCommonCodeList', data);
			await this.$store.dispatch('CodeModule/getSessOpeningStoreList');
			this.codeList.telecom.unshift({ codeNm: '전체', codeSeq: '' });
			this.codeList.maker.unshift({ codeNm: '전체', codeSeq: '' });
			this.codeList.deviceMoveStockStatStrItems.unshift({
				name: '전체',
				value: '',
			});
			this.codeList.inStockStatusItems.unshift({ name: '전체', value: '' });
			this.codeList.productFaultyYnItems.unshift({ name: '전체', value: '' });
			this.codeList.deviceExtrrStatusItems.unshift({ name: '전체', value: '' });
			this.codeList.deliveryType.unshift({ name: '전체', value: '' });
			this.codeList.deliveryStatus.unshift({ name: '전체', value: '' });
			this.codeList.openingStoreList.unshift({
				openStoreName: '전체',
				openStoreId: '',
			});
		},
		async getCodeList() {
			await this.getCommonCodeList();

			// 보유처 용량 색상 초기 전체 INSERT
			this.codeList.stockNameList.unshift({ stockName: '전체', stockId: '' });
			this.codeList.capacityList.unshift({ capacity: '전체' });
			this.codeList.colorList.unshift({ colorName: '전체' });
		},
		async getEnumCommonCodeList() {
			await this.$store.dispatch('DeviceStatusModule/commonCodeEnumList');
		},
		dateData(item) {
			this.dateResetData = false;
			if (item.dataType === 'inStockRegiDate') {
				this.filterData.inStockRegiDate = item.start_dt;
				this.filterData.inStockEndDate = item.end_dt;
			} else if (item.dataType === 'moveRegiDate') {
				this.filterData.moveRegiDate = item.start_dt;
				this.filterData.moveEndDate = item.end_dt;
			} else if (item.dataType === 'deliveryDate') {
				this.filterData.deliveryStartDate = item.start_dt;
				this.filterData.deliveryEndDate = item.end_dt;
			} else {
				this.filterData.openingStartDateTime = item.start_dt;
				this.filterData.openingEndDateTime = item.end_dt;
			}
		},
    async deviceCodeData() {
      await this.$store.dispatch('CodeModule/getGoodsNameList');
      this.codeList.deviceList.unshift({ goodsName: '전체' });
    },
	},
	async created() {
		await this.commonFilterInit();
		await this.createFilterInit();
		await this.getCodeList();
    await this.deviceCodeData();
  },
};
</script>
