import {instance, instanceAuth, instanceExcel} from '../index.js';
import {jsonToQueryString} from '../../common/common';

const commonCodeList = async data => {
	const response = await instanceAuth.post(`dataHandle/retrieveInitData`, data);
	return response;
};

/* enum 데이터콜 */
const commonCodeEnumList = async data => {
	const response = await instanceAuth.post(
		`dataHandle/retrieveInitEnumData`,
		data,
	);
	return response;
};

// 통신사 join 보유처
const selectCodeList = async data => {
	let param = '';
	if (data) {
		param = data;
	} else {
		param = '0';
	}
	const response = await instance.get(`
StockManagement/StockMgmt/selectStockList/${param}`);
	return response;
};

// 용량 목록 조회
const getCapacityList = async data => {
	let param = '';
	if (data) param = data;
	const response = await instance.get(
		`Wms/Search/getGoodsSelectCapacityList/${param}`,
	);
	return response;
};

// 기기 목록 조회
const getDeviceList = async data => {
	let param = '';
	if (data) param = jsonToQueryString(data);
	const response = await instance.get(`Wms/Search/getDeviceList${param}`);
	return response;
};
// 기기 이름 목록 조회
const getGoodsNameList = async data => {
	let param = '';
	if (data) param = jsonToQueryString(data);
	const response = await instance.get(`Wms/Search/getGoodsNameList${param}`);
	return response;
};
// 기기 색상 조회
const getDeviceColorList = async data => {
	let param = '';
	if (data) param = jsonToQueryString(data);
	const response = await instance.get(`Wms/Search/getColorList${param}`);
	return response;
};

// 상품 용량 셀렉트 목록 조회
const getGoodsSelectCapacityList = async data => {
	let param = '';
	if (data) param = data;
	const response = await instance.get(
		`Wms/Search/getGoodsSelectCapacityList/${param}`,
	);
	return response;
};

// 상품 조회
const getGoodsSelectList = async data => {
	let param = '';
	if (data) param = data;
	const response = await instance.get(`Wms/Search/getGoodsSelectList/${param}`);
	return response;
};

// 부가서비스
const getTelecomAddServiceList = async data => {
	let param = '';
	if (data) param = data;
	const response = await instance.get(
		`Commgmt/Search/getTelecomAddServiceList/${param}`,
	);
	return response;
};

// 요금제
const getTelecomChargeList = async data => {
	let param = '';
	if (data) param = data;
	const response = await instance.get(
		`Commgmt/Search/getTelecomChargeList/${param}`,
	);
	return response;
};

// 요금제 선택시 공시 및 금액전달
const getPubNotiInfo = async data => {
	let param = '';
	if (data) param = jsonToQueryString(data);
	const response = await instance.get(`Commgmt/Search/getPubNotiInfo${param}`);
	return response;
};

const getUsimSelectList = async data => {
	let param = '';
	if (data) param = data;
	const response = await instance.get(`Wms/Search/getUsimSelectList/${param}`);
	return response;
};

const generatorJoinPath = async data => {
	const response = await instanceAuth.post(
		`dataHandle/generatorJoinPath`,
		data,
	);
	return response;
};

// 기기 이력조회
const getRetrieveDeviceOpenHistory = async data => {
	let param = '';
	if (data) param = jsonToQueryString(data);
	const response = await instanceAuth.get(
		`dataHandle/retrieveDeviceOpenHistory${param}`,
	);
	return response;
};

// 기기 이력조회
const getRetrieveDeviceHistory = async data => {
	let param = '';
	if (data) param = jsonToQueryString(data);
	const response = await instanceAuth.get(
		`dataHandle/retrieveDeviceHistory${param}`,
	);
	return response;
};

// 기기상태정보 조회
const getRetrieveDeviceStatusInfo = async data => {
	let param = '';
	if (data) param = jsonToQueryString(data);
	const response = await instanceAuth.get(
		`dataHandle/retrieveDeviceStatusInfo${param}`,
	);
	return response;
};

// 이관처 셀렉트목록 조회
const getTransStoreList = async data => {
	const response = await instance.get(
		`DeviceManagement/MoveStockMgmt/getTransStoreList`,
		data,
	);
	return response;
};

// 바코드로 기기 현재 보유처 조회
const getDeviceStock = async data => {
	let param = '';
	if (data) param = jsonToQueryString(data);
	const response = await instance.get(`Wms/Search/getDeviceStock${param}`);
	return response;
};

// 바코드로 기기 현재 공급처 조회
const getDeviceProvInfo = async data => {
	let param = '';
	if (data) param = jsonToQueryString(data);
	const response = await instance.get(`Wms/Search/getDeviceProvInfo${param}`);
	return response;
};

