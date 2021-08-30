import { instance } from '../../index.js';
import { jsonToQueryString } from '../../../common/common';

const domain = 'MemoManagement/MemoMgmt/';

const getList = async data => {
	let param = '';
	if (data) param = jsonToQueryString(data);
	const response = await instance.get(`${domain}getTaskMemoList${param}`);
	return response;
};

const getStatusList = async data => {
	let param = '';
	if (data) param = jsonToQueryString(data);
	const response = await instance.get(`${domain}getStatusList${param}`);
	return response;
};
const insertTask = async data => {
	const response = await instance.post(`${domain}insertTaskMemo`, data);
	return response;
};

export { getList, getStatusList, insertTask };
