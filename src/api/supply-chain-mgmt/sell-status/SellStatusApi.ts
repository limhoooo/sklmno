import {jsonToQueryString} from '../../../common/common';
import {filterData} from '../../../store/interface/supply-chain-mgmt/sell-status/sellStatusInterface';
import {instance} from '../../../api/index';

const domain = '/DeviceManagement/OpeningCurrentMgmt/';

const getList = async (data: filterData) => {
	let param = '';
	if (data) param = jsonToQueryString(data);
	const response = await instance.get(`${domain}getList${param}`);
	return response;
};

// const updateCancel = async data => {
//     const response = await instance.post(`${domain}updateCancel`, data);
//     return response;
// };

export { getList };
