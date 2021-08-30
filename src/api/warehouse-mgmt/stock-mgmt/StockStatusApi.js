import { instance, instanceAuth } from '../../index.js';
import { jsonToQueryString } from '../../../common/common';

const domain = '/StoreStockManagement/StoreStockMgmt/';

const getStoreStockList = async data => {
	let param = '';
	if (data) param = jsonToQueryString(data);
	const response = await instance.get(`${domain}getStoreStockList${param}`);
	return response;
};
const getStoreStockCheckCount = async data => {
	let output = [];
	for (let i in data) {
		output[i] = data[i];
	}
	if (output && output.stockTab) {
		output.stockTab = '';
	}
	let param = '';
	if (output) param = jsonToQueryString(output);
	const response = await instance.get(
		`${domain}getStoreStockCheckCount${param}`,
	);
	return response;
};

const checkStoreStock = async data => {
	const response = await instance.post(`${domain}checkStoreStock`, data);
	return response;
};
const getStoreStockCheckHistory = async data => {
	let param = '';
	if (data) param = jsonToQueryString(data);
	const response = await instance.get(
		`${domain}getStoreStockCheckHistory${param}`,
	);

	return response;
};

const commonCodeEnumList = async data => {
	const response = await instanceAuth.post(
		`dataHandle/retrieveInitEnumData`,
		data,
	);
	return response;
};

const checkStoreStockDto = async data => {
	const response = await instance.post(`${domain}checkStoreStockDto`, data);
	return response;
};

export {
	getStoreStockList,
	checkStoreStock,
	getStoreStockCheckHistory,
	commonCodeEnumList,
	checkStoreStockDto,
	getStoreStockCheckCount,
};
