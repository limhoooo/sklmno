import { instance, instanceAuth } from '../../index.js';
import { jsonToQueryString } from '../../../common/common';

const domain = '/RoleFuncManagement/RoleFuncMgmt/';

const getFuncRoleMapInfo = async data => {
	let param = '';
	if (data) param = jsonToQueryString(data);
	const response = await instance.get(
		`${domain}getFuncRoleMapInfo${param}`,
		data,
	);
	return response;
};

const setFuncRoleMapInfo = async data => {
	const response = await instance.post(`${domain}setFuncRoleMapInfo`, data);
	return response;
};

const insertRole = async data => {
	const response = await instance.post(`${domain}insertRole`, data);
	return response;
};

const updateRole = async data => {
	const response = await instance.post(`${domain}updateRole`, data);
	return response;
};
const deleteRole = async data => {
	const response = await instance.post(`${domain}deleteRole`, data);
	return response;
};
const getRoleType = async data => {
	const response = await instanceAuth.post(
		`dataHandle/retrieveInitEnumData`,
		data,
	);
	return response;
};
export {
	insertRole,
	updateRole,
	deleteRole,
	getFuncRoleMapInfo,
	setFuncRoleMapInfo,
	getRoleType,
};
