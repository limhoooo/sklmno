import { instance } from '../../index.js';
import { jsonToQueryString } from '../../../common/common';

const domain = 'DeviceManagement/MgmtTargetDevice/';

const getMadiationOutPage = async data => {
	let param = '';
	if (data) param = jsonToQueryString(data);
	const response = await instance.get(`${domain}getMadiationOutPage${param}`);
	return response;
};
export { getMadiationOutPage };
