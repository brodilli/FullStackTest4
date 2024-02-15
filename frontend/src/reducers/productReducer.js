import {
  PRODUCT_ADMIN_CREATE_FAIL,
  PRODUCT_ADMIN_CREATE_REQUEST,
  PRODUCT_ADMIN_CREATE_RESET,
  PRODUCT_ADMIN_CREATE_SUCCESS,
  PRODUCT_CREATE_FAIL,
  PRODUCT_CREATE_REQUEST,
  PRODUCT_CREATE_RESET,
  PRODUCT_CREATE_SUCCESS,
  PRODUCT_ADMIN_DELETE_FAIL,
  PRODUCT_ADMIN_DELETE_REQUEST,
  PRODUCT_ADMIN_DELETE_RESET,
  PRODUCT_ADMIN_DELETE_SUCCESS,
  PRODUCT_ADMIN_DETAILS_FAIL,
  PRODUCT_ADMIN_DETAILS_REQUEST,
  PRODUCT_ADMIN_DETAILS_RESET,
  PRODUCT_ADMIN_DETAILS_SUCCESS,
  PRODUCT_ADMIN_LIST_FAIL,
  PRODUCT_ADMIN_LIST_REQUEST,
  PRODUCT_ADMIN_LIST_RESET,
  PRODUCT_ADMIN_LIST_SUCCESS,
  PRODUCT_ADMIN_UPDATE_FAIL,
  PRODUCT_ADMIN_UPDATE_REQUEST,
  PRODUCT_ADMIN_UPDATE_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_RESET,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DETAILS_RESET,
  PRODUCT_CART_REQUEST,
  PRODUCT_CART_SUCCESS,
  PRODUCT_CART_FAIL,
  PRODUCT_CART_RESET,
  PRODUCT_LIST_DETAILS_REQUEST,
  PRODUCT_LIST_DETAILS_SUCCESS,
  PRODUCT_LIST_DETAILS_FAIL,
  PRODUCT_LIST_DETAILS_RESET,
  PRODUCT_SEARCH_REQUEST,
  PRODUCT_SEARCH_SUCCESS,
  PRODUCT_SEARCH_FAIL,
  PRODUCT_SEARCH_RESET,
} from "../constants/productConstants";

export const adminProductCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_ADMIN_CREATE_REQUEST:
      return { loading: true };
    case PRODUCT_ADMIN_CREATE_SUCCESS:
      return { loading: false, message: action.payload.message };
    case PRODUCT_ADMIN_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case PRODUCT_ADMIN_CREATE_RESET:
      return {};
    default:
      return state;
  }
};
export const adminProductDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_ADMIN_DELETE_REQUEST:
      return { loading: true };
    case PRODUCT_ADMIN_DELETE_SUCCESS:
      return { loading: false, message: action.payload };
    case PRODUCT_ADMIN_DELETE_FAIL:
      return { loading: false, error: action.payload };
    case PRODUCT_ADMIN_DELETE_RESET:
      return {};
    default:
      return state;
  }
};
export const adminProductUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_ADMIN_UPDATE_REQUEST:
      return { loading: true };
    case PRODUCT_ADMIN_UPDATE_SUCCESS:
      return { loading: false, message: action.payload };
    case PRODUCT_ADMIN_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const adminProductDetailsReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_ADMIN_DETAILS_REQUEST:
      return { loading: true };
    case PRODUCT_ADMIN_DETAILS_SUCCESS:
      return {
        loading: false,
        productDetails: action.payload,
      };
    case PRODUCT_ADMIN_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    case PRODUCT_ADMIN_DETAILS_RESET:
      return {};
    default:
      return state;
  }
};
export const adminProductListReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCT_ADMIN_LIST_REQUEST:
      return { loading: true };
    case PRODUCT_ADMIN_LIST_SUCCESS:
      return {
        loading: false,
        products: action.payload.products,
        page: action.payload.page,
        pages: action.payload.pages,
        success: true,
      };
    case PRODUCT_ADMIN_LIST_FAIL:
      return { loading: false, error: action.payload };
    case PRODUCT_ADMIN_LIST_RESET:
      return { products: [] };
    default:
      return state;
  }
};
export const productListReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { loading: true };
    case PRODUCT_LIST_SUCCESS:
      return {
        loading: false,
        products: action.payload.products,
      };
    case PRODUCT_LIST_FAIL:
      return { loading: false, error: action.payload };
    case PRODUCT_LIST_RESET:
      return { products: [] };
    default:
      return state;
  }
};
export const productCartReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCT_CART_REQUEST:
      return { loading: true };
    case PRODUCT_CART_SUCCESS:
      return {
        loading: false,
        products: action.payload.products,
        success: true,
      };
    case PRODUCT_CART_FAIL:
      return { loading: false, error: action.payload };
    case PRODUCT_CART_RESET:
      return { products: [] };
    default:
      return state;
  }
};

export const productSearchReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case PRODUCT_SEARCH_REQUEST:
      return { loading: true };
    case PRODUCT_SEARCH_SUCCESS:
      return {
        loading: false,
        success: true,
        products: action.payload.products,
        filterLimits: action.payload.filterLimits,
      };
    case PRODUCT_SEARCH_FAIL:
      return { loading: false, error: action.payload };
    case PRODUCT_SEARCH_RESET:
      return { products: [] };
    default:
      return state;
  }
};

export const productDetailsReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_DETAILS_REQUEST:
      return { loading: true };
    case PRODUCT_DETAILS_SUCCESS:
      return {
        loading: false,
        product: action.payload,
      };
    case PRODUCT_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    case PRODUCT_DETAILS_RESET:
      return {};
    default:
      return state;
  }
};
