import { instance } from '../../index';
import { jsonToQueryString } from '../../../common/common';

const domain = 'ApplicationManagement/ApplicationMgmt/';

// 2. formData 수정하기
const updateFormData = async (data: any) => {
	const response = await instance.post(`${domain}updateApplication`, data);
	return response;
};

// 3. fileUpload: 조회
const getAttachList = async (data: any) => {
	let param = '';
	if (data) {
		param = jsonToQueryString(data);
	}
	const response = await instance.get(
		`${domain}getApplicationAttachList${param}`,
	);
	return response;
};

// 4. fileUpload 등록
const fileUpload = async (data: any) => {
	const response = await instance.post(
		`${domain}updateApplicationAttachAndMemo`,
		data,
	);
	return response;
};

// 5. 하위 영업점 + 내 관리점
const getSaleStoreList = async () => {
	const response = await instance.get('/Commgmt/Search/getSaleStoreList');
	return response;
};

// 6. 영업점 선택에 따른 개통점 리스트 전달
const getOpeningStoreList = async (data: any) => {
	let param = '';
	if (data) {
		param = jsonToQueryString(data);
	}
	const response = await instance.get(
		`/Commgmt/Search/getOpeningStoreList${param}`,
	);
	return response;
};
// 7. 개통점(통신사) 선택에 따른 휴대폰 목록
const getGoodsSelectList = async (data: number) => {
	const response = await instance.get(`Wms/Search/getGoodsSelectList/${data}`);
	return response;
}; // 6. 개통점(통신사) 선택에 따른 부가서비스 조회
const getTelecomAddServiceList = async (data: number) => {
	const response = await instance.get(
		`Commgmt/Search/getTelecomAddServiceList/${data}`,
	);
	return response;
};
// 8. 개통점(통신사) 선택에 따른 요금제 목록
const getTelecomChargeList = async (data: number) => {
	const response = await instance.get(
		`/Commgmt/Search/getTelecomChargeList/${data}`,
	);
	return response;
};

// 9. 요금제 선택시 공시 및 금액 전달
const getPubNotiInfo = async (data: any) => {
	let param = '';
	if (data) {
		param = jsonToQueryString(data);
	}
	const response = await instance.get(
		`/Commgmt/Search/getPubNotiInfo/${param}`,
	);
	return response;
};

export {
	updateFormData,
	getAttachList,
	fileUpload,
	getSaleStoreList,
	getOpeningStoreList,
	getGoodsSelectList,
	getTelecomAddServiceList,
	getTelecomChargeList,
	getPubNotiInfo,
};
