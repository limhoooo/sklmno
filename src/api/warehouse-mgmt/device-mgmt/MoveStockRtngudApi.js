import { instance, instanceAuth, instanceExcel } from '../../index.js';
import { jsonToQueryString } from '../../../common/common';

const domain = '/DeviceManagement/ReturnStockMgmt/';
const getReturnStockList = async data => {
	let param = '';
	if (data) param = jsonToQueryString(data);
	const response = await instance.get(`${domain}getReturnStockList${param}`);
	return response;
};
const getDeviceInfo = async data => {
	let param = '';
	if (data) param = jsonToQueryString(data);
	const response = await instance.get(`${domain}getDeviceInfo${param}`);
	return response;
};
const insertReturnStock = async data => {
	const response = await instance.post(`${domain}insertReturnStock`, data);
	return response;
};
const insertReturnStockExcel = async data => {
	const response = await instance.post(`${domain}insertReturnStockExcel`, data);
	return response;
};
const insertReturnStockExcelException = async data => {
	const response = await instanceExcel.post(
		`/download/excel/insertReturnStockExcelException`,
		data,
	);
	return response;
};

export {
	getReturnStockList,
	insertReturnStock,
	getDeviceInfo,
	insertReturnStockExcel,
	insertReturnStockExcelException,
};
