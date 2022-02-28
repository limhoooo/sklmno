import { jsonToQueryString } from '@/common/common';
import { instance, instanceJson } from '@/api';

const domain = 'CreditManagement/CreditMgmt/'; // 리스트 도메인
const templateDomain = 'CreditTemplateManagement/CreditTemplateMgmt/'; // 템플릿리스트 도메인

// 응답값호출
const getCreditTemplate = async data => {
	let param = '';
	if (data) param = jsonToQueryString(data);
	const response = await instance.get(
		`${templateDomain}getCreditTemplate${param}`,
	);
	return response;
};

// 신조 리스트콜
const getCreditInquireList = async data => {
	let param = '';
	if (data) param = jsonToQueryString(data);
	const response = await instance.get(`${domain}getCreditInquireList${param}`);
	return response;
};

const getOpeningStoreList = async data => {
	let param = '';
	if (data) param = jsonToQueryString(data);
	const response = await instance.get(
		`Commgmt/Search/getOpeningStoreList${param}`,
	);
	return response;
};

const getHistory = async data => {
	let param = '';
	if (data) param = jsonToQueryString(data);
	const response = await instance.get(`${domain}getHistoryList${param}`);
	return response;
};

// 신조 요청
const insertCreditInquire = async data => {
	const response = await instance.post(`${domain}insertCreditInquire`, data);
	return response;
};

// 신조 수정
const updateCreditInquire = async data => {
	const response = await instance.post(`${domain}updateCreditInquire`, data);
	return response;
};

// 신조 상태수정
const updateCreditInquireStatus = async data => {
	const response = await instance.post(
		`${domain}updateCreditInquireStatus`,
		data,
	);
	return response;
};

// 신용조회 이력조회
const getCreditInquireHistoryList = async data => {
	let param = '';
	if (data) param = jsonToQueryString(data);
	const response = await instance.get(
		`${domain}getCreditInquireHistoryList${param}`,
	);
	return response;
};

// 신용조회 상태별 카운트
const getCreditInquireStatusCount = async data => {
	let param = '';
	if (data) param = jsonToQueryString(data);
	const response = await instance.get(
		`${domain}getCreditInquireStatusCount${param}`,
	);
	return response;
};

// 템플릿 리스트콜
const getCreditTemplateList = async data => {
	let param = '';
	if (data) param = jsonToQueryString(data);
	const response = await instance.get(
		`${templateDomain}getCreditTemplateList${param}`,
	);
	return response;
};

// 템플릿 저장
const insertCreditTemplate = async data => {
	const response = await instanceJson.post(
		`${templateDomain}insertCreditTemplate`,
		data,
	);
	return response;
};



// 템플릿 삭제
const deleteCreditTemplate = async data => {
	const response = await instance.post(
		`${templateDomain}deleteCreditTemplate`,
		data,
	);
	return response;
};

// 메인템플릿 설정
const setMainCreditTemplate = async data => {
	const response = await instance.post(
		`${templateDomain}setMainCreditTemplate`,
		data,
	);
	return response;
};

// 신조 재진행
const reRequestCreditInquire = async data => {
	let param = '';
	if (data) param = jsonToQueryString(data);
	const response = await instance.post(
		`${domain}reRequestCreditInquire${param}`,
	);
	return response;
};

// 신청서 신용조회 아이디 맵핑
const mappingCreditInquireId = async data => {
	let param = '';
	if (data) param = jsonToQueryString(data);
	const response = await instance.post(`
		ApplicationManagement/ApplicationMgmt/mappingCreditInquireId${param}
		`);
	return response;
};

// 판매점 리스트콜
const getSaleStoreList = async data => {
	const response = await instance.get(`Commgmt/Search/getSaleStoreList`, data);
	return response;
};
// 카드요청폼
const insertCreditInquireStore = async data => {
	const response = await instance.post(
		`${domain}insertCreditInquireStore`,
		data,
	);
	return response;
};

export {
	getSaleStoreList,
	getCreditInquireList,
	getHistory,
	getCreditTemplateList,
	getOpeningStoreList,
	insertCreditInquire,
	insertCreditTemplate,
	updateCreditInquire,
	updateCreditInquireStatus,
	deleteCreditTemplate,
	setMainCreditTemplate,
	reRequestCreditInquire,
	getCreditInquireHistoryList,
	getCreditInquireStatusCount,
	mappingCreditInquireId,
	getCreditTemplate,
	insertCreditInquireStore,
};
