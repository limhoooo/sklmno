<template>
	<div class="posR">
		<work-status
			v-if="AppFormCreFlag !== undefined"
			:optionList="optionList"
			:formData="formData"
			@changeWorkStatusFnc="changeWorkStatusFnc"
		></work-status>
		<div>
			<div class="titleBtn1 checkStyleCont4 lh30">
				<input
					type="checkbox"
					id="ranking1"
					class="checkStyle"
					v-model.trim="formData.basic.priorityTargetYn"
					:true-value="'Y'"
					:false-value="'N'"
				/><label class="ml-1 mainBlack2 boldWt" for="ranking1"
					>우선순위대상</label
				>
			</div>
			<div
				class="borderRadi5Px borderContColor1 backColorWhite w1200 pad30 applStyle1 mt20"
			>
				<basic-information></basic-information>
			</div>
			<!--	기본정보		-->
			<div
				class="borderRadi5Px borderContColor1 backColorWhite w1200 pad30 applStyle1 mt20"
			>
				<customer-information></customer-information>
			</div>
			<!--	고객정보		-->
			<div
				class="borderRadi5Px borderContColor1 backColorWhite w1200 pad30 applStyle1 mt20"
			>
				<join-information></join-information>
			</div>
			<!--	가입정보		-->
			<div
				class="borderRadi5Px borderContColor1 backColorWhite w1200 pad30 applStyle1 mt20"
			>
				<payment-information></payment-information>
			</div>
			<!--	납부정보		-->
			<div
				class="borderRadi5Px borderContColor1 backColorWhite w1200 pad30 applStyle1 mt20"
			>
				<delivery-information></delivery-information>
			</div>
			<!--	배송정보		-->

			<div
				class="borderRadi5Px borderContColor1 backColorWhite w1200 pad30 applStyle1 mt20"
			>
				<etc-information></etc-information>
			</div>
			<!--	기타		-->
		</div>
		<!--		<div class="saveBtnCont formCont1 disFX">
			<button @click="formDataTestFnc">인풋 테스트용 버튼</button>
		</div>-->

		<div class="disFx justify-end mt10" v-if="AppFormCreFlag === undefined">
			<button
				class="backColorBlue2 mainWhite boldWt borderRadi3Px w120 lh40"
				@click="finalSubmit"
			>
				저장
			</button>
			<!--			<button
				class="backColorGray1 mainWhite boldWt borderRadi3Px w120 ml10"
				@click="insertCancelFnc"
			>
				초기화
			</button>-->
		</div>
		<div class="disFx justify-end mt10" v-else>
			<button
				class="backColorMint1 mainWhite boldWt borderRadi3Px w120 lh40"
				@click="openBlackListPop"
			>
				블랙리스트등록
			</button>
			<!--			<button
				class="backColorBlue2 mainWhite boldWt borderRadi3Px w120 lh40 ml10"
				@click="prevPage"
			>
				이전
			</button>-->
			<button
				class="backColorBlue2 mainWhite boldWt borderRadi3Px w120 ml10 mr30"
				@click="updateSubmit"
			>
				수정
			</button>
		</div>
		<BlackListPop
			:addBlackListInfo="addBlackListInfo"
			@closeDialog="closeDialogFnc"
			v-if="blackListPop"
		></BlackListPop>
	</div>
</template>

<script lang="ts">
import Vue from 'vue';
import BasicInformation from './ApplicationFormCreationComponents/BasicInformation.vue';
import CustomerInformation from './ApplicationFormCreationComponents/CustomerInformation.vue';
import PaymentInformation from './ApplicationFormCreationComponents/PaymentInformation.vue';
import JoinInformation from './ApplicationFormCreationComponents/JoinInformation.vue';
import DeliveryInformation from './ApplicationFormCreationComponents/DeliveryInformation.vue';
import EtcInformation from './ApplicationFormCreationComponents/EtcInformation.vue';
import {confirmFor, getToday, htmlParse, nullValidation2,} from '../../../common/common.js';
import {
  appCommonFormData,
  memoFormData,
} from '@/store/interface/supply-chain-mgmt/application-form-creation/AppFormCreationInterface';
import WorkStatus from '../../../views/supply-chain-mgmt/sell-mgmt/popup/QuickOpeningPop/WorkStatus.vue';
import BlackListPop from '../../../views/supply-chain-mgmt/black-list/popup/BlackListPop.vue';

interface dataType {
	customerVal: Array<string>;
	paymentVal: Array<string>;
	joinVal: Array<string>;
	deliveryVal: Array<string>;
	validationDialog: boolean;
	blackListPop: boolean;
	addBlackListInfo: any;
}

