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
					<div class="w220">
						<v-select
							attach
							outlined
							:items="codeList.telecom"
							v-model.trim="filterData.telecom"
							item-text="codeNm"
							item-value="codeSeq"
							label="통신사"
						>
						</v-select>
					</div>
					<div class="ml10 w220">
						<v-autocomplete
							class="AutoCompleteCustom"
							style="font-size: 12px"
							label="보유처"
							outlined
							:items="codeList.stockNameList"
							v-model.trim="filterData.nextStockId"
							item-text="stockName"
							item-value="stockId"
						></v-autocomplete>
					</div>
					<p class="w50 ml10 lh40">입고일</p>
					<DatePicker2
						:dataType="'inStockRegiDate'"
						:dateReset="dateResetData"
						@datePickerData="dateData"
					>
					</DatePicker2>
					<p class="w80 ml10 lh40">재고확인일</p>
					<DatePicker2
						:dataType="'storeStockCheckDate'"
						:dateReset="dateResetData"
						@datePickerData="dateData"
					>
					</DatePicker2>
          <div class="w220 ml10">
            <v-select
                attach
                label="공급처"
                :items="codeList.provList"
                v-model.trim="filterData.provId"
                outlined
                item-text="provName"
                item-value="provId"
            ></v-select>
          </div>
				</div>
				<div class="inStockLeftRowCont disFx h40">
          <div style="width: 80%">
            <v-select
                attach
                label="재고구분"
                :items="codeList.stockStatStrItems"
                v-model.trim="filterData.statusStr"
                outlined
                item-text="name"
                item-value="value"
            ></v-select>
          </div>
					<div class="w100P ml10">
            <multi-search-input
                :items="codeList.deviceMoveStockStatStrItems2"
                itemText="name"
                itemValue="value"
                itemLabel="재고구분상세"
                @inputValue="stockTypeValue"
                :multiReset="multiResetData"
            ></multi-search-input>
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
						>
						</v-autocomplete>
					</div>
					<div class="ml10" style="width: 80%">
						<v-autocomplete
							style="font-size: 12px"
							class="AutoCompleteCustom"
							label="용량"
							:items="codeList.capacityList"
							v-model.trim="filterData.capacity"
							outlined
							item-text="capacity"
						>
						</v-autocomplete>
					</div>
					<div class="w100P ml10">
						<v-autocomplete
							style="font-size: 12px"
							class="AutoCompleteCustom"
							label="색상"
							:items="codeList.colorList"
							v-model.trim="filterData.colorName"
							outlined
							item-text="colorName"
						>
						</v-autocomplete>
					</div>

					<div class="w170 ml10">
						<v-text-field
							label="일련번호 입력"
							v-model.trim="filterData.barcode"
							outlined
							@keyup.enter="filterSubmit"
						></v-text-field>
					</div>
					<div class="w100P ml10">
						<v-select
							attach
							label="수동검수유형"
							:items="statusList.stockManualCheckStatus"
							v-model.trim="filterData.stockManualCheckStatus"
							outlined
							item-text="name"
							item-value="value"
						></v-select>
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
import MultiSearchInput from '../../../../components/MultiSearchInput.vue';

