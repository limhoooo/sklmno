import Vue from 'vue';
import Vuex, { ActionContext } from 'vuex';
import {
	appCommonFormData,
	codeListData,
	dialogData,
	memoFormData,
} from '../../../interface/supply-chain-mgmt/application-form-creation/AppFormCreationInterface';
import {
	commonCodeEnumList,
	commonCodeList,
	getCapacityList,
	getDeviceColorList,
	getGoodsSelectList,
	getPubNotiInfo,
	getTelecomAddServiceList,
	getTelecomChargeList,
	retrieveMemberListByRole,
} from '../../../../api/common/common.js';
import {
	deleteApplicationAttachAndMemo,
	fileUpload,
	getApplicationAttachList,
	getApplicationDetail,
	getOpeningStoreList,
	getSaleStoreList,
	getSaleStoreMemberList,
	insertData,
	updateApplication,
	updateApplicationTaskStatus,
} from '../../../../api/supply-chain-mgmt/application-form-creation/ApplicationFromApi';
import { getBlackDetailList } from '../../../../api/supply-chain-mgmt/black-list/BlackListApi';
import { copyObj } from '@/common/common.js';

Vue.use(Vuex);

interface State {
	formData: appCommonFormData; // 신청서데이터
	memoData: memoFormData;
	codeList: codeListData; // select Items
	openingStoreDialog: boolean; // 개통점 dialog
	customerDialog: boolean; // 고객정보 dialog
	dialogData: dialogData; // dialog Array
	openingStoreTelecom: number | null; // 개통점통신사
	AppFormCreFlag: undefined | number; // 신청서 구별 분기
	updateFormData: any; // 저장소 데이터 (변경값만 보내기위함)
	blackList: string;
	thriftyPhone: number;
	paymentCheckType: boolean;
	addServiceFormData: any;
	deviceChange: boolean;
	usimChange: boolean;
	AppFlag: any;
}

