/* eslint-disable */
import {instance} from '../../index.js';
import {jsonToQueryString} from '../../../common/common';

// 첫 화면데이터
const getList = async data => {
  let param = '';
  if (data) param = jsonToQueryString(data);
    const response = await instance.get(
      `AddServiceManagement/AddServiceMgmt/getList${param}`
    );
    return response;
};

const insertData = async data => {
    const response = await instance.post(
      `AddServiceManagement/AddServiceMgmt/insertData`,
      data,
    );
    return response;
};

const deleteData = async data => {
  const response = await instance.post(
    `AddServiceManagement/AddServiceMgmt/deleteData`,
    data,
  );
  return response;
};

const updateUseYn = async data => {
  const response = await instance.post(
    `AddServiceManagement/AddServiceMgmt/updateUseYn`,
    data,
  );
  return response;
};

const updateData = async data => {
  const response = await instance.post(
    `AddServiceManagement/AddServiceMgmt/updateData`,
    data,
  );
  return response;
};

export {
    getList,
    insertData,
    deleteData,
    updateUseYn,
    updateData
}