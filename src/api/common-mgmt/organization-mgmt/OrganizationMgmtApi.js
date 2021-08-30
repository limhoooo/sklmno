import { instance } from '../../index.js';
import { jsonToQueryString } from '../../../common/common';

const domain = '/OrganizationManagement/OrganizationMgmt/';

const getOrgnztList = async data => {
	let param = '';
	if (data) param = jsonToQueryString(data);
	const response = await instance.get(`${domain}getOrgnztList${param}`);
	return response;
};
const insertOrgnzt = async data => {
	const response = await instance.post(`${domain}insertOrgnzt`, data);
	return response;
};
const updateOrgnzt = async data => {
	const response = await instance.post(`${domain}updateOrgnzt`, data);
	return response;
};
const deleteOrgnzt = async data => {
	const response = await instance.post(`${domain}deleteOrgnzt`, data);
	return response;
};
const insertUser = async data => {
	const response = await instance.post(`${domain}insertUser`, data);
	return response;
};
const updateUser = async data => {
	const response = await instance.post(`${domain}updateUser`, data);
	return response;
};
const deleteUser = async data => {
	const response = await instance.post(`${domain}deleteUser`, data);
	return response;
};
const updateUserUse = async data => {
	const response = await instance.post(`${domain}updateUserUse`, data);
	return response;
};

export {
	getOrgnztList,
	insertOrgnzt,
	updateOrgnzt,
	deleteOrgnzt,
	deleteUser,
	insertUser,
	updateUser,
	updateUserUse,
};
