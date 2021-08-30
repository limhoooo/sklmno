import {instance, instanceAuthNone} from '../index.js';

const loginSubmit = async data => {
	const response = await instanceAuthNone.post(`/user/login`, data);
	return response;
};

const logout = async data => {
	const response = await instanceAuthNone.post(`/user/invalidate`, data);
	return response;
};

const signUp = async data => {
	const response = await instance.post(
		`/BusinessManManagement/SaleStoreMgmt/joinStore`,
		data,
	);
	return response;
};

const signUpStore = async (data, path) => {
	const response = await instance.post(
		`/BusinessManManagement/SaleStoreMgmt/joinStore`,
		data,
		{
			headers: { Authorization: `${path}` },
		},
	);
	return response;
};

const existsData = async data => {
	const response = await instanceAuthNone.post(`/dataHandle/existsData`, data);
	return response;
};

const existsDataChk = async data => {
	const response = await instanceAuthNone.post(
		`/dataHandle/existsData`,
		data.userInsToken,
		{
			headers: { Authorization: `${data.value}` },
		},
	);
	return response;
};

const updatePassword = async data => {
	console.log(data);
	const response = await instanceAuthNone.post(`user/updatePassword`, data);
	return response;
};

const getUserInfo = async () => {
	const response = await instanceAuthNone.get(`user/getUserInfo`);
	return response;
};

const updateUserInfo = async data => {
	const response = await instanceAuthNone.post(`user/updateUserInfo`, data);
	return response;
};

export {
	loginSubmit,
	logout,
	signUp,
	signUpStore,
	existsData,
	existsDataChk,
	updatePassword,
	getUserInfo,
	updateUserInfo,
};
