import Vue from 'vue';
import Vuex, { ActionContext } from 'vuex';

import {
	quickOpeningCodeListData,
	quickOpeningFormData,
} from '../../../../store/interface/supply-chain-mgmt/sell-status/quickOpeningInterface';
import {
	commonCodeEnumList,
	getCapacityList,
	getDeviceColorList,
} from '../../../../api/common/common.js';
import {
	fileUpload,
	getAttachList,
	getGoodsSelectList,
	getOpeningStoreList,
	getPubNotiInfo,
	getSaleStoreList,
	getTelecomAddServiceList,
	getTelecomChargeList,
	updateFormData,
} from '../../../../api/supply-chain-mgmt/sell-status/QuickOpeningApi';
import { commonCodeListFnc, initData } from '../../../../common/common';
import { getBlackDetailList } from '../../../../api/supply-chain-mgmt/black-list/BlackListApi';
import { getApplicationDetail } from '@/api/supply-chain-mgmt/application-form-creation/ApplicationFromApi';

Vue.use(Vuex);

interface State {
	openStoreObject: {
		openingStoreId: null | number;
		openingTelecomCodeId: null | number;
	};
	modifyState: boolean;
	formData: quickOpeningFormData;
	fileData: Array<Object>;
	propsFileList: Array<Object>;
	addServiceFormData: any;
	optionList: quickOpeningCodeListData; // select Items
	blackList: any;
	deviceChange: boolean;
	usimChange: boolean;
	ApplExchangeFlag: boolean;
	blackListTablePop: boolean;
}

