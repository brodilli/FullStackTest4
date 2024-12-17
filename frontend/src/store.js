import { combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { configureStore } from "@reduxjs/toolkit";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  userLoginReducer,
  userRegisterReducer,
  userVerifyReducer,
  userVerifyStatusReducer,
  adminUserCreateReducer,
  adminUserDetailsReducer,
  adminUserUpdateReducer,
  adminUserDeleteReducer,
  adminUserListReducer,
} from "./reducers/userReducer";

import {
  adminProductCreateReducer,
  adminProductDeleteReducer,
  adminProductUpdateReducer,
  adminProductDetailsReducer,
  adminProductsListReducer,
  productsListReducer,
  productSearchReducer,
  productLimitsReducer,
} from "./reducers/productReducer";

const reducers = combineReducers({
  // USER
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userVerifyStatus: userVerifyStatusReducer,
  userVerify: userVerifyReducer,

  // USER
  adminUserCreate: adminUserCreateReducer,
  adminUserDetails: adminUserDetailsReducer,
  adminUserUpdate: adminUserUpdateReducer,
  adminUserDelete: adminUserDeleteReducer,
  adminUserList: adminUserListReducer,
  // PRODUCT
  adminProductCreate: adminProductCreateReducer,
  adminProductDelete: adminProductDeleteReducer,
  adminProductUpdate: adminProductUpdateReducer,
  adminProductDetails: adminProductDetailsReducer,
  adminProductsList: adminProductsListReducer,
  productsList: productsListReducer,
  productSearch: productSearchReducer,
  productLimits: productLimitsReducer,
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
