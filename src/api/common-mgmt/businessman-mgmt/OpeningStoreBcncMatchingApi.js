import { instance } from '../../index.js';
import { jsonToQueryString } from '../../../common/common';

const domain = 'BusinessManManagement/OpeningStoreMgmt/';

const getSaleStoreMapInfo = async data => {
	let param = '';
	if (data) param = jsonToQueryString(data);
	const response = await instance.get(`${domain}getSaleStoreMapInfo${param}`);
	return response;
};

const setSalesStoreMapInfo = async data => {
	const response = await instance.post(
		`BusinessManManagement/OpeningStoreMgmt/setSalesStoreMapInfo`,
		data,
	);
	return response;
};

export { getSaleStoreMapInfo, setSalesStoreMapInfo };
