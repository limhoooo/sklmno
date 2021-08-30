import { instance } from '../../index.js';
import { jsonToQueryString } from '../../../common/common';

const domain = '/StoreStockManagement/StoreStockMgmt/';

const getList = async data => {
	let param = '';
	if (data) param = jsonToQueryString(data);
	const response = await instance.get(
		`${domain}getFaultyStoreStockList${param}`,
	);
	return response;
};
const updateJudgementStatus = async data => {
	const response = await instance.post(`${domain}updateJudgementStatus`, data);
	return response;
};

export { getList, updateJudgementStatus };
