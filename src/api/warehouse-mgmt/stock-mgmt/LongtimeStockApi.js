import { instance } from '../../index.js';
import { jsonToQueryString } from '../../../common/common';

const domain = '/StoreStockManagement/StoreStockMgmt/';

const getList = async data => {
	let param = '';
	if (data) param = jsonToQueryString(data);
	const response = await instance.get(
		`${domain}getLongTimeStoreStockList${param}`,
	);
	return response;
};
const setLongTimeStoreStockAlarm = async data => {
	const response = await instance.post(
		`${domain}setLongTimeStoreStockAlarm`,
		data,
	);
	return response;
};
const getLongTimeStoreStockAlarm = async data => {
	const response = await instance.post(
		`${domain}getLongTimeStoreStockAlarm`,
		data,
	);
	return response;
};
export { getList, setLongTimeStoreStockAlarm, getLongTimeStoreStockAlarm };
