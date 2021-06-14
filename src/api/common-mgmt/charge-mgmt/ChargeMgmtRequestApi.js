import { instance } from '../../index.js';
import { jsonToQueryString } from '../../../common/common';

const getRegReqList = async data => {
	let param = '';
	if (data) param = jsonToQueryString(data);
	const response = await instance.get(
		`ChargeManagement/ChargeMgmt/getRegReqList${param}`,
	);
	return response;
};

const updateReqStatus = async data => {
	const response = await instance.post(
		`ChargeManagement/ChargeMgmt/updateReqStatus`,
		data,
	);
	return response;
};

export { getRegReqList, updateReqStatus };
