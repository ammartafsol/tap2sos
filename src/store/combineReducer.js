import { combineReducers } from "redux";
import authReducer from "./auth/authSlice";

const rootReducer = combineReducers({
  authReducer
});

export default rootReducer;
