<template>
	<div>
		<div class="searchingCont">
			<div class="filterCont">
				<v-btn icon>
					<v-icon style="color: #7e7e7e">mdi-cached</v-icon>
					<span @click="filterInit" style="color: #7e7e7e; font-weight: bold"
						>필터 초기화</span
					>
				</v-btn>
			</div>
			<div class="boxRow">
				<div class="contRow">
					<div class="selectCustom">
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
					<div class="selectCustom">
						<v-text-field
							label="담당자명"
							v-model.trim="filterData.chargerName"
							outlined
						></v-text-field>
					</div>
					<div class="selectCustom">
						<v-text-field
							label="담당자 연락처"
							v-model.trim="filterData.chargerPhone"
							outlined
						>
						</v-text-field>
					</div>
					<div class="selectCustom">
						<v-text-field
							label="담당자 E-mail"
							v-model.trim="filterData.chargerEmail"
							outlined
						>
						</v-text-field>
					</div>
					<div class="radioCont" style="display: inline-block; width: 230px">
						<p style="display: inline-block; padding: 7px 0">사용여부</p>
						<input
							type="radio"
							id="allUse"
							value="all"
							v-model.trim="filterData.useYn"
							name="useFilter"
						/><label for="allUse">전체</label>
						<input
							type="radio"
							value="Y"
							id="useYes"
							v-model.trim="filterData.useYn"
							name="useFilter"
						/><label for="useYes">Y</label>
						<input
							type="radio"
							value="N"
							id="useNo"
							v-model.trim="filterData.useYn"
							name="useFilter"
						/><label for="useNo">N</label>
					</div>
				</div>
				<div class="contRow">
					<div class="selectCustom" style="width: 502px">
						<v-text-field
							label="반품주소지"
							v-model.trim="filterData.returnAddr"
							outlined
						></v-text-field>
					</div>
					<div class="datePickerCustom dateLabelCustom1">
						<div class="dateCustom" style="display: inline-block">
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
						~
						<div class="dateCustom" style="display: inline-block">
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
						</div>
						<div
							class="dateRadioCont"
							style="display: inline-block; width: 430px; position: relative"
						>
							<p>검색기간</p>
							<input
								type="radio"
								id="dateAll"
								name="date"
								value="all"
								v-model="dateBtn"
								@click="setDate('all')"
								checked
							/><label for="dateAll">전체</label>
							<input
								type="radio"
								id="today"
								name="date"
								value="1"
								v-model="dateBtn"
								@click="setDate('day')"
							/><label for="today">오늘</label>
							<input
								type="radio"
								id="week"
								name="date"
								value="2"
								v-model="dateBtn"
								@click="setDate('week7')"
							/><label for="week">7일</label>
							<input
								type="radio"
								id="halfMonth"
								name="date"
								value="3"
								v-model="dateBtn"
								@click="setDate('week15')"
							/><label for="halfMonth">15일</label>
							<input
								type="radio"
								id="month"
								name="date"
								value="4"
								v-model="dateBtn"
								@click="setDate('month')"
							/><label for="month">한달</label>
						</div>
					</div>
				</div>
			</div>
			<div class="searchBoxCont">
				<div class="searchBox" @click="filterSubmit">검색</div>
			</div>
		</div>
	</div>
</template>

<script>
import { setDate } from '../../../../common/common';

export default {
	data() {
		return {
			menu1: false,
			menu2: false,
			provList: [],
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
