import { combineReducers } from "redux";
import loginStatus from "./loginStatus";
import classList from "./classList";
import currentUser from "./currentUser";
const myReducer = combineReducers({
  loginStatus,
  classList,
  currentUser,
});

export default myReducer;
