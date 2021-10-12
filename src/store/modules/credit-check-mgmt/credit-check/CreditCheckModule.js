import Vue from 'vue';
import Vuex from 'vuex';
import {
	deleteCreditTemplate,
	getCreditInquireHistoryList,
	getCreditInquireList,
	getCreditInquireStatusCount,
	getCreditTemplateList,
	getHistory,
	getOpeningStoreList,
	insertCreditInquire,
	insertCreditTemplate,
	reRequestCreditInquire,
	setMainCreditTemplate,
	updateCreditInquire,
	updateCreditInquireStatus,
	getCreditTemplate,
	insertCreditInquireStore,
} from '../../../../api/credit-check-mgmt/credit-check/CreditCheckApi.js';
import { getSaleStoreList } from '../../../../api/supply-chain-mgmt/application-form-creation/ApplicationFromApi';
import {
	commonCodeEnumList,
	commonCodeList,
} from '../../../../api/common/common.js';

Vue.use(Vuex);

const CreditCheckModule = {
	namespaced: true,
	state: {
		openingRequestDialog: false,
		requestCard: null,
		selectedCard: null,
		templateIdx: 0,
		infoDialog: false,
		templateDialog: false,
		dateResetData: false,
		selectedCtId: null,
		filterData: {
			srhStartDate: '', // 등록시작일
			srhEndDate: '', // 등록마감일
			telecom: '', // 통신사
			openingStore: '', // 개통점
			saleStore: '', // 영업점
			joinType: '', // 가입유형
			customerType: '', // 고객유형
			creditProcStatus: '', // 신조진행상태
			srhType: 'ALL', // 검색기준
			srhKeyword: '', // 검색인풋
			perPageCnt: 20, // 리스트 페이지 갯수
		},
		selectedData: {
			telecom: [], // 통신사
			openingStore: [], // 개통점
			saleStore: [], // 영업점
			joinType: [], // 가입유형
			customerType: [], // 고객유형
			creditProcStatus: [], // 진행상황
		},
		formData: {},
		templateData: {
			storeId: '',
			joinType: '',
			templateLoad: '',
		},
		templateSaveData: {
			title: '',
			mainTemplateYn: 'N',
			selectOptions: 0,
		},
		templateNewData: [],
		// 카드리스트 데이터
		cardListData: [],
		// 리스트 데이터
		getListData: [],
		countData: 0, // 필터 카운트 데이터
		infoPopData: {},
		getHistoryData: [], // 이력 데이터
		creditInquireStatusCountData: [], // 신용 조회 상태별 카운트 데이터
		codeList: {
			// 코드리스트
			telecomItems: [],
			openStoreItems: [],
			saleStoreItems: [],
			joinTypeItems: [],
			customerTypeItems: [],
			procStatusItems: [],
			searchTypeItems: [],
			templateItems: [],
			stayCodeItems: [],
			licenseAuthTypeItems: [],
			selectOpenStoreItems: [],
		},
		inputListItems: {
			고객명: '',
			주민번호: '',
			휴대폰번호: '',
			요금제: '',
			잔여할부금: '',
			사용중기기: '',
			기존유심: '',
			할부가능여부: '',
			가족결합: '',
		},
		pagingData: {
			pageNo: 0,
			pageLastNo: 0,
			pageEndNo: 0,
			perPageCnt: 20,
			pageNumList: [],
			totalCnt: 0,
		},
		cardPagingData: {
			pageNo: 0,
			pageLastNo: 0,
			pageEndNo: 0,
			perPageCnt: 20,
			pageNumList: [],
		},
	},
	mutations: {
		filterInit(state) {
			for (let data in state.filterData) {
				state.filterData[data] = '';
			}
			state.dateResetData = true;
			state.filterData.srhType = 'ALL';
		},
		// result.data.data로 수정
		setCreditInquireList(state, result) {
			for (let i = 0; i < result.data.data.resultList.length; i++) {
				if (result.data.data.resultList[i].creditInquireResult) {
					result.data.data.resultList[i].creditInquireResult = JSON.parse(
						result.data.data.resultList[i].creditInquireResult.replace(
							/&quot;/g,
							'"',
						),
					);
				} else {
					result.data.data.resultList[i].creditInquireResult = {};
				}
			}
			state.getListData = result.data.data.resultList;
			state.pagingData.perPageCnt = result.data.data.perPageCnt || 0;
			state.pagingData.pageNo = result.data.data.pageNo || 0;
			state.pagingData.pageNumList = result.data.data.pageNumList || [];
			state.pagingData.pageLastNo = result.data.data.pageLastNo || 0;
			state.pagingData.pageEndNo = result.data.data.pageEndNo || 0;
			state.pagingData.totalCnt = result.data.data.totalCnt || 0;
		},
		setCreditInquireCardList(state, result) {
			// json -> obj
			// 리팩토링예정ㅋ
			for (let i = 0; i < result.data.data.resultList.length; i++) {
				if (result.data.data.resultList[i].creditInquireResult) {
					result.data.data.resultList[i].creditInquireResult = JSON.parse(
						result.data.data.resultList[i].creditInquireResult.replace(
							/&quot;/g,
							'"',
						),
					);
				} else {
					result.data.data.resultList[i].creditInquireResult = {};
				}
			}
			state.cardListData = result.data.data.resultList;
			state.cardPagingData.perPageCnt = result.data.data.perPageCnt || 0;
			state.cardPagingData.pageNo = result.data.data.pageNo || 0;
			state.cardPagingData.pageNumList = result.data.data.pageNumList || [];
			state.cardPagingData.pageLastNo = result.data.data.pageLastNo || 0;
			state.cardPagingData.pageEndNo = result.data.data.pageEndNo || 0;
			state.cardPagingData.totalCnt = result.data.data.totalCnt || 0;
			state.selectedCard = null;
		},
		setCreditInquireAddCardList(state, result) {
			// json -> obj
			// 리팩토링예정ㅋ
			for (let i = 0; i < result.data.data.resultList.length; i++) {
				if (result.data.data.resultList[i].creditInquireResult) {
					result.data.data.resultList[i].creditInquireResult = JSON.parse(
						result.data.data.resultList[i].creditInquireResult.replace(
							/&quot;/g,
							'"',
						),
					);
				} else {
					result.data.data.resultList[i].creditInquireResult = {};
				}
				state.cardListData.push(result.data.data.resultList[i]);
			}

			state.cardPagingData.perPageCnt = result.data.data.perPageCnt || 0;
			state.cardPagingData.pageNo = result.data.data.pageNo || 0;
			state.cardPagingData.pageNumList = result.data.data.pageNumList || [];
			state.cardPagingData.pageLastNo = result.data.data.pageLastNo || 0;
			state.cardPagingData.pageEndNo = result.data.data.pageEndNo || 0;
			state.cardPagingData.totalCnt = result.data.data.totalCnt || 0;
		},
		setTemplateList(state, result) {
			state.codeList.templateItems = result.data.data;
		},
		setSaleStoreList(state, result) {
			state.codeList.saleStoreItems = result.data.data;
		},
		setCommonEnumList(state, result) {
			state.codeList.customerTypeItems = result.data.data.CustomerType;
			state.codeList.joinTypeItems = result.data.data.CreditJoinType;
			state.codeList.procStatusItems = result.data.data.CreditProcStatus;
			state.codeList.searchTypeItems = result.data.data.CreditSearchType;
			state.codeList.nationalItems = result.data.data.NationalCode;
			state.codeList.stayCodeItems = result.data.data.StayCode;
		},
		setOpeningStoreList(state, result) {
			state.codeList.openStoreItems = result.data.data;
		},
		setCommonCodeList(state, result) {
			state.codeList.telecomItems = result.data.data.codeList.TELECOM;
		},
		setHistoryList(state, result) {
			state.getHistoryData = result.data.data;
		},
		setCreditInquireStatusCount(state, result) {
			state.creditInquireStatusCountData = result.data.data;
		},
		setCreditTemplate(state, result) {
			state.requestCard = JSON.parse(
				result.data.data.ctResTitle.replace(/&quot;/g, '"'),
			);
			state.selectedCtId = result.data.data.ctId;
		},
		setOpeningStoreSelectList(state, result) {
			state.codeList.selectOpenStoreItems = result.data.data;
		},
	},
	actions: {
		async getCreditInquireList({ commit }, data) {
			const result = await getCreditInquireList(data);
			if (result) {
				commit('setCreditInquireList', result);
			}
		},
		async getCreditInquireCardList({ commit }, data) {
			const result = await getCreditInquireList(data);
			if (result) {
				commit('setCreditInquireCardList', result);
			}
		},
		async getCreditInquireAddCardList({ commit }, data) {
			const result = await getCreditInquireList(data);
			if (result) {
				commit('setCreditInquireAddCardList', result);
			}
		},
		async getHistory({ commit }, data) {
			const result = await getHistory(data);
			if (result) {
				commit('setHistory', result);
			}
		},
		async getCreditTemplateList({ commit }, data) {
			const result = await getCreditTemplateList(data);
			if (result) {
				commit('setTemplateList', result);
			}
		},
		async insertList({ commit }, data) {
			const result = await insertCreditInquire(data);
			if (result) {
				console.log('insertResult');
				console.log(result);
			}
		},
		// 영업점 enum
		async getSaleStoreList({ commit }, data) {
			const result = await getSaleStoreList(data);
			if (result) {
				commit('setSaleStoreList', result);
			}
		},
		// 공통 enum
		async commonCodeEnumList({ commit }) {
			const data = {
				initEnumData: [
					'CreditJoinType',
					'CustomerType',
					'CreditOwnType',
					'CreditReqType',
					'CreditProcStatus',
					'CreditHistoryStatus',
					'CreditSearchType',
					'NationalCode',
					'StayCode',
				],
			};
			const result = await commonCodeEnumList(data);
			if (result) {
				commit('setCommonEnumList', result);
			}
		},
		// 개통점 전체콜
		async getOpeningStoreList({ commit }) {
			const result = await getOpeningStoreList();
			if (result) {
				commit('setOpeningStoreList', result);
			}
		},
		// 영업점에 따른 개통점 콜
		async getOpeningStoreSelectList({ commit }, data) {
			const result = await getOpeningStoreList(data);
			if (result) {
				commit('setOpeningStoreSelectList', result);
			}
		},
		async commonCodeList({ commit }) {
			let data = { code: ['TELECOM'] };
			const result = await commonCodeList(data);
			if (result) {
				commit('setCommonCodeList', result);
			}
		},
		async insertCreditTemplate({ commit }, data) {
			const result = await insertCreditTemplate(data);
			if (result) {
				alert('저장되었습니다.');
			}
		},
		async deleteCreditTemplate({ commit }, data) {
			const result = await deleteCreditTemplate(data);
			if (result) {
				console.log(result);
			}
		},
		async setMainCreditTemplate({ commit }, data) {
			const result = await setMainCreditTemplate(data);
			if (result) {
				return result;
			}
		},
		// 신용조회 요청
		async insertCreditInquire({ commit }, data) {
			const result = await insertCreditInquire(data);
			if (result.data.resultCode === '0000') {
				alert('요청완료되었습니다.');
			}
			if (result.data.resultCode === '9999') {
				alert('요청실패하였습니다.');
			}
		},
		async updateCreditInquire({ commit }, data) {
			const result = await updateCreditInquire(data);
			if (result.data.status === 200) {
				alert('수정되었습니다.');
				return true;
			}
		},
		async updateCreditInquireStatus({ commit }, data) {
			const result = await updateCreditInquireStatus(data);
			if (result.data.status === 200) {
				alert('수정되었습니다.');
				return true;
			}
		},
		// 신용조회 재요청
		async reRequestCreditInquire({ commit }, data) {
			const result = await reRequestCreditInquire(data);
			if (result) {
				console.log(result);
			}
		},
		// 신용조회 이력조회
		async getCreditInquireHistoryList({ commit }, data) {
			const result = await getCreditInquireHistoryList(data);
			if (result) {
				commit('setHistoryList', result);
			}
		},
		// 신용조회 상태별 카운트
		async getCreditInquireStatusCount({ commit }, data) {
			const result = await getCreditInquireStatusCount(data);
			if (result) {
				commit('setCreditInquireStatusCount', result);
			}
		},
		// 신조템플릿 요청
		async getCreditTemplate({ commit }, data) {
			const result = await getCreditTemplate(data);
			if (result) {
				commit('setCreditTemplate', result);
			}
		},
		// 신조 카드 요청2
		async insertCreditInquireStore({ commit }, data) {
			const result = await insertCreditInquireStore(data);
			if (result) {
				return result;
			}
		},
	},
};

export default CreditCheckModule;
