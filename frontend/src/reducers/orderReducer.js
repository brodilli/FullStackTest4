import {
  ORDER_ADMIN_CREATE_FAIL,
  ORDER_ADMIN_CREATE_REQUEST,
  ORDER_ADMIN_CREATE_RESET,
  ORDER_ADMIN_CREATE_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_RESET,
  ORDER_CREATE_SUCCESS,
  ORDER_ADMIN_DELETE_FAIL,
  ORDER_ADMIN_DELETE_REQUEST,
  ORDER_ADMIN_DELETE_RESET,
  ORDER_ADMIN_DELETE_SUCCESS,
  ORDER_ADMIN_DETAILS_FAIL,
  ORDER_ADMIN_DETAILS_REQUEST,
  ORDER_ADMIN_DETAILS_RESET,
  ORDER_ADMIN_DETAILS_SUCCESS,
  ORDER_ADMIN_LIST_FAIL,
  ORDER_ADMIN_LIST_REQUEST,
  ORDER_ADMIN_LIST_RESET,
  ORDER_ADMIN_LIST_SUCCESS,
  ORDER_ADMIN_UPDATE_FAIL,
  ORDER_ADMIN_UPDATE_REQUEST,
  ORDER_ADMIN_UPDATE_SUCCESS,
  ORDER_LIST_FAIL,
  ORDER_LIST_REQUEST,
  ORDER_LIST_RESET,
  ORDER_LIST_SUCCESS,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_DETAILS_RESET,
  ORDER_CART_REQUEST,
  ORDER_CART_SUCCESS,
  ORDER_CART_FAIL,
  ORDER_CART_RESET,
  ORDER_LIST_DETAILS_REQUEST,
  ORDER_LIST_DETAILS_SUCCESS,
  ORDER_LIST_DETAILS_FAIL,
  ORDER_LIST_DETAILS_RESET,
  ORDER_UPDATE_REQUEST,
  ORDER_UPDATE_SUCCESS,
  ORDER_UPDATE_FAIL,
  ORDER_ADMIN_UPDATE_RESET,
  ORDER_UPDATE_RESET,
  ORDER_ADMIN_LIST_ALL_REQUEST,
  ORDER_ADMIN_LIST_ALL_SUCCESS,
  ORDER_ADMIN_LIST_ALL_FAIL,
  ORDER_ADMIN_LIST_ALL_RESET,
  ORDER_ADMIN_EXPORT_REQUEST,
  ORDER_ADMIN_EXPORT_SUCCESS,
  ORDER_ADMIN_EXPORT_FAIL,
  ORDER_ADMIN_EXPORT_RESET,
  ORDER_EXPORT_REQUEST,
  ORDER_EXPORT_SUCCESS,
  ORDER_EXPORT_FAIL,
  ORDER_EXPORT_RESET,
  ORDER_LIST_ALL_REQUEST,
  ORDER_LIST_ALL_SUCCESS,
  ORDER_LIST_ALL_FAIL,
  ORDER_LIST_ALL_RESET,
} from "../constants/orderConstants";