const state: State = {
	AppFlag: null,
	paymentCheckType: false,
	thriftyPhone: 0,
	AppFormCreFlag: undefined,
	openingStoreTelecom: 0,
	customerDialog: false,
	openingStoreDialog: false,
	deviceChange: false,
	usimChange: false,
	blackList: '',
	dialogData: {
		paymentAddrDialog: false,
		deliveryAddrDialog: false,
	},
	addServiceFormData: [],
	updateFormData: {},
	formData: {
		basic: {
			applType: 'DVC_USIM', // 기기유심타입
			openingDate: null, // 개통일자
			cancelDate: null, // 철회일자
			beforeOpeningType: 'N', // 선개통유무
			saleStoreId: 0, // 영업점
			openingStoreId: {
				openStoreCode: 0,
				openStoreTelecom: '',
				openStoreTelecomId: 0,
				parentHierarchy: '',
				parentSaleStoreId: 0,
			}, // 개통점
			applRegiUserId: null, // 신청서등록자
			consultTaskStatus: null, // 상담업무상태
			openingTaskStatus: null, // 개통업무상태
			logisticsTaskStatus: null, // 물류업무상태
			delYn: null, // 삭제여부
			docTargetYn: 'N', // 서류대상여부
			parentApplId: null, // 부모신청서아이디
			priorityTargetYn: 'N', // 우선대상여부
			regiDatetime: null, // 등록일시
			/*regiUserId: null, // 등록유저아이디*/
			updDateTime: null, //수정일시
			/*updUserId: null, // 수정유저아이디*/
			parentHierarchy: null, // 상위계층
			parentSaleStoreId: null, // 상위 영업 관리점 아이디
		},
		customer: {
			cusName: null, // 고객명
			cusRegiNumConcat: null, // 고객주민등록번호
			cusRegiNum1: null, // 고객주민등록번호
			cusRegiNum2: null, // 고객주민등록번호
			chargeReductType: null, // 요금감면
			cusPhone: null, // 휴대폰번호
			cusPhone1: null, // 휴대폰번호
			cusPhone2: null, // 휴대폰번호
			cusPhone3: null, // 휴대폰번호
			emgPhone: null, // 비상연락망
			emgPhone1: null, // 비상연락망
			emgPhone2: null, // 비상연락망
			emgPhone3: null, // 비상연락망
			cusEmail: null, // 이메일
			cusAddr: null, // 고객기본주소
			cusAddrDetail: null, // 고객상세주소
			cusZipCode: null, // 고객우편번호
			cusType: null, // 고객유형
			courtProctorName: null, // 법정대리인명
			courtProctorRegiNumConcat: null, // 법정대리인주민등록번호
			courtProctorRegiNum1: null, // 법정대리인주민등록번호
			courtProctorRegiNum2: null, // 법정대리인주민등록번호
			courtProctorPhone: null, // 법정대리인연락처
			courtProctorPhone1: null, // 법정대리인연락처
			courtProctorPhone2: null, // 법정대리인연락처
			courtProctorPhone3: null, // 법정대리인연락처
			courtProctorRelation: null, // 법정대리인관계
			bizName: null, // 사업자명
			bizNum1: null, // 사업자번호
			bizNum2: null, // 사업자번호
			bizNum3: null, // 사업자번호
			bizPhone: null, // 사업자연락처
			bizPhone1: null, // 사업자연락처
			bizPhone2: null, // 사업자연락처
			bizPhone3: null, // 사업자연락처
			bizRegiNumConcat: null, // 법인등록번호
			bizRegiNum1: null, // 법인등록번호
			bizRegiNum2: null, // 법인등록번호
			licenseAuthType: null, // 신분증진위
			licenseIssueDate: null, // 발급일자
			licenseExpiredDate: null, // 만료일자
			licenseIssueArea: null, // 만료일자
			licenseNum1: null, // 면허번호
			licenseNum2: null, // 면허번호
			licenseNum3: null, // 면허번호
			stayCode: null, // 체류코드
			ntnlCode: null, // 국가
		},
		payment: {
			paymentType: null, // 납부방법
			billType: '', // 청구서종류
			bankCode: null, // 은행정보
			accountNum: null, // 계좌번호
			accountHolderName: null, // 예금주
			accountHolderBirth: null, // 생년월일
			accountHolderRelation: null, // 관계
			cardCompanyCode: null, // 카드정보
			cardNum1: null, // 카드번호
			cardNum2: null, // 카드번호
			cardNum3: null, // 카드번호
			cardNum4: null, // 카드번호
			cardHolderName: null, // 카드주
			cardHolderRegiNum1: null, // 주민등록번호
			cardHolderRegiNum2: null, // 주민등록번호
			cardValidityMm: null, // 유효기간MM
			cardValidityYy: null, // 유효기간YY
			giroZipCode: null, // 우편번호
			giroAddr: null, // 기본주소
			giroAddrDetail: null, // 상세주소
		},
		join: {
			openingPhone: null, // 개통휴대폰번호
			openingPhone1: null, // 개통휴대폰번호
			openingPhone2: null, // 개통휴대폰번호
			openingPhone3: null, // 개통휴대폰번호
			openingHopeNum: null, // 개통희망번호
			openingTelecomCodeId: null, // 개통통신사
			openingTelecomName: null, // 개통통신사
			existTelecomCodeId: null, // 기존통신사
			joinType: null, // 가입유형
			numChangeAuthType: null, // 인증방식
			numChangeAuthTypeNum: null, // 인증번호
			goodsId: null, // 기기명
			dvcId: null, // 기기명
			usimDvcId: null, // 기기명
			capacity: null, // 용량
			color: null, // 색상
			modelName: null, // 모델네임
			deviceRawBarcode: null, // 기기일련번호
			usimPaymentType: null, // 유심
			usimType: 'NANO_USIM', // 유심
			usimRawBarcode: null, // 유심일련번호
			agreementType: 'CHOICE_AGRMN', // 약정유형
			agreementPeriodType: null, // 약정기간
			instlPeriodType: null, // 할부기간
			chargeId: null, // 요금제
			addServiceList: [], // 부가서비스리스트
			releaseAmt: 0, // 출고가
			releaseAmtDate: null, // 출고가일자
			pubNotiSupportAmt: 0, // 공시지원금
			extraSupportAmt: 0, // 추가지원금
			freeInstlAmt: 0, // 프리할부/선수납
			etcDiscountAmt: 0, // 기타할인금
			actualSellAmt: 0, // 실판매가
			monthDvcAmt: 0, // 월기기금액
			monthBasicAmt: 0, // 월기본료
			monthPaymentAmt: 0, // 월납부금액
			depositAmt: 0, // 입금받을금액
			depositYn: 'N', // 입금여부
			pubNotiId: 0, // 공시알림아이디
			deviceMatchingType: null, // 기기 매칭타입
			usimMatchingType: null, // 유심 매칭타입
			openingDate: null, // 개통일자
			cancelDate: null, // 철회일자
		},
		delivery: {
			deliveryType: null, // 배송구분
			courierCodeId: null, // 택배사
			invoiceNum: null, // 송장번호
			deliveryZipCode: null, // 우편번호
			deliveryAddr: null, // 기본주소
			deliveryAddrDetail: null, // 상세주소
			couriorMatchingYn: null, // 운송장매칭여부
		},
		etc: {
			giftEnclosedYn: null, // 사은품동봉여부
			giftList: [
				{
					giftName: null,
				},
			], // 사은품
			usedDvcReclaimYn: null, // 중고폰회수여부
			usedDvcModelName: null, // 중고폰모델명
			usedDvcCompe: null, // 중고보상
			attachList: [], // 파일추가
		},
		consultList: [
			{ consultUserId: null },
			{ consultUserId: null },
			{ consultUserId: null },
		],
	},
	memoData: {
		category: '', // 메모 카테고리
		memoContents: null, // 메모내용
	},
	codeList: {
		applTypeItems: [], // 기기유심
		chargeReductTypeItems: [], // 요금감면
		customerTypeItems: [], // 고객유형
		licenseAuthTypeItems: [], // 신분증진위
		stayCodeItems: [], // 체류코드
		driverAreaCodeItems: [], // 운전면허지역코드 (앞자리)
		billTypeItems: [], // 청구서종류
		bankCodeItems: [], // 은행정보
		cardCompanyCodeItems: [], // 카드정보
		joinTypeItems: [], // 가입유형
		numChangeAuthTypeItems: [], // 인증방식
		usimPaymentTypeItems: [], // 유심방식
		agreementPeriodTypeItems: [], // 약정기간
		installmentsPeriodTypeItems: [], // 할부기간
		courierCodeItems: [], // 택배사코드
		goodsItems: [], // 기기명
		capacityItems: [], // 용량
		colorItems: [], // 색상
		saleStoreItems: [], // 영업점
		openingStoreItems: [], // 개통점
		telecomAddServiceItems: [], // 부가서비스
		telecomChargeItems: [], // 요금제
		existTelecomItems: [], // 기존통신사
		thriftyPhoneItems: [], // 알뜰폰리스트
		storeMemberItems: [], // 등록자
		pubNotiInfoItems: [], // 요금제 조회
		nationalCodeItems: [], // 국가코드
		ConsultTaskStatusList: [], // 업무진행상태
		OpeningTaskStatusList: [], // 업무진행상태
		LogisticsTaskStatusList: [], // 업무진행상태
		detailList: [], // 블랙리스트
		counselorItems: [], // 상담원
		DeliveryType: [], // 상담원
	},
};

