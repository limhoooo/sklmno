import { jsonToQueryString } from '../../../common/common';
import { filterData } from '../../../store/interface/supply-chain-mgmt/sell-status/sellStatusInterface';
import { instance } from '../../../api/index';

const domain = '/SellCurrentManagement/SellCurrentMgmt/';

const getSellCurrentPage = async (data: filterData) => {
	let param = '';
	if (data) param = jsonToQueryString(data);
	const response = await instance.get(`${domain}getSellCurrentPage${param}`);
	return response;
};
const updateDocTargetYn = async (data: filterData) => {
	const response = await instance.post(`${domain}checkStatusUpdateYn`, data);
	return response;
};

// const updateCancel = async data => {
//     const response = await instance.post(`${domain}updateCancel`, data);
//     return response;
// };

export { getSellCurrentPage, updateDocTargetYn };
