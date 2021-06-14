import { instance } from '../../index.js';
import { jsonToQueryString } from '../../../common/common';

const domain = '/DeviceManagement/MoveStockMgmt/';

const getMoveStatusList = async data => {
	let param = '';
	if (data) param = jsonToQueryString(data);
	const response = await instance.get(`${domain}getMoveMgmtList${param}`);
	return response;
};

export { getMoveStatusList };
