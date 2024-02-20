import { combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { configureStore } from "@reduxjs/toolkit";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  userLoginReducer,
  userRegisterReducer,
  userVerifyReducer,
  userVerifyStatusReducer,
} from "./reducers/userReducer";

import {
  adminAdviserCreateReducer,
  adminAdviserDetailsReducer,
  adminAdviserUpdateReducer,
  adminAdviserDeleteReducer,
  adminAdviserListReducer,
} from "./reducers/adviserReducer";

const reducers = combineReducers({
  // USER
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userVerifyStatus: userVerifyStatusReducer,
  userVerify: userVerifyReducer,

  // ADVISER
  adminAdviserCreate: adminAdviserCreateReducer,
  adminAdviserDetails: adminAdviserDetailsReducer,
  adminAdviserUpdate: adminAdviserUpdateReducer,
  adminAdviserDelete: adminAdviserDeleteReducer,
  adminAdviserList: adminAdviserListReducer,
});

const initialState = {
  userLogin: { userInfo: {} },
};

const middleware = [thunk];

const store = configureStore(
  { reducer: reducers },
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
