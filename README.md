webpack4-react
![image](https://user-images.githubusercontent.com/44224063/112687770-54f06000-8ebb-11eb-94be-7a4d1ac68bf7.png)

import React, {useState, useEffect, useRef, useCallback} from "react";<br/>
import { useHistory } from 'react-router-dom';<br/>
import { useDispatch, useSelector } from "react-redux";<br/>
import 'bootstrap/dist/css/bootstrap.min.css';<br/>
import '../custom.css';<br/>
import { confirmAlert } from 'react-confirm-alert';<br/>
import 'react-confirm-alert/src/react-confirm-alert.css';<br/>
import DatePicker from "react-datepicker";<br/>
import "react-datepicker/dist/react-datepicker.css";<br/>
import moment from "moment"<br/>
import {<br/>
    getPaymntsLists,<br/>
    getPaymntsTotalCnt,<br/>
    setPaymntsDataUpdate,<br/>
    setPaymntsDataDelete,<br/>
    setPaymntsDataMultiDelete<br/>
} from "../actions/paymnt";<br/>
import Pagenation from "./Pagenation";<br/>
import {<br/>
    SET_TEMPPAYMNTLIST_SUCCESS,<br/>
    SET_TEMPPAYMNTLIST_FAIL,<br/>
    SET_CONTENTCNT_PERPAGE_SUCCESS,<br/>
    SET_CONTENT_EDITABLE_SUCCESS,<br/>
    SET_CURRPAGELIST_SUCCESS,<br/>
    SET_PAYMNT_UPDATE_SUCCESS<br/>
} from "../actions/types";<br/>
<br/>
<br/>

const Home = () => {<br/>
  const { tempPaymntList, totalListCnt, contentCntPerPage, pageNum, currPageList } = useSelector(state => state.paymnt);<br/>
  const [searchResultCnt, setSearchResultCnt] = useState(0);<br/>
  const [loading, setLoading] = useState(false);<br/>
  const [search, setSearch] = useState(false);<br/>
  const [total_paymnt_amnt_value_bak, setTotal_paymnt_amnt_value_bak]  = useState([]);<br/>
  const [checkbxArr, setCheckbxArr] = useState([]);<br/>
<br/>
  const comp_nm_Ref = useRef("");<br/>
  const jungsan_date_Ref = useRef("");<br/>
  const total_paymnt_amnt_Ref = useRef("");<br/>
  const paymnt_method_Ref = useRef("");<br/>
  const minus_amount_Ref = useRef("");<br/>
  const jungsan_amount_Ref = useRef("");<br/>
  const use_Ref = useRef("");<br/>
  const orderbyRef = useRef('');<br/>
  const descascRef = useRef('');<br/>
<br/>
  const contentCntPerPageRef = useRef("");<br/>
  const jungsan_date = useRef([]);<br/>
  const total_paymnt_amnt = useRef([]);<br/>
  const minus_amount = useRef([]);<br/>
  const jungsan_amount = useRef([]);<br/>
  const paymnt_method = useRef([]);<br/>
  const use = useRef([]);<br/>
<br/>
  const dispatch = useDispatch();<br/>
  const history = useHistory();<br/>
<br/>
<br/>
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

![image](https://user-images.githubusercontent.com/44224063/112688148-caf4c700-8ebb-11eb-9266-3c6eb2fa0d98.png)



const Detail = () => {
    const { user: currentUser } = useSelector((state) => state.auth);
    if (!currentUser) {
        return <Redirect to="/login" />;
    }


    const { idx } = useParams();
    const { paymntHis } = useSelector(state => state.paymnt);

    const [comp_nm, setComp_nm] = useState("");
    const [jungsan_date, setJungsan_date] = useState("");
    const [total_paymnt_amnt, setTotal_paymnt_amnt] = useState("");
    const [paymnt_method, setPaymnt_method] = useState("");
    const [minus_amount, setMinus_amount] = useState("");
    const [jungsan_amount, setJungsan_amount] = useState("");
    const [use, setUse] = useState("");
    const [freeGbn, setFreeGbn] = useState("");
    const [loading, setLoading] = useState(false);
    const [total_paymnt_amnt_select_bak, setTotal_paymnt_amnt_select_bak] = useState('');
    const total_paymnt_amnt_Ref = useRef('');
    const jungsan_amount_Ref = useRef('');
    const minus_amount_Ref = useRef('');
    //const [paymntHis, setPaymntHis] = useState([]);
    const [fileHis, setFileHis] = useState([]);
    const cnt_Ref = useRef([]);
    const amount_Ref = useRef([]);
    const [imgFile, setImgFile] = useState([]);	//파일
    //const [formData] = useState(new FormData())
    const [fileListInfo, setFileListInfo] = useState([]);
    const memo_Ref = useRef([]);
    const [compId, setCompId] = useState('');
    const [fileUpting, setFileUpting] = useState(false);
    const [imgBase64, setImgBase64] = useState([]);
    const API_URL = "http://127.0.0.1:8082";
    const [tempFile, setTempFile] = useState([]);
    const initValue_Ref = useRef('N');
    const [reRendering, setReRendering] = useState(false);
    //let newArray_v = [];
    let [newArray_v, setNewArray_v] = useState([]);
    const mainForm_Ref = useRef();
    const { handleSubmit, register, errors } = useForm();


    const dispatch = useDispatch();
    const history = useHistory();



    useEffect(() => {
        try {
            dispatch(getPaymntsInfo(
                idx,
            ))
                .then((result) => {
                    console.log('idx - ', idx);
                    console.log('result - ', result);

                    setCompId(idx);
                    setComp_nm(result.data.info[0].comp_nm);
                    setJungsan_date(result.data.info[0].jungsan_date);
                    setTotal_paymnt_amnt(result.data.info[0].total_paymnt_amnt);
                    setTotal_paymnt_amnt_select_bak(result.data.info[0].total_paymnt_amnt);
                    setPaymnt_method(result.data.info[0].paymnt_method);
                    setMinus_amount(result.data.info[0].minus_amount);
                    setJungsan_amount(result.data.info[0].jungsan_amount);
                    setUse(result.data.info[0].use);
                    setFreeGbn(result.data.info[0].freeGbn);

                    if (result.data.his[0].length <= 0){
                        // setPaymntHis(paymntHis => [
                        //     ...paymntHis,
                        //     {
                        //         idx: 0,
                        //         id: idx,
                        //         cnt: 0,
                        //         amount: 0
                        //     }
                        // ]);

                        dispatch({
                            type: SET_GetPAYMNTHIS_SUCCESS,
                            payload: {
                                gbn: false,
                                data: {
                                    idx: 0,
                                    id: idx,
                                    cnt: 0,
                                    amount: 0
                                }
                            }
                        });
                    }else{
                        // setPaymntHis(result.data.his[0]);
                        console.log('result.data.his[0] >>>>>>>>>> ', result.data.his[0]);

                        dispatch({
                            type: SET_GetPAYMNTHIS_SUCCESS,
                            payload: {
                                gbn: true,
                                data: result.data.his[0]
                            }
                        });
                    }

                    if (result.data.file[0].length <= 0){
                        setFileHis(fileHis => [
                            ...fileHis,
                            {
                                idx: 0,
                                id: idx,
                                origFileNm: '',
                                imgFileNm: '',
                                filePathNm: '',
                                memo: '',
                            }
                        ])
                    }else{
                        setFileHis(result.data.file[0]);
                    }
                    setLoading(true);

                })
                .catch(() => {
                    setLoading(false);
                    setReRendering(false);
                });
        }catch(e){
            console.log(e);
        }
        setLoading(false);
        setReRendering(false);
    }, [
        reRendering === true
    ]);


    const handle_change_date = useCallback((date) => {
        console.log('moment(date).toDate() - ', moment(date).toDate());
        setJungsan_date(date);
    },[
        jungsan_date,
    ]);


    const handle_keyUp_totalPaymntAmnt = useCallback((e) => {
        if (! (/([0-9])/g.test(e.key) || (e.key === "Delete" || e.key === "Backspace") || (e.keyCode === 37 ||  e.keyCode === 38 || e.keyCode === 39 || e.keyCode === 40) )) {
            e.preventDefault();
        }
        if (Number(total_paymnt_amnt_Ref.current.value) < Number(minus_amount_Ref.current.value)){
            //document.querySelector('#total_paymnt_amnt').select();  //텍스트값을 변경이 안됨
        }else {
            setJungsan_amount((Number(total_paymnt_amnt_Ref.current.value) - Number(minus_amount_Ref.current.value)));
            //jungsan_amount_Ref.current.value = (Number(total_paymnt_amnt_Ref.current.value) - Number(minus_amount_Ref.current.value));
        }
    },[
        total_paymnt_amnt_Ref.current.value,
        jungsan_amount_Ref.current.value,
        minus_amount_Ref.current.value,
    ]);


    const handle_change_freeGbn = useCallback((e, value) => {
        setFreeGbn(value);
    },[
        freeGbn
    ]);


    const handle_click_paymntHis_add_remove = useCallback((procGbn, idx, id) => {
        let maxValue = 0;
        const nextValue = paymntHis.reduce((prev,curr) => {
            if(curr.idx > maxValue) {
                maxValue = curr.idx;
                return maxValue;
            }
            return prev;
        },'');

        if(procGbn === 'A'){
            // setPaymntHis(paymntHis => [
            //     ...paymntHis,
            //     {
            //         idx: !nextValue ? 1 : nextValue + 1,
            //         id: id,
            //         cnt: 0,
            //         amount: 0
            //     }
            // ]);

            dispatch({
                type: SET_SetPAYMNTHIS_SUCCESS,
                payload: {
                    gbn: 'A',
                    data: {
                        idx: !nextValue ? 1 : nextValue + 1,
                        id: id,
                        cnt: 0,
                        amount: 0
                    }
                }
            });
        }
        else {
            const result = paymntHis.map((ele, index) => {
                return ele.idx === idx ? null : ele;
            }).filter((item) => {
                return item !== null
            })

            //setPaymntHis(paymntHis => result);

            dispatch({
                type: SET_SetPAYMNTHIS_SUCCESS,
                payload: {
                    gbn: 'R',
                    data: result
                }
            });
        }
    },[
        paymntHis
    ]);


    const handle_change_paymntHis = (itemIdx, itemId) => {
        const eleIndex = paymntHis.findIndex(ele => ele.idx === itemIdx );
        const newArray = [...paymntHis];
        console.log('itemIdx - ', itemIdx);

        newArray[eleIndex] = {
            ...newArray[eleIndex],
            idx: itemIdx,
            id: itemId,
            cnt: cnt_Ref.current[itemIdx].value,
            amount: amount_Ref.current[itemIdx].value,
        }

        // setPaymntHis(
        //     newArray
        // );

        dispatch({
            type: SET_GetPAYMNTHIS_SUCCESS,
            payload: {
                data: newArray
            }
        });
    }


    // setFormFiles({
    //     ...formFiles,
    //     [e.target.name]: e.target.files[0],
    // });


    const handle_change_file = useCallback( (e, idx) => {
        //e.persist();
        //alert('idx - '+idx);
        console.log('fileHis -> ', fileHis);

        //const imageType = e.target.files[idx]?.type;
        const files = $(`#imgInput_${idx}`)[0]?.files;
        console.log('files[0] -> ', files[0]);

        const imageType = files[0]?.type;
        if(!(imageType === "image/jpeg" || imageType === "image/jpg" || imageType === "image/png")){
            alert(`'jpg / jpeg / png' 파일만 등록 가능`);
            return;
        }

        let reader = new FileReader();
        reader.onloadend = () => {
            // 읽기가 완료되면 아래코드가 실행됩니다.
            const base64 = reader.result;
            //console.log('base64 - ', base64);
            if (base64) {
                // [].slice.call(imgBase64).sort(function(a, b) {
                //     return a.idx - b.idx;   //오름차순 정렬
                // });

                const index = imgBase64.findIndex(v => v.idx === idx);
                if (Number(index) > -1){
                    let newArray = [...imgBase64];
                    const updatedData = update(newArray[index], {idx: {$set: idx }, value: {$set: base64.toString() }});
                    const newData = update(imgBase64, {
                        $splice: [[index, 1, updatedData]]
                    });
                    setImgBase64(newData);
                }
                else{
                    setImgBase64(imgBase64 => [...imgBase64,{
                            idx: idx,
                            value: base64.toString()
                        }
                    ])
                }
            }
        }

        //if (e.target.files[idx] ) {
        if (files[0] ) {
            // reader.readAsDataURL(e.target.files[idx]); // 1. 파일을 읽어 버퍼에 저장합니다.
            reader.readAsDataURL(files[0]); // 1. 파일을 읽어 버퍼에 저장합니다.

            [].slice.call(imgFile).sort(function(a, b) {
                return a.idx - b.idx;   //오름차순 정렬
            });

            const index = imgFile.findIndex(v => v.idx === idx);
            if (Number(index) > -1){
                //alert('0')
                let newArray2 = [...imgFile];
                const updatedData = update(newArray2[index], {idx: {$set: idx }, file: {$set: files[0] }});
                const newData = update(imgFile, {
                    $splice: [[index, 1, updatedData]]
                });
                setImgFile(newData);
            }
            else{
                //alert('1')
                setImgFile(imgFile => [...imgFile, {
                        idx: idx,
                        file: files[0]
                    }
                ]);
            }
        }
    },[
        imgBase64,
        fileHis,
    ]);


    const handle_click_tempMainSave = data => {
        //console.log('form data > ', data)

        let comp_nm_v = document.querySelector('input[name=comp_nm]').value;
        let jungsan_date_v = document.querySelector('input[name=jungsan_date]').value;
        let total_paymnt_amnt_v = document.querySelector('input[name=total_paymnt_amnt]').value;
        let minus_amount_v = document.querySelector('input[name=minus_amount]').value;
        let jungsan_amount_v = document.querySelector('input[name=jungsan_amount]').value;
        let paymnt_method_v = document.querySelector('select[name="paymnt_method"] option:checked').value;
        let use_v = document.querySelector('select[name="use"] option:checked').value;
        let freeGbn_v = document.querySelector('input[name="freeGbn"]:checked').value;

        const paramData = {
            idx : idx,
            comp_nm : comp_nm_v,
            jungsan_date : jungsan_date_v,
            total_paymnt_amnt : total_paymnt_amnt_v,
            minus_amount : minus_amount_v,
            jungsan_amount : jungsan_amount_v,
            paymnt_method : paymnt_method_v,
            use : use_v,
            freeGbn : freeGbn_v
        }

        try {
            dispatch(setPaymntMainSave(paramData))
                .then(() => {
                    setReRendering(true);
                })
                .catch(() => {
                    setReRendering(false);
                });
        }catch(e){
            console.log(e);
        }
        setReRendering(false);
    }


    const handle_click_tempPaymntSave = (e) => {
        try {
            dispatch(setPaymntHisSave(compId, paymntHis))
                .then(() => {
                    setReRendering(true);
                })
                .catch(() => {
                    setReRendering(false);
                });
        }catch(e){
            console.log(e);
        }
        setReRendering(false);
    }


    const handle_click_tempUpload = useCallback((e) => {
        e.preventDefault()
        console.log('imgFile -> ', imgFile);

        setTempFile([]);
        imgFile.map((item, idx) => {
            console.log('imgFile item -> ', item)
            tempFile.push(
                item.file
            );
        })

        const formData = new FormData();
        tempFile.map((item, index) => {
            formData.append("imageFile[]", item);
        })
        console.log('tempFile -> ', tempFile);

        if(Array.prototype.slice.call(tempFile).length > 0){
            uploadService(formData)
                .then((res)=>{
                    if (res.status === 200) {
                        let seqNo = 0;
                        fileHis.map((item, idx) => {
                            const imgEleIndex = imgFile.findIndex((imgEle) => imgEle.idx === item.idx);
                            if (imgEleIndex > -1){
                                fileListInfo.push(
                                    {
                                        idx: item.idx,
                                        id: compId,
                                        origFileNm: res.data[seqNo]?.originalname,
                                        imgFileNm: res.data[seqNo]?.filename,
                                        filePathNm: res.data[seqNo]?.path.replace(/\\/gi,"/"),
                                        memo: memo_Ref.current[item.idx]?.value,
                                    }
                                )
                                seqNo += 1;
                            }else{
                                item?.origFileNm !== '' &&
                                fileListInfo.push(
                                    {
                                        idx: item.idx,
                                        id: compId,
                                        origFileNm: item?.origFileNm,
                                        imgFileNm: item?.imgFileNm,
                                        filePathNm: item?.filePathNm,
                                        memo: memo_Ref.current[item.idx]?.value,
                                    }
                                )
                            }
                        });

                        dispatch(setUploadInfoSave(compId, fileListInfo))
                            .then((res)=>{
                                console.log('res - ', res);
                            })
                            .catch((e) => {
                                console.log('Error: ', e);
                            });
                        setFileUpting(true);
                    }
                })
                .catch((e)=>{
                    console.log('파일업로드 실패')
                })
        }
        else{
            //console.log("파일을 선택해주세요")

            fileHis.map((item, idx) => {
                item?.origFileNm !== '' &&
                fileListInfo.push(
                    {
                        idx: item.idx,
                        id: compId,
                        origFileNm: item?.origFileNm,
                        imgFileNm: item?.imgFileNm,
                        filePathNm: item?.filePathNm,
                        memo: memo_Ref.current[item.idx]?.value
                    }
                );
            });

            dispatch(setUploadInfoSave(compId, fileListInfo))
                .then((res)=>{
                    console.log('res - ', res);
                })
                .catch((e) => {
                    console.log('Error: ', e);
                });
            setFileUpting(true);
        }
    },[
        imgFile,
        tempFile,
        fileHis,
        fileListInfo

    ]);


    const handle_click_allSave = (e) => {
        try{
            handle_click_tempMainSave(e);
            handle_click_tempPaymntSave(e);
            handle_click_tempUpload(e);
        }
        catch (e) {
            console.log(e)
        }
    }


    const handle_click_imageFileAdd = (e) => {
        let nextValue = 0;
        let resultValue = 0;
        if (fileHis.length > 0){
            let maxValue = 0;
            nextValue = fileHis.reduce((prev,curr) => {
                if(curr.origFileNm === ''){
                    if (curr.idx > maxValue) {
                        maxValue = curr.idx;
                        return maxValue;
                    }
                }else{
                    if (initValue_Ref.current === 'N'){
                        maxValue = Number(maxValue);
                        initValue_Ref.current = 'Y';
                    }else{
                        maxValue = Number(maxValue) + 1;
                    }
                    return maxValue;
                }
                return prev;
            },'');
            resultValue = Number(nextValue) + 1 ;
        }else{
            resultValue = 0;
        }

        setFileHis(fileHis => [
            ...fileHis,
            {
                idx: Number(resultValue),
                id: compId,
                origFileNm: '',
                imgFileNm: '',
                filePathNm: '',
                memo: '',
            }
        ])

    };


    const handle_click_imageFileRemove = (e, itemIdx) => {
        console.log('fileHis >>>>>>>>>>>>>>>>>>>> ', fileHis);
        console.log('fileListInfo >>>>>>>>>>>>>>>>>>>> ', fileListInfo);

        const itemIndex = fileHis.findIndex(item => item.idx === itemIdx)
        setFileHis(
            fileHis.splice(
                fileHis.splice(itemIndex, 1)
            )
        );
    }


    useEffect(() => {
        console.log('freeGbn - ', freeGbn);
        console.log('paymntHis - ', paymntHis);
        console.log('fileListInfo ->>> ', fileListInfo);
        console.log('fileUpting - ', fileUpting);
        console.log('imgFile - ', imgFile);
        console.log('imgBase64 -> ', imgBase64);
        console.log('fileHis - ', fileHis);
        console.log('paymnt_method - ', paymnt_method);
        console.log('use - ', use);
        console.log('freeGbn - ', freeGbn);

    },[
        freeGbn,
        paymntHis,
        fileListInfo,
        imgFile,
        imgBase64,
        fileHis,
        paymnt_method,
        use,
        freeGbn

    ])

![image](https://user-images.githubusercontent.com/44224063/112688432-39398980-8ebc-11eb-8450-1b5b4938ffa6.png)


const Profile = () => {
  const { user: currentUser } = useSelector((state) => state.auth);
  if (!currentUser) {
    return <Redirect to="/login" />;
  }


  return (
      <div className="col-md-12">
          <div className="card card-container">
              <div>

                  <div className="form-group">
                      <label htmlFor="username">Username</label>
                      <input
                          type="text"
                          className="form-control"
                          name="username2"
                          defaultValue={currentUser.username}
                      />
                  </div>

                  <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <input
                          type="text"
                          className="form-control"
                          name="email2"
                          defaultValue={currentUser.email}
                      />
                  </div>
                  <strong>Token Key:</strong>
                  <p>
                      {currentUser.token?.substring(0, 20)} ...{" "}
                      {currentUser.token?.substr(currentUser.token?.length - 20)}
                  </p>
                  <strong>Authorities:</strong>
                  <ul>
                      {currentUser.roles}
                      {/*Array.prototype.slice.call(currentUser?.roles).map((role, index) => <li key={index}>{role}</li>)}*/}
                  </ul>

              </div>
          </div>
      </div>
   );
};


export default Profile;

![image](https://user-images.githubusercontent.com/44224063/112688537-5f5f2980-8ebc-11eb-81d9-79a25ce93f16.png)


const Login = (props) => {
  const form = useRef();
  const checkBtn = useRef();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { isLoggedIn } = useSelector(state => state.auth);
  const { message } = useSelector(state => state.message);

  const dispatch = useDispatch();

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    setLoading(true);
    form.current.validateAll();

    if (checkBtn.current.context._errors.length === 0) {
      dispatch(login(username, password))
        .then(() => {
          props.history.push("/profile");
          window.location.reload();
        })
        .catch(() => {
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  };

  if (isLoggedIn) {
    return <Redirect to="/profile" />;
  }

  return (
    <div className="col-md-12">
      <div className="card card-container">
        <img
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
          alt="profile-img"
          className="profile-img-card"
        />

        <Form onSubmit={handleLogin} ref={form}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <Input
              type="text"
              className="form-control"
              name="username"
              value={username}
              onChange={onChangeUsername}
              validations={[required]}
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <Input
              type="password"
              className="form-control"
              name="password"
              value={password}
              onChange={onChangePassword}
              validations={[required]}
            />
          </div>

          <div className="form-group">
            <button className="btn btn-primary btn-block" disabled={loading}>
              {loading && (
                <span className="spinner-border spinner-border-sm"></span>
              )}
              <span>Login</span>
            </button>
          </div>

          {message && (
            <div className="form-group">
              <div className="alert alert-danger" role="alert">
                {message}
              </div>
            </div>
          )}
          <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>
      </div>
    </div>
  );
};

export default Login;

![image](https://user-images.githubusercontent.com/44224063/112688717-959ca900-8ebc-11eb-8351-ea6665cf9c1b.png)

const Register = () => {
  const form = useRef();
  const checkBtn = useRef();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirm, setPassword_confirm] = useState("");
  const password_confirm_ref = useRef('');
  const password_ref = useRef('');
  const [password_alert, setPassword_alert] = useState(false);
  const [password_confirm_alert, setPassword_confirm_alert] = useState(false);
  const [successful, setSuccessful] = useState(false);
  const role_ref = useRef('');

  const { message } = useSelector(state => state.message);
  const dispatch = useDispatch();
  const history = useHistory();


  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };


  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };


  const onChangePassword = (e) => {
    if (password_ref.current.value.length < 6 || password_ref.current.value.length > 40 ) {
      setPassword_alert(true)
    }else{
      setPassword_alert(false)
    }
  }


  const onChangePassword_confirm = (e) => {
    if (password_ref.current.value !== password_confirm_ref.current.value) {
      setPassword_confirm_alert(true)
    }else{
      setPassword_confirm_alert(false)
    }
  }


  const handleRegister = (e) => {
    e.preventDefault();

    setSuccessful(false);
    form.current.validateAll();
    const role_v = role_ref.current.value;

    if (checkBtn.current.context._errors.length === 0) {
      dispatch(register(username, email, password, role_v))
        .then(() => {
          setSuccessful(true);
        })
        .catch(() => {
          setSuccessful(false);
        });
    }
  };


  const required = (value) => {
    if (!value) {
      return (
          <div className="alert alert-danger" role="alert">
            This field is required!
          </div>
      );
    }
  };


  const validEmail = (value) => {
    if (!isEmail(value)) {
      return (
          <div className="alert alert-danger" role="alert">
            This is not a valid email.
          </div>
      );
    }
  };


  const vusername = (value) => {
    if (value.length < 3 || value.length > 20) {
      return (
          <div className="alert alert-danger" role="alert">
            The username must be between 3 and 20 characters.
          </div>
      );
    }
  };



  const handle_click_loginPage = () => {
    history.push(`/login`);

  }


  const handle_click_signUpPage = () => {
    setSuccessful(false);
    setUsername('');
    setEmail('');

    dispatch({
      type: SET_MESSAGE,
      payload: null
    });

    history.push(`/register`);
    //window.location.reload()
  }


  return (
    <div className="col-md-12">
      <div className="card card-container">
        <img
          src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
          alt="profile-img"
          className="profile-img-card"
        />

        <Form onSubmit={handleRegister} ref={form}>
          {!successful && (
            <div>
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <Input
                  type="text"
                  className="form-control"
                  name="username"
                  value={username}
                  onChange={onChangeUsername}
                  validations={[required, vusername]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <Input
                  type="text"
                  className="form-control"
                  name="email"
                  value={email}
                  onChange={onChangeEmail}
                  validations={[required, validEmail]}
                />
              </div>

              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  className="form-control"
                  style={{color: 'blue'}}
                  name="password"
                  ref={password_ref}
                  onChange={(e) => onChangePassword(e)}
                />
              </div>
              {
                password_alert === true &&
                <div className="alert alert-danger" role="alert" style={{marginTop:'-16px'}}>
                  The password must be between 6 and 40 characters.
                </div>
              }

              <div className="form-group">
                <label htmlFor="password">Password Confirm</label>
                <input
                    type="password"
                    className="form-control"
                    style={{color: 'blue'}}
                    name="password_confirm"
                    ref={password_confirm_ref}
                    onChange={(e) => onChangePassword_confirm(e)}
                />
              </div>
              {
                password_confirm_alert === true &&
                <div className="alert alert-danger" role="alert" style={{marginTop:'-16px'}}>
                  Confirm password does not match with The Password.
                </div>
              }

              <div className="form-group">
                <label htmlFor="password">Role Config</label>
                <select
                    id={`role`} name={`role`}
                    as="select"
                    className="table_select tb_select"
                    ref={role_ref}
                    style={{ width:'268px', height:'40px'}}
                    defaultValue={``}
                >
                  <option value={``}>업무 구분</option>
                  <option value={`PM`}>기획자</option>
                  <option value={`PG`}>프로그래머</option>
                  <option value={`PL`}>프로젝트리더</option>
                </select>
              </div>


              <div className="form-group" style={{marginTop:'30px'}}>
                <button className="btn btn-primary btn-block">Sign Up</button>
              </div>
            </div>
          )}

          {
            (successful && message?.code === 200) && (
              <div>
                <div className="form-group">
                  <label htmlFor="username">Username</label>
                  <Input
                      type="text"
                      className="form-control"
                      name="username2"
                      value={message?.info.username}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <Input
                      type="text"
                      className="form-control"
                      name="email2"
                      value={message?.info.email}
                  />
                </div>

                <div className="form-group">
                  <button className="btn btn-primary btn-block" onClick={() => handle_click_loginPage()}>Go to Login Page</button>
                </div>
              </div>
            )
            || (successful && message?.code === 100) &&
            (
              <div>
                <div className="form-group" style={{height: '100px', marginTop: '30px'}}>
                  <label htmlFor="email" style={{textAlign:"center"}}>{message?.desc}</label>
                </div>

                <div className="form-group">
                  <button className="btn btn-primary btn-block" onClick={() => handle_click_signUpPage()}>Go to SignUp Page</button>
                </div>
              </div>
            )
          }
          <CheckButton style={{ display: "none" }} ref={checkBtn} />
        </Form>
      </div>
    </div>
  );
};

export default Register;
