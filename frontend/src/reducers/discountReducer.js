import {
  DISCOUNT_ADMIN_CREATE_FAIL,
  DISCOUNT_ADMIN_CREATE_REQUEST,
  DISCOUNT_ADMIN_CREATE_RESET,
  DISCOUNT_ADMIN_CREATE_SUCCESS,
  DISCOUNT_ADMIN_DELETE_FAIL,
  DISCOUNT_ADMIN_DELETE_REQUEST,
  DISCOUNT_ADMIN_DELETE_RESET,
  DISCOUNT_ADMIN_DELETE_SUCCESS,
  DISCOUNT_ADMIN_DETAILS_FAIL,
  DISCOUNT_ADMIN_DETAILS_REQUEST,
  DISCOUNT_ADMIN_DETAILS_RESET,
  DISCOUNT_ADMIN_DETAILS_SUCCESS,
  DISCOUNT_ADMIN_LIST_FAIL,
  DISCOUNT_ADMIN_LIST_REQUEST,
  DISCOUNT_ADMIN_LIST_RESET,
  DISCOUNT_ADMIN_LIST_SUCCESS,
  DISCOUNT_ADMIN_UPDATE_FAIL,
  DISCOUNT_ADMIN_UPDATE_REQUEST,
  DISCOUNT_ADMIN_UPDATE_RESET,
  DISCOUNT_ADMIN_UPDATE_SUCCESS,
  DISCOUNT_LIST_FAIL,
  DISCOUNT_LIST_REQUEST,
  DISCOUNT_LIST_RESET,
  DISCOUNT_LIST_SUCCESS,
} from "../constants/discountConstants";

export const adminDiscountCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case DISCOUNT_ADMIN_CREATE_REQUEST:
      return { loading: true };
    case DISCOUNT_ADMIN_CREATE_SUCCESS:
      return { loading: false, message: action.payload };
    case DISCOUNT_ADMIN_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case DISCOUNT_ADMIN_CREATE_RESET:
      return {};
    default:
      return state;
  }
};
export const adminDiscountDetailsReducer = (state = {}, action) => {
  switch (action.type) {
    case DISCOUNT_ADMIN_DETAILS_REQUEST:
      return { loading: true };
    case DISCOUNT_ADMIN_DETAILS_SUCCESS:
      return {
        loading: false,
        discountDetails: action.payload,
      };
    case DISCOUNT_ADMIN_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    case DISCOUNT_ADMIN_DETAILS_RESET:
      return {};
    default:
      return state;
  }
};
export const adminDiscountUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case DISCOUNT_ADMIN_UPDATE_REQUEST:
      return { loading: true };
    case DISCOUNT_ADMIN_UPDATE_SUCCESS:
      return { loading: false, message: action.payload };
    case DISCOUNT_ADMIN_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case DISCOUNT_ADMIN_UPDATE_RESET:
      return {};
    default:
      return state;
  }
};
export const adminDiscountDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case DISCOUNT_ADMIN_DELETE_REQUEST:
      return { loading: true };
    case DISCOUNT_ADMIN_DELETE_SUCCESS:
      return { loading: false, message: action.payload };
    case DISCOUNT_ADMIN_DELETE_FAIL:
      return { loading: false, error: action.payload };
    case DISCOUNT_ADMIN_DELETE_RESET:
      return {};
    default:
      return state;
  }
};
export const adminDiscountListReducer = (state = { discounts: [] }, action) => {
  switch (action.type) {
    case DISCOUNT_ADMIN_LIST_REQUEST:
      return { loading: true };
    case DISCOUNT_ADMIN_LIST_SUCCESS:
      return {
        loading: false,
        discounts: action.payload.discounts,
        page: action.payload.page,
        pages: action.payload.pages,
        success: true,
      };
    case DISCOUNT_ADMIN_LIST_FAIL:
      return { loading: false, error: action.payload };
    case DISCOUNT_ADMIN_LIST_RESET:
      return { discounts: [] };
    default:
      return state;
  }
};
