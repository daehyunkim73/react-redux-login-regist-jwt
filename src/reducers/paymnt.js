import update from 'immutability-helper';
import {
  SET_TEMPPAYMNTLIST_SUCCESS,
  SET_TEMPPAYMNTLIST_FAIL,
  SET_CONTENTCNT_PERPAGE_SUCCESS,
  SET_PAGENUM_SUCCESS,
  SET_CONTENT_EDITABLE_SUCCESS,
  SET_CURRPAGELIST_SUCCESS,
  SET_PAYMNT_UPDATE_SUCCESS,
  SET_TOTALCNT_SUCCESS,
  SET_GetPAYMNTHIS_SUCCESS,
  SET_SetPAYMNTHIS_SUCCESS,

} from "../actions/types";


export const initialState = {
  tempPaymntList: [],
  totalListCnt: 0,
  contentCntPerPage: 5,
  pageNum: 1,
  currPageList: [],
  searchOption: null,
  paymntHis: [],


};


export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_TEMPPAYMNTLIST_SUCCESS:
      return {
        ...state,
        tempPaymntList: action.payload.list,
        //totalListCnt: action.payload.cnt,
      };


    case SET_TEMPPAYMNTLIST_FAIL:
      return {
        ...state,
        tempPaymntList: [],
      };


    case SET_CONTENTCNT_PERPAGE_SUCCESS:
      return {
        ...state,
        contentCntPerPage: action.payload,
        pageNum: 1,
      };


    case SET_PAGENUM_SUCCESS:
      return {
        ...state,
        pageNum: action.payload,
      };


    case SET_CURRPAGELIST_SUCCESS:
      return {
        ...state,
        currPageList: action.payload,
      };


    case SET_CONTENT_EDITABLE_SUCCESS:
      const currPageList_v = state.currPageList;
      const dataIndex = state.currPageList.findIndex(v => v.id === action.payload.id);
      const currData = state.currPageList[dataIndex];
      const updatedData = update(currData, {editGbn: {$set: action.payload.editGbn }});   // array.splice(start, deleteCount, item1)
      const newData = update(currPageList_v, {
        $splice: [[dataIndex, 1, updatedData]]
      });
      return {
        ...state,
        currPageList: newData,
      };


    case SET_PAYMNT_UPDATE_SUCCESS:
      return {
        ...state,

      };


    case SET_TOTALCNT_SUCCESS:
      return {
        ...state,
        totalListCnt: action.payload.cnt,
      };


    case SET_GetPAYMNTHIS_SUCCESS:
      return {
        ...state,
        paymntHis: !action.payload.gbn ? [...state.paymntHis, action.payload.data] :  action.payload.data,
      };


    case SET_SetPAYMNTHIS_SUCCESS:
      return {
        ...state,
        paymntHis: action.payload.gbn === 'A' ? [...state.paymntHis, action.payload.data] : action.payload.data
      };







    default:
      return state;
  }
}