const getters = {};

const mutations = {
	setCommonCodeList(state: State, result: any) {
		const exTel = { codeNm: '알뜰폰', codeSeq: 1 };
		state.codeList.courierCodeItems = [];
		state.codeList.existTelecomItems = [];
		state.codeList.thriftyPhoneItems = [];
		state.codeList.courierCodeItems = result.codeList.COURIER || [];
		state.codeList.existTelecomItems =
			result.codeList.EXISTELECOM.splice(0, 4) || [];
		state.codeList.thriftyPhoneItems = result.codeList.EXISTELECOM;
		state.codeList.existTelecomItems.push(exTel);
	},
	setCommonCodeNewList(state: State, result: any) {
		state.codeList.applTypeItems = result.ApplType || []; // 기기유심 상태
		state.codeList.chargeReductTypeItems = result.ChargeReductType || []; // 요금감면
		state.codeList.customerTypeItems = result.CustomerType || []; // 고객유형
		state.codeList.licenseAuthTypeItems = result.LicenseAuthType || []; // 신분증진위
		state.codeList.stayCodeItems = result.StayCode || []; // 체류코드
		state.codeList.driverAreaCodeItems = result.DriverAreaCode || []; // 운전면허지역코드
		state.codeList.billTypeItems = result.BillType || []; // 청구서종류
		state.codeList.bankCodeItems = result.BankCode || []; // 은행정보
		state.codeList.cardCompanyCodeItems = result.CardCompanyCode || []; //카드정보
		state.codeList.joinTypeItems = result.JoinType || []; // 가입유형
		state.codeList.numChangeAuthTypeItems = result.NumChangeAuthType || []; // 인증방식
		state.codeList.usimPaymentTypeItems = result.UsimPaymentType || []; // 유심
		state.codeList.agreementPeriodTypeItems = result.AgreementPeriodType || []; // 약정기간
		state.codeList.installmentsPeriodTypeItems =
			result.InstallmentsPeriodType || []; // 할부기간
		state.codeList.nationalCodeItems = result.NationalCode || []; // 국가코드
		state.codeList.ConsultTaskStatusList = result.ConsultTaskStatus || [];
		state.codeList.OpeningTaskStatusList = result.OpeningTaskStatus || [];
		state.codeList.LogisticsTaskStatusList = result.LogisticsTaskStatus || [];
		if (result.DeliveryType && result.DeliveryType.length != 0) {
			result.DeliveryType.splice(0, 1);
			state.codeList.DeliveryType = result.DeliveryType || [];
		}
	},
	setGoodsSelectList(state: State, result: any) {
		state.codeList.goodsItems = [];
		// 모델명 추가
		for (let i = 0; i < result.data.data.length; i++) {
			result.data.data[
				i
			].goodsName = `${result.data.data[i].goodsName} [${result.data.data[i].modelName}]`;
		}
		state.codeList.goodsItems = result.data.data;
	},
	setCapacitySelectList(state: State, result: any) {
		state.codeList.capacityItems = [];
		// 용량 중복 제거
		state.codeList.capacityItems = result.data.data;
	},
	setColorSelectList(state: State, result: any) {
		state.codeList.colorItems = [];
		state.codeList.colorItems = result.data.data;
	},
	setSaleStoreList(state: State, result: any) {
		state.codeList.saleStoreItems = [];
		state.codeList.saleStoreItems = result.data.data;
	},
	setOpeningStoreList(state: State, result: any) {
		state.codeList.openingStoreItems = [];
		state.codeList.openingStoreItems = result.data.data;
		if (!state.AppFlag) {
			state.formData.basic.openingStoreId = {
				openStoreCode: result.data.data[0].openStoreId,
				openStoreTelecom: result.data.data[0].telecomName,
				openStoreTelecomId: result.data.data[0].telecom,
				parentHierarchy: result.data.data[0].parentHierarchy,
				parentSaleStoreId: result.data.data[0].parentSaleStoreId,
			};
			state.formData.join.openingTelecomName = result.data.data[0].telecomName;
		}
	},
	setTelecomAddServiceList(state: State, result: any) {
		state.codeList.telecomAddServiceItems = [];
		state.codeList.telecomAddServiceItems = result.data.data;
	},
	setTelecomChargeList(state: State, result: any) {
		state.codeList.telecomChargeItems = [];
		state.codeList.telecomChargeItems = result.data.data;
	},
	setSaleStoreMemberList(state: State, result: any) {
		state.codeList.storeMemberItems = [];
		state.codeList.storeMemberItems = result.data.data;
	},
	setPubNotiInfo(state: State, result: any) {
		state.formData.join.pubNotiId = result.data.data.pubNotiId;
		state.formData.join.releaseAmt = result.data.data.releaseAmt;
		state.formData.join.releaseAmtDate = result.data.data.releaseDate;
		state.formData.join.monthBasicAmt = result.data.data.chargeAmt;
		if (state.formData.join.agreementType === 'CHOICE_AGRMN') {
			state.formData.join.pubNotiSupportAmt = 0;
			state.formData.join.monthBasicAmt =
				state.formData.join.monthBasicAmt -
				state.formData.join.monthBasicAmt * 0.25;
		} else {
			state.formData.join.pubNotiSupportAmt = result.data.data.supportAmt;
		}
	},
	setBlackList(state: State, result: any) {
		if (result.data.resultCode === '0000') {
			state.blackList = result.data.data[0].blackTypeMsg;
		} else {
			state.blackList = result.data.resultMsg;
		}
	},
	setInsertList(state: State, result: any) {
		state.formData.basic.applId = result.data.data;
		state.formData.customer.applId = result.data.data;
		state.formData.payment.applId = result.data.data;
		state.formData.join.applId = result.data.data;
		state.formData.delivery.applId = result.data.data;
		state.formData.etc.applId = result.data.data;
	},
	setMemberListByRole(state: State, result: any) {
		state.codeList.counselorItems = [];
		state.codeList.counselorItems = result.data.data;
		state.codeList.counselorItems.unshift({
			seq: null,
			name: '선택해주세요.',
		});
		if (!state.AppFlag) {
			state.formData.basic.applRegiUserId = result.data.data[1].seq;
		}
	},
	setApplicationDetail(state: State, result: any) {
		state.blackList = '';
		if (result.data.data.customer.bizNum !== null) {
			const biz = result.data.data.customer.bizNum;
			const biz1 = biz.substr(0, 3);
			const biz2 = biz.substr(3, 2);
			const biz3 = biz.substr(5, 5);
			result.data.data.customer.bizNum1 = biz1;
			result.data.data.customer.bizNum2 = biz2;
			result.data.data.customer.bizNum3 = biz3;
		}
		state.addServiceFormData = [];
		if (result.data.data.join.openingTelecomCodeId === 5) {
			result.data.data.join.openingTelecomName = 'SKT';
		}
		if (result.data.data.join.openingTelecomCodeId === 6) {
			result.data.data.join.openingTelecomName = 'KT';
		}
		if (result.data.data.join.openingTelecomCodeId === 7) {
			result.data.data.join.openingTelecomName = 'LGU';
		}
		state.formData.consultList = result.data.data.consultList;
		if (state.formData.consultList.length <= 3) {
			const cnt = 3 - state.formData.consultList.length;
			for (let i = 0; i < cnt; i++) {
				state.formData.consultList.push({
					applConsultId: 0,
					applId: 0,
					consultUserId: 0,
				});
			}
		}

		// if (result.data.data.consultList.length === 0) {
		// 	for (let i = 0; i < result.data.data.consultList.length; i++) {
		// 		result.data.data.consultList[i] = {
		// 			applConsultId: null,
		// 			applId: null,
		// 			consultUserId: null,
		// 		};
		// 	}
		// }
		// for (let i = 0; i < 3; i++) {
		// 	if (!result.data.data.consultList[i]) {
		// 		result.data.data.consultList[i] = {
		// 			applConsultId: 0,
		// 			applId: 0,
		// 			consultUserId: 0,
		// 		};
		// 	}
		// }
		if (result.data.data.join.existTelecomCodeId > 45) {
			state.thriftyPhone = result.data.data.join.existTelecomCodeId;
			result.data.data.join.existTelecomCodeId = 1;
		}
		if (result.data.data.payment.paymentType === 'EXIST_SAME') {
			state.paymentCheckType = true;
		} else {
			state.paymentCheckType = false;
		}
		if (result.data.data.etc.giftList.length === 0) {
			result.data.data.etc.giftList.push({ giftName: null });
		}
		if (!result.data.data.basic.openingTaskStatus) {
			result.data.data.basic.openingTaskStatus = null;
		}
		if (!result.data.data.basic.logisticsTaskStatus) {
			result.data.data.basic.logisticsTaskStatus = null;
		}
		if (!result.data.data.basic.consultTaskStatus) {
			result.data.data.basic.consultTaskStatus = null;
		}
		state.updateFormData = copyObj(result.data.data);
		//state.updateFormData.join.addServiceList = [{consultUserId:0}];
		state.formData = result.data.data;
	},
};

