import { instance, instanceAuth } from '../../index.js';
import { appCommonFormData } from '../../../store/interface/supply-chain-mgmt/application-form-creation/AppFormCreationInterface';
import { jsonToQueryString } from '../../../common/common.js';

const insertData = async (data: appCommonFormData) => {
	const response = await instance.post(
		`ApplicationManagement/ApplicationMgmt/insertApplication`,
		data,
	);
	return response;
};

// 신청서 업데이트
const updateApplication = async (data: appCommonFormData) => {
	const response = await instance.post(
		`
			ApplicationManagement/ApplicationMgmt/updateApplication`,
		data,
	);
	return response;
};

// 신청서 파일 삭제
const deleteApplicationAttachAndMemo = async (data: any) => {
	const response = await instance.post(
		`
		ApplicationManagement/ApplicationMgmt/deleteApplicationAttachAndMemo`,
		data,
	);
	return response;
};

// 신청서 상세조회
const getApplicationDetail = async (data: string) => {
	let param = '';
	if (data) param = jsonToQueryString(data);
	const response = await instance.get(
		`SellCurrentManagement/SellCurrentMgmt/getApplicationDetail${param}`,
	);
	return response;
};

const updateApplicationTaskStatus = async (data: any) => {
	const response = await instance.post(
		`ApplicationManagement/ApplicationMgmt/updateApplicationTaskStatus`,
		data,
	);
	return response;
};

// 영업점 등록자 호출
const getSaleStoreMemberList = async (data: number) => {
	let param = '';
	if (data) param = jsonToQueryString(data);
	const response = await instance.get(
		`Commgmt/Search/getSaleStoreMemberList${param}`,
	);
	return response;
};

// 파일 업로드
const fileUpload = async (data: any) => {
	const response = await instance.post(
		`ApplicationManagement/ApplicationMgmt/updateApplicationAttachAndMemo`,
		data,
	);
	return response;
};
// 파일 다운로드
const fileDownload = async (data: any) => {
	const response = await instanceAuth.get(
		`/download/file/${data.attachType}/${data.pId}/${data.attachId}`,
	);
	return response;
};

// 파일 리스트 조회
const getApplicationAttachList = async (data: any) => {
	let param = '';
	if (data) param = jsonToQueryString(data);
	const response = await instance.get(
		`/ApplicationManagement/ApplicationMgmt/getApplicationAttachList${param}`,
	);
	return response;
};

// 하위 영업점 + 내 관리점
const getSaleStoreList = async (data: any) => {
	const response = await instance.get(`Commgmt/Search/getSaleStoreList`, data);
	return response;
};

// 영업점 선택에 따른 개통점 리스트 전달
const getOpeningStoreList = async (data: any) => {
	let param = '';
	if (data) param = jsonToQueryString(data);
	const response = await instance.get(
		`Commgmt/Search/getOpeningStoreList${param}`,
	);
	return response;
};

export {
	insertData,
	fileUpload,
	getSaleStoreList,
	getOpeningStoreList,
	updateApplication,
	getSaleStoreMemberList,
	getApplicationAttachList,
	deleteApplicationAttachAndMemo,
	updateApplicationTaskStatus,
	getApplicationDetail,
	fileDownload,
};