export default {
	components: {
		DatePicker2, MultiSearchInput
	},
	data: () => ({
		menu1: false,
		menu2: false,
    multiResetData: false,
  }),
	computed: {
		codeList() {
			return this.$store.state.CodeModule.codeList;
		},
		filterData: {
			get() {
				return this.$store.state.StockStatusModule.filterData;
			},
			set(newValue) {
				this.$store.state.StockStatusModule.filterData = newValue;
			},
		},
		dateResetData: {
			get() {
				return this.$store.state.StockStatusModule.dateResetData;
			},
			set(newValue) {
				this.$store.state.StockStatusModule.dateResetData = newValue;
			},
		},
		statusList() {
			return this.$store.state.StockStatusModule.statusList;
		},
	},

	methods: {
		stockItemsList() {
			this.$store.dispatch('CodeModule/getStockListFnc', 0);
		},
		dateData(date) {
			this.dateResetData = false;
			if (date.dataType === 'inStockRegiDate') {
				this.filterData.srhStartInStockRegiDate = date.start_dt;
				this.filterData.srhEndInStockRegiDate = date.end_dt;
			} else if (date.dataType === 'storeStockCheckDate') {
				this.filterData.srhStartStoreStockCheckDate = date.start_dt;
				this.filterData.srhEndStoreStockCheckDate = date.end_dt;
			}
		},
		checkStoreStockClickFnc(item, index) {
			if (index === 0 && item.checkStoreStockChk && this.checkStoreStockChk) {
				return this.chkClass;
			}
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
			const data = this.$store.state.StockStatusModule.filterData;
			let dataObj = {
				data: data,
				checkStoreStockChk: false,
			};
			data.pageNo = 1;
			// 입고일
			this.dateStartValFnc(
				this.filterData.srhStartInStockRegiDate,
				this.filterData.srhEndInStockRegiDate,
			);
			this.dateEndValFnc(
				this.filterData.srhStartInStockRegiDate,
				this.filterData.srhEndInStockRegiDate,
			);
			// 재고확인일
			this.dateStartValFnc(
				this.filterData.srhStartStoreStockCheckDate,
				this.filterData.srhEndStoreStockCheckDate,
			);
			this.dateEndValFnc(
				this.filterData.srhStartStoreStockCheckDate,
				this.filterData.srhEndStoreStockCheckDate,
			);
			await this.$store.dispatch('StockStatusModule/getList', dataObj);
		},
    stockTypeValue(item) {
      this.multiResetData = false;
      this.filterData.stockTypes = item;
    },
		async createFilterInit() {
			this.$store.commit('StockStatusModule/filterInit');
			this.stockItemsList();
		},
		filterInit() {
      this.multiResetData = true;
			this.createFilterInit();
			this.getCodeList();
		},
		async getCommonCodeList() {
			let data = {
				initData: ['provList'],
				code: ['TELECOM', 'MAKER'],
			};
			await this.$store.dispatch('CodeModule/getCommonCodeList', data);
			this.codeList.telecom.unshift({ codeNm: '전체', codeSeq: '' });
			this.codeList.maker.unshift({ codeNm: '전체', codeSeq: '' });
			this.codeList.stockStatStrItems.unshift({ name: '전체', value: '' });
			this.codeList.inStockStatusItems.unshift({ name: '전체', value: '' });
			this.codeList.productFaultyYnItems.unshift({ name: '전체', value: '' });
			this.codeList.deviceExtrrStatusItems.unshift({ name: '전체', value: '' });
			this.codeList.provList.unshift({ provName: '전체', provId: '' });
		},

		async getCodeList() {
			await this.getCommonCodeList();
		},
		async commonCodeList() {
			await this.$store.dispatch('StockStatusModule/getEnumCommonCodeList');
			this.statusList.stockManualCheckStatus.unshift({
				name: '전체',
				value: '',
			});
		},
		async deviceCodeData() {
			await this.$store.dispatch('CodeModule/getGoodsNameList');
			await this.$store.dispatch('CodeModule/getCapacityList', '0');
			await this.$store.dispatch('CodeModule/getDeviceColorList');
			this.codeList.deviceList.unshift({ goodsName: '전체' });
			this.codeList.capacityList.unshift({ capacity: '전체' });
			this.codeList.colorList.unshift({ colorName: '전체' });
		},
		commonFilterInit() {
			this.$store.commit('CodeModule/filterInit');
		},
	},
	async created() {
		await this.commonFilterInit();
		await this.createFilterInit();
		await this.commonCodeList();
		await this.getCodeList();
		await this.deviceCodeData();
	},
};
</script>
