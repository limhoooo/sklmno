import { instance } from '../../index.js';
import { jsonToQueryString } from '../../../common/common';

const domain = '/StoreStockManagement/StoreStockMgmt/';

const getStoreStockList = async data => {
	let param = '';
	if (data) param = jsonToQueryString(data);
	const response = await instance.get(`${domain}getStoreStockList${param}`);
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

export { getStoreStockList, checkStoreStock, getStoreStockCheckHistory };