const state: State = {
	ApplExchangeFlag: false,
	modifyState: false,
	deviceChange: false,
	usimChange: false,
	openStoreObject: {
		openingStoreId: 0,
		openingTelecomCodeId: 0,
	},
	addServiceFormData: [],
	formData: {
		basic: {
			applId: null,
			docTargetYn: '', //서류심사대상
			openingPriorityTargetYn: '', //우선순위대상
			beforeReserveYn: 'N', //사전예약여부
			reserveNum: '', //예약번호
			consultTaskStatus: '', //상담
			openingTaskStatus: '', //개통
			logisticsTaskStatus: '', //물류
			openingStoreId: null, // 개통점
			saleStoreId: null, //영업점
			openingDate: '', //개통일자
			openingTime: '', //개통시간
			cancelDate: '', //철회일자
			cancelTime: '', //철회시간
		},
		customer: {
			applId: null,
			cusName: '',
			cusRegiNum1: '', //주민등록번호1
			cusRegiNum2: '', //주민등록번호2
			cusPhone1: '', //전화번호1
			cusPhone2: '', //전화번호2
			cusPhone3: '', //전화번호3
			cusZipCode: '', //우편번호
			bizName: '', //법인명
			bizNum: '', //사업자번호
			bizNum1: '', //사업자번호
			bizNum2: '', //사업자번호
			bizNum3: '', //사업자번호
			cusAddr: '', //기본주소
			cusAddrDetail: '', //상세주소
			cusType: '', //고객유형
			chargeReductType: '', //요금감면
			licenseNum1: null, // 외국인등록번호1
			licenseNum2: null, // 외국인등록번호2
			licenseNumConcat: null, // 외국인등록번호
		},
		payment: {
			applId: null,
			paymentType: '', //납부방법
			billType: '', //청구서종류
			//계좌이체
			bankCode: '', //은행id
			bankCodeMsg: '', //은행name
			// todo: 계좌번호 사이에 '-' 찍히는 위치가 다른데 이는 어떻게 할것인지(+어떤식으로 받고 어떤식으로 뿌려야할지 chk필요)
			accountNum: '', //계좌번호
			accountHolderName: '', //예금주
			accountHolderRelation: '', //관계
			accountHolderBirth: '', //예금주생년월일
			// 카드납부
			cardCompanyCode: '', //카드id
			cardCompanyCodeMsg: '', //카드name
			cardNum1: '', //카드번호1
			cardNum2: '', //카드번호2
			cardNum3: '', //카드번호3
			cardNum4: '', //카드번호4
			cardHolderName: '', //카드주
			cardHolderRegiNum1: '', //주민번호1
			cardHolderRegiNum2: '', //주민번호2
			cardValidityMm: '', //유효기간_월
			cardValidityYy: '', //유효기간_년
			//지로
			giroZipCode: '', //우편번호
			giroAddr: '', //기본주소
			giroAddrDetail: '', //상세주소
		},
		join: {
			applId: null,
			openingTelecomCodeId: null, //개통 통신사
			openingHopeNum: '', //개통 희망번호ㅇ
			joinType: '', //가입유형
			existTelecomCodeId: null, //기존통신사
			numChangeAuthType: '', //인증방식
			numChangeAuthTypeNum: '', //인증번호
			goodsId: null, //기기
			capacity: '', //용량
			color: '', //color
			deviceRawBarcode: '', //기기일련번호
			usimPaymentType: '', //유심
			usimType: '', //유심종류
			usimRawBarcode: '', //유심일련번호
			agreementType: '', //약정유형
			agreementPeriodType: '', //약정기간
			instlPeriodType: '', //할부기간
			chargeId: null, //요금제
			addServiceList: [
				{
					addSvcCharge: null,
					addSvcId: null,
					addSvcMemo: '',
					addSvcName: '',
					addSvcType: '',
					addSvcTypeName: '',
					delYn: '',
					network: null,
					originKey: null,
					regiDateTime: '',
					telecom: null,
					telecomName: '',
					useYn: '',
				}, //부가서비스
			],
			releaseAmt: null, //출고가
			pubNotiSupportAmt: null, //공시지원금
			extraSupportAmt: null, //추가지원금
			freeInstlAmt: null, //프리할부선수납
			etcDiscountAmt: null, //기타할인금
			actualSellAmt: null, //실판매가
		},
		delivery: {
			applId: null,
			deliveryType: '', //배송구분
			courierCodeId: null, //택배사
			invoiceNum: '', //송장번호
		},
	},
	blackList: [],
	optionList: {
		goodsItems: [], // 기기리스트
		capacityItems: [], //용량리스트
		colorItems: [], //colorName리스트
		saleStoreList: [], //개통점리스트
		openingStoreList: [], //영업점리스트
		customerTypeItems: [], //고객유형리스트
		chargeReductTypeItems: [], //요금감면리스트
		// billTypeItems: [], //청구서종류리스트
		ExistingTelecomTypeItems: [], //기존통신사리스트
		joinTypeItems: [], //가입유형리스트
		usimPaymentTypeItems: [], //유심리스트
		AgreementTypeItems: [], //약정유형
		agreementPeriodTypeItems: [], //약정기간리스트
		installmentsPeriodTypeItems: [], //할부기간리스트
		addServiceList: [
			{
				addSvcCharge: 10000,
				addSvcId: 1,
				addSvcMemo: '5G 부족한 데이터를 즉시 충전 가능한 1회성 충전 서비스',
				addSvcName: '5G데이터충전 1GB',
				addSvcType: 'NORMAL',
				addSvcTypeName: '일반',
				delYn: 'N',
				network: null,
				originKey: null,
				regiDateTime: '2021-07-08T16:44:48.139',
				telecom: 5,
				telecomName: 'SKT',
				useYn: 'N',
			}, //부가서비스
			{
				addSvcCharge: 20000,
				addSvcId: 2,
				addSvcMemo: '5G 부족한 데이터를 즉시 충전 가능한 1회성 충전 서비스',
				addSvcName: '5G데이터충전 2.5GB',
				addSvcType: 'NORMAL',
				addSvcTypeName: '일반',
				delYn: 'N',
				network: null,
				originKey: null,
				regiDateTime: '2021-07-08T16:44:48.139',
				telecom: 6,
				telecomName: 'KT',
				useYn: 'N',
			}, //부가서비스
		], //부가서비스리스트
		callingPlanItems: [], // 요금제리스트
		chargeList: [], // 요금제리스트
		numChangeAuthTypeItems: [], //인증방식
		agreementList: [],
		deliveryList: [],
		ConsultTaskStatusList: [], // 업무진행상태
		OpeningTaskStatusList: [], // 업무진행상태
		LogisticsTaskStatusList: [], // 업무진행상태
		courierItemsList: [], //택배사리스트
	},
	fileData: [],
	propsFileList: [],
	blackListTablePop: false,
};

