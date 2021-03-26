import React, {useState, useEffect, useRef, useCallback} from "react";
import { useHistory, useParams, useRouteMatch, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../custom.css';
import '../else.css';
import DatePicker from "react-datepicker";
import moment from "moment";
import {
    getPaymntsInfo,
    uploadService,
    setUploadInfoSave,
    setPaymntsDataUpdate,
    setPaymntHisSave,
    setPaymntMainSave

} from "../actions/paymnt";
import $ from "jquery";
import isIn from "validator/es/lib/isIn";
import update from "immutability-helper";
import {
    SET_GetPAYMNTHIS_SUCCESS,
    SET_SetPAYMNTHIS_SUCCESS
} from "../actions/types";



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


    return (
        <div className="container" style={{marginTop: '40px'}} >
            <div>

                <div className="bottom-padding-50">

                    <table  className="border-table" style={{borderWidth:'1px', borderColor: "silver", }} >
                        <tbody style={{ alignContent: "center", }}>

                        <div className="Sales_info_payment_info_wrap clearfix">
                            <div className="Sales_info_payment_info_first_wrap">
                                <div className="Sales_info_payment_method">
                                    <p>
                                        정산정보<span className="red"> *</span>
                                    </p>
                                </div>
                            </div>
                            <div className="Sales_info_payment_info_second_wrap">
                                <form onSubmit={handleSubmit(handle_click_tempMainSave)}>
                                <div>
                                    <div className="Sales_info_payment_info_input_wrap">
                                        <div className="Sales_info_payment_info_input" style={{ paddingTop: '20px',}}>
                                            <span style={{ float: "left", }}>회사명</span>
                                            <input
                                                ref={register}
                                                type="text"
                                                name="comp_nm" id="comp_nm"
                                                defaultValue={comp_nm}
                                                style={{ width: '100px', height: '22px', float: "left",  }}
                                            />
                                            <span style={{ float: "left", }}>정산일</span>
                                            <div className="customDatePickerWidth2" style={{ float: "left", }}>
                                                <DatePicker
                                                    ref={register}
                                                    id={`jungsan_date`} name={`jungsan_date`}
                                                    selected={jungsan_date && moment(jungsan_date).toDate()}
                                                    dateFormat="yyyyMMdd"
                                                    onChange={(date) => handle_change_date(moment(date).format('YYYYMMDD'))}   // when value has changed
                                                />
                                            </div>
                                        </div><br/>
                                        <div className="Sales_info_payment_info_input" style={{ paddingTop: '0px',  }}>
                                            <span>총결제금액</span>
                                            <input
                                                type="text"
                                                name="total_paymnt_amnt" id="total_paymnt_amnt"
                                                ref={total_paymnt_amnt_Ref}
                                                defaultValue={total_paymnt_amnt}
                                                style={{ width: '100px', height: '22px',}}
                                                //onKeyPress={(e) => handle_keypress_totalPaymntAmnt(e)}   //Error
                                                onKeyUp={(e) => handle_keyUp_totalPaymntAmnt(e)}
                                            />
                                            <span>수수료</span>
                                            <input
                                                type="text"
                                                name="minus_amount" id="minus_amount"
                                                ref={minus_amount_Ref}
                                                defaultValue={minus_amount}
                                                style={{ width: '100px', height: '22px',}}
                                                onKeyUp={(e) => handle_keyUp_totalPaymntAmnt(e)}
                                            />
                                            <span>정산금액</span>
                                            <input
                                                type="text"
                                                name="jungsan_amount" id="jungsan_amount"
                                                ref={jungsan_amount_Ref}
                                                defaultValue={jungsan_amount}
                                                style={{ width: '100px', height: '22px',}}
                                            />
                                        </div>
                                        <div className="Sales_info_payment_info_input" style={{ paddingTop: '0px',}}>
                                            <span>결제수단</span>
                                            <select
                                                ref={register}
                                                name="paymnt_method" id="paymnt_method"
                                                defaultValue={paymnt_method}
                                                as="select"
                                                className="table_select tb_select "
                                                className="width60 paymnt_method"
                                            >
                                                <option value='' selected={paymnt_method == ''} >결제수단</option>
                                                <option value='C' selected={paymnt_method == 'C'} >카드</option>
                                                <option value='P' selected={paymnt_method == 'P'} >포인트</option>
                                            </select>
                                            &nbsp;&nbsp;&nbsp;
                                            <span>계약</span>
                                            <select
                                                ref={register}
                                                name="use" id="use"
                                                defaultValue={use}
                                                as="select"
                                                className="table_select tb_select"
                                                className="width60 use"
                                            >
                                                <option value='' selected={use == ''} >계약여부</option>
                                                <option value='Y' selected={use == 'Y'} >계약</option>
                                                <option value='N' selected={use == 'N'} >해지</option>
                                            </select>
                                        </div>

                                        <div className="payment_info_radio_wrap" style={{ marginTop: '-15px', marginLeft: '15px'}}>
                                            <div className="">
                                                <input
                                                    //ref={register}
                                                    type="radio"
                                                    name="freeGbn"
                                                    defaultValue="0"
                                                    checked={freeGbn === '0' ? true : false}
                                                    onChange={(e) => handle_change_freeGbn(e, '0')}
                                                />
                                                &nbsp;
                                                    무료
                                            </div>
                                            &nbsp;&nbsp;&nbsp;&nbsp;
                                            <div className="">
                                                <input
                                                    //ref={register}
                                                    type="radio"
                                                    name="freeGbn"
                                                    defaultValue="1"
                                                    checked={freeGbn === '1' ? true : false}
                                                    onChange={(e) => handle_change_freeGbn(e, '1')}
                                                />
                                                &nbsp;
                                                    유료
                                            </div>
                                        </div>
                                    </div>

                                    <div style={{ marginTop: '0px',  cursor: "pointer" }} onClick={handleSubmit(handle_click_tempMainSave)}>[임시저장]</div>
                                    {/*<input type='submit' value='임시저장' />*/}
                                </div>
                                </form>
                            </div>
                        </div>
                        </tbody>
                    </table>

                </div>



                <div className="bottom-padding-50" style={{ marginTop: '-5px'}}>
                    <table  className="border-table" style={{borderWidth:'1px', borderColor: "silver", }} >
                        <tbody style={{ alignContent: "center", }}>

                        <div className="Sales_info_payment_info_wrap clearfix">
                            <div className="Sales_info_payment_info_first_wrap">
                                <div className="Sales_info_payment_method">
                                    <p>
                                        결제내역<span className="red"> *</span>
                                    </p>
                                </div>
                            </div>
                            <div className="Sales_info_payment_info_second_wrap">
                                <div style={{marginTop:'-15px'}}>

                                    <div className="Sales_info_payment_info_input_wrap" >
                                        <div style={{ paddingBottom: '20px',}}>&nbsp;</div>
                                        {
                                            loading === true && Array.prototype.slice.call(paymntHis).map((item, index) => {
                                                return (
                                                    <div className="Sales_info_payment_info_input" style={{ marginTop: '-20px',}} key={item.idx}>
                                                        <p>횟수</p>
                                                        <input
                                                            type="text"
                                                            name={`cnt_${item.idx}`} id={`cnt_${item.idx}`}
                                                            ref={(el) => (cnt_Ref.current[item.idx] = el)}
                                                            style={{ width: '100px', height: '22px',}}
                                                            defaultValue={item.cnt}
                                                            onChange={() => handle_change_paymntHis(item.idx, item.id)}
                                                        />
                                                        <span>회</span>
                                                        <input
                                                            type="text"
                                                            name={`amount_${item.idx}`} id={`amount_${item.idx}`}
                                                            ref={(el) => (amount_Ref.current[item.idx] = el)}
                                                            style={{ width: '100px', height: '22px',}}
                                                            defaultValue={item.amount}
                                                            onChange={() => handle_change_paymntHis(item.idx, item.id)}
                                                        />
                                                        <span>원</span>
                                                        {
                                                            paymntHis.length-1 === index &&
                                                            ( <button onClick={() => handle_click_paymntHis_add_remove('A', null, item.id)}>추가</button> )
                                                        }
                                                        {
                                                            index >= 0 && paymntHis.length !== 1 &&
                                                            (<button onClick={() => handle_click_paymntHis_add_remove('R', item.idx, item.id)}>삭제</button>)
                                                        }
                                                    </div>
                                                )
                                            })
                                        }
                                        <div style={{ height: '5px',}}>&nbsp;</div>
                                    </div>
                                    <div style={{ marginTop: '0px',  cursor: "pointer" }}  onClick={(e) => handle_click_tempPaymntSave(e)}>[임시저장]</div>
                                </div>
                            </div>
                        </div>

                        </tbody>
                    </table>
                </div>


                <div className="bottom-padding-50" style={{ marginTop: '-30px'}}>
                    <table  className="border-table" style={{borderWidth:'1px', borderColor: "silver", }} >
                        <tbody style={{ alignContent: "center", }}>

                        <div className="Sales_info_payment_info_wrap clearfix">
                            <div className="Sales_info_payment_info_first_wrap">
                                <div className="Sales_info_payment_method">
                                    <p>
                                        이미지 <span className="red"> *</span>
                                    </p>
                                </div>
                            </div>

                            <div className="Sales_info_payment_info_second_wrap">
                                <div>
                                    <ul>
                                        {
                                            fileHis.map((item, idx) => {
                                                //let newArray_v = [];
                                                console.log('imgBase64 > ', imgBase64);

                                                const sortArray = [].slice.call(imgBase64).sort(function(a, b) {
                                                    return a.idx - b.idx;   //오름차순 정렬
                                                });

                                                const index = imgBase64.findIndex(v => Number(v.idx) === Number(item.idx));
                                                if (index > -1){
                                                    newArray_v = [...imgBase64];
                                                    newArray_v[index] = {...newArray_v[index]};
                                                }

                                                return (
                                                    <li key={item.idx}>
                                                        <div className="Sales_info_payment_info_input_wrap" style={{ float:"left"}}>
                                                            <div className="Sales_info_payment_info_input" >
                                                                <div className="Sales_info_sc_wrap clearfix"  style={{ textAlign: "left", width: '50px'}}>
                                                                    <div className="Sales_info_sc_left_wrap">
                                                                        <div className="Sales_info_sc_img_wrap">
                                                                            {
                                                                                newArray_v[index]?.value || item.filePathNm ?
                                                                                    (
                                                                                        <img
                                                                                            className="sales_info_img_Sales_file"
                                                                                            id={`imgfile_${item.idx}`}
                                                                                            name={`imgfile_${item.idx}`}
                                                                                            src={index > -1 ? newArray_v[index]?.value : API_URL +'/'+ item.filePathNm }
                                                                                        />
                                                                                    )
                                                                                    : (
                                                                                        <img
                                                                                            className="sales_info_img_Sales_file"
                                                                                            id={`imgfile_${item.idx}`}
                                                                                            name={`imgfile_${item.idx}`}
                                                                                        />
                                                                                    )
                                                                            }
                                                                        </div>
                                                                        <div className="Sales_info_sc_file_btn_wrap">
                                                                            <input
                                                                                type="file"
                                                                                id={`imgInput_${item.idx}`}
                                                                                name={`imgInput_${item.idx}`}
                                                                                onChange={(e) => handle_change_file(e, item.idx)}
                                                                                accept="image/*"
                                                                            />
                                                                            <label htmlFor={`imgInput_${item.idx}`}>파일선택</label>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className={`Sales_info_sc_left_wrap`} style={{ marginTop: '-20px', marginLeft:' 5px', width: '170px' }}>
                                                                    {
                                                                        idx >= fileHis.length-1 && (
                                                                            <button onClick={(e) => handle_click_imageFileAdd(e)}>추가</button>
                                                                        )
                                                                    }
                                                                    {
                                                                        fileHis.length > 1 && idx >= 0 && (
                                                                            <button onClick={(e) => handle_click_imageFileRemove(e, item.idx)}>삭제</button>
                                                                        )
                                                                    }
                                                                </div>
                                                            </div>

                                                            <div style={{float:"right", marginRight: '140px', marginTop: '-170px', }}>
                                                                <div className="Sales_info_sc_img_wrap" style={{width: '300px', height: '170px', float:"left",}}>
                                                                    {
                                                                        newArray_v[index]?.value || item.filePathNm ?
                                                                            (
                                                                                <img
                                                                                    className="sales_info_img_Sales_file"
                                                                                    id={`imgfile_${item.idx}`}
                                                                                    name={`imgfile_${item.idx}`}
                                                                                    src={index > -1 ? newArray_v[index]?.value : API_URL +'/'+ item.filePathNm }
                                                                                    style={{width: '270px', height: '140px', marginLeft: '12px', marginTop: '12px', }}
                                                                                />
                                                                            )
                                                                            : (
                                                                                <img
                                                                                    className="sales_info_img_Sales_file"
                                                                                    id={`imgfile_${item.idx}`}
                                                                                    name={`imgfile_${item.idx}`}
                                                                                    style={{width: '270px', height: '140px',  marginLeft: '12px', marginTop: '12px', }}
                                                                                />
                                                                            )
                                                                    }
                                                                </div>

                                                                <div className="Sales_info_sc_img_wrap" style={{width: '50px', height: '50px', marginLeft: '20px', float:"right",}}>
                                                                    <textarea
                                                                        name={`memo_${item.idx}`}
                                                                        id={`memo_${item.idx}`}
                                                                        ref={(el) => (memo_Ref.current[item.idx] = el)}
                                                                        cols='50'
                                                                        rows='50'
                                                                        style={{ height: '170px', width: '170px', lineHeight: '1em'}}
                                                                        defaultValue={item.memo}
                                                                    />
                                                                </div>

                                                            </div>
                                                        </div>
                                                    </li>
                                                )
                                            })
                                        }
                                    </ul>

                                </div>
                                <div  style={{ marginTop: '0px',  cursor: "pointer"}} onClick={(e) => handle_click_tempUpload(e)}>[임시저장]</div>
                            </div>
                        </div>
                        </tbody>
                    </table>
                </div>

                <div style={{ marginTop: '-35px', paddingBottom: '0px', textAlign: "right",  }}>
                    <form>
                        <div>
                            <input type="button"
                                   name="multiSaveBtn" id="multiSaveBtn"
                                   value={`전체 저장`}
                                   className="width30"
                                   style={{ width: '90px'}}
                                   onClick={(e) => handle_click_allSave(e)}
                            />
                        </div>
                    </form>
                </div>

            </div>
        </div>
    );

};

export default Detail;