const actions = {
	async getCommonCodeList({ commit }: ActionContext<State, State>) {
		try {
			/* 신규 ENUM 데이터 */
			const newEnum = {
				initEnumData: [
					/*'applType', // 기기,유심 일련*/
					'CustomerType', // 고객유형
					'LicenseAuthType', // 신분증진위
					'ChargeReductType', // 요금감면
					'DriverAreaCode', // 운전면허지역코드 (앞자리)
					'BillType', // 청구서종류
					'BankCode', // 은행정보
					'CardCompanyCode', // 카드정보
					'JoinType', // 가입유형
					'NumChangeAuthType', // 인증방식
					'UsimPaymentType', // 유심
					'AgreementPeriodType', // 약정기간
					'InstallmentsPeriodType', // 할부기간
					'StayCode', // 체류코드
					'NationalCode', // 국가코드
					'ConsultTaskStatus', // 진행상태
					'OpeningTaskStatus', // 진행상태
					'LogisticsTaskStatus', // 진행상태
					'DeliveryType', // 배송구분
				],
			};
			const result = await commonCodeEnumList(newEnum);
			if (result) {
				commit('setCommonCodeNewList', result.data.data);
			}
			/* 택배사 코드데이터 */
			const Enum = { code: ['COURIER', 'existelecom'] };
			const EnumResult = await commonCodeList(Enum);
			if (EnumResult) {
				commit('setCommonCodeList', EnumResult.data.data);
			}
		} catch (e) {
			console.log(e);
		}
	},
	// 기기명
	async getGoodsSelectList(
		{ commit }: ActionContext<State, State>,
		data: string,
	) {
		try {
			const result = await getGoodsSelectList(data);
			if (result) {
				commit('setGoodsSelectList', result);
			}
		} catch (e) {
			console.log(e);
		}
	},
	async getCapacitySelectList(
		{ commit }: ActionContext<State, State>,
		data: string,
	) {
		try {
			const result = await getCapacityList(data);
			if (result) {
				if (result.data.resultMsg === '조회된 결과가 없습니다') {
					if (state.AppFlag >= 28177 || !state.AppFlag) {
						alert(
							'기기검색 결과, 용량 데이터가 없습니다. 관리자를 통해 해당 기기옵션 용량을 등록 해 주세요.',
						);
					}
					return;
				}
				commit('setCapacitySelectList', result);
			}
		} catch (e) {
			console.log(e);
		}
	},
	async getColorSelectList(
		{ commit }: ActionContext<State, State>,
		data: string,
	) {
		try {
			const result = await getDeviceColorList(data);
			if (result) {
				commit('setColorSelectList', result);
			}
		} catch (e) {
			console.log(e);
		}
	},
	// 부가서비스 조회
	async getTelecomAddServiceList(
		{ commit }: ActionContext<State, State>,
		data: string,
	) {
		try {
			const result = await getTelecomAddServiceList(data);
			if (result) {
				commit('setTelecomAddServiceList', result);
			}
		} catch (e) {
			console.log(e);
		}
	},
	// 요금제조회
	async getTelecomChargeList(
		{ commit }: ActionContext<State, State>,
		data: string,
	) {
		try {
			const result = await getTelecomChargeList(data);
			if (result) {
				commit('setTelecomChargeList', result);
			}
		} catch (e) {
			console.log(e);
		}
	},
	async insertList(
		{ commit }: ActionContext<State, State>,
		data: appCommonFormData,
	) {
		try {
			const result = await insertData(data);
			if (result && result.data.resultCode === '0000') {
				commit('setInsertList', result);
				return true;
			} else if (result && result.data.resultCode === '9999') {
				alert(result.data.resultMsg);
			} else {
				console.log('알수없는 오류가 발생했습니다.');
				return false;
			}
		} catch (e) {
			console.log(e);
		}
	},
	async updateApplication(
		{ commit }: ActionContext<State, State>,
		data: appCommonFormData,
	) {
		try {
			const result = await updateApplication(data);
			if (result) {
				if (result.data.resultMsg === 'FAIL') {
					alert('신청서 수정에 실패했습니다.');
					return;
				}
			}
		} catch (e) {
			console.log(e);
		}
	},
	async fileUpload({ commit }: ActionContext<State, State>, data: any) {
		try {
			const result = await fileUpload(data);
			if (result.data.status === 200) {
				if (result.data.resultCode !== '0000') {
					alert(result.data.resultMsg);
				} else {
					return true;
				}
			}
		} catch (e) {
			console.log(e);
		}
	},
	// 파일 삭제
	async deleteApplicationAttachAndMemo(
		{ commit }: ActionContext<State, State>,
		data: any,
	) {
		try {
			const result = await deleteApplicationAttachAndMemo(data);
			if (result.data.status === 200) {
				if (result.data.resultCode !== '0000') {
					alert(result.data.resultMsg);
				} else {
					return true;
				}
			}
		} catch (e) {
			console.log(e);
		}
	},
	async getApplicationAttachList(
		{ commit }: ActionContext<State, State>,
		data: any,
	) {
		try {
			const result = await getApplicationAttachList(data);
			if (result.data.status === 200) {
				if (result.data.resultCode !== '0000') {
					alert(result.data.resultMsg);
				} else {
					return result.data.data.resultList || [];
				}
			}
		} catch (e) {
			console.log(e);
		}
	},

	async getSaleStoreList({ commit }: ActionContext<State, State>, data: any) {
		try {
			const result = await getSaleStoreList(data);
			if (result) {
				commit('setSaleStoreList', result);
			}
		} catch (e) {
			console.log(e);
		}
	},
	async getOpeningStoreList(
		{ commit }: ActionContext<State, State>,
		data: any,
	) {
		try {
			const result = await getOpeningStoreList(data);
			if (result) {
				commit('setOpeningStoreList', result);
			}
		} catch (e) {
			console.log(e);
		}
	},
	async openingTelecomList({ commit }: ActionContext<State, State>) {
		try {
			const data = { code: ['TELECOM'] };
			const result = await commonCodeList(data);
		} catch (e) {
			console.log(e);
		}
	},
	async getSaleStoreMemberList(
		{ commit }: ActionContext<State, State>,
		data: number,
	) {
		try {
			const result = await getSaleStoreMemberList(data);
			if (result) {
				commit('setSaleStoreMemberList', result);
			}
		} catch (e) {
			console.log(e);
		}
	},
	async getPubNotiInfo({ commit }: ActionContext<State, State>, data: any) {
		try {
			const result = await getPubNotiInfo(data);
			if (result) {
				commit('setPubNotiInfo', result);
			}
		} catch (e) {
			console.log(e);
		}
	},
	async updateApplicationTaskStatus(
		{ commit }: ActionContext<State, State>,
		data: any,
	) {
		try {
			const result = await updateApplicationTaskStatus(data);
		} catch (e) {
			console.log(e);
		}
	},
	// 블랙리스트콜
	async getDetailList({ commit }: ActionContext<State, State>, data: any) {
		const result = await getBlackDetailList(data);
		if (result) {
			commit('setBlackList', result);
		}
	},
	// 상담원 조회
	async retrieveMemberListByRole(
		{ commit }: ActionContext<State, State>,
		data: any,
	) {
		const result = await retrieveMemberListByRole(data);
		if (result) {
			commit('setMemberListByRole', result);
		}
	},
	// 신청서 상세 조회
	async getApplicationDetail(
		{ commit }: ActionContext<State, State>,
		data: string,
	) {
		const result = await getApplicationDetail(data);
		if (result) {
			commit('setApplicationDetail', result);
		}
	},
};

const ApplicationFormCreationModule = {
	namespaced: true,
	state: state,
	getters: getters,
	mutations: mutations,
	actions: actions,
};

export default ApplicationFormCreationModule;
