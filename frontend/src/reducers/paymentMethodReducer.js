// payment method reducer 

import {
    PAYMENT_METHOD_ADMIN_CREATE_FAIL,
    PAYMENT_METHOD_ADMIN_CREATE_REQUEST,
    PAYMENT_METHOD_ADMIN_CREATE_RESET,
    PAYMENT_METHOD_ADMIN_CREATE_SUCCESS,
    PAYMENT_METHOD_CREATE_FAIL,
    PAYMENT_METHOD_CREATE_REQUEST,
    PAYMENT_METHOD_CREATE_RESET,
    PAYMENT_METHOD_CREATE_SUCCESS,
    PAYMENT_METHOD_ADMIN_DELETE_FAIL,
    PAYMENT_METHOD_ADMIN_DELETE_REQUEST,
    PAYMENT_METHOD_ADMIN_DELETE_RESET,
    PAYMENT_METHOD_ADMIN_DELETE_SUCCESS,
    PAYMENT_METHOD_ADMIN_DETAILS_FAIL,
    PAYMENT_METHOD_ADMIN_DETAILS_REQUEST,
    PAYMENT_METHOD_ADMIN_DETAILS_RESET,
    PAYMENT_METHOD_ADMIN_DETAILS_SUCCESS,
    PAYMENT_METHOD_ADMIN_LIST_FAIL,
    PAYMENT_METHOD_ADMIN_LIST_REQUEST,
    PAYMENT_METHOD_ADMIN_LIST_RESET,
    PAYMENT_METHOD_ADMIN_LIST_SUCCESS,
    PAYMENT_METHOD_ADMIN_UPDATE_FAIL,
    PAYMENT_METHOD_ADMIN_UPDATE_REQUEST,
    PAYMENT_METHOD_ADMIN_UPDATE_SUCCESS,
    PAYMENT_METHOD_LIST_FAIL,
    PAYMENT_METHOD_LIST_REQUEST,
    PAYMENT_METHOD_LIST_RESET,
    PAYMENT_METHOD_LIST_SUCCESS,
    PAYMENT_METHOD_DETAILS_REQUEST,
    PAYMENT_METHOD_DETAILS_SUCCESS,
    PAYMENT_METHOD_DETAILS_FAIL,
    PAYMENT_METHOD_DETAILS_RESET,
    PAYMENT_METHOD_LIST_DETAILS_REQUEST,
    PAYMENT_METHOD_LIST_DETAILS_SUCCESS,
    PAYMENT_METHOD_LIST_DETAILS_FAIL,
    PAYMENT_METHOD_LIST_DETAILS_RESET,
    PAYMENT_METHOD_SEARCH_REQUEST,
    PAYMENT_METHOD_LIMITS_REQUEST,
    PAYMENT_METHOD_LIMITS_SUCCESS,
    PAYMENT_METHOD_LIMITS_FAIL,
    PAYMENT_METHOD_LIMITS_RESET,
  } from "../constants/paymentMethodConstants";
  
  export const adminPaymentMethodCreateReducer = (state = {}, action) => {
    switch (action.type) {
      case PAYMENT_METHOD_ADMIN_CREATE_REQUEST:
        return { loading: true };
      case PAYMENT_METHOD_ADMIN_CREATE_SUCCESS:
        return { loading: false, message: action.payload.message };
      case PAYMENT_METHOD_ADMIN_CREATE_FAIL:
        return { loading: false, error: action.payload };
      case PAYMENT_METHOD_ADMIN_CREATE_RESET:
        return {};
      default:
        return state;
    }
  };
  export const adminPaymentMethodDeleteReducer = (state = {}, action) => {
    switch (action.type) {
      case PAYMENT_METHOD_ADMIN_DELETE_REQUEST:
        return { loading: true };
      case PAYMENT_METHOD_ADMIN_DELETE_SUCCESS:
        return { loading: false, message: action.payload };
      case PAYMENT_METHOD_ADMIN_DELETE_FAIL:
        return { loading: false, error: action.payload };
      case PAYMENT_METHOD_ADMIN_DELETE_RESET:
        return {};
      default:
        return state;
    }
  };
  export const adminPaymentMethodUpdateReducer = (state = {}, action) => {
    switch (action.type) {
      case PAYMENT_METHOD_ADMIN_UPDATE_REQUEST:
        return { loading: true };
      case PAYMENT_METHOD_ADMIN_UPDATE_SUCCESS:
        return { loading: false, message: action.payload, success: true };
      case PAYMENT_METHOD_ADMIN_UPDATE_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  export const adminPaymentMethodDetailsReducer = (state = {}, action) => {
    switch (action.type) {
      case PAYMENT_METHOD_ADMIN_DETAILS_REQUEST:
        return { loading: true };
      case PAYMENT_METHOD_ADMIN_DETAILS_SUCCESS:
        return {
          loading: false,
          success: true,
          paymentMethodDetails: action.payload.paymentMethod,
        };
      case PAYMENT_METHOD_ADMIN_DETAILS_FAIL:
        return { loading: false, error: action.payload };
      case PAYMENT_METHOD_ADMIN_DETAILS_RESET:
        return {};
      default:
        return state;
    }
  };
  export const adminPaymentMethodsListReducer = (state = { paymentMethods: [] }, action) => {
    switch (action.type) {
      case PAYMENT_METHOD_ADMIN_LIST_REQUEST:
        return { loading: true };
      case PAYMENT_METHOD_ADMIN_LIST_SUCCESS:
        return {
          loading: false,
          paymentMethods: action.payload.paymentMethods,
          page: action.payload.page,
          pages: action.payload.pages,
          success: true,
        };
      case PAYMENT_METHOD_ADMIN_LIST_FAIL:
        return { loading: false, error: action.payload };
      case PAYMENT_METHOD_ADMIN_LIST_RESET:
        return { paymentMethods: [] };
      default:
        return state;
    }
  };
  export const paymentMethodsListReducer = (
    state = { paymentMethods: [], filterLimits: {} },
    action
  ) => {
    switch (action.type) {
      case PAYMENT_METHOD_LIST_REQUEST:
        return { loading: true };
      case PAYMENT_METHOD_LIST_SUCCESS:
        return {
          loading: false,
          success: true,
          paymentMethods: action.payload.paymentMethods,
        };
      case PAYMENT_METHOD_LIST_FAIL:
        return { loading: false, error: action.payload };
      case PAYMENT_METHOD_LIST_RESET:
        return { paymentMethods: [] };
      default:
        return state;
    }
  };
  
  export const paymentMethodSearchReducer = (state = { paymentMethods: [] }, action) => {
    switch (action.type) {
      case PAYMENT_METHOD_SEARCH_REQUEST:
        return { loading: true };
      case PAYMENT_METHOD_LIST_SUCCESS:
        return {
          loading: false,
          success: true,
          paymentMethods: action.payload.paymentMethods,
        };
      case PAYMENT_METHOD_LIST_FAIL:
        return { loading: false, error: action.payload };
      case PAYMENT_METHOD_LIST_RESET:
        return { paymentMethods: [] };
      default:
        return state;
    }
  };
  
  export const paymentMethodLimitsReducer = (state = { filterLimits: {} }, action) => {
    switch (action.type) {
      case PAYMENT_METHOD_LIMITS_REQUEST:
        return { loading: true };
      case PAYMENT_METHOD_LIMITS_SUCCESS:
        return {
          loading: false,
          success: true,
          filterLimits: action.payload,
        };
      case PAYMENT_METHOD_LIMITS_FAIL:
        return { loading: false, error: action.payload };
      case PAYMENT_METHOD_LIMITS_RESET:
        return { filterLimits: {} };
      default:
        return state;
    }
  };