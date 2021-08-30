import { instance } from '../../index.js';
import { jsonToQueryString } from '../../../common/common';

// 첫 화면데이터
const getList = async data => {
	let param = '';
	if (data) param = jsonToQueryString(data);
	const response = await instance.get(
		`GoodsManagement/GoodsMgmt/getList${param}`,
	);
	return response;
};

// 등록팝업
const insertData = async data => {
	const response = await instance.post(
		`GoodsManagement/GoodsMgmt/insertData`,
		data,
	);
	return response;
};

// 정보수정팝업
const updateData = async data => {
	const response = await instance.post(
		`GoodsManagement/GoodsMgmt/updateData`,
		data,
	);
	return response;
};

// 사용여부 useYn
const updateUseYn = async data => {
	const response = await instance.post(
		`GoodsManagement/GoodsMgmt/updateUseYn`,
		data,
	);
	return response;
};

// 삭제
const deleteData = async data => {
	const response = await instance.post(
		`GoodsManagement/GoodsMgmt/deleteData`,
		data,
	);
	return response;
};

// 옵션팝업
const saveOptionInfo = async data => {
	const response = await instance.post(
		`GoodsManagement/GoodsMgmt/saveOptionInfo`,
		data,
	);
	return response;
};

// 매칭팝업
const getMatchList = async data => {
	let param = '';
	if (data) param = jsonToQueryString(data);
	const response = await instance.get(
		`GoodsManagement/GoodsMgmt/getMatchList${param}`,
	);
	return response;
};

const applyMatchStatus = async data => {
	const response = await instance.post(
		`GoodsManagement/GoodsMgmt/applyMatchStatus`,
		data,
	);
	return response;
};
const insertGoodsEosDate = async data => {
	const response = await instance.post(
		`GoodsManagement/GoodsMgmt/insertGoodsEosDate`,
		data,
	);
	return response;
};
const deleteGoodsEosDate = async data => {
	const response = await instance.post(
		`GoodsManagement/GoodsMgmt/deleteGoodsEosDate`,
		data,
	);
	return response;
};
const getGoodsEosList = async data => {
	let param = '';
	if (data) param = jsonToQueryString(data);
	const response = await instance.get(
		`GoodsManagement/GoodsMgmt/getGoodsEosList${param}`,
	);
	return response;
};

export {
	getList,
	insertData,
	updateData,
	updateUseYn,
	deleteData,
	saveOptionInfo,
	getMatchList,
	applyMatchStatus,
	insertGoodsEosDate,
	getGoodsEosList,
	deleteGoodsEosDate,
};
