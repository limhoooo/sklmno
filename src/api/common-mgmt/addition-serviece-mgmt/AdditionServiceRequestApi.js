/* eslint-disable */
import {instance} from '../../index.js';
import {jsonToQueryString} from '../../../common/common';

// 첫 화면데이터
const getRegReqList = async data => {
	let param = '';
	if (data) param = jsonToQueryString(data);
    const response = await instance.get(
      `AddServiceManagement/AddServiceMgmt/getRegReqList${param}`
    );
    return response;
};

const updateReqStatus = async data => {
	const response = await instance.post(
		`AddServiceManagement/AddServiceMgmt/updateReqStatus`,
		data,
	);
	return  response;
};

export {
    getRegReqList,
    updateReqStatus,
}