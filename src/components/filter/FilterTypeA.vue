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
				<div class="filterLeftCont" @keyup.enter='filerSubmit'>
					<div class="inStockLeftRowCont disFx h40 mb10">
						<div class="w100P">
							<v-select
								label="통신사"
								outlined
								v-model.trim="filterData.telecom"
								:items="codeList.telecom"
								item-text="codeNm"
								item-value="codeSeq"
							>
							</v-select>
						</div>
						<p class="w30P lh40 ml10">입고일</p>
						<DatePicker2
							:dataType="'inStockRegiDate'"
							:dateReset="dateResetData"
							@datePickerData="dateData"
						></DatePicker2>
						<p class="w30P lh40 ml10">이동일</p>
						<DatePicker2
							:dataType="'moveRegiDate'"
							:dateReset="dateResetData"
							@datePickerData="dateData"
						></DatePicker2>
						<div class="w100P ml10">
							<v-select
								label="재고구분"
								v-model.trim="filterData.statusStr"
								:items="codeList.stockStatStrItems"
								item-text="name"
								item-value="value"
								outlined
							>
							</v-select>
						</div>
						<div class="w100P ml10">
							<v-select
								label="제조사"
								v-model.trim="filterData.makerId"
								:items="codeList.maker"
								item-text="codeNm"
								item-value="codeSeq"
								outlined
							>
							</v-select>
						</div>
					</div>
					<div class="inStockLeftRowCont disFx h40">
						<div class="w100P">
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
						<div class="w100P ml10">
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
						<input
							v-model.trim="filterData.barcode"
							type="text"
							class="newInput1 ml10"
							placeholder="일련번호"
						/>
						<div class="w100P ml10">
							<v-select
								label="입고상태"
								v-model.trim="filterData.inStockStatus"
								:items="codeList.inStockStatusItems"
								item-text="name"
								item-value="value"
								outlined
							>
							</v-select>
						</div>
						<div class="w100P ml10">
							<v-select
								label="개통이력"
								v-model.trim="filterData.openingHistYn"
								:items="codeList.ynList"
								item-text="name"
								item-value="value"
								outlined
							>
							</v-select>
						</div>
						<div class="w100P ml10">
							<v-select
								label="단종유무"
								v-model.trim="filterData.eosYn"
								:items="codeList.ynList"
								item-text="name"
								item-value="value"
								outlined
							>
							</v-select>
						</div>
					</div>
				</div>

				<div class="inStockButtonCont ml40 disFx flexDColC">
					<button
						class="backColorMint1 mainWhite w100P disIn borderRadi3Px h90"
						@click="filerSubmit"
					>
						검색
					</button>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import DatePicker2 from '../DatePicker2.vue';
import FilterDevice from './filterDevice';

export default {
	name: 'MediationReleaseFilter',
	props: {
		filterData: { type: Object, required: true },
	},
	components: { FilterDevice, DatePicker2 },
	data: () => ({
		dateResetData: false,
	}),
	computed: {
		codeList() {
			return this.$store.state.CodeModule.codeList;
		},
	},
	methods: {
		filterInit() {
			this.dateResetData = true;
			for (let data in this.filterData) {
				this.filterData[data] = '';
			}
			this.filterData.perPageCnt = 20;
			this.filterData.goodsName = '전체';
			this.filterData.capacity = '전체';
			this.filterData.colorName = '전체';
		},
		dateData(date) {
			this.dateResetData = false;
			if (date.dataType === 'inStockRegiDate') {
				this.filterData.inStockStartRegiDate = date.start_dt;
				this.filterData.inStockEndRegiDate = date.end_dt;
			} else if (date.dataType === 'moveRegiDate') {
				this.filterData.moveStartRegiDate = date.start_dt;
				this.filterData.moveEndRegiDate = date.end_dt;
			}
		},
		async getCommonCodeList() {
			let data = {
				initData: ['provList'],
				code: ['TELECOM', 'MAKER'],
			};
			await this.$store.dispatch('CodeModule/getCommonCodeList', data);
			await this.$store.dispatch('CodeModule/getDeviceList', data);
			this.codeList.inStockStatusItems.unshift({ name: '전체', value: '' }); // 입고상태
			this.codeList.stockStatStrItems.unshift({ name: '전체', value: '' }); //재고구분
		},
		filerSubmit() {
			let filterData = {};
			filterData = this.filterData;
      if (this.filterData.goodsName === '전체') {
        filterData.goodsName = '';
      }
			if (this.filterData.capacity === '전체') {
				filterData.capacity = '';
			}
			if (this.filterData.colorName === '전체') {
				filterData.colorName = '';
			}
			this.$emit('filterSubmit', filterData);
		},
    async deviceCodeData() {
      await this.$store.dispatch('CodeModule/getGoodsNameList');
      await this.$store.dispatch('CodeModule/getCapacityList', '0');
      await this.$store.dispatch('CodeModule/getDeviceColorList');
      this.codeList.deviceList.unshift({ goodsName: '전체' });
      this.codeList.capacityList.unshift({ capacity: '전체' });
      this.codeList.colorList.unshift({ colorName: '전체' });
    },
	},
	async created() {
		await this.getCommonCodeList();
    await this.deviceCodeData();

  },
};
</script>

<style scoped></style>
