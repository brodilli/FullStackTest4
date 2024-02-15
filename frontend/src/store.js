import { combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { configureStore } from "@reduxjs/toolkit";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  userLoginReducer,
  userRegisterReducer,
  userVerifyReducer,
  userVerifyStatusReducer,
  userForgotPasswordReducer,
  userResetPasswordReducer,
  userForgotStatusReducer,
} from "./reducers/userReducer";
import {
  adminProductCreateReducer,
  adminProductUpdateReducer,
  adminProductDetailsReducer,
  adminProductListReducer,
  adminProductDeleteReducer,
  productSearchReducer,
  productDetailsReducer,
} from "./reducers/productReducer";
import {
  adminOrderCreateReducer,
  adminOrderUpdateReducer,
  adminOrderDetailsReducer,
  adminOrderListReducer,
  adminOrderExportReducer,
  adminOrderListAllReducer,
  adminOrderDeleteReducer,
  orderDetailsReducer,
  orderListReducer,
  orderListAllReducer,
  orderUpdateReducer,
  orderExportReducer,
} from "./reducers/orderReducer";
import {
  adminMarketplaceCreateReducer,
  adminMarketplaceUpdateReducer,
  adminMarketplaceDetailsReducer,
  adminMarketplaceListReducer,
  adminMarketplaceDeleteReducer,
} from "./reducers/marketplaceReducer";
import {
  adminCategoryCreateReducer,
  adminCategoryDetailsReducer,
  adminCategoryUpdateReducer,
  adminCategoryDeleteReducer,
  adminCategoryListReducer,
} from "./reducers/categoryReducer";
import {
  adminDiscountCreateReducer,
  adminDiscountDetailsReducer,
  adminDiscountUpdateReducer,
  adminDiscountDeleteReducer,
  adminDiscountListReducer,
} from "./reducers/discountReducer";
import {
  adminBrandCreateReducer,
  adminBrandDetailsReducer,
  adminBrandUpdateReducer,
  adminBrandDeleteReducer,
  adminBrandListReducer,
} from "./reducers/brandReducer";
import {
  adminParcelCreateReducer,
  adminParcelDetailsReducer,
  adminParcelUpdateReducer,
  adminParcelDeleteReducer,
  adminParcelListReducer,
} from "./reducers/parcelReducer";
import {
  adminAdviserCreateReducer,
  adminAdviserDetailsReducer,
  adminAdviserUpdateReducer,
  adminAdviserDeleteReducer,
  adminAdviserListReducer,
} from "./reducers/adviserReducer";
import {
  adminDevelopmentCreateReducer,
  adminDevelopmentDeleteReducer,
  adminDevelopmentUpdateReducer,
  adminDevelopmentDetailsReducer,
  adminDevelopmentsListReducer,
  developmentsListReducer,
  developmentSearchReducer,
  developmentLimitsReducer,
} from "./reducers/developmentReducer";

const reducers = combineReducers({
  // USER
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userVerifyStatus: userVerifyStatusReducer,
  userVerify: userVerifyReducer,
  userForgotPassword: userForgotPasswordReducer,
  userResetPassword: userResetPasswordReducer,
  userForgotStatus: userForgotStatusReducer,
  // PRODUCT
  adminProductCreate: adminProductCreateReducer,
  adminProductUpdate: adminProductUpdateReducer,
  adminProductDetails: adminProductDetailsReducer,
  adminProductList: adminProductListReducer,
  adminProductDelete: adminProductDeleteReducer,
  productSearch: productSearchReducer,
  productDetails: productDetailsReducer,
  // ORDER
  adminOrderCreate: adminOrderCreateReducer,
  adminOrderUpdate: adminOrderUpdateReducer,
  adminOrderDetails: adminOrderDetailsReducer,
  adminOrderList: adminOrderListReducer,
  adminOrderListAll: adminOrderListAllReducer,
  adminOrderExport: adminOrderExportReducer,
  adminOrderDelete: adminOrderDeleteReducer,
  orderDetails: orderDetailsReducer,
  orderList: orderListReducer,
  orderListAll: orderListAllReducer,
  orderExport: orderExportReducer,
  orderUpdate: orderUpdateReducer,
  // MARKETPLACE
  adminMarketplaceCreate: adminMarketplaceCreateReducer,
  adminMarketplaceUpdate: adminMarketplaceUpdateReducer,
  adminMarketplaceDetails: adminMarketplaceDetailsReducer,
  adminMarketplaceList: adminMarketplaceListReducer,
  adminMarketplaceDelete: adminMarketplaceDeleteReducer,
  // CATEGORY
  adminCategoryCreate: adminCategoryCreateReducer,
  adminCategoryDetails: adminCategoryDetailsReducer,
  adminCategoryUpdate: adminCategoryUpdateReducer,
  adminCategoryDelete: adminCategoryDeleteReducer,
  adminCategoryList: adminCategoryListReducer,
  // DISCOUNT
  adminDiscountCreate: adminDiscountCreateReducer,
  adminDiscountDetails: adminDiscountDetailsReducer,
  adminDiscountUpdate: adminDiscountUpdateReducer,
  adminDiscountDelete: adminDiscountDeleteReducer,
  adminDiscountList: adminDiscountListReducer,
  // BRAND
  adminBrandCreate: adminBrandCreateReducer,
  adminBrandDetails: adminBrandDetailsReducer,
  adminBrandUpdate: adminBrandUpdateReducer,
  adminBrandDelete: adminBrandDeleteReducer,
  adminBrandList: adminBrandListReducer,
  // PARCEL
  adminParcelCreate: adminParcelCreateReducer,
  adminParcelDetails: adminParcelDetailsReducer,
  adminParcelUpdate: adminParcelUpdateReducer,
  adminParcelDelete: adminParcelDeleteReducer,
  adminParcelList: adminParcelListReducer,
  // ADVISER
  adminAdviserCreate: adminAdviserCreateReducer,
  adminAdviserDetails: adminAdviserDetailsReducer,
  adminAdviserUpdate: adminAdviserUpdateReducer,
  adminAdviserDelete: adminAdviserDeleteReducer,
  adminAdviserList: adminAdviserListReducer,
  // DEVELOPMENT
  adminDevelopmentCreate: adminDevelopmentCreateReducer,
  adminDevelopmentDelete: adminDevelopmentDeleteReducer,
  adminDevelopmentUpdate: adminDevelopmentUpdateReducer,
  adminDevelopmentDetails: adminDevelopmentDetailsReducer,
  adminDevelopmentsList: adminDevelopmentsListReducer,
  developmentsList: developmentsListReducer,
  developmentSearch: developmentSearchReducer,
  developmentLimits: developmentLimitsReducer,
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
