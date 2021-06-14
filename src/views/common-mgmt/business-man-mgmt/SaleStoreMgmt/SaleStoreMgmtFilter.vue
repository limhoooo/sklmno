<template>
	<div>
		<div id="SearchBoxCont">
			<div v-if="roleVal">
				<p>관리점</p>
				<v-select
					class="select_custom1"
					:items="storeSelectList"
					item-text="saleStoreName"
					item-value="storeId"
					outlined
					name="division"
					v-model.trim="filterData.parentStoreId"
					@change="selectGetList($event)"
				>
				</v-select>
			</div>
			<div>
				<div class="devideCont">
					<p>영업점명</p>
					<v-col>
						<v-text-field
							class="input_custom1"
							outlined
							v-model.trim="filterData.saleStoreName"
						></v-text-field>
					</v-col>
				</div>
				<div class="checkCont">
					<p>통신사</p>
					<input
						type="checkbox"
						id="allTel"
						value="0"
						v-model.trim="filterData.telecomAll"
						@click="checkAll"
					/><label for="allTel">전체</label>
					<span v-for="item in codeList.telecom" :key="item.id">
						<input
							:id="item.codeNm"
							type="checkbox"
							:value="item.codeSeq"
							v-model.trim="filterData.telecom"
							@change="telecomFnc"
						/>
						<label :for="item.codeNm">{{ item.codeNm }}</label>
					</span>
				</div>
			</div>
			<div>
				<div class="devideCont">
					<p>사업자 번호</p>
					<v-col>
						<v-text-field
							class="input_custom1"
							outlined
							maxlength="10"
							v-model.trim="filterData.bizNo"
							oninput="javascript: this.value = this.value.replace(/[^0-9]/g, '');"
						></v-text-field>
					</v-col>
				</div>
				<div class="devideCont">
					<p>담당자 연락처</p>
					<v-col>
						<v-text-field
							class="input_custom1"
							outlined
							maxlength="11"
							v-model.trim="filterData.chargerPhone"
							oninput="javascript: this.value = this.value.replace(/[^0-9]/g, '');"
						></v-text-field>
					</v-col>
				</div>
			</div>
			<div>
				<div class="devideCont">
					<p>반품 주소지</p>
					<v-col>
						<v-text-field
							class="input_custom1"
							outlined
							v-model.trim="filterData.returnAddr"
						></v-text-field>
					</v-col>
				</div>
				<div>
					<p>사용여부</p>
					<input
						type="radio"
						id="allVote"
						value="all"
						v-model.trim="filterData.useYn"
						name="vote"
						checked
					/><label for="allVote">전체</label>
					<input
						type="radio"
						value="Y"
						id="voteYes"
						name="vote"
						v-model.trim="filterData.useYn"
					/><label for="voteYes">Y</label>
					<input
						type="radio"
						value="N"
						id="voteNo"
						name="vote"
						v-model.trim="filterData.useYn"
					/><label for="voteNo">N</label>
				</div>
			</div>
			<div>
				<p>등록일</p>
				<date-picker
					@datePickerData="dateData"
					:dateReset="dateResetData"
				></date-picker>
			</div>
		</div>
		<div id="BtnCont">
			<v-btn @click="filterSubmit">검색</v-btn>
			<v-btn @click="filterInit">초기화</v-btn>
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
			return this.$store.state.role;
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
