<template>
	<div>
		<div>
			<div class="new-mainCont posR disFx borderRadi3Px borderContColor1">
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
						<p class="lh40 ml10 w30P">입고일</p>
						<DatePicker2
							:dataType="'inStockRegiDate'"
							:dateReset="dateResetData"
							@datePickerData="dateData"
						></DatePicker2>
						<p class="lh40 ml10 w30P">출고일</p>
						<DatePicker2
							:dataType="'moveRegiDate'"
							:dateReset="dateResetData"
							@datePickerData="dateData"
						></DatePicker2>
						<div class="w100P ml10">
							<v-select
								attach
								label="공급처"
								v-model.trim="filterData.provId"
								:items="codeList.provList"
								outlined
								item-text="provName"
								item-value="provId"
							></v-select>
						</div>
						<div class="w100P ml10">
							<v-autocomplete
								style="font-size: 12px"
								class="AutoCompleteCustom"
								label="보유처"
								:items="codeList.stockNameList"
								outlined
								v-model.trim="filterData.nextStockId"
								item-text="stockName"
								item-value="stockId"
							></v-autocomplete>
						</div>
						<div class="w100P ml10">
							<v-select
								attach
								label="재고구분"
								v-model.trim="filterData.statusStr"
								:items="codeList.stockStatStrItems"
								outlined
								item-text="name"
								item-value="value"
							></v-select>
						</div>
					</div>
					<div class="inStockLeftRowCont disFx h40">
						<div class="w100P">
							<v-select
								attach
								label="제조사"
								outlined
								:items="codeList.maker"
								v-model.trim="filterData.maker"
								item-text="codeNm"
								item-value="codeSeq"
							></v-select>
						</div>
						<div class="w100P ml10">
							<v-autocomplete
								style="font-size: 12px"
								outlined
								:items="codeList.deviceList"
								v-model.trim="filterData.goodsName"
								item-text="goodsName"
								label="기기명"
							>
							</v-autocomplete>
						</div>
						<div class="w100P ml10">
							<v-autocomplete
								style="font-size: 12px"
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
								label="색상"
								:items="codeList.colorList"
								v-model.trim="filterData.colorName"
								outlined
								item-text="colorName"
							>
							</v-autocomplete>
						</div>
						<div class="w100P ml10">
							<v-select
								attach
								label="입고상태"
								:items="codeList.inStockStatusItems"
								v-model.trim="filterData.inStockStatus"
								outlined
								item-text="name"
								item-value="value"
							></v-select>
						</div>
						<div class="w100P ml10">
							<v-select
								attach
								label="제품상태"
								:items="codeList.productFaultyYnItems"
								v-model.trim="filterData.productFaultyYn"
								outlined
								item-text="name"
								item-value="value"
							></v-select>
						</div>
						<div class="w100P ml10">
							<v-select
								attach
								label="외장상태"
								:items="codeList.deviceExtrrStatusItems"
								v-model.trim="filterData.extrrStatus"
								outlined
								item-text="name"
								item-value="value"
							></v-select>
						</div>
						<div class="w100P ml10">
							<v-text-field
								label="일련번호 입력"
								v-model.trim="filterData.barcode"
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
		filterData: {
			get() {
				return this.$store.state.LongtimeStockModule.filterData;
			},
			set(newValue) {
				this.$store.state.LongtimeStockModule.filterData = newValue;
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
			const data = this.$store.state.LongtimeStockModule.filterData;
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
			// 출고일
			this.dateStartValFnc(
				this.filterData.moveStockRegiDate,
				this.filterData.moveStockEndDate,
			);
			this.dateEndValFnc(
				this.filterData.moveStockRegiDate,
				this.filterData.moveStockEndDate,
			);
			await this.$store.dispatch('LongtimeStockModule/getList', data);
		},
		async createFilterInit() {
			this.$store.commit('LongtimeStockModule/filterInit');
			this.stockItemsList();
		},
		filterInit() {
			this.dateResetData = true;
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
		},
		async getCodeList() {
			await this.getCommonCodeList();
		},

		dateData(item) {
			this.dateResetData = false;
			if (item.dataType === 'inStockRegiDate') {
				this.filterData.srhStartInStockRegiDate = item.start_dt;
				this.filterData.srhEndInStockRegiDate = item.end_dt;
			} else if (item.dataType === 'moveRegiDate') {
				this.filterData.moveStockRegiDate = item.start_dt;
				this.filterData.moveStockEndDate = item.end_dt;
			}
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
		await this.getCodeList();
		await this.deviceCodeData();
	},
};
</script>
