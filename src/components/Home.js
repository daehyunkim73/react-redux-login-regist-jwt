import React, {useState, useEffect, useRef, useCallback} from "react";
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../custom.css';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment"
import {
    getPaymntsLists,
    getPaymntsTotalCnt,
    setPaymntsDataUpdate,
    setPaymntsDataDelete,
    setPaymntsDataMultiDelete
} from "../actions/paymnt";
import Pagenation from "./Pagenation";
import {
    SET_TEMPPAYMNTLIST_SUCCESS,
    SET_TEMPPAYMNTLIST_FAIL,
    SET_CONTENTCNT_PERPAGE_SUCCESS,
    SET_CONTENT_EDITABLE_SUCCESS,
    SET_CURRPAGELIST_SUCCESS,
    SET_PAYMNT_UPDATE_SUCCESS
} from "../actions/types";





const Home = () => {
  const { tempPaymntList, totalListCnt, contentCntPerPage, pageNum, currPageList } = useSelector(state => state.paymnt);
  const [searchResultCnt, setSearchResultCnt] = useState(0);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState(false);
  const [total_paymnt_amnt_value_bak, setTotal_paymnt_amnt_value_bak]  = useState([]);
  const [checkbxArr, setCheckbxArr] = useState([]);

  const comp_nm_Ref = useRef("");
  const jungsan_date_Ref = useRef("");
  const total_paymnt_amnt_Ref = useRef("");
  const paymnt_method_Ref = useRef("");
  const minus_amount_Ref = useRef("");
  const jungsan_amount_Ref = useRef("");
  const use_Ref = useRef("");
  const orderbyRef = useRef('');
  const descascRef = useRef('');

  const contentCntPerPageRef = useRef("");
  const jungsan_date = useRef([]);
  const total_paymnt_amnt = useRef([]);
  const minus_amount = useRef([]);
  const jungsan_amount = useRef([]);
  const paymnt_method = useRef([]);
  const use = useRef([]);

  const dispatch = useDispatch();
  const history = useHistory();


  useEffect(() => {
        try {
            let comp_nm_Ref_v = comp_nm_Ref.current.value;
            let jungsan_date_Ref_v = jungsan_date_Ref.current.value;
            let total_paymnt_amnt_Ref_v = total_paymnt_amnt_Ref.current.value;
            let paymnt_method_Ref_v = paymnt_method_Ref.current.value;
            let minus_amount_Ref_v = minus_amount_Ref.current.value;
            let jungsan_amount_Ref_v = jungsan_amount_Ref.current.value;
            let use_Ref_v = use_Ref.current.value;
            let orderBy = orderbyRef.current.value;
            let descasc = descascRef.current.value;

            dispatch(getPaymntsLists(
                comp_nm_Ref_v,
                jungsan_date_Ref_v,
                total_paymnt_amnt_Ref_v,
                paymnt_method_Ref_v,
                minus_amount_Ref_v,
                jungsan_amount_Ref_v,
                use_Ref_v,
                orderBy,
                descasc
            ))
                .then(() => {
                    setLoading(true);
                })
                .catch(() => {
                    setLoading(false);
                });
        }catch(e){
            console.log(e);
        }
        setLoading(false);
        setSearch(false);
  }, [
      search === true,
      pageNum,
      contentCntPerPageRef.current.value,
  ]);


    useEffect(() => {
        try {
            dispatch(getPaymntsTotalCnt())
        }catch(e){
            console.log(e);
        }
        setSearch(false);
    }, [
        search === true,
        pageNum,
        contentCntPerPageRef.current.value,
  ]);


  const handle_paymntList_Search = (e) => {
      setSearch(true);
  }


   const setCurrPageList = useCallback((datas, param) => {
        setSearchResultCnt(datas.length);

        const currIndex = (pageNum - 1) * contentCntPerPage;
        const editData =  datas.map((data, idx) => {
            return idx >= currIndex && idx < pageNum * contentCntPerPage
                ? data.id === param.id ? {...data, editGbn: param.editGbn} : {...data, editGbn: false}
                : null;
        }).filter((mapData) => {
            return mapData !== null && mapData !== "undifined" && mapData !== "";
        });

       dispatch({
           type: SET_CURRPAGELIST_SUCCESS,
           payload: editData
       });
    },[
       pageNum,
       contentCntPerPage,

   ])


    const handle_change_contentCntPerPage = useCallback(() => {
        dispatch({
            type: SET_CONTENTCNT_PERPAGE_SUCCESS,
            payload: contentCntPerPageRef.current.value
        });
    },[
        contentCntPerPageRef.current.value
    ]);


    const handle_click_Editable = useCallback((id, editable) => {
        dispatch({
            type: SET_CONTENT_EDITABLE_SUCCESS,
            payload: {id: id, editGbn: editable }
        });
    },[]);


    const handle_keypress_totalPaymntAmnt = (e, param) => {
        if (! (/([0-9])/g.test(e.key) || (e.key === "Delete" || e.key === "Backspace") || (e.keyCode === 37 || e.keyCode === 38 || e.keyCode === 39 || e.keyCode === 40) )) {
            e.preventDefault();
        }
    }


    // const img_in_remove = useCallback(
    //     (file_index_num) => () => {
    //         const file_remove_arr_file = Array.prototype.slice.call(file_in_name);
    //         [].filter.call(file_in_name, (c) => {
    //             file_remove_arr_file.indexOf(c) === file_index_num &&
    //             setFile_remove(
    //                 file_remove_arr_file.splice(
    //                     file_remove_arr_file.splice(file_remove_arr_file.indexOf(c), 1)
    //                 )
    //             );
    //         });
    //     },
    //     [file_in_name, file_remove]
    // );


    // const elementsIndex = this.state.todos.findIndex(element => element.id == id )
    // let newArray = [...this.state.todos]
    // newArray[elementsIndex] = {...newArray[elementsIndex], completed: !newArray[elementsIndex].completed}
    // this.setState({
    //     todos: newArray,
    // });


    const handle_click_totalPaymntAmnt = (e, param) => {
        const elemntIndex = total_paymnt_amnt_value_bak.findIndex(elemnt => elemnt.id === param.id);
        console.log('param.id, elemntIndex - ', param.id +', '+ elemntIndex);

        if (elemntIndex < 0 ){
            setTotal_paymnt_amnt_value_bak((total_paymnt_amnt_value_bak) => [
                ...total_paymnt_amnt_value_bak, {
                    id: param.id,
                    value: param.value
                }
            ]);
        }else{
            let newArray = [...total_paymnt_amnt_value_bak];
            newArray[elemntIndex] = {...newArray[elemntIndex], value: param.value};
            setTotal_paymnt_amnt_value_bak(newArray);
        }
    }


    const handle_blur_totalPaymntAmnt = useCallback((e, param) => {
        let total_paymnt_amnt_value = document.querySelector('#total_paymnt_amnt_'+param.id).value;
        let minus_amount_value = document.querySelector('#minus_amount_'+param.id).value;
        let total_paymnt_amnt_select_bak = Array.prototype.slice.call(total_paymnt_amnt_value_bak).filter(v => v.id === param.id);

        if (Number(total_paymnt_amnt_value) < Number(minus_amount_value)){
            total_paymnt_amnt.current[param.id].value = total_paymnt_amnt_select_bak[0].value;
            document.querySelector('#total_paymnt_amnt_'+param.id).select();
        }
        console.log('total_paymnt_amnt_value, minus_amount_value -> ', total_paymnt_amnt_value +','+ minus_amount_value);
        console.log('total_paymnt_amnt_value_bak -> ', total_paymnt_amnt_value_bak);
        console.log('total_paymnt_amnt_select_bak -> ', total_paymnt_amnt_select_bak[0].value);
    },[
        total_paymnt_amnt_value_bak,
    ]);


    const handle_click_Update = useCallback((e, param) => {
        let total_paymnt_amnt_value = document.querySelector('#total_paymnt_amnt_'+param.id).value;
        let minus_amount_value = document.querySelector('#minus_amount_'+param.id).value;
        let total_paymnt_amnt_select_bak = Array.prototype.slice.call(total_paymnt_amnt_value_bak).filter(v => v.id === param.id);

        if (Number(total_paymnt_amnt_value) < Number(minus_amount_value)){
            total_paymnt_amnt.current[param.id].value = total_paymnt_amnt_select_bak[0].value;
            document.querySelector('#total_paymnt_amnt_'+param.id).select();
        }else{
            jungsan_amount.current[param.id].value = Number(total_paymnt_amnt.current[param.id].value) - Number(minus_amount.current[param.id].value)

            //currPageList에 임시저장된 jungsan_date값 가져오기
            const elemntIndex = currPageList.findIndex(elemnt => elemnt.id === param.id);
            let newArray = [...currPageList];

            confirmAlert({
                title: 'Confirm to Update',
                message: 'Are you sure to do this.',
                buttons: [
                    {
                        label: 'Yes',
                        onClick: () => handle_paymntList_Update(
                             param.id,
                             newArray[elemntIndex].jungsan_date,
                             total_paymnt_amnt.current[param.id].value,
                             minus_amount.current[param.id].value,
                             jungsan_amount.current[param.id].value,
                             paymnt_method.current[param.id].value,
                             use.current[param.id].value
                       )
                    },
                    {
                        label: 'No',
                    }
                ]
            });
        }
    },[
        total_paymnt_amnt_value_bak,
        currPageList
    ]);


    const handle_paymntList_Update = (id, jungsan_date, total_paymnt_amnt, minus_amount, jungsan_amount, paymnt_method, use) => {
        try {
            dispatch(setPaymntsDataUpdate(id, jungsan_date, total_paymnt_amnt, minus_amount, jungsan_amount, paymnt_method, use))
                .then(() => {
                    setSearch(true);
                })
                .catch(() => {
                    setSearch(false);
                });
        }catch(e){
            console.log(e);
        }
        setSearch(false);
    }


    const handle_click_Delete = (e, param) => {
        try {
            dispatch(setPaymntsDataDelete(param.id))
                .then(() => {
                    setSearch(true);
                })
                .catch(() => {
                    setSearch(false);
                });
        }catch(e){
            console.log(e);
        }
        setSearch(false);
    }


    const handle_paymntList_multiDelete = (e) => {
        confirmAlert({
            title: 'Confirm to Update',
            message: 'Are you sure to do this.',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => handle_paymntList_multiDelete_proc(
                        checkbxArr
                    )
                },
                {
                    label: 'No',
                }
            ]
        })
    }


    const handle_paymntList_multiDelete_proc = (checkbxArr) => {
        try {
            dispatch(setPaymntsDataMultiDelete(checkbxArr))
                .then(() => {
                    setSearch(true);
                })
                .catch(() => {
                    setSearch(false);
                });
        }catch(e){
            console.log(e);
        }
        setSearch(false);
    }


    const handle_click_checkbx_all = (e) => {
        let paymnt_chkbx_all = document.querySelector('#paymnt_chkbx_all');

        if (paymnt_chkbx_all.checked === true) {
            setCheckbxArr([]);
            currPageList.map((item, index) => {
                setCheckbxArr((checkbxArr) => [
                    ...checkbxArr, {
                        id: item.id
                    }
                ])
                document.querySelector('#paymnt_chkbx_' + item.id).checked = true;
            })
        }else {
            setCheckbxArr([]);
            currPageList.map((item, index) => {
                document.querySelector('#paymnt_chkbx_' + item.id).checked = false;
            })
        }
    }


    const handle_click_checkbx = useCallback((e, param) => {
        let paymnt_chkbx = document.querySelector('#paymnt_chkbx_'+param.id);
        //console.log('param.id, paymnt_chkbx.checked - ', param.id +', '+ paymnt_chkbx.checked)

        paymnt_chkbx.checked === true && checkbxArr.includes(param.id) === false ?
            setCheckbxArr((checkbxArr) => [
                ...checkbxArr, {
                    id: param.id
                }
            ])
            : setCheckbxArr(
                Array.prototype.slice.call(checkbxArr).filter(value => value.id !== param.id)
              )
              document.querySelector('#paymnt_chkbx_all').checked = false;
    },[
        checkbxArr,
    ]);


    const handle_change_date = useCallback((date, param) => {
        console.log('date, param.id - ', date +', '+ param.id);
        jungsan_date.current[param.id].value = date;

        const elemntIndex = currPageList.findIndex(elemnt => elemnt.id === param.id);
        let newArray = [...currPageList];
        console.log('newArray -> ', newArray );
        newArray[elemntIndex] = {...newArray[elemntIndex], editGbn: true, jungsan_date: date,  };

        //setCurrPageList(newArray, {id: param.id, editGbn: true});   //Error
        dispatch({
            type: SET_CURRPAGELIST_SUCCESS,
            payload: newArray
        });
    }, [
        currPageList
    ]);



    // useEffect(() => {
    //     if (feeData.length <= 0) {
    //         endCallNum.current[0] =
    //             endCallNum.current[0] || React.createRef();
    //         dtPrice.current[0] = dtPrice.current[0] || React.createRef();
    //     } else {
    //         setFeeInputData([]);
    //         [...Array(endCallNum.current.length)].map((item, idx) => {
    //             endCallNum.current[idx] =
    //                 endCallNum.current[idx] || React.createRef();
    //             dtPrice.current[idx] =
    //                 dtPrice.current[idx] || React.createRef();
    //             setFeeInputData((feeInputData) => [
    //                 ...feeInputData,
    //                 {
    //                     endCallNum: endCallNum.current[idx].value,
    //                     dtPrice: dtPrice.current[idx].value,
    //                 },
    //             ]);
    //         });
    //     }
    //     setFeeInputData(feeData);
    // }, [feeData]);


    useEffect(() => {
        Array.prototype.slice.call(currPageList).map((item, idx) => {
            jungsan_date.current[item.id] = jungsan_date.current[item.id] || React.createRef();
            total_paymnt_amnt.current[item.id] = total_paymnt_amnt.current[item.id] || React.createRef();
            minus_amount.current[item.id] = minus_amount.current[item.id] || React.createRef();
            jungsan_amount.current[item.id] = jungsan_amount.current[item.id] || React.createRef();
            paymnt_method.current[item.id] = paymnt_method.current[item.id] || React.createRef();
            use.current[item.id] = use.current[item.id] || React.createRef();
        });
    },[
        currPageList
    ]);


    const handle_change_orderby = () => {
        setSearch(true);
    }


    const  handle_click_toDescPage = (e, id) => {
        history.push(`/paymntDetail/${id}`);
    }


    useEffect(() => {
        console.log('tempPaymntList - ', tempPaymntList);
        setCurrPageList(tempPaymntList, {id: '', editGbn: false});

    }, [
        loading === true,
        contentCntPerPageRef.current.value,
        checkbxArr,

    ]);


    useEffect(() => {
        console.log('currPageList - ',currPageList);
        console.log('checkbxArr - ', checkbxArr);

        console.log('comp_nm_Ref.current.value - ', comp_nm_Ref.current.value);
        console.log('jungsan_date_Ref.current.value - ', jungsan_date_Ref.current.value);
        console.log('total_paymnt_amnt_Ref.current.value - ', total_paymnt_amnt_Ref.current.value);
        console.log('paymnt_method_Ref.current.value - ', paymnt_method_Ref.current.value);
        console.log('minus_amount_Ref.current.value - ', minus_amount_Ref.current.value);
        console.log('jungsan_amount_Ref.current.value - ', jungsan_amount_Ref.current.value);
        console.log('use_Ref.current.value - ', use_Ref.current.value);

    }, [
        currPageList
    ]);




  return (
    <div className="container">
          <div className="tb_select_wrap left_profile_box" style={{ paddingTop: '15px', paddingBottom: '20px', }}>
              <form>
                    <div className='left_profile_box table_select_box'>
                        <input type="text" name="comp_nm" id="comp_nm" className="width60" placeholder="회사명" defaultValue={comp_nm_Ref.current.value} ref={comp_nm_Ref} />
                        <input type="text" name="jungsan_date" id="jungsan_date" className="width60" placeholder="정산일" defaultValue={jungsan_date_Ref.current.value}  ref={jungsan_date_Ref}  />
                        <input type="text" name="total_paymnt_amnt" id="total_paymnt_amnt" className="width60" placeholder="총결제금액" defaultValue={total_paymnt_amnt_Ref.current.value}  ref={total_paymnt_amnt_Ref} />
                        <select
                            as="select"
                            className="table_select tb_select"
                            className="width60"
                            defaultValue={paymnt_method_Ref.current.value}
                            ref={paymnt_method_Ref}
                        >
                            <option value={``}>결제수단</option>
                            <option value={`C`}>카드</option>
                            <option value={`P`}>포인트</option>
                        </select>
                        <input type="text" name="minus_amount" id="minus_amount" className="width60" placeholder="수수료" defaultValue={minus_amount_Ref.current.value}  ref={minus_amount_Ref} />
                        <input type="text" name="jungsan_amount" id="jungsan_amount" className="width60" placeholder="정산금액" defaultValue={jungsan_amount_Ref.current.value}  ref={jungsan_amount_Ref} />
                        <select
                            as="select"
                            className="table_select tb_select"
                            className="width60"
                            defaultValue={use_Ref.current.value}
                            ref={use_Ref}
                        >
                            <option value={``}>계약여부</option>
                            <option value={`Y`}>계약</option>
                            <option value={`N`}>해지</option>
                        </select>
                        <input type="button" name="searchBtn" id="searchBtn" value={`검색`} className="width60" onClick={handle_paymntList_Search} />
                    </div>
              </form>
          </div>


          <div className="tb_select_wrap left_profile_box topMargin">
              <div className='left_profile_box'>[총 <p className="number_data">{totalListCnt}</p>건 / 검색결과 <p className="number_data">{searchResultCnt}</p>건]</div>
              <div className='table_select_box'>
                  <select
                      as="select"
                      className="table_select tb_select"
                      onChange={handle_change_orderby}
                      ref={orderbyRef}
                      //defaultValue={orderbyRef.current.value}
                  >
                      <option value={``}>정렬 구분</option>
                      <option value={`id`}>번호 순</option>
                      <option value={`jungsan_date`}>정산일 순</option>
                      <option value={`jungsan_amount`}>정산금액 순</option>
                      <option value={`minus_amount`}>수수료 순</option>
                      <option value={`total_paymnt_amnt`}>총 결제금액 순</option>
                  </select>
                  <select
                      as="select"
                      className="table_select tb_select"
                      onChange={handle_change_orderby}
                      ref={descascRef}
                      //defaultValue={descascRef.current.value}
                  >
                      <option value={``}>정렬 조건</option>
                      <option value={`ASC`}>오름차순</option>
                      <option value={`DESC`}>내림차순</option>
                  </select>
                  <select
                      as="select"
                      className="list_select tb_select"
                      onChange={handle_change_contentCntPerPage}
                      ref={contentCntPerPageRef}
                      defaultValue={contentCntPerPage}
                  >
                      <option value={0} >목록</option>
                      <option value={5} >5</option>
                      <option value={10} >10</option>
                      <option value={15} >15</option>
                      <option value={20} >20</option>
                      <option value={30} >30</option>
                  </select>
              </div>
          </div>

          <div className="bottom-padding-50">
              <table  className="border-table">
                  <thead className="theadBackground  height-35">
                      <tr>
                          <th style={{width:'10px',}}>
                              <input type="checkbox" id={`paymnt_chkbx_all`} value={'all'} onClick={(e)=> handle_click_checkbx_all(e)}/>
                          </th>
                          <th style={{width:'10px',}}>번호</th>
                          <th>회사명</th>
                          <th>정산일</th>
                          <th>총결제금액</th>
                          <th>결제수단</th>
                          <th>수수료</th>
                          <th>정산금액</th>
                          <th>계약</th>
                          <th className="width20" >
                              수정|삭제
                          </th>
                      </tr>
                  </thead>
                  <tbody style={{ alignContent: "center", }}>
                      {
                          loading === true && Array.prototype.slice.call(currPageList).map((item, index) => {
                             if(item.editGbn === false) {
                                 return(
                                     <tr>
                                         <td>
                                             <input type="checkbox" id={`paymnt_chkbx_${item.id}`} value={item.id} onClick={(e)=> handle_click_checkbx(e,{id: item.id})}/>
                                         </td>
                                         <td style={{cursor:"pointer", }} onClick={(e) => handle_click_toDescPage(e, item.id)}>{item.id}</td>
                                         <td>{item.comp_nm}</td>
                                         <td  style={{fontSize:'15px', width: '200px'}}>{item.jungsan_date}</td>
                                         <td>{item.total_paymnt_amnt}</td>
                                         <td>
                                             <div className="th_double_wrap left_profile_box">
                                                 <p>{
                                                     item.paymnt_method === 'C' && '카드'
                                                     || item.paymnt_method === 'P' && '포인트'
                                                 }</p>
                                             </div>
                                         </td>
                                         <td>{item.minus_amount}</td>
                                         <td>{item.jungsan_amount}</td>
                                         <td>
                                             <div>{
                                                 item.use === 'Y' && '계약'
                                                 || item.use === 'N' && '해지'
                                             }</div>
                                         </td>
                                         <td className="width20">
                                             <div className="th_double_wrap left_profile_box">
                                                 <p style={{cursor: "pointer", color: "silver", }} onClick={() => handle_click_Editable(item.id, true)}>변경</p>
                                                 <p style={{cursor: "", color: "silver", }}>수정</p>
                                                 <p style={{cursor: "pointer", color: "red", }}  onClick={(e) => handle_click_Delete(e,{id: item.id})}>삭제</p>
                                             </div>
                                         </td>
                                     </tr>
                                 )
                             }else{
                                 return(
                                     <tr>
                                         <td>
                                             <input type="checkbox" id={`paymnt_chkbx_${item.id}`} value={item.id} onClick={(e)=> handle_click_checkbx(e,{id: item.id})} />
                                         </td>
                                         <td style={{cursor:"pointer", }} onClick={(e) => handle_click_toDescPage(e, item.id)}>{item.id}</td>
                                         <td>{item.comp_nm}</td>
                                         <td  style={{fontSize:'15px', width: '100px'}}>
                                             {/*
                                             <input type="text" id={`jungsan_date_${item.id}`} name={`jungsan_date_${item.id}`} defaultValue={item.jungsan_date} style={{width: '100%', height: '100%', }}
                                                    ref={(el) => (jungsan_date.current[item.id] = el)}
                                             />
                                             */}
                                             <div className="customDatePickerWidth">
                                                 <DatePicker
                                                     id={`jungsan_date_${item.id}`} name={`jungsan_date_${item.id}`}
                                                     ref={(el) => (jungsan_date.current[item.id] = el)}
                                                     selected={moment(item.jungsan_date).toDate()}
                                                     dateFormat="yyyyMMdd"
                                                     //onSelect={handleDateSelect} //when day is clicked
                                                     onChange={(date) => handle_change_date(moment(date).format('YYYYMMDD'),{id: item.id})}   // when value has changed
                                                 />
                                             </div>
                                         </td>
                                         <td>
                                             <input type="text" id={`total_paymnt_amnt_${item.id}`} name={`total_paymnt_amnt_${item.id}`} defaultValue={item.total_paymnt_amnt} style={{width: '100%', height: '100%', }}
                                                    onKeyPress={(e) => handle_keypress_totalPaymntAmnt(e,{id: item.id, value: item.total_paymnt_amnt})}
                                                    onBlur={(e) => handle_blur_totalPaymntAmnt(e, {id: item.id})}
                                                    onClick={(e) => handle_click_totalPaymntAmnt(e,{id: item.id, value: item.total_paymnt_amnt})}
                                                    ref={(el) => (total_paymnt_amnt.current[item.id] = el)}
                                             />
                                         </td>
                                         <td>
                                             <div className="th_double_wrap left_profile_box">
                                                 <select
                                                     as="select"
                                                     className="list_select tb_select"
                                                     style={{width: '100%', }}
                                                     //onChange={() => handle_change_paymnt_method(item.id)}
                                                     defaultValue={item.paymnt_method}
                                                     id={`paymnt_method_${item.id}`}
                                                     ref={(el) => (paymnt_method.current[item.id] = el)}
                                                 >
                                                     <option value='C'>카드</option>
                                                     <option value='P'>포인트</option>
                                                 </select>
                                             </div>
                                         </td>
                                         <td>
                                             <input type="text" id={`minus_amount_${item.id}`} name={`minus_amount_${item.id}`} defaultValue={item.minus_amount} style={{width: '100%', height: '100%', }}
                                                    ref={(el) => (minus_amount.current[item.id] = el)}
                                             />
                                         </td>
                                         <td>
                                             <input type="text" id={`jungsan_amount_${item.id}`} name={`jungsan_amount_${item.id}`} defaultValue={item.jungsan_amount} style={{width: '100%', height: '100%', }}
                                                    ref={(el) => (jungsan_amount.current[item.id] = el)}
                                             />
                                         </td>
                                         <td>
                                             <select
                                                 as="select"
                                                 className="list_select tb_select"
                                                 style={{width: '100%', }}
                                                 //onChange={() => handle_change_use(item.id)}
                                                 defaultValue={item.use}
                                                 id={`use_${item.id}`}
                                                 ref={(el) => (use.current[item.id] = el)}
                                             >
                                                 <option value='Y'>계약</option>
                                                 <option value='N'>해지</option>
                                             </select>
                                         </td>
                                         <td className="width20">
                                             <div className="th_double_wrap left_profile_box">
                                                 <p style={{cursor: "pointer", color: "black", }} onClick={() => handle_click_Editable(item.id, false)}>취소</p>
                                                 <p style={{cursor: "pointer", color: "black", }} onClick={(e) => handle_click_Update(e,{id: item.id})}>수정</p>
                                                 <p style={{cursor: "pointer", color: "red", }} onClick={(e) => handle_click_Delete(e,{id: item.id})}>삭제</p>
                                             </div>
                                         </td>
                                     </tr>
                                 )
                             }
                          })
                      }

                      <tr style={{ height: '30px', }}>
                          {
                              loading === true && <Pagenation />
                          }
                      </tr>
                  </tbody>
              </table>
            </div>

            <div style={{ marginTop: '-35px', paddingBottom: '0px', textAlign: "right",  }}>
                <form>
                    <div>
                        <input type="button" name="multiDeleteBtn" id="multiDeleteBtn" value={`일괄삭제`} className="width60" onClick={handle_paymntList_multiDelete} />
                    </div>
                </form>
            </div>

        
        
        
        
    </div>
  );
};

export default Home;
