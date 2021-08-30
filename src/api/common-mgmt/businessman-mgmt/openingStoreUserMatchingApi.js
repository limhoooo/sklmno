import { instance } from '../../index.js';
import { jsonToQueryString } from '../../../common/common';

const getUserMapInfo = async data => {
	let param = '';
	if (data) param = jsonToQueryString(data);
	const response = await instance.get(
		`BusinessManManagement/OpeningStoreMgmt/getUserMapInfo${param}`,
	);
	return response;
};

const setUserMapInfo = async data => {
	const response = await instance.post(
		`BusinessManManagement/OpeningStoreMgmt/setUserMapInfo`,
		data,
	);
	return response;
};

export { getUserMapInfo, setUserMapInfo };