const getters = {};

const mutations = {
	setApplId(state: State, applId: number) {
		state.formData.basic.applId = applId;
		state.formData.customer.applId = applId;
		state.formData.payment.applId = applId;
		state.formData.join.applId = applId;
		state.formData.delivery.applId = applId;
	},
	setFormData(state: State, result: any) {
		initData(state.formData);
		if (!result.data.data.basic.openingTaskStatus) {
			result.data.data.basic.openingTaskStatus = null;
		}
		if (!result.data.data.basic.logisticsTaskStatus) {
			result.data.data.basic.logisticsTaskStatus = null;
		}
		if (!result.data.data.basic.consultTaskStatus) {
			result.data.data.basic.consultTaskStatus = null;
		}
		state.formData = result.data.data;
		// 교품관련 신청서인지 구분
		state.ApplExchangeFlag = false; // 초기화
		if (result.data.data.basic.parentApplId) {
			state.ApplExchangeFlag = true;
		}
	},
	setBlackList(state: State, result: any) {
		initData(state.blackList);
		if (result.data.resultCode == '9000') {
			state.blackList.blackTypeMsg = result.data.resultMsg;
		}
		if (result.data.resultCode === '0000') {
			state.blackListTablePop = !state.blackListTablePop;
			state.blackList = result.data.data;
			state.blackList.blackTypeMsg = `${result.data.data.length} 건`;
		}
	},
	setCommonCodeList(state: State, result: any) {
		state.optionList.courierItemsList = result.codeList.COURIER || [];
		state.optionList.ExistingTelecomTypeItems = result.codeList.EXISTELECOM;
	},
	setGoodsSelectList(state: State, result: any) {
		state.optionList.goodsItems = [];
		// 모델명 추가
		// 받아온 기기의 useYn === 'Y' 이거나
		// useYn === 'N' 이지만 기존에 저장된 goodsId
		const goodsItems = [];
		for (let i = 0; i < result.data.data.length; i++) {
			if (
				result.data.data[i].useYn === 'Y' ||
				result.data.data[i].goodsId === state.formData.join.goodsId
			) {
				result.data.data[
					i
				].goodsName = `${result.data.data[i].goodsName} [${result.data.data[i].modelName}]`;
				goodsItems.push(result.data.data[i]);
			}
		}
		state.optionList.goodsItems = goodsItems;
	},
	setCapacitySelectList(state: State, result: any) {
		state.optionList.capacityItems = [];
		state.optionList.capacityItems = result.data.data;
	},
	setColorSelectList(state: State, result: any) {
		state.optionList.colorItems = [];
		state.optionList.colorItems = result.data.data;
	},
	setSaleStoreSelectList(state: State, result: any) {
		state.optionList.saleStoreList = [];
		state.optionList.saleStoreList = result.data.data;
	},
	setOpeningStoreSelectList(state: State, result: any) {
		state.optionList.openingStoreList = [];
		state.optionList.openingStoreList = result.data.data;
	},
	setTelecomAddServiceSelectList(state: State, result: any) {
		state.optionList.addServiceList = [];
		state.optionList.addServiceList = result.data.data;
	},
	setTelecomChargeSelectList(state: State, result: any) {
		if (result.data.resultCode === '9000') {
			alert('조회된 결과가 없습니다.');
		} else {
			state.optionList.chargeList = [];
			// 받아온 요금제의 useYn === 'Y' 이거나
			// useYn === 'N' 이지만 기존에 저장된 chargeId
			state.optionList.chargeList = result.data.data.filter(
				// @ts-ignore
				i => i.useYn === 'Y' || i.chargeId === state.formData.join.chargeId,
			);
		}
	},
	setPubNotiInfo(state: State, result: any) {
		if (result.data.resultCode == '9000') {
			alert(
				'선택된 요금제의 요금정보가 등록되지 않았습니다.\n요금제 정보를 등록해주세요.',
			);
			state.formData.join.releaseAmt = 0;
			state.formData.join.pubNotiSupportAmt = 0;
		}
		if (result.data.resultCode == '0000') {
			state.formData.join.releaseAmt = result.data.data.releaseAmt;
			state.formData.join.agreementType === 'CHOICE_AGRMN'
				? (state.formData.join.pubNotiSupportAmt = 0)
				: (state.formData.join.pubNotiSupportAmt = result.data.data.supportAmt);
		}
	},
	setNewEnumCodeList(state: State, result: any) {
		state.optionList.customerTypeItems = result.CustomerType || [];
		state.optionList.joinTypeItems = result.JoinType || [];
		state.optionList.chargeReductTypeItems = result.ChargeReductType || [];
		//state.optionList.billTypeItems = result.BillType || [];
		state.optionList.usimPaymentTypeItems = result.UsimPaymentType || [];
		state.optionList.AgreementTypeItems = result.AgreementType || [];
		state.optionList.agreementPeriodTypeItems =
			result.AgreementPeriodType || [];
		state.optionList.installmentsPeriodTypeItems =
			result.InstallmentsPeriodType || [];
		state.optionList.ConsultTaskStatusList = result.ConsultTaskStatus || [];
		state.optionList.OpeningTaskStatusList = result.OpeningTaskStatus || [];
		state.optionList.LogisticsTaskStatusList = result.LogisticsTaskStatus || [];
		// state.optionList.ExistingTelecomTypeItems =
		// 	result.ExistingTelecomType || [];
		result.DeliveryType.shift();
		state.optionList.deliveryList = result.DeliveryType || [];
		state.optionList.numChangeAuthTypeItems = result.NumChangeAuthType || [];
	},
};