export default Vue.extend({
	name: 'ApplicationFormCreationTable',
	components: {
		BasicInformation, // 기본정보
		CustomerInformation, // 고객정보
		PaymentInformation, // 납부정보
		JoinInformation, // 가입정보
		DeliveryInformation, // 배송정보
		EtcInformation, // 기타정보
		WorkStatus, // 진행상태
		BlackListPop, // 블랙리스트 등록
	},
	data: (): dataType => ({
		customerVal: [], // 고객정보 validation
		paymentVal: [], // 납부정보 validation
		joinVal: [], // 가입정보 validation
		deliveryVal: [], // 배송정보 validation
		validationDialog: false,
		blackListPop: false,
		addBlackListInfo: {},
	}),
	computed: {
		AppFlag: {
			get(): any {
				return this.$store.state.ApplicationFormCreationModule.AppFlag;
			},
			set(newValue: any) {
				this.$store.state.ApplicationFormCreationModule.AppFlag = newValue;
			},
		},
		addServiceFormData: {
			get(): any {
				return this.$store.state.ApplicationFormCreationModule
					.addServiceFormData;
			},
			set(newValue: any) {
				this.$store.state.ApplicationFormCreationModule.addServiceFormData = newValue;
			},
		},
		updateFormData(): appCommonFormData {
			return this.$store.state.ApplicationFormCreationModule.updateFormData;
		},
		blackList: {
			get(): any {
				return this.$store.state.ApplicationFormCreationModule.blackList;
			},
			set(newValue: any) {
				this.$store.state.ApplicationFormCreationModule.blackList = newValue;
			},
		},
		formData: {
			get(): appCommonFormData {
				return this.$store.state.ApplicationFormCreationModule.formData;
			},
			set(newValue: appCommonFormData) {
				this.$store.state.ApplicationFormCreationModule.formData = newValue;
			},
		},
		memoData: {
			get(): memoFormData {
				return this.$store.state.ApplicationFormCreationModule.memoData;
			},
			set(newValue: memoFormData) {
				this.$store.state.ApplicationFormCreationModule.memoData = newValue;
			},
		},
		customerDialog(): any {
			return this.$store.state.ApplicationFormCreationModule.customerDialog;
		},
		AppFormCreFlag(): string {
			return this.$store.state.ApplicationFormCreationModule.AppFormCreFlag;
		},
		optionList(): any {
			return this.$store.state.ApplicationFormCreationModule.codeList;
		},
		thriftyPhone: {
			get(): number {
				return this.$store.state.ApplicationFormCreationModule.thriftyPhone;
			},
			set(newValue: number) {
				this.$store.state.ApplicationFormCreationModule.thriftyPhone = newValue;
			},
		},
		codeList: {
			get(): any {
				return this.$store.state.ApplicationFormCreationModule.codeList;
			},
			set(newValue: any) {
				this.$store.state.ApplicationFormCreationModule.codeList = newValue;
			},
		},
	},
	methods: {
		insertCancelFnc() {
			if (confirmFor('return')) {
				this.formDataResetFnc();
			}
		},
		setOpeningStoreFnc() {
			if (this.AppFormCreFlag !== undefined) {
				this.formData.basic.openingStoreId = {
					openStoreCode: this.updateFormData.basic.openingStoreId,
					openStoreTelecom: this.updateFormData.join.openingTelecomName,
					openStoreTelecomId: this.updateFormData.join.openingTelecomCodeId,
					parentHierarchy: this.updateFormData.basic.parentHierarchy,
					parentSaleStoreId: this.updateFormData.basic.parentSaleStoreId,
				};
			}
		},
		// 블랙리스트 등록
		openBlackListPop() {
			// const birthDate = this.getBirthData(
			// 	this.formData.customer.cusRegiNum1,
			// 	this.formData.customer.cusRegiNum2,
			// );
			const formData = {
				blackName: this.formData.customer.cusName,
				blackDateBirth: '',
				blackZipCode: this.formData.customer.cusZipCode,
				blackAddr: this.formData.customer.cusAddr,
				blackAddrDetail: this.formData.customer.cusAddrDetail,
				blackPhone1: this.formData.customer.cusPhone1,
				blackPhone2: this.formData.customer.cusPhone2,
				blackPhone3: this.formData.customer.cusPhone3,
			};
			this.addBlackListInfo = formData;
			this.blackListPop = !this.blackListPop;
		},
		// 블랙리스트등록시 넘겨줄 데이터 생년월일
		getBirthData(cusRegiNum1: any, cusRegiNum2: any) {
			let n1 = Number(cusRegiNum1.substring(0, 2));
			let n2 = Number(cusRegiNum2.substring(0, 1));
			let year;
			if (n2 === 1 || n2 === 2 || n2 === 5 || n2 === 6) {
				//뒤 첫째값이 1, 2, 5, 6일 경우(1900년대에 출생한 남녀)
				year = 1900 + n1;
			}
			if (n2 === 3 || n2 === 4 || n2 === 7 || n2 === 8) {
				//뒤 첫째값이 3, 4, 7, 8일 경우(2000년대에 출생한 남녀)
				year = 2000 + n1;
			}
			let month = cusRegiNum1.substring(2, 4);
			let day = cusRegiNum1.substring(4);
			return `${String(year)}-${month}-${day}`;
		},
		prevPage() {
			this.$router.push(`sell-status?prevPage=true`);
		},
		async finalSubmit() {
			// 신청서저장
			await this.resetValidation();
			if (this.validationRuleFnc()) return; // 필수값처리
			if (this.memoData.memoContents && this.memoData.category === '') {
				alert('메모에 대한 공개범위를 설정해주세요.');
				return;
			}
			if (confirm('저장하시겠습니까?')) {
				await this.insertFinalSubmit(); // submit
			}
			// await this.formDataResetFnc(); // 신청서 초기화
		},
		async updateSubmit() {
			await this.resetValidation();
			if (this.validationRuleFnc()) return; // 필수값처리
			await this.updateApplicationSubmit(); // submit
		},
		totalEnumFnc() {
			this.getSaleStoreList();
			this.commonCodeListFnc();
		},
		async getSaleStoreList() {
			await this.$store.dispatch(
				'ApplicationFormCreationModule/getSaleStoreList',
			);
		},
		async fileUploadFnc(data: any) {
			if (this.formData.etc.attachList.length !== 0) {
				let formData: any = new FormData();
				formData.append('applId', this.formData.etc.applId);
				for (let i = 0; i < this.formData.etc.attachList.length; i++) {
					if (this.formData.etc.attachList[i].applAttachId) {
						return;
					}
					formData.append('attachFile', this.formData.etc.attachList[i]);
					let fileHtml = []; // 파일 이력
					let fileObj: any = {
						title: '첨부파일',
						// @ts-ignore
						data: this.formData.etc.attachList[i].name,
						changeData: '추가',
					};
					fileHtml.push(fileObj);
					let fileHtmlString = htmlParse(fileHtml);
					formData.append('memoContents', fileHtmlString);
				}
				formData.append('taskMemoId', data);
				// 파일 이력
				await this.$store.dispatch(
					'ApplicationFormCreationModule/fileUpload',
					formData,
				);
			}
		},
		async commonCodeListFnc() {
			await this.$store.dispatch(
				'ApplicationFormCreationModule/getCommonCodeList',
			);
		},
		async insertFinalSubmit() {
			if (this.formData.payment.paymentType === 'EXIST_SAME') {
				this.formData.payment = {};
				this.formData.payment = { paymentType: 'EXIST_SAME' };
			}
			// 신청서 최초작성 일련번호 있을시 매칭타입 추가
			if (this.formData.join.deviceRawBarcode) {
				this.formData.join.deviceMatchingType = 'MATCHING_TYPE_NOT_STOCK';
			}
			if (this.formData.join.usimRawBarcode) {
				this.formData.join.usimMatchingType = 'MATCHING_TYPE_NOT_STOCK';
			}
			if (this.AppFormCreFlag === undefined) {
				this.formData.basic.consultTaskStatus = null; // 상담업무상태
				this.formData.basic.openingTaskStatus = null; // 개통업무상태
				this.formData.basic.logisticsTaskStatus = null; // 물류업무상태
			}
			if (this.formData.join.existTelecomCodeId === 1) {
				this.formData.join.existTelecomCodeId = this.thriftyPhone;
			}
			if (this.formData.basic.priorityTargetYn === true) {
				this.formData.basic.priorityTargetYn = 'Y';
			} else {
				this.formData.basic.priorityTargetYn = 'N';
			}
			let returnOpeningStoreId = this.formData.basic.openingStoreId;
			this.formData.basic.openingStoreId = this.formData.basic.openingStoreId.openStoreCode;
			let formData: any = this.formData;
			let memoData = { memo: this.memoData };
			if (
				(this.memoData.memoContents !== null, this.memoData.category !== '')
			) {
				Object.assign(formData, memoData);
			}
			const result = await this.$store.dispatch(
				'ApplicationFormCreationModule/insertList',
				formData,
			);
			if (result) {
				alert('완료됐습니다.');
				await this.$router.replace('sell-status');
				await this.fileUploadFnc(null); // fileUpload
				this.formData.basic.openingStoreId = returnOpeningStoreId;
			} else {
				this.formData.basic.openingStoreId = returnOpeningStoreId;
			}
		},
		async updateApplicationSubmit() {
			/*const data = objectCompare(this.formData, this.updateFormData);*/
			// for (let i = 0; i < this.formData.consultList.length; i++) {
			// 	if (this.formData.consultList[i].consultUserId === null) {
			// 		this.formData.consultList.splice(i, this.formData.consultList.length);
			// 	}
			// }
			if (confirmFor('modify')) {
				let returnOpeningStoreId = this.formData.basic.openingStoreId;
				this.formData.basic.openingStoreId = this.formData.basic.openingStoreId.openStoreCode;
				if (
					this.formData.customer.bizNum1 !== null ||
					this.formData.customer.bizNum2 !== null ||
					this.formData.customer.bizNum3 !== null
				) {
					this.formData.customer.bizNum =
						this.formData.customer.bizNum1 +
						this.formData.customer.bizNum2 +
						this.formData.customer.bizNum3;
				}
				if (this.formData.payment.paymentType === 'EXIST_SAME') {
					this.formData.payment = {};
					this.formData.payment = { paymentType: 'EXIST_SAME' };
				}
				if (this.formData.join.existTelecomCodeId === 1) {
					this.formData.join.existTelecomCodeId = this.thriftyPhone;
				}
				// 신청서 수정 일련번호 없을시 매칭타입 null 추가
				if (!this.formData.join.deviceRawBarcode) {
					this.formData.join.deviceMatchingType = null;
				}
				if (!this.formData.join.usimRawBarcode) {
					this.formData.join.usimMatchingType = null;
				}
				if (this.addServiceFormData.length > 0) {
					for (let i = 0; i < this.addServiceFormData.length; i++) {
						this.addServiceFormData[i][0].addSvcId = null;
						this.formData.join.addServiceList.push(
							this.addServiceFormData[i][0],
						);
					}
				}
				// 상태값 개통완료 철회완료시 날짜 삽입
				await this.openingTaskDateFnc(this.formData.basic.openingTaskStatus);
				const result = await this.$store.dispatch(
					'QuickOpeningPopModule/updateFormData',
					this.formData,
				);
				await this.fileUploadFnc(result.data.data);
				alert('수정됐습니다.');
				let data = {
					applId: this.formData.etc.applId,
				};
				await this.$store.dispatch('TaskHistoryModule/getHistoryList', data);
				let applId = { applId: this.AppFormCreFlag };
				await this.$store.dispatch(
					'ApplicationFormCreationModule/getApplicationDetail',
					applId,
				);
				this.formData.basic.openingStoreId = returnOpeningStoreId;
				await this.setOpeningStoreFnc();
				// changeDataText 뽑아내서 parse할 수 있는 형태로 변환하는 로직
				/*				this.formData.basic.openingStoreId = this.formData.basic.openingStoreId.openStoreCode;
				if (this.updateFormData.join.monthDvcAmt === '') {
					this.updateFormData.join.monthDvcAmt = 0;
				}
				if (this.updateFormData.join.etcDiscountAmt === '') {
					this.formData.join.etcDiscountAmt = 0;
					this.updateFormData.join.etcDiscountAmt = 0;
				}*/
				/*if (htmlParseData === '') {
					const result = await this.$store.dispatch(
						'ApplicationFormCreationModule/updateApplication',
						this.formData,
					);
					await this.fileUploadFnc(result.data.data);
				} else {
					Object.assign(memoData, this.formData);
					// update api 날리기
					const result = await this.$store.dispatch(
						'ApplicationFormCreationModule/updateApplication',
						memoData,
					);
					await this.setOpeningStoreFnc();
					await this.fileUploadFnc(result.data.data);
				}*/
				//todo: applId result로 잘 들어오는지 체크하기
				/*				if (result) {
					if (this.fileData.length !== 0) {
						await this.fileUploadFnc(1);
					}
					this.copiedFormData = {};
				}*/
			} else {
				return true;
			}
		},
		// null 체크
		validationRuleFnc() {
			if (this.basicValidationFnc()) return true; // 기본정보 필수값
			if (this.customerValidationFnc()) return true; // 고객정보 필수값
			if (this.customerAuthValidationFnc()) return true; // 고객정보 - 신분증진위 필수값
			if (this.joinValidationFnc()) return true; // 가입정보 필수값
			if (this.AppFlag > 28177 || !this.AppFlag) {
				if (this.paymentValidationFnc()) return true; // 납부정보 필수값
			}
			if (this.deliveryValidationFnc()) return true; // 배송정보 필수값
			/*if(this.etcValidationFnc()) return true; // 기타 필수값*/
		},
		// 기본정보 필수값
		basicValidationFnc() {
			if (
				!nullValidation2(this.formData.basic, [
					'saleStoreId', // 영업점
					'openingStoreId', // 개통점
					'applRegiUserId', // 등록자
				])
			) {
				return true;
			}
		},
		// 고객정보 필수값
		customerValidationFnc() {
			const cusTypeINDV = this.formData.customer.cusType === 'INDV'; //고객유형 - 개인
			const cusTypeMINORS = this.formData.customer.cusType === 'MINORS'; //고객유형 - 미성년자
			const cusTypeBSNM = this.customerDialog; //고객유형 - 개인사업자
			const cusTypeCORP = this.formData.customer.cusType === 'CORP'; //고객유형 - 법인
			const cusTypeFOREIGN = this.formData.customer.cusType === 'FOREIGN'; // 고객유형 - 외국인
			this.customerReset();
			if (cusTypeMINORS) {
				if (!nullValidation2(this.formData.customer, this.customerVal)) {
					return true;
				}
				// if (
				// 	!regiNumCheck(
				// 		this.formData.customer.courtProctorRegiNum1,
				// 		this.formData.customer.courtProctorRegiNum2,
				// 	)
				// ) {
				// 	alert('법정대리인 주민등록번호를 확인해주세요.');
				// 	return true;
				// }
			}
			if (cusTypeBSNM) {
				if (!nullValidation2(this.formData.customer, this.customerVal)) {
					return true;
				}
			}
			if (cusTypeCORP) {
				this.customerVal.splice(
					11,
					0,
					'bizName',
					'bizNum1',
					'bizNum2',
					'bizNum3',
					'bizPhone1',
					'bizPhone2',
					'bizPhone3',
					'bizRegiNum1',
					'bizRegiNum2',
					'cusName',
					'cusRegiNum1',
				);
				if (!nullValidation2(this.formData.customer, this.customerVal)) {
					return true;
				}
			}
			if (cusTypeFOREIGN) {
				this.customerVal.splice(11, 0, 'licenseNum1', 'licenseNum2');
				if (!nullValidation2(this.formData.customer, this.customerVal)) {
					return true;
				}
			}
			if (cusTypeINDV || this.formData.customer.cusType === 'INDV_BSNM') {
				if (!nullValidation2(this.formData.customer, this.customerVal)) {
					return true;
				}
			}
			if (!nullValidation2(this.formData.customer, this.customerVal)) {
				return true;
			}
			// if (
			// 	this.formData.customer.cusType !== 'CORP' && // 법인이 아닐시에만
			// 	!regiNumCheck(
			// 		this.formData.customer.cusRegiNum1,
			// 		this.formData.customer.cusRegiNum2,
			// 	)
			// ) {
			// 	alert('고객 주민등록번호를 확인해주세요.');
			// 	return true;
			// }
		},
		customerAuthValidationFnc() {
			this.customerReset();

			const REGI = this.formData.customer.licenseAuthType === 'REGI_RGSTR_CARD'; // 신분증진위 - 주민등록증
			const DRIVER =
				this.formData.customer.licenseAuthType === 'DRIVER_LICENSE'; // 신분증진위 - 운전면허증
			const DSBL = this.formData.customer.licenseAuthType === 'DSBL_RGSTR_CARD'; // 신분증진위 - 장애인등록증
			const NTNL = this.formData.customer.licenseAuthType === 'NTNL_CARD'; // 신분증진위 - 국가유공자증
			const FOREIGN =
				this.formData.customer.licenseAuthType === 'FOREIGN_RGSTR_CARD'; // 신분증진위 - 외국인등록증
			if (REGI) {
				this.customerVal.push('licenseIssueDate');
				if (!nullValidation2(this.formData.customer, this.customerVal)) {
					return true;
				}
			}
			if (DRIVER) {
				this.customerVal.push(
					'licenseIssueDate',
					'licenseIssueArea',
					'licenseNum1',
					'licenseNum2',
					'licenseNum3',
				);
				if (!nullValidation2(this.formData.customer, this.customerVal)) {
					return true;
				}
			}
			if (DSBL) {
				this.customerVal.push('licenseIssueDate');
				if (!nullValidation2(this.formData.customer, this.customerVal)) {
					return true;
				}
			}
			if (NTNL) {
				this.customerVal.push('licenseIssueDate');
				if (!nullValidation2(this.formData.customer, this.customerVal)) {
					return true;
				}
			}
			if (FOREIGN) {
				this.customerVal.push(
					'licenseNum1',
					'licenseNum2',
					'licenseIssueDate',
					'licenseExpiredDate',
					'stayCode',
					'ntnlCode',
				);
				if (!nullValidation2(this.formData.customer, this.customerVal)) {
					return true;
				}
			}
			if (!nullValidation2(this.formData.customer, this.customerVal)) {
				return true;
			}
		},
		// 납부정보 필수값
		paymentValidationFnc() {
			this.paymentReset();
			const EXIST = this.formData.payment.paymentType === 'EXIST_SAME'; // 납부방법 -기존과동일
			const ACCOUNT = this.formData.payment.paymentType === 'ACC_TRNS'; // 납부방법 - 계좌이체
			const CARD = this.formData.payment.paymentType === 'CARD_PAY'; // 납부방법 - 카드
			const GIRO = this.formData.payment.paymentType === 'GIRO'; // 납부방법 - 지로
			if (EXIST) {
				this.paymentVal = [];
				if (!nullValidation2(this.formData.payment, this.paymentVal)) {
					return true;
				}
			}
			if (ACCOUNT) {
				this.paymentVal.push(
					'bankCode',
					'accountNum',
					'accountHolderName',
					'accountHolderBirth',
					'accountHolderRelation',
				);
				if (!nullValidation2(this.formData.payment, this.paymentVal)) {
					return true;
				}
			}
			if (CARD) {
				this.paymentVal.push(
					'cardCompanyCode',
					'cardNum1',
					'cardNum2',
					'cardNum3',
					'cardNum4',
					'cardHolderName',
					'cardHolderRegiNum1',
					'cardHolderRegiNum2',
					'cardValidityMm',
					'cardValidityYy',
				);
				if (!nullValidation2(this.formData.payment, this.paymentVal)) {
					return true;
				}
			}
			if (GIRO) {
				this.paymentVal.push('giroZipCode', 'giroAddr', 'giroAddrDetail');
				if (!nullValidation2(this.formData.payment, this.paymentVal)) {
					return true;
				}
			}
			if (!nullValidation2(this.formData.payment, this.paymentVal)) {
				return true;
			}
		},
		// 가입정보 필수값
		joinValidationFnc() {
			this.joinReset();
			const chipPhone =
				this.formData.join.existTelecomCodeId === 1 && this.thriftyPhone === 0;
			if (chipPhone) {
				alert('알뜰폰을 입력해주세요.');
				return true;
			}
			const NUM_CHANGE = this.formData.join.joinType === 'NUM_CHANGE'; // 번호이동
			if (NUM_CHANGE) {
				if (this.formData.join.numChangeAuthType !== 'GIRO') {
					this.joinVal.splice(
						6,
						0,
						'numChangeAuthType', // 인증방식
						'numChangeAuthTypeNum', // 인증번호
					);
				} else {
					this.joinVal.splice(
						6,
						0,
						'numChangeAuthType', // 인증방식
					);
				}
				if (!nullValidation2(this.formData.join, this.joinVal)) {
					return true;
				}
			}
			if (!nullValidation2(this.formData.join, this.joinVal)) {
				return true;
			}
			if (this.$store.state.ApplicationFormCreationModule.deviceChange) {
				alert('변경된 기기일련번호 저장을 해주세요.');
				return true;
			}
			if (this.$store.state.ApplicationFormCreationModule.usimChange) {
				alert('변경된 유심일련번호 저장을 해주세요.');
				return true;
			}
		},
		// 배송정보 필수값
		deliveryValidationFnc() {
			this.deliveryReset();
			const PS = this.formData.delivery.deliveryType === 'PS'; // 배송정보
			const PS_SALES = this.formData.delivery.deliveryType === 'PS_SALES'; // 자체발송
			if (PS) {
				if (
					this.formData.delivery.invoiceNum &&
					!this.formData.delivery.courierCodeId
				) {
					alert('택배사를 입력해주세요.');
					return true;
				}
				this.deliveryVal.push(
					'deliveryZipCode', // 우편번호
					'deliveryAddr', // 기본주소
					'deliveryAddrDetail', // 상세주소
				);
				if (!nullValidation2(this.formData.delivery, this.deliveryVal)) {
					return true;
				}
			}
			if (PS_SALES) {
				if (
					this.formData.delivery.invoiceNum &&
					!this.formData.delivery.courierCodeId
				) {
					alert('택배사를 입력해주세요.');
					return true;
				}
			}
			if (!nullValidation2(this.formData.delivery, this.deliveryVal)) {
				return true;
			}
		},
		// 기타 필수값
		etcValidationFnc() {
			if (!nullValidation2(this.formData.etc)) {
				return true;
			}
		},
		resetValidation() {
			this.customerReset();
			this.paymentReset();
			this.joinReset();
			this.deliveryReset();
		},
		customerReset() {
			this.customerVal = [];
			if (this.formData.customer.cusType === 'CORP') {
				// 법인
				this.customerVal.push(
					'chargeReductType', // 요금감면
					'cusPhone1', // 휴대폰번호
					'cusPhone2', // 휴대폰번호
					'cusPhone3', // 휴대폰번호
					'cusZipCode', // 고객우편번호
					'cusAddr', // 고객기본주소
					'cusAddrDetail', // 고객상세주소
					'cusType', // 고객유형
					// 'licenseAuthType', // 신분증진위
				);
			} else if (this.formData.customer.cusType === 'INDV_BSNM') {
				this.customerVal.push(
					'cusType', // 고객유형
					'cusName', // 고객이름
					'cusRegiNum1', // 사업자 등록번호
					'chargeReductType', // 요금감면
					'cusPhone1', // 휴대폰번호
					'cusPhone2', // 휴대폰번호
					'cusPhone3', // 휴대폰번호
					'cusZipCode', // 고객우편번호
					'cusAddr', // 고객기본주소
					'cusAddrDetail', // 고객상세주소
					// 'licenseAuthType', // 신분증진위
				);
			} else if (this.formData.customer.cusType === 'FOREIGN') {
				this.customerVal.push(
					'cusName', // 고객명
					'chargeReductType', // 요금감면
					'cusPhone1', // 휴대폰번호
					'cusPhone2', // 휴대폰번호
					'cusPhone3', // 휴대폰번호
					'cusZipCode', // 고객우편번호
					'cusAddr', // 고객기본주소
					'cusAddrDetail', // 고객상세주소
					'cusType', // 고객유형
				);
			} else if (this.formData.customer.cusType === 'MINORS') {
				this.customerVal.push(
					'cusType', // 고객유형
					'courtProctorRelation', // 법정대리인 관계
					'courtProctorName', // 법정대리인명
					'courtProctorRegiNum1', // 법정대리인 주민번호
					'courtProctorRegiNum2', // 법정대리인 주민번호
					'courtProctorPhone1', // 법정대리인 전화번호
					'courtProctorPhone2', // 법정대리인 전화번호
					'courtProctorPhone3', // 법정대리인 전화번호
					'cusName', // 고객명
					'cusRegiNum1', // 주민등록번호
					'chargeReductType', // 요금감면
					'cusPhone1', // 휴대폰번호
					'cusPhone2', // 휴대폰번호
					'cusPhone3', // 휴대폰번호
					'cusZipCode', // 고객우편번호
					'cusAddr', // 고객기본주소
					'cusAddrDetail', // 고객상세주소
					// 'licenseAuthType', // 신분증진위
				);
			} else {
				this.customerVal.push(
					'cusName', // 고객명
					'cusRegiNum1', // 주민등록번호
					'chargeReductType', // 요금감면
					'cusPhone1', // 휴대폰번호
					'cusPhone2', // 휴대폰번호
					'cusPhone3', // 휴대폰번호
					'cusZipCode', // 고객우편번호
					'cusAddr', // 고객기본주소
					'cusAddrDetail', // 고객상세주소
					'cusType', // 고객유형
					// 'licenseAuthType', // 신분증진위
				);
			}
		},
		paymentReset() {
			this.paymentVal = [];
			this.paymentVal.push(
				'paymentType', // 납부방법
				'billType', // 청구서종류
			);
		},
		joinReset() {
			this.joinVal = [];
			if (this.AppFlag > 28177 || !this.AppFlag) {
				this.joinVal.push(
					'openingPhone1', // 개통휴대폰번호
					'openingPhone2', // 개통휴대폰번호
					'openingPhone3', // 개통휴대폰번호
					'openingTelecomCodeId', // 개통통신사
					'existTelecomCodeId', // 기존통신사
					'joinType', // 가입유형
					'goodsId', // 기기명
					'capacity', // 용량
					'color', // 색상
					'usimPaymentType', // 유심
					'agreementType', // 약정유형
					'agreementPeriodType', // 약정기간
					'instlPeriodType', // 할부기간
					'chargeId', // 요금제
					'releaseAmt', // 출고가
				);
			}
			if (this.AppFlag <= 28177) {
				this.joinVal.push(
					'openingPhone1', // 개통휴대폰번호
					'openingPhone2', // 개통휴대폰번호
					'openingPhone3', // 개통휴대폰번호
					'openingTelecomCodeId', // 개통통신사
					'existTelecomCodeId', // 기존통신사
					'joinType', // 가입유형
					'goodsId', // 기기명
					'usimPaymentType', // 유심
					'agreementType', // 약정유형
					'agreementPeriodType', // 약정기간
					'instlPeriodType', // 할부기간
					'chargeId', // 요금제
				);
			}
			if (this.formData.join.joinType === 'NEW') {
				this.joinVal.splice(0, 3, 'openingHopeNum');
			}
		},
		deliveryReset() {
			this.deliveryVal = [];
			this.deliveryVal.push('deliveryType');
		},
		formDataTestFnc() {
			this.formData.basic.openingDate = null;
			this.formData.basic.cancelDate = null;
			this.formData.basic.beforeOpeningType = 'BEFORE_OPENING';
			this.formData.basic.applRegiUserId = null;
			this.formData.basic.openingStoreId = 0;
			this.formData.basic.consultTaskStatus = 'RCPT_PROG';
			this.formData.basic.openingTaskStatus = 'OPENING_DMND_OPENING';
			this.formData.basic.logisticsTaskStatus = 'DLVR_DMND';
			this.formData.customer.cusName = '김동식';
			this.formData.customer.cusRegiNum1 = '900722';
			this.formData.customer.cusRegiNum2 = '1187314';
			this.formData.customer.chargeReductType = 'NONE';
			this.formData.customer.cusPhone1 = '010';
			this.formData.customer.cusPhone2 = '7133';
			this.formData.customer.cusPhone3 = '7270';
			this.formData.customer.emgPhone1 = '010';
			this.formData.customer.emgPhone2 = '7133';
			this.formData.customer.emgPhone3 = '7270';
			this.formData.customer.cusEmail = 'whfh1118@naver.com';
			this.formData.customer.cusZipCode = '28787';
			this.formData.customer.cusAddr = '충북 청주시 상당구 1순환로 1202-1';
			this.formData.customer.cusAddrDetail = '테스트';
			this.formData.customer.cusType = 'INDV';
			this.formData.customer.licenseAuthType = 'REGI_RGSTR_CARD';
			this.formData.customer.licenseIssueDate = '2021-07-01';
			this.formData.payment.paymentType = 'ACC_TRNS';
			this.formData.payment.billType = 'MOBILE_BILL';
			this.formData.payment.bankCode = 'BANK_0001';
			this.formData.payment.accountNum = '1';
			this.formData.payment.accountHolderName = '김영조';
			this.formData.payment.accountHolderBirth = '1962-03-27';
			this.formData.payment.accountHolderRelation = '부';
			this.formData.join.openingPhone1 = '010';
			this.formData.join.openingPhone2 = '7133';
			this.formData.join.openingPhone3 = '7270';
			this.formData.join.openingHopeNum = '6621';
			this.formData.join.existTelecomCodeId = '43';
			this.formData.join.joinType = 'NEW';
			this.formData.join.deviceRawBarcode = '11111';
			this.formData.join.usimPaymentType = 'EXIST';
			this.formData.join.usimRawBarcode = '11111';
			this.formData.join.agreementType = 'CHOICE_AGRMN';
			this.formData.join.agreementPeriodType = 'MONTH_12';
			this.formData.join.instlPeriodType = 'CASH';
			this.formData.join.extraSupportAmt = 0;
			this.formData.join.freeInstlAmt = 0;
			this.formData.join.etcDiscountAmt = 0;
			this.formData.join.actualSellAmt = 0;
			this.formData.join.monthDvcAmt = 0;
			this.formData.join.monthBasicAmt = 0;
			this.formData.join.monthPaymentAmt = 0;
			this.formData.join.depositAmt = 0;
			this.formData.join.depositYn = 'Y';
			this.formData.join.usimPaymentType = 'PRE_PAY';
			this.formData.delivery.deliveryType = 'QUICK';
			this.formData.etc.giftEnclosedYn = 'Y';
			this.formData.etc.giftList[0].giftName = '1111';
			this.formData.etc.usedDvcReclaimYn = 'Y';
			this.formData.etc.usedDvcModelName = '1111';
			this.formData.etc.usedDvcCompe = '1111';
			this.formData.etc.attachList = [];
		},
		formDataResetFnc() {
			this.blackList = '';
			this.$store.state.ApplicationFormCreationModule.paymentCheckType = false;
			this.formData.basic.openingDate = null;
			this.formData.basic.cancelDate = null;
			this.formData.basic.beforeOpeningType = 'BEFORE_OPENING';
			this.formData.basic.applType = 'DVC_USIM'; // 개통종류
			this.formData.basic.saleStoreId = 0; // 영업점
			this.formData.basic.openingStoreId = 0; // 개통점
			this.formData.basic.applRegiUserId = 0; // 신청서등록자
			this.formData.basic.consultTaskStatus = null; // 상담업무상태
			this.formData.basic.openingTaskStatus = null; // 개통업무상태
			this.formData.basic.logisticsTaskStatus = null; // 물류업무상태
			this.formData.basic.delYn = null; // 삭제여부
			this.formData.basic.docTargetYn = 'N'; // 서류대상여부
			this.formData.basic.parentApplId = null; // 부모신청서아이디
			this.formData.basic.priorityTargetYn = false; // 우선대상여부
			this.formData.basic.regiDatetime = null; // 등록일시
			this.formData.basic.updDateTime = null; //수정일시
			this.formData.basic.parentHierarchy = null; // 상위계층
			this.formData.basic.parentSaleStoreId = null; // 상위 영업 관리점 아이디
			this.formData.customer.cusName = null; // 고객명
			this.formData.customer.cusRegiNumConcat = null; // 고객주민등록번호
			this.formData.customer.cusRegiNum1 = null; // 고객주민등록번호
			this.formData.customer.cusRegiNum2 = null; // 고객주민등록번호
			this.formData.customer.chargeReductType = 'NONE'; // 요금감면
			this.formData.customer.cusPhone = null; // 휴대폰번호
			this.formData.customer.cusPhone1 = null; // 휴대폰번호
			this.formData.customer.cusPhone2 = null; // 휴대폰번호
			this.formData.customer.cusPhone3 = null; // 휴대폰번호
			this.formData.customer.emgPhone = null; // 비상연락망
			this.formData.customer.emgPhone1 = null; // 비상연락망
			this.formData.customer.emgPhone2 = null; // 비상연락망
			this.formData.customer.emgPhone3 = null; // 비상연락망
			this.formData.customer.cusEmail = null; // 이메일
			this.formData.customer.cusAddr = null; // 고객기본주소
			this.formData.customer.cusAddrDetail = null; // 고객상세주소
			this.formData.customer.cusZipCode = null; // 고객우편번호
			this.formData.customer.cusType = 'INDV'; // 고객유형
			this.formData.customer.courtProctorName = null; // 법정대리인명
			this.formData.customer.courtProctorRegiNumConcat = null; // 법정대리인주민등록번호
			this.formData.customer.courtProctorRegiNum1 = null; // 법정대리인주민등록번호
			this.formData.customer.courtProctorRegiNum2 = null; // 법정대리인주민등록번호
			this.formData.customer.courtProctorPhone = null; // 법정대리인연락처
			this.formData.customer.courtProctorPhone1 = null; // 법정대리인연락처
			this.formData.customer.courtProctorPhone2 = null; // 법정대리인연락처
			this.formData.customer.courtProctorPhone3 = null; // 법정대리인연락처
			this.formData.customer.courtProctorRelation = null; // 법정대리인관계
			this.formData.customer.bizName = null; // 사업자명
			this.formData.customer.bizNum1 = null; // 사업자번호
			this.formData.customer.bizNum2 = null; // 사업자번호
			this.formData.customer.bizNum3 = null; // 사업자번호
			this.formData.customer.bizPhone = null; // 사업자연락처
			this.formData.customer.bizPhone1 = null; // 사업자연락처
			this.formData.customer.bizPhone2 = null; // 사업자연락처
			this.formData.customer.bizPhone3 = null; // 사업자연락처
			this.formData.customer.bizRegiNum1 = null; // 법인등록번호
			this.formData.customer.bizRegiNum2 = null; // 법인등록번호
			this.formData.customer.licenseAuthType = null; // 신분증진위
			this.formData.customer.licenseIssueDate = null; // 발급일자
			this.formData.customer.licenseExpiredDate = null; // 만료일자
			this.formData.customer.licenseIssueArea = null; // 만료일자
			this.formData.customer.licenseNum1 = null; // 면허번호
			this.formData.customer.licenseNum2 = null; // 면허번호
			this.formData.customer.licenseNum3 = null; // 면허번호
			this.formData.customer.stayCode = null; // 체류코드
			this.formData.customer.ntnlCode = null; // 국가
			this.formData.payment.paymentType = 'ACC_TRNS'; // 납부방법
			this.formData.payment.billType = ''; // 청구서종류
			this.formData.payment.bankCode = ''; // 은행정보
			this.formData.payment.accountNum = null; // 계좌번호
			this.formData.payment.accountHolderName = null; // 예금주
			this.formData.payment.accountHolderBirth = null; // 생년월일
			this.formData.payment.accountHolderRelation = null; // 관계
			this.formData.payment.cardCompanyCode = null; // 카드정보
			this.formData.payment.cardNum1 = null; // 카드번호
			this.formData.payment.cardNum2 = null; // 카드번호
			this.formData.payment.cardNum3 = null; // 카드번호
			this.formData.payment.cardNum4 = null; // 카드번호
			this.formData.payment.cardHolderName = null; // 카드주
			this.formData.payment.cardHolderRegiNum1 = null; // 주민등록번호
			this.formData.payment.cardHolderRegiNum2 = null; // 주민등록번호
			this.formData.payment.cardValidityMm = null; // 유효기간MM
			this.formData.payment.cardValidityYy = null; // 유효기간YY
			this.formData.payment.giroZipCode = null; // 우편번호
			this.formData.payment.giroAddr = null; // 기본주소
			this.formData.payment.giroAddrDetail = null; // 상세주소
			this.formData.join.openingPhone1 = null; // 개통휴대폰번호
			this.formData.join.openingPhone2 = null; // 개통휴대폰번호
			this.formData.join.openingPhone3 = null; // 개통휴대폰번호
			this.formData.join.openingHopeNum = null; // 개통희망번호
			this.formData.join.openingTelecomCodeId = null; // 개통통신사
			this.formData.join.openingTelecomName = null; // 개통통신사
			this.formData.join.existTelecomCodeId = 45; // 기존통신사
			this.formData.join.joinType = 'NEW'; // 가입유형
			this.formData.join.numChangeAuthType = null; // 인증방식
			this.formData.join.numChangeAuthTypeNum = null; // 인증번호
			this.formData.join.goodsId = null; // 기기명
			this.formData.join.dvcId = null; // 기기명
			this.formData.join.usimDvcId = null; // 기기명
			this.formData.join.goodsId = null; // 기기명
			this.formData.join.capacity = ''; // 용량
			this.formData.join.color = ''; // 색상
			this.formData.join.modelName = null; // 모델네임
			this.formData.join.deviceRawBarcode = null; // 기기일련번호
			this.formData.join.usimPaymentType = ''; // 유심
			this.formData.join.usimRawBarcode = null; // 유심일련번호
			this.formData.join.usimType = 'NANO_USIM'; //
			this.formData.join.agreementType = 'CHOICE_AGRMN'; // 약정유형
			this.formData.join.agreementPeriodType = ''; // 약정기간
			this.formData.join.instlPeriodType = ''; // 할부기간
			this.formData.join.chargeId = null; // 요금제
			this.formData.join.addServiceList = []; // 부가서비스리스트
			this.formData.join.releaseAmt = 0; // 출고가
			this.formData.join.releaseAmtDate = null; // 출고가일자
			this.formData.join.openingPhone = ''; // 개통휴대폰번호
			this.formData.join.pubNotiSupportAmt = 0; // 공시지원금
			this.formData.join.extraSupportAmt = 0; // 추가지원금
			this.formData.join.freeInstlAmt = 0; // 프리할부/선수납
			this.formData.join.etcDiscountAmt = 0; // 기타할인금
			this.formData.join.actualSellAmt = 0; // 실판매가
			this.formData.join.monthDvcAmt = 0; // 월기기금액
			this.formData.join.monthBasicAmt = 0; // 월기본료
			this.formData.join.monthPaymentAmt = 0; // 월납부금액
			this.formData.join.deviceMatchingType = null; // 기기매칭타입
			this.formData.join.usimMatchingType = null; // 유심매칭타입
			this.formData.join.depositAmt = 0; // 입금받을금액
			this.formData.join.depositYn = 'N'; // 입금여부
			this.formData.join.pubNotiId = 0; // 공시알림아이디
			this.formData.delivery.deliveryType = 'PS'; // 배송구분
			this.formData.delivery.courierCodeId = 30; // 택배사 (우체국 디폴트)
			this.formData.delivery.invoiceNum = null; // 송장번호
			this.formData.delivery.deliveryZipCode = null; // 우편번호
			this.formData.delivery.deliveryAddr = null; // 기본주소
			this.formData.delivery.deliveryAddrDetail = null; // 상세주소
			this.formData.delivery.couriorMatchingYn = null; // 상세주소
			this.formData.etc.giftEnclosedYn = 'N'; // 사은품동봉여부
			this.formData.etc.giftList[0].giftName = null; // 사은품
			this.formData.etc.usedDvcReclaimYn = 'N'; // 중고폰회수여부
			this.formData.etc.usedDvcModelName = null; // 중고폰모델명
			this.formData.etc.usedDvcCompe = null; // 중고보상
			this.formData.etc.attachList = []; // 파일추가
			this.formData.consultList[0].consultUserId = null;
			this.formData.consultList[1].consultUserId = null;
			this.formData.consultList[2].consultUserId = null;
			this.memoData.category = ''; // 메모공개범위
			this.memoData.memoContents = null; // 메모내용
			this.codeList.chargeReductTypeItems = []; // 요금감면
			this.codeList.customerTypeItems = []; // 고객유형
			this.codeList.licenseAuthTypeItems = []; // 신분증진위
			this.codeList.stayCodeItems = []; // 체류코드
			this.codeList.driverAreaCodeItems = []; // 운전면허지역코드 (앞자리)
			this.codeList.billTypeItems = []; // 청구서종류
			this.codeList.bankCodeItems = []; // 은행정보
			this.codeList.cardCompanyCodeItems = []; // 카드정보
			this.codeList.joinTypeItems = []; // 가입유형
			this.codeList.numChangeAuthTypeItems = []; // 인증방식
			this.codeList.usimPaymentTypeItems = []; // 유심방식
			this.codeList.agreementPeriodTypeItems = []; // 약정기간
			this.codeList.installmentsPeriodTypeItems = []; // 할부기간
			this.codeList.courierCodeItems = []; // 택배사코드
			this.codeList.goodsItems = []; // 기기명
			this.codeList.capacityItems = []; // 용량
			this.codeList.colorItems = []; // 색상
			this.codeList.saleStoreItems = []; // 영업점
			this.codeList.openingStoreItems = []; // 개통점
			this.codeList.telecomAddServiceItems = []; // 부가서비스
			this.codeList.telecomChargeItems = []; // 요금제
			this.codeList.existTelecomItems = []; // 기존통신사
			this.codeList.thriftyPhoneItems = []; // 알뜰폰리스트
			this.codeList.storeMemberItems = []; // 등록자
			this.codeList.pubNotiInfoItems = []; // 요금제 조회
			this.codeList.nationalCodeItems = []; // 국가코드
			this.codeList.ConsultTaskStatusList = []; // 업무진행상태
			this.codeList.OpeningTaskStatusList = []; // 업무진행상태
			this.codeList.LogisticsTaskStatusList = []; // 업무진행상태
			this.codeList.detailList = []; // 블랙리스트
			this.codeList.counselorItems = []; // 상담원
		},
		closeDialogFnc(data: any, dialogName: any) {
			// 모달 닫기 emit
			this.$set(this, dialogName, data);
		},
		async changeWorkStatusFnc(data: any) {
			// 상태 변경 불가시 fasle
			const check = await this.statusFalseFnc(data);
			if (!check) {
				return;
			}
			if (data.value === 'OPENING_COMPL') {
				// 개통완료일시 우선순위대상 N 처리
				this.formData.basic.priorityTargetYn = 'N';
			}
			// 신청서 업데이트
			await this.updateFalseFnc(data);
		},
		async statusFalseFnc(data: any) {
			let formData;
			/*if (data.name === 'consultTaskStatus') {
    formData = {
      applId: this.formData.basic.applId,
      consultTaskStatus: data.beforeValue,
      reqConsultTaskStatus: data.value,
      openingTaskStatus: this.formData.basic.openingTaskStatus,
      reqOpeningTaskStatus: this.formData.basic.openingTaskStatus,
      logisticsTaskStatus: this.formData.basic.logisticsTaskStatus,
      reqLogisticsTaskStatus: this.formData.basic.logisticsTaskStatus,
      task: 'consult',
    };
  } else if (data.name === 'openingTaskStatus') {
    formData = {
      applId: this.formData.basic.applId,
      consultTaskStatus: this.formData.basic.consultTaskStatus,
      reqConsultTaskStatus: this.formData.basic.consultTaskStatus,
      openingTaskStatus: data.beforeValue,
      reqOpeningTaskStatus: data.value,
      logisticsTaskStatus: this.formData.basic.logisticsTaskStatus,
      reqLogisticsTaskStatus: this.formData.basic.logisticsTaskStatus,
      task: 'opening',
    };
  } else if (data.name === 'logisticsTaskStatus') {
    formData = {
      applId: this.formData.basic.applId,
      consultTaskStatus: this.formData.basic.consultTaskStatus,
      reqConsultTaskStatus: this.formData.basic.consultTaskStatus,
      openingTaskStatus: this.formData.basic.openingTaskStatus,
      reqOpeningTaskStatus: this.formData.basic.openingTaskStatus,
      logisticsTaskStatus: data.beforeValue,
      reqLogisticsTaskStatus: data.value,
      task: 'logistics',
    };
  }*/
			/*if (this.$store.state.st !== '22f353197e9b0c1cb58a11da8de7776a') {
				if (data.name === 'consultTaskStatus') {
					if (data.value === 'RCPT_CANCEL') {
						alert('현재 접수취소 상태를 사용하실수 없습니다.');
						// @ts-ignore
						this.formData.basic[data.name] = data.beforeValue;
						return false;
					}
				}
				if (data.name === 'logisticsTaskStatus') {
					if (data.value === 'DLVR_PREV_CANCEL') {
						alert('현재 배송전취소 상태를 사용하실수 없습니다.');
						// @ts-ignore
						this.formData.basic[data.name] = data.beforeValue;
						return false;
					}
				}
			}*/

      // 상담 : 접수취소 예외값
      // 운송장 매칭 되어있는 경우 x
      // 기기매칭 / 유심매칭 되어있는경우 x
			if (data.name === 'consultTaskStatus') { // 상담
				if (data.value === 'RCPT_CANCEL') { // 접수취소
					if (this.formData.delivery.couriorMatchingYn === 'Y') {
						alert('운송장 매칭이 되어있는경우 접수취소 로 돌릴 수 없습니다.');
						// @ts-ignore
						this.formData.basic[data.name] = data.beforeValue;
						return false;
					}
					if (
						this.formData.join.deviceMatchingType !== null ||
						this.formData.join.usimMatchingType !== null
					) {
						alert(
							'기기매칭 또는 유심매칭 되어있는경우 접수취소 로 돌릴 수 없습니다.',
						);
						// @ts-ignore
						this.formData.basic[data.name] = data.beforeValue;
						return false;
					}
				}
			}
      // 물류 : 배송전취소 예외값
      // 운송장 매칭 되어있는 경우 x
      // 기기매칭 / 유심매칭 되어있는경우 x
			if (data.name === 'logisticsTaskStatus') {
				if (data.value === 'DLVR_PREV_CANCEL') {
          if (this.formData.delivery.couriorMatchingYn === 'Y') {
            alert('운송장 매칭이 되어있는경우 배송전취소 로 돌릴 수 없습니다.');
            // @ts-ignore
            this.formData.basic[data.name] = data.beforeValue;
            return false;
          }
          if (
              this.formData.join.deviceMatchingType !== null ||
              this.formData.join.usimMatchingType !== null
          ) {
            alert(
                '기기매칭 또는 유심매칭 되어있는경우 배송전취소 로 돌릴 수 없습니다.',
            );
            // @ts-ignore
            this.formData.basic[data.name] = data.beforeValue;
            return false;
          }
				}
			}

			if (data.name === 'openingTaskStatus') {
				// 개통
				formData = {
					applId: this.formData.basic.applId,
					consultTaskStatus: this.formData.basic.consultTaskStatus,
					reqConsultTaskStatus: this.formData.basic.consultTaskStatus,
					openingTaskStatus: data.beforeValue,
					reqOpeningTaskStatus: data.value,
					logisticsTaskStatus: this.formData.basic.logisticsTaskStatus,
					reqLogisticsTaskStatus: this.formData.basic.logisticsTaskStatus,
					invoiceNum: this.formData.delivery.invoiceNum,
					task: 'opening',
				};
			} else if (data.name === 'logisticsTaskStatus') {
				// 물류
				formData = {
					applId: this.formData.basic.applId,
					consultTaskStatus: this.formData.basic.consultTaskStatus,
					reqConsultTaskStatus: this.formData.basic.consultTaskStatus,
					openingTaskStatus: this.formData.basic.openingTaskStatus,
					reqOpeningTaskStatus: this.formData.basic.openingTaskStatus,
					logisticsTaskStatus: data.beforeValue,
					reqLogisticsTaskStatus: data.value,
					invoiceNum: this.formData.delivery.invoiceNum,
					task: 'logistics',
				};
			} else {
				// 상담일시 return
				return true;
			}
			// api 날리고
			const result = await this.$store.dispatch(
				'checkApplicationStatusUpdateFlag',
				formData,
			);
			if (result === false || result === undefined) {
				// @ts-ignore
				this.formData.basic[data.name] = data.beforeValue;
				return false;
			}
			return true;
		},
		async updateFalseFnc(data: any) {
			if (await this.updateApplicationSubmit()) {
				// 저장 취소시 예전값으로 변경
				// @ts-ignore
				this.formData.basic[data.name] = data.beforeValue;
			}
		},
		openingTaskDateFnc(data: any) {
			if (data === 'OPENING_COMPL' && !this.formData.basic.openingDate) {
				//개통완료 && 개통일자가 없을시
				this.formData.basic.openingDate = getToday();
			} else if (data === 'RETRACT_COMPL' && !this.formData.basic.cancelDate) {
				//철회완료 && 철회일자가 없을시
				this.formData.basic.cancelDate = getToday();
			} else if (
				this.formData.basic.openingDate &&
				data !== 'OPENING_COMPL' &&
				data !== 'RETRACT_DMND' &&
				data !== 'RETRACT_COMPL'
			) {
				// 개통일자 값이 있는데
				// 개통상태가 개통완료, 철회요청, 철회완료가 아닐시
				// 개통일자 초기화
				this.formData.basic.openingDate = null;
			}
			if (this.formData.basic.cancelDate && data !== 'RETRACT_COMPL') {
				// 철회일자 값이 있는데
				// 개통상태가 철회완료가 아닐시
				// 철회일자 초기화
				this.formData.basic.cancelDate = null;
			}
		},
	},
	async created() {
		if (!this.AppFormCreFlag) {
			await this.formDataResetFnc();
		}
		await this.resetValidation();
		await this.totalEnumFnc();
	},
});
</script>

<style scoped>
.titleBtn1 {
	position: absolute;
	left: 1075px;
	top: 40px;
}
</style>