export const adminOrderCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_ADMIN_CREATE_REQUEST:
      return { loading: true };
    case ORDER_ADMIN_CREATE_SUCCESS:
      return { loading: false, message: action.payload.message };
    case ORDER_ADMIN_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case ORDER_ADMIN_CREATE_RESET:
      return {};
    default:
      return state;
  }
};
export const adminOrderDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_ADMIN_DELETE_REQUEST:
      return { loading: true };
    case ORDER_ADMIN_DELETE_SUCCESS:
      return { loading: false, message: action.payload };
    case ORDER_ADMIN_DELETE_FAIL:
      return { loading: false, error: action.payload };
    case ORDER_ADMIN_DELETE_RESET:
      return {};
    default:
      return state;
  }
};
export const adminOrderUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_ADMIN_UPDATE_REQUEST:
      return { loading: true };
    case ORDER_ADMIN_UPDATE_SUCCESS:
      return { loading: false, message: action.payload };
    case ORDER_ADMIN_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case ORDER_ADMIN_UPDATE_RESET:
      return {};
    default:
      return state;
  }
};
export const adminOrderDetailsReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_ADMIN_DETAILS_REQUEST:
      return { loading: true };
    case ORDER_ADMIN_DETAILS_SUCCESS:
      return {
        loading: false,
        orderDetails: action.payload,
      };
    case ORDER_ADMIN_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    case ORDER_ADMIN_DETAILS_RESET:
      return {};
    default:
      return state;
  }
};
export const adminOrderListReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case ORDER_ADMIN_LIST_REQUEST:
      return { loading: true };
    case ORDER_ADMIN_LIST_SUCCESS:
      return {
        loading: false,
        orders: action.payload.orders,
        page: action.payload.page,
        pages: action.payload.pages,
        success: true,
      };
    case ORDER_ADMIN_LIST_FAIL:
      return { loading: false, error: action.payload };
    case ORDER_ADMIN_LIST_RESET:
      return { orders: [] };
    default:
      return state;
  }
};
export const adminOrderExportReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case ORDER_ADMIN_EXPORT_REQUEST:
      return { loading: true };
    case ORDER_ADMIN_EXPORT_SUCCESS:
      return {
        loading: false,
        orders: action.payload.orders,
        success: true,
      };
    case ORDER_ADMIN_EXPORT_FAIL:
      return { loading: false, error: action.payload };
    case ORDER_ADMIN_EXPORT_RESET:
      return { orders: [] };
    default:
      return state;
  }
};
export const adminOrderListAllReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case ORDER_ADMIN_LIST_ALL_REQUEST:
      return { loading: true };
    case ORDER_ADMIN_LIST_ALL_SUCCESS:
      return {
        loading: false,
        orders: action.payload.orders,
        success: true,
      };
    case ORDER_ADMIN_LIST_ALL_FAIL:
      return { loading: false, error: action.payload };
    case ORDER_ADMIN_LIST_ALL_RESET:
      return { orders: [] };
    default:
      return state;
  }
};
export const orderDetailsReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_DETAILS_REQUEST:
      return { loading: true };
    case ORDER_DETAILS_SUCCESS:
      return {
        loading: false,
        orderDetails: action.payload,
      };
    case ORDER_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    case ORDER_DETAILS_RESET:
      return {};
    default:
      return state;
  }
};
export const orderListReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case ORDER_LIST_REQUEST:
      return { loading: true };
    case ORDER_LIST_SUCCESS:
      return {
        loading: false,
        orders: action.payload.orders,
        page: action.payload.page,
        pages: action.payload.pages,
        success: true,
      };
    case ORDER_LIST_FAIL:
      return { loading: false, error: action.payload };
    case ORDER_LIST_RESET:
      return { orders: [] };
    default:
      return state;
  }
};
export const orderUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_UPDATE_REQUEST:
      return { loading: true };
    case ORDER_UPDATE_SUCCESS:
      return { loading: false, message: action.payload };
    case ORDER_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case ORDER_UPDATE_RESET:
      return {};
    default:
      return state;
  }
};
export const orderListAllReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case ORDER_LIST_ALL_REQUEST:
      return { loading: true };
    case ORDER_LIST_ALL_SUCCESS:
      return {
        loading: false,
        orders: action.payload.orders,
        success: true,
      };
    case ORDER_LIST_ALL_FAIL:
      return { loading: false, error: action.payload };
    case ORDER_LIST_ALL_RESET:
      return { orders: [] };
    default:
      return state;
  }
};
export const orderExportReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case ORDER_EXPORT_REQUEST:
      return { loading: true };
    case ORDER_EXPORT_SUCCESS:
      return {
        loading: false,
        orders: action.payload.orders,
        success: true,
      };
    case ORDER_EXPORT_FAIL:
      return { loading: false, error: action.payload };
    case ORDER_EXPORT_RESET:
      return { orders: [] };
    default:
      return state;
  }
};
