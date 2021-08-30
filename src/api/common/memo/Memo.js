import { instance } from '../../index.js';
import { jsonToQueryString } from '../../../common/common';

const domain = 'MemoManagement/MemoMgmt/';

const getList = async data => {
	let param = '';
	if (data) param = jsonToQueryString(data);
	const response = await instance.get(`${domain}getMemoList${param}`);
	return response;
};

const insertMemo = async data => {
	const response = await instance.post(`${domain}insertMemo`, data);
	return response;
};

export { getList, insertMemo };
