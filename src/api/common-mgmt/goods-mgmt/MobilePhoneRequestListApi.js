/* eslint-disable */
import {instance} from '../../index.js';
import {jsonToQueryString} from '../../../common/common';

// 첫 화면 리스트 호출
const getRegReqList = async data => {
    let param = '';
    if (data) param = jsonToQueryString(data);
    const response = await instance.get(`GoodsManagement/GoodsMgmt/getRegReqList${param}`)
    return response;
};

const updateReqStatus = async data => {
    const response = await instance.post(
        `GoodsManagement/GoodsMgmt/updateReqStatus`,
        data,
    );
    return response;
};

export {
    getRegReqList,
    updateReqStatus,
}