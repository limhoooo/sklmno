import { instance } from '../../index.js';
import { jsonToQueryString } from '@/common/common';

const domain = '/DeviceManagement/';

const getMgmtTargetDevicePage = async data => {
	let param = '';
	if (data) param = jsonToQueryString(data);
	const response = await instance.get(
		`${domain}MgmtTargetDevice/getMgmtTargetDevicePage${param}`,
	);
	return response;
};

const insertMediationOut = async data => {
	const response = await instance.post(
		`${domain}MgmtTargetDevice/insertMediationOut`,
		data,
	);
	return response;
};

export { getMgmtTargetDevicePage, insertMediationOut };
