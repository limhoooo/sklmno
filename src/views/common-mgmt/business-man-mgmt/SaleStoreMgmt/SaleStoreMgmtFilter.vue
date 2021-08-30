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
					<div v-if="roleVal" class="mr10 w100P">
						<!-- vuetify - v-select, v-text-field -->
						<v-select
							:items="storeSelectList"
							item-text="saleStoreName"
							item-value="storeId"
							outlined
							name="division"
							placeholder="관리점"
							v-model.trim="filterData.parentStoreId"
							@change="selectGetList($event)"
						>
						</v-select>
					</div>
					<div class="w100P">
						<v-text-field
							outlined
							v-model.trim="filterData.saleStoreName"
							placeholder="영업점"
						></v-text-field>
					</div>
					<div class="w100P ml10">
						<v-select
							outlined
							:items="codeList.telecom"
							item-text="codeNm"
							item-value="codeSeq"
							label="통신사"
							v-model.trim="filterData.telecom"
						>
						</v-select>
					</div>
					<div class="w100P ml10">
						<v-text-field
							placeholder="사업자번호"
							outlined
							v-model.trim="filterData.bizNo"
							maxlength="10"
							oninput="this.value = this.value.replace(/[^0-9]/g, '');"
						></v-text-field>
					</div>
					<div class="w100P ml10">
						<v-text-field
							placeholder="담당자연락처"
							outlined
							v-model.trim="filterData.chargerPhone"
							oninput="this.value = this.value.replace(/[^0-9]/g, '');"
							maxlength="11"
						></v-text-field>
					</div>
				</div>
				<div class="inStockLeftRowCont disFx h40">
					<div class="inStockLeftRowCont disFx h40">
						<div class="w250">
							<v-text-field
								placeholder="반품주소지"
								outlined
								v-model.trim="filterData.returnAddr"
							></v-text-field>
						</div>
						<div class="w250 disFx ml10">
							<v-select
								outlined
								:items="codeList.useYn"
								item-text="name"
								item-value="value"
								label="사용여부"
								v-model.trim="filterData.useYn"
							>
							</v-select>
						</div>
						<p class="lh40 mr10 ml10">등록일</p>
						<date-picker
							:dateReset="dateResetData"
							@datePickerData="dateData"
						></date-picker>
						<!-- vuetify에서 제공하는 기능 date-picker -->
						<!-- 별도의 컴포넌트화로 export import를 통해 호출해서 사용한다. -->
						<!-- Datapicker의 저장된 데이터는 dateData에 저장되어 사용한다. -->
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
				<!-- filterInit함수를 통해 초기화 메소드를 실행시킨다. -->
			</div>
		</div>
	</div>
</template>

<script>
import {commonCodeListFnc} from '../../../../common/common';
import {generatorJoinPath} from '../../../../api/common/common.js';
import DatePicker from '../../../../components/DatePicker';

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
				return this.$store.state.SaleStoreMgmtModule.dateResetData;
			},
			set(newValue) {
				this.$store.state.SaleStoreMgmtModule.dateResetData = newValue;
			},
		},
		codeList: {
			get() {
				return this.$store.state.SaleStoreMgmtModule.codeList;
			},
			set(newValue) {
				this.$store.state.SaleStoreMgmtModule.codeList = newValue;
			},
		},
		filterData: {
			get() {
				return this.$store.state.SaleStoreMgmtModule.filterData;
			},
			set(newValue) {
				this.$store.state.SaleStoreMgmtModule.filterData = newValue;
			},
		},
		regiUrl: {
			get() {
				return this.$store.state.SaleStoreMgmtModule.regiUrl;
			},
			set(newValue) {
				this.$store.state.SaleStoreMgmtModule.regiUrl = newValue;
			},
		},
		roleVal() {
      return this.$store.state.role === 'A';
    },
		saleStoreData: {
			get() {
				return this.$store.state.SaleStoreMgmtModule.saleStoreData;
			},
			set(newValue) {
				this.$store.state.SaleStoreMgmtModule.saleStoreData = newValue;
			},
		},
	},
	methods: {
		// selectBox 다중선택 로직
		async selectGetList(val) {
			this.storeId = val;
			let data = {
				parentStoreId: this.storeId,
			};
			await this.getList(data);
			await this.getRegiUrl();
		},
		telecomFnc() {
			if (this.filterData.telecom.length === 3) {
				this.filterData.telecomAll = true;
			} else {
				this.filterData.telecomAll = false;
			}
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
		dateData(date) {
			// 날짜 데이터 받은 데이터 폼데이터에 저장
			// 이벤트 버스로부터 받은 객체
			this.dateResetData = false;
			this.filterData.srhStartDate = date.start_dt;
			this.filterData.srhEndDate = date.end_dt;
		},
		filterInit() {
			// 초기화 버튼 클릭 메소드
			if (this.roleVal) {
				this.filterData.parentStoreId = this.storeSelectList[0].storeId;
			}
			this.$store.commit('SaleStoreMgmtModule/filterInit');
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
		async getList(data) {
			this.saleStoreData = [];
			await this.$store.dispatch('SaleStoreMgmtModule/getList', data);
		},
		async commonCodeListFnc() {
			let data;
			if (this.roleVal) {
				data = {
					initData: ['storeList'],
					code: ['TELECOM'],
				};
			} else {
				data = {
					code: ['TELECOM'],
				};
			}
			const commonCodeList = await commonCodeListFnc(data);
			this.codeList.telecom = commonCodeList.codeList.TELECOM;
			if (this.roleVal) {
				this.filterData.platformName = commonCodeList.storeList[0];
				this.storeSelectList = commonCodeList.storeList;
				this.filterData.parentStoreId = this.storeSelectList[0].storeId;
			}
		},
		async getRegiUrl() {
			let data;
			if (this.roleVal) {
				data = {
					type: 'STORE',
					storeId: this.filterData.parentStoreId,
				};
			} else {
				data = {
					type: 'STORE',
					storeId: this.filterData.storeId,
				};
			}
			const result = await generatorJoinPath(data);
			this.regiUrl = window.location.origin + result.data.data;
			return;
		},
	},
	async created() {
		await this.commonCodeListFnc();
		let data;
		if (this.roleVal) {
			data = {
				parentStoreId: this.storeSelectList[0].storeId,
			};
		}
		await this.filterInit();
		await this.getRegiUrl();
		await this.getList(data);
	},
};
</script>

<style></style>