// 기기이동/이관 목록 조회
const getMoveAndTrnsList = async data => {
	console.log(data);
	let param = '';
	if (data.pagingData) param = jsonToQueryString(data.pagingData);
	const response = await instance.get(
		`DeviceManagement/MoveStockMgmt/getMoveAndTrnsList/${data.title}${param}`,
	);
	return response;
};

// 개통점 목록조회
const getSessOpeningStoreList = async () => {
	const response = await instance.get(`Commgmt/Search/getSessOpeningStoreList`);
	return response;
};

// 엑셀 다운로드
const excelDownLoad = async data => {
	const response = await instanceExcel.post(
		`download/excel/${data.apiName}Excel`,
		data.data,
	);
	return response;
};
// 엑셀양식 다운로드
const excelFormDownload = async data => {
	const response = await instanceAuth.get(
		`/download/file/excel/template/${data}`,
	);
	return response;
};
// 기기 중복체크
const deviceOverlapCheck = async data => {
	let param = '';
	if (data) param = jsonToQueryString(data);
	const response = await instance.get(
		`/Wms/Search/getDeviceListFromBarcode${param}`,
		data,
	);
	return response;
};
// 기기 중복체크2
const cwsDeviceListFromBarcode = async data => {
	let param = '';
	if (data) param = jsonToQueryString(data);
	const response = await instance.get(
		`/Wms/Search/cwsDeviceListFromBarcode${param}`,
		data,
	);
	return response;
};
// 유심 중복체크2
const cwsUsimListFromBarcode = async data => {
	let param = '';
	if (data) param = jsonToQueryString(data);
	const response = await instance.get(
		`/Wms/Search/cwsUsimListFromBarcode${param}`,
		data,
	);
	return response;
};

// 파일 업로드
const fileUpload = async data => {
	let param = '';
	if (data) param = jsonToQueryString(data);
	const response = await instance.get(`/Wms/Search/fileUpload${param}`, data);
	return response;
};
// 부가서비스 타이틀로 검색
const getTelecomAddServiceListWithTitle = async data => {
	let param = '';
	if (data) {
		let format = { addSvcName: data[1] };
		param = format;
		param = jsonToQueryString(format);
	}
	const response = await instance.get(
		`Commgmt/Search/getTelecomAddServiceList/${data[0]}${param}`,
	);
	return response;
};
// 상담원 조회
const retrieveMemberListByRole = async data => {
	let param = '';
	if (data) param = jsonToQueryString(data);
	const response = await instanceAuth.get(
		`dataHandle/retrieveMemberListByRole${param}`,
	);
	return response;
};

// 영업점 + 내 관리점 조회
const getSaleStoreList = async () => {
	const response = await instance.get(`Commgmt/Search/getSaleStoreList`);
	return response;
};

// 영업점 선택에 따른 개통점 리스트 전달
const getOpeningStoreSelectList = async data => {
	let param = '';
	if (data) param = jsonToQueryString(data);
	const response = await instance.get(
		`Commgmt/Search/getOpeningStoreList${param}`,
	);
	return response;
};

// 즐겨찾기 조회
const getBookmarkList = async () => {
	const response = await instance.get(
		`BookmarkManagement/BookmarkMgmt/bookmark`,
	);
	return response;
};

// 즐겨찾기 저장
const postBookmarkList = async data => {
	const response = await instance.post(
		'BookmarkManagement/BookmarkMgmt/bookmark',
		data,
	);
	return response;
};
const maskingFnc = async data => {
	const response = await instanceAuth.get(
		'/user/masking',
		data,
	);
	return response;
};
const checkApplicationStatusUpdateFlag = async data => {
	const response = await instance.post(
		'/SellCurrentManagement/SellCurrentMgmt/checkApplicationStatusUpdateFlag',
		data,
	);
	return response;
};


export {
	commonCodeList,
	commonCodeEnumList,
	generatorJoinPath,
	selectCodeList,
	getCapacityList,
	getDeviceList,
	getDeviceColorList,
	getGoodsSelectList,
	getGoodsSelectCapacityList,
	getRetrieveDeviceOpenHistory,
	getRetrieveDeviceHistory,
	excelDownLoad,
	getTransStoreList,
	getDeviceStock,
	getDeviceProvInfo,
	getMoveAndTrnsList,
	getSessOpeningStoreList,
	excelFormDownload,
	deviceOverlapCheck,
	fileUpload,
	getTelecomAddServiceList,
	getTelecomChargeList,
	getPubNotiInfo,
	getTelecomAddServiceListWithTitle,
	retrieveMemberListByRole,
	getUsimSelectList,
	getRetrieveDeviceStatusInfo,
	getSaleStoreList,
	getOpeningStoreSelectList,
	getBookmarkList,
	postBookmarkList,
	getGoodsNameList,
	maskingFnc,
	checkApplicationStatusUpdateFlag,
	cwsDeviceListFromBarcode,
	cwsUsimListFromBarcode
};
