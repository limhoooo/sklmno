import { instance } from '../../index.js';
import { jsonToQueryString } from '../../../common/common';

const domain = '/DeviceManagement/DeviceCurrentMgmt/';

const getDeviceStatusList = async data => {
	let param = '';
	if (data) param = jsonToQueryString(data);
	const response = await instance.get(`${domain}getDeviceCurrentList${param}`);
	return response;
};

const insertOpening = async data => {
	const response = await instance.post(`${domain}insertOpening`, data);
	return response;
};

export { getDeviceStatusList, insertOpening };
