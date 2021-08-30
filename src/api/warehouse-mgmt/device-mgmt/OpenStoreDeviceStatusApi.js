import { instance } from '../../index.js';
import { jsonToQueryString } from '../../../common/common';

const domain = '/DeviceManagement/OpeningCurrentMgmt/';

const getOpeningCurrentList = async data => {
	let param = '';
	if (data) param = jsonToQueryString(data);
	const response = await instance.get(`${domain}getOpeningCurrentList${param}`);
	return response;
};
const updateCancel = async data => {
	const response = await instance.post(`${domain}updateCancel`, data);
	return response;
};

export { getOpeningCurrentList, updateCancel };
