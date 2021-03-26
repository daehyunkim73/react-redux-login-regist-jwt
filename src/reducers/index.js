import { combineReducers } from "redux";
import auth from "./auth";
import message from "./message";
import paymnt from "./paymnt";


export default combineReducers({
  auth,
  message,
  paymnt,
});
