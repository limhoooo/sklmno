import { instance } from '../../index.js';
import { jsonToQueryString } from '../../../common/common';

const domain = 'DeviceManagement/';

const getInStockList = async data => {
	let param = '';
	if (data) param = jsonToQueryString(data);
	const response = await instance.get(
		`${domain}InStockMgmt/getInStockList${param}`,
	);
	return response;
};

const updateInStock = async data => {
	const response = await instance.post(
		`${domain}InStockMgmt/updateInStock`,
		data,
	);
	return response;
};

export { getInStockList, updateInStock };
