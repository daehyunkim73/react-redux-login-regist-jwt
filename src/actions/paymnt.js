import {
  SET_TEMPPAYMNTLIST_SUCCESS,
  SET_TEMPPAYMNTLIST_FAIL,
  SET_CONTENTCNT_PERPAGE_SUCCESS,
  SET_TOTALCNT_SUCCESS,


} from "./types";

import PaymntService from "../services/paymnt.service";



export const getPaymntsLists = (  comp_nm_Ref_v,
                                  jungsan_date_Ref_v,
                                  total_paymnt_amnt_Ref_v,
                                  paymnt_method_Ref_v,
                                  minus_amount_Ref_v,
                                  jungsan_amount_Ref_v,
                                  use_Ref_v,
                                  orderBy,
                                  descasc ) => (dispatch) => {
  return PaymntService.getPaymntsLists(
                                      comp_nm_Ref_v,
                                      jungsan_date_Ref_v,
                                      total_paymnt_amnt_Ref_v,
                                      paymnt_method_Ref_v,
                                      minus_amount_Ref_v,
                                      jungsan_amount_Ref_v,
                                      use_Ref_v,
                                      orderBy,
                                      descasc ).then(
      (response) => {
        dispatch({
          type: SET_TEMPPAYMNTLIST_SUCCESS,
          payload: {list: response.data, cnt: response.data.length}
        });
        return Promise.resolve();
      }
  );
};


export const getPaymntsInfo = ( idx ) => (dispatch) => {
    return PaymntService.getPaymntsInfo(
        idx ).then(
        (response) => {
            return Promise.resolve(response);
        }
    );
};


export const getPaymntsTotalCnt = () => (dispatch) => {
    return PaymntService.getPaymntsTotalCnt().then(
        (response) => {
            dispatch({
                type: SET_TOTALCNT_SUCCESS,
                payload: {cnt: response.data[0].cnt}
            });
            return Promise.resolve();
        }
    );
};


export const setPaymntsDataUpdate = (id, jungsan_date, total_paymnt_amnt, minus_amount, jungsan_amount, paymnt_method, use) => (dispatch) => {
    return PaymntService.setPaymntsDataUpdate(id, jungsan_date, total_paymnt_amnt, minus_amount, jungsan_amount, paymnt_method, use).then(
        (response) => {
            console.log('response -> ', response)
            return Promise.resolve();
        }
    );
};


export const setPaymntsDataDelete = (id) => (dispatch) => {
    return PaymntService.setPaymntsDataDelete(id).then(
        (response) => {
            console.log('response -> ', response)
            return Promise.resolve();
        }
    );
};


export const setPaymntsDataMultiDelete = (checkbxArr) => (dispatch) => {
    return PaymntService.setPaymntsDataMultiDelete(checkbxArr).then(
        (response) => {
            return Promise.resolve();
        }
    );
};


export const uploadService = (formData) => {
    return PaymntService.uploadService(formData).then(
        (response) => {
            return Promise.resolve(response);
        }
    );
}


export const setUploadInfoSave = (compId, fileListInfo) => (dispatch) => {
    return PaymntService.setUploadInfoSave(compId, fileListInfo).then(
        (response) => {
            console.log('setUploadInfoSave > response -> ', response)
            return Promise.resolve(response);
        }
    );
}


export const setPaymntHisSave = (compId, paymntHis) => (dispatch) => {
    return PaymntService.setPaymntHisSave(compId, paymntHis).then(
        (response) => {
            return Promise.resolve();
        }
    );
}


export const setPaymntMainSave = (paramData) => (dispatch) => {
    return PaymntService.setPaymntMainSave(paramData).then(
        (response) => {
            return Promise.resolve();
        }
    );
}




