const actions = {
	async getCommonCodeList(
		{ commit }: ActionContext<State, State>,
		data: object,
	) {
		try {
			const result = await commonCodeListFnc(data);
			if (result) {
				commit('setCommonCodeList', result);
			}
		} catch (e) {
			console.log(e);
		}
	},
	async getNewEnumList({ commit }: ActionContext<State, State>, data: any) {
		try {
			const result = await commonCodeEnumList(data);
			if (result && '0000' === result.data.resultCode) {
				commit('setNewEnumCodeList', result.data.data);
			}
		} catch (e) {
			console.log(e);
		}
	},
	async getFormData({ commit }: ActionContext<State, State>, data: any) {
		try {
			const result = await getApplicationDetail(data);
			if (result) {
				commit('setFormData', result);
			}
		} catch (e) {
			console.log(e);
		}
	},
	async getSelectList({ dispatch }: ActionContext<State, State>, data: string) {
		await dispatch('getSaleStoreSelectList');
		await dispatch('getOpeningStoreSelectList');
		await dispatch('getGoodsSelectList');
		await dispatch('getCapacitySelectList', data);
		await dispatch('getColorSelectList');
		await dispatch('getTelecomChargeSelectList');
	},
	async updateFormData({ commit }: ActionContext<State, State>, data: any) {
		try {
			const result = await updateFormData(data);
			if (result.data.status === 200) {
				if (result.data.resultCode !== '0000') {
					if (result.data.resultMsg === 'FAIL') {
						alert('데이터 저장 실패했습니다.');
						return;
					}
					alert(result.data.resultMsg);
				} else {
					return result;
				}
			}
		} catch (error) {
			console.log(error);
		}
	},

	async getAttachList({ commit }: ActionContext<State, State>, data: object) {
		try {
			const result = await getAttachList(data);
			if (result?.data.resultCode === '0000') {
				return result;
			}
		} catch (e) {
			console.log(e);
		}
	},
	async fileUpload({ commit }: ActionContext<State, State>, data: any) {
		try {
			const result = await fileUpload(data);
			if (result?.data.resultCode !== '0000') {
				alert(result.data.resultMsg);
			}
		} catch (e) {
			console.log(e);
		}
	},
	async getBlackDetailList(
		{ commit }: ActionContext<State, State>,
		event: any,
	) {
		try {
			if (
				state.formData.customer.cusPhone1 == null ||
				state.formData.customer.cusPhone1 == '' ||
				state.formData.customer.cusPhone2 == null ||
				state.formData.customer.cusPhone2 == '' ||
				state.formData.customer.cusPhone3 == null ||
				state.formData.customer.cusPhone3 == ''
			) {
				return alert('휴대폰번호를 입력해주세요.');
			}
			if (
				state.formData.customer.cusAddr === null ||
				state.formData.customer.cusAddr === ''
			) {
				return alert('주소를 입력해주세요.');
			} else {
				const data = {
					blackAddr: state.formData.customer.cusAddr,
					blackPhone:
						state.formData.customer.cusPhone1 +
						state.formData.customer.cusPhone2 +
						state.formData.customer.cusPhone3,
				};
				const result = await getBlackDetailList(data);
				if (result && '0000' === result.data.resultCode) {
					commit('setBlackList', result);
				}
			}
		} catch (e) {
			console.log(e);
		}
	},
	async getSaleStoreSelectList({ commit }: ActionContext<State, State>) {
		try {
			const result = await getSaleStoreList();
			if (result?.data.resultCode === '0000') {
				commit('setSaleStoreSelectList', result);
			}
		} catch (e) {
			console.log(e);
		}
	},
	async getOpeningStoreSelectList({
		state,
		commit,
	}: ActionContext<State, State>) {
		try {
			if (state.formData.join.openingTelecomCodeId) {
				const data = {
					storeId: state.formData.basic.saleStoreId,
				};
				const result = await getOpeningStoreList(data);
				if (result?.data.resultCode === '0000') {
					commit('setOpeningStoreSelectList', result);
				}
			}
		} catch (e) {
			console.log(e);
		}
	},

	async getGoodsSelectList({ state, commit }: ActionContext<State, State>) {
		try {
			if (state.formData.join.openingTelecomCodeId) {
				const result = await getGoodsSelectList(
					state.formData.join.openingTelecomCodeId,
				);
				if (result?.data.resultCode === '0000') {
					commit('setGoodsSelectList', result);
				}
			}
		} catch (e) {
			console.log(e);
		}
	},
	async getCapacitySelectList(
		{ state, commit }: ActionContext<State, State>,
		data: string,
	) {
		try {
			if (state.formData.join.goodsId) {
				const result = await getCapacityList(state.formData.join.goodsId);
				if (result?.data.resultCode === '0000') {
					commit('setCapacitySelectList', result);
				}
				if (result?.data.resultCode === '9000' && data !== 'noAlert') {
					alert(
						'기기검색 결과, 용량 데이터가 없습니다.\n관리자를 통해 해당 기기옵션 용량을 등록 해 주세요.',
					);
				}
			}
		} catch (e) {
			console.log(e);
		}
	},
	async getColorSelectList({ state, commit }: ActionContext<State, State>) {
		try {
			if (state.formData.join.goodsId && state.formData.join.capacity) {
				const data = {
					goodsId: state.formData.join.goodsId,
					capacity: state.formData.join.capacity,
				};
				const result = await getDeviceColorList(data);
				if (result?.data.resultCode === '0000') {
					commit('setColorSelectList', result);
				}
			}
		} catch (e) {
			console.log(e);
		}
	},
	async getTelecomAddServiceSelectList({
		state,
		commit,
	}: ActionContext<State, State>) {
		try {
			if (state.formData.join.openingTelecomCodeId) {
				const result = await getTelecomAddServiceList(
					state.formData.join.openingTelecomCodeId,
				);
				if (result) {
					commit('setTelecomAddServiceSelectList', result);
				}
			}
		} catch (e) {
			console.log(e);
		}
	},
	async getTelecomChargeSelectList({
		state,
		commit,
	}: ActionContext<State, State>) {
		try {
			if (state.formData.join.openingTelecomCodeId) {
				const result = await getTelecomChargeList(
					state.formData.join.openingTelecomCodeId,
				);
				if (result?.data.resultCode === '0000') {
					commit('setTelecomChargeSelectList', result);
				}
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
};

const QuickOpeningPopModule = {
	namespaced: true,
	state: state,
	getters: getters,
	mutations: mutations,
	actions: actions,
};

export default QuickOpeningPopModule;
