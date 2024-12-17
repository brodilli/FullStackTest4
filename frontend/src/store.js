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
  adminGuestCreateReducer,
  adminGuestDetailsReducer,
  adminGuestUpdateReducer,
  adminGuestDeleteReducer,
  adminGuestListReducer,
} from "./reducers/guestReducer";
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
import {
  adminLookupCreateReducer,
  adminLookupDetailsReducer,
  adminLookupUpdateReducer,
  adminLookupDeleteReducer,
  adminLookupListReducer,
  adminLookupGroupListReducer,
} from "./reducers/lookupReducer";

const reducers = combineReducers({
  // USER
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userVerifyStatus: userVerifyStatusReducer,
  userVerify: userVerifyReducer,

  // GUEST
  adminGuestCreate: adminGuestCreateReducer,
  adminGuestDetails: adminGuestDetailsReducer,
  adminGuestUpdate: adminGuestUpdateReducer,
  adminGuestDelete: adminGuestDeleteReducer,
  adminGuestList: adminGuestListReducer,
  // PRODUCT
  adminProductCreate: adminProductCreateReducer,
  adminProductDelete: adminProductDeleteReducer,
  adminProductUpdate: adminProductUpdateReducer,
  adminProductDetails: adminProductDetailsReducer,
  adminProductsList: adminProductsListReducer,
  productsList: productsListReducer,
  productSearch: productSearchReducer,
  productLimits: productLimitsReducer,
  // LOOKUP
  adminLookupCreate: adminLookupCreateReducer,
  adminLookupDetails: adminLookupDetailsReducer,
  adminLookupUpdate: adminLookupUpdateReducer,
  adminLookupDelete: adminLookupDeleteReducer,
  adminLookupList: adminLookupListReducer,
  adminLookupGroupList: adminLookupGroupListReducer,
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
