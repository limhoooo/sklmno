<template>
	<div>
		<div id="SearchBoxCont">
			<div v-if="roleVal">
				<p>관리점</p>
				<!-- vuetify - v-select, v-text-field -->
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
					<!-- v-model.trim을 통해 filterData에 각 인풋,셀렉트박스 값을 넘겨준다. -->
				</v-select>
			</div>
			<div>
				<div class="devideCont">
					<p>개통점명</p>
					<v-col>
						<v-text-field
							class="input_custom1"
							outlined
							v-model.trim="filterData.openStoreName"
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
					/>
					<label for="allTel">전체</label>
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
							v-model.trim="filterData.bizNo"
							maxlength="10"
							oninput="this.value = this.value.replace(/[^0-9]/g, '');"
						></v-text-field>
					</v-col>
				</div>
				<div class="devideCont">
					<p>담당자 연락처</p>
					<v-text-field
						class="input_custom1"
						outlined
						v-model.trim="filterData.chargerPhone"
						oninput="this.value = this.value.replace(/[^0-9]/g, '');"
						maxlength="11"
					></v-text-field>
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
						name="vote"
						v-model.trim="filterData.useYn"
					/>
					<label for="allVote">전체</label>
					<input
						type="radio"
						value="Y"
						id="voteYes"
						name="vote"
						v-model.trim="filterData.useYn"
					/>
					<label for="voteYes">Y</label>
					<input
						type="radio"
						value="N"
						id="voteNo"
						name="vote"
						v-model.trim="filterData.useYn"
					/>
					<label for="voteNo">N</label>
				</div>
			</div>
			<div>
				<p>등록일</p>
				<date-picker
					:dateReset="dateResetData"
					@datePickerData="dateData"
				></date-picker>
				<!-- vuetify에서 제공하는 기능 date-picker -->
				<!-- 별도의 컴포넌트화로 export import를 통해 호출해서 사용한다. -->
				<!-- Datapicker의 저장된 데이터는 dateData에 저장되어 사용한다. -->
			</div>
		</div>
		<div id="BtnCont">
			<v-btn @click="filterSubmit">검색</v-btn>
			<v-btn @click="filterInit">초기화</v-btn>
			<!-- filterInit함수를 통해 초기화 메소드를 실행시킨다. -->
		</div>
	</div>
</template>

<script>
import {commonCodeListFnc} from '../../../../common/common';
import DatePicker from '../../../../components/DatePicker';

export default {
	components: {
		DatePicker,
	},

	computed: {
		storeId: {
			get() {
				return this.$store.state.OpeningStoreMgmtModule.storeId;
			},
			set(newValue) {
				this.$store.state.OpeningStoreMgmtModule.storeId = newValue;
			},
		},
		openingStoreData: {
			get() {
				return this.$store.state.OpeningStoreMgmtModule.openingStoreData;
			},
			set(newValue) {
				this.$store.state.OpeningStoreMgmtModule.openingStoreData = newValue;
			},
		},
		storeSelectList: {
			get() {
				return this.$store.state.OpeningStoreMgmtModule.storeSelectList;
			},
			set(newValue) {
				this.$store.state.OpeningStoreMgmtModule.storeSelectList = newValue;
			},
		},
		codeList: {
			get() {
				return this.$store.state.OpeningStoreMgmtModule.codeList;
			},
			set(newValue) {
				this.$store.state.OpeningStoreMgmtModule.codeList = newValue;
			},
		},
		dateResetData: {
			get() {
				return this.$store.state.OpeningStoreMgmtModule.dateResetData;
			},
			set(newValue) {
				this.$store.state.OpeningStoreMgmtModule.dateResetData = newValue;
			},
		},
		filterData: {
			get() {
				return this.$store.state.OpeningStoreMgmtModule.filterData;
			},
			set(newValue) {
				this.$store.state.OpeningStoreMgmtModule.filterData = newValue;
			},
		},
		roleVal() {
			return this.$store.state.role;
		},
	},
	methods: {
		dateData(date) {
			this.dateResetData = false;
			this.filterData.srhStartDate = date.start_dt;
			this.filterData.srhEndDate = date.end_dt;
		},
		telecomFnc() {
			if (this.filterData.telecom.length === 3) {
				this.filterData.telecomAll = true;
			} else {
				this.filterData.telecomAll = false;
			}
		},
		// 통신사 checkAll
		checkAll() {
			if (this.filterData.telecom.length < 3) {
				this.filterData.telecom = [];
				this.filterData.telecom.push(5, 6, 7);
			} else {
				this.filterData.telecom = [];
			}
		},
		async getList(data) {
			// 사용여부 라디오버튼 버그로 인한 리스트 초기화
			this.openingStoreData = [];
			await this.$store.dispatch('OpeningStoreMgmtModule/getList', data);
		},
		filterInit() {
			if (this.roleVal) {
				this.filterData.parentStoreId = this.storeSelectList[0].storeId;
				this.storeId = this.storeSelectList[0].storeId;
			}
			this.$store.commit('OpeningStoreMgmtModule/filterInit');
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
				this.storeSelectList = commonCodeList.storeList;
				this.filterData.parentStoreId = this.storeSelectList[0].storeId;
			}
		},
		// 개통점 list get
		async selectGetList(val) {
			this.storeId = val;
			const data = {
				parentStoreId: this.storeId,
			};
			await this.getList(data);
		},
	},
	async created() {
		await this.commonCodeListFnc();
		let data;
		if (this.roleVal) {
			data = {
				parentStoreId: this.storeSelectList[0].storeId,
			};
			this.storeId = this.storeSelectList[0].storeId;
		}
		await this.filterInit();
		await this.getList(data);
	},
};
</script>
