import { instance } from '../../index.js';
import { jsonToQueryString } from '../../../common/common';

const domain = 'StockManagement/StockMgmt/';

const getStockList = async data => {
	let param = '';
	if (data) param = jsonToQueryString(data);
	const response = await instance.get(`${domain}getStockList${param}`);
	return response;
};
const insertStock = async data => {
	const response = await instance.post(`${domain}insertStock`, data);
	return response;
};
const updateStock = async data => {
	const response = await instance.post(`${domain}updateStock`, data);
	return response;
};
const deleteStock = async data => {
	const response = await instance.post(`${domain}deleteStock`, data);
	return response;
};

export { getStockList, insertStock, updateStock, deleteStock };
