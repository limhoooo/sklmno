import {instance, instanceAuth, instanceExcel} from '../index.js';
import {jsonToQueryString} from '../../common/common';

const commonCodeList = async data => {
	const response = await instanceAuth.post(`dataHandle/retrieveInitData`, data);
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

const generatorJoinPath = async data => {
	const response = await instanceAuth.post(
		`dataHandle/generatorJoinPath`,
		data,
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
	let param = '';
	if (data.pagingData) param = jsonToQueryString(data.pagingData);
	const response = await instance.get(
		`DeviceManagement/MoveStockMgmt/getMoveAndTrnsList/${data.title}${param}`,
	);
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

export {
	commonCodeList,
	generatorJoinPath,
	selectCodeList,
	getCapacityList,
	getDeviceList,
	getDeviceColorList,
	getGoodsSelectList,
	getGoodsSelectCapacityList,
	getRetrieveDeviceHistory,
	excelDownLoad,
	getTransStoreList,
	getDeviceStock,
	getDeviceProvInfo,
	getMoveAndTrnsList,
	excelFormDownload,
	deviceOverlapCheck,
};
