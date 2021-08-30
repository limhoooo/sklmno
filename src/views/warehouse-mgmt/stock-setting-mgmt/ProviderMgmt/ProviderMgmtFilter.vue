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
								outlined
								:items="provList"
								v-model.trim="filterData.provId"
								item-text="provName"
								item-value="provId"
								label="공급처명"
							>
							</v-select>
						</div>
						<div class="w220 ml10">
							<v-text-field
								label="담당자명"
								v-model.trim="filterData.chargerName"
								outlined
							></v-text-field>
						</div>
						<div class="w220 ml10">
							<v-text-field
								label="담당자 연락처"
								v-model.trim="filterData.chargerPhone"
								outlined
							>
							</v-text-field>
						</div>
						<div class="w100P ml10">
							<v-text-field
								label="담당자 E-mail"
								v-model.trim="filterData.chargerEmail"
								outlined
							>
							</v-text-field>
						</div>
						<div class="disFx w100P ml10">
							<p class="lh40 mj0 boldWt w100">사용여부</p>
							<div class="radioStyle h40 w50 lh40">
								<input
									type="radio"
									id="allUse"
									value="all"
									v-model.trim="filterData.useYn"
									name="useFilter"
								/><label for="allUse">전체</label>
							</div>
							<div class="radioStyle ml10 h40 w50 lh40">
								<input
									type="radio"
									value="Y"
									id="useYes"
									v-model.trim="filterData.useYn"
									name="useFilter"
								/><label for="useYes">Y</label>
							</div>
							<div class="radioStyle h40 w50 lh40">
								<input
									type="radio"
									value="N"
									id="useNo"
									v-model.trim="filterData.useYn"
									name="useFilter"
								/><label for="useNo">N</label>
							</div>
						</div>
					</div>
					<div class="inStockLeftRowCont disFx h40">
						<div>
							<v-text-field
								label="반품주소지"
								v-model.trim="filterData.returnAddr"
								outlined
							></v-text-field>
						</div>
						<div class="disFx ml10">
							<!--							<div class="w150">
								<v-menu
									v-model.trim="menu1"
									:close-on-content-click="false"
									:nudge-right="40"
									transition="scale-transition"
									offset-y
								>
									<template v-slot:activator="{ on, attrs }">
										<v-text-field
											outlined
											readonly
											v-model.trim="filterData.srhStartDate"
											v-bind="attrs"
											v-on="on"
											label="등록날짜"
											class="datePickerInput input_custom1"
										></v-text-field>
									</template>
									<v-date-picker
										v-model.trim="filterData.srhStartDate"
										@input="menu1 = false"
										locale="ko-KR"
									></v-date-picker>
								</v-menu>
							</div>
							<span class="lh40">~</span>
							<div class="w150">
								<v-menu
									v-model.trim="menu2"
									:close-on-content-click="false"
									:nudge-right="40"
									transition="scale-transition"
									offset-y
								>
									<template v-slot:activator="{ on, attrs }">
										<v-text-field
											v-model.trim="filterData.srhEndDate"
											outlined
											readonly
											v-bind="attrs"
											v-on="on"
											label="등록날짜"
											class="datePickerInput input_custom1"
										></v-text-field>
									</template>
									<v-date-picker
										v-model.trim="filterData.srhEndDate"
										@input="menu2 = false"
										locale="ko-KR"
									></v-date-picker>
								</v-menu>
							</div>-->
							<p class="lh40 w70">등록날짜</p>
							<date-picker2
								:dataType="'inStockRegiDate'"
								:dateReset="dateResetData"
								@datePickerData="dateData"
							></date-picker2>
							<!--							<div class="w100P disFx">
								<p class="lh40 w80 ml10">검색기간</p>
								<div class="radioStyle h40 w50 lh40">
									<input
										type="radio"
										id="dateAll"
										name="date"
										value="all"
										v-model="dateBtn"
										@click="setDate('all')"
										checked
									/><label for="dateAll">전체</label>
								</div>
								<div class="radioStyle h40 w50 lh40">
									<input
										type="radio"
										id="today"
										name="date"
										value="1"
										v-model="dateBtn"
										@click="setDate('day')"
									/><label for="today">오늘</label>
								</div>
								<div class="radioStyle h40 w50 lh40">
									<input
										type="radio"
										id="week"
										name="date"
										value="2"
										v-model="dateBtn"
										@click="setDate('week7')"
									/><label for="week">7일</label>
								</div>
								<div class="radioStyle h40 w50 lh40">
									<input
										type="radio"
										id="halfMonth"
										name="date"
										value="3"
										v-model="dateBtn"
										@click="setDate('week15')"
									/><label for="halfMonth">15일</label>
								</div>
								<div class="radioStyle h40 w50 lh40">
									<input
										type="radio"
										id="month"
										name="date"
										value="4"
										v-model="dateBtn"
										@click="setDate('month')"
									/><label for="month">한달</label>
								</div>
							</div>-->
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
import { setDate } from '../../../../common/common';
import DatePicker2 from '../../../../components/DatePicker2.vue';

export default {
	components: { DatePicker2 },
	data() {
		return {
			menu1: false,
			menu2: false,
			provList: [],
			dateResetData: false,
		};
	},
	computed: {
		codeList() {
			return this.$store.state.CodeModule.codeList;
		},
		filterData: {
			get() {
				return this.$store.state.ProviderMgmtModule.filterData;
			},
			set(newValue) {
				this.$store.state.ProviderMgmtModule.filterData = newValue;
			},
		},
		dateBtn: {
			get() {
				return this.$store.state.ProviderMgmtModule.dateBtn;
			},
			set(newValue) {
				this.$store.state.ProviderMgmtModule.dateBtn = newValue;
			},
		},
	},
	methods: {
		dateData(item) {
			this.dateResetData = false;
			if (item.dataType === 'inStockRegiDate') {
				this.filterData.srhStartDate = item.start_dt;
				this.filterData.srhEndDate = item.end_dt;
			}
		},
		filterInit() {
			this.$store.commit('ProviderMgmtModule/filterInit');
		},
		setDate(criteria) {
			let data = setDate(criteria);
			this.filterData.srhStartDate = data.start_dt;
			this.filterData.srhEndDate = data.end_dt;
		},
		async filterSubmit() {
			const data = this.$store.state.ProviderMgmtModule.filterData;
			data.pageNo = 1;
			await this.$store.dispatch('ProviderMgmtModule/getProviderList', data);
		},
		commonFilterInit() {
			this.$store.commit('CodeModule/filterInit');
		},
		async getCommonCodeList() {
			let data = {
				initData: ['provListAll'],
				code: ['TELECOM', 'MAKER'],
			};
			await this.$store.dispatch('CodeModule/getCommonCodeList', data);
			this.codeList.provList.unshift({ provName: '전체', provId: '' });
		},
		setProvListData() {
			this.provList = this.codeList.provList;
		},
	},

	async created() {
		await this.commonFilterInit();
		await this.getCommonCodeList();
		await this.filterInit();
		await this.setProvListData();
	},
};
</script>
