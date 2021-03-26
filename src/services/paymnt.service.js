import axios from "axios";
import authHeader from "./auth-header";

let user = localStorage.getItem('user');
var data = JSON.parse(user);
let access_token = data?.token;
axios.defaults.headers.common = {'Authorization': `bearer ${access_token}`}
console.log('access_token -> ', access_token);

const API_URL = "http://127.0.0.1:8082";



const getPaymntsLists = (  comp_nm_Ref_v,
                           jungsan_date_Ref_v,
                           total_paymnt_amnt_Ref_v,
                           paymnt_method_Ref_v,
                           minus_amount_Ref_v,
                           jungsan_amount_Ref_v,
                           use_Ref_v,
                           orderBy,
                           descasc ) => {
    return new Promise(function(resolve, reject) {
        const data = axios.get(API_URL + "/api/front_api/paymnts_lists", {
            params: {
                comp_nm_Ref_v: comp_nm_Ref_v,
                jungsan_date_Ref_v: jungsan_date_Ref_v,
                total_paymnt_amnt_Ref_v: total_paymnt_amnt_Ref_v,
                paymnt_method_Ref_v: paymnt_method_Ref_v,
                minus_amount_Ref_v: minus_amount_Ref_v,
                jungsan_amount_Ref_v: jungsan_amount_Ref_v,
                use_Ref_v: use_Ref_v,
                orderBy: orderBy,
                descasc: descasc
            }
        });
        resolve(data);
    });
};


const getPaymntsInfo = ( idx ) => {
    return new Promise(function(resolve, reject) {
        const data = axios.get(API_URL + "/api/front_api/Paymnts_Info", {
            params: {
                idx: idx,
            }
        });
        resolve(data);
    });
};


const getPaymntsTotalCnt = () => {
    return new Promise(function(resolve, reject) {
        const data = axios.get(API_URL + "/api/front_api/paymnts_totalCnt");
        console.log('data -> ', data);
        resolve(data);
    });
};


const setPaymntsDataUpdate = (id, jungsan_date, total_paymnt_amnt, minus_amount, jungsan_amount, paymnt_method, use) => {
    return new Promise(function(resolve, reject) {
        const data = axios.post(API_URL + "/api/front_api/paymntsDataUpdate", {
            id: id,
            jungsan_date: jungsan_date,
            total_paymnt_amnt: total_paymnt_amnt,
            minus_amount: minus_amount,
            jungsan_amount: jungsan_amount,
            paymnt_method: paymnt_method,
            use: use
        });
        resolve(data);
    });
};


const setPaymntsDataDelete = (id) => {
    return new Promise(function(resolve, reject) {
        const data = axios.post(API_URL + "/api/front_api/paymntsDataDelete", {
            id: id,
        });
        resolve(data);
    });
};


const setPaymntsDataMultiDelete = (checkbxArr) => {
    return new Promise(function(resolve, reject) {
        const data = axios.post(API_URL + "/api/front_api/paymntsDataMultiDelete", {
            dataArr: checkbxArr,
        });
        resolve(data);
    });
};


const uploadService = (formData) => {
    return new Promise(function(resolve, reject) {
        const data = axios.post(API_URL + "/api/front_api/fileUpload",
            formData,
        );
        resolve(data);
    });
};


const setUploadInfoSave = (compId, fileListInfo) => {
    return new Promise(function(resolve, reject) {
        const data = axios.post(API_URL + "/api/front_api/uploadInfoSave", {
            id: compId,
            list: fileListInfo
        });
        resolve(data);
    });
};


const setPaymntHisSave = (compId, paymntHis) => {
    return new Promise(function(resolve, reject) {
        const data = axios.post(API_URL + "/api/front_api/paymntHisSave", {
            compId: compId,
            paymntHis: paymntHis,
        });
        resolve(data);
    });
};


const setPaymntMainSave = (paramData) => {
    return new Promise(function(resolve, reject) {
        const data = axios.post(API_URL + "/api/front_api/paymntMainSave", {
            data: paramData,
        });
        resolve(data);
    });
};








export default {
    getPaymntsLists,
    getPaymntsTotalCnt,
    setPaymntsDataUpdate,
    setPaymntsDataDelete,
    setPaymntsDataMultiDelete,
    getPaymntsInfo,
    uploadService,
    setUploadInfoSave,
    setPaymntHisSave,
    setPaymntMainSave,

};