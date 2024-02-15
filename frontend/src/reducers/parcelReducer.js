import {
  PARCEL_ADMIN_CREATE_FAIL,
  PARCEL_ADMIN_CREATE_REQUEST,
  PARCEL_ADMIN_CREATE_RESET,
  PARCEL_ADMIN_CREATE_SUCCESS,
  PARCEL_ADMIN_DELETE_FAIL,
  PARCEL_ADMIN_DELETE_REQUEST,
  PARCEL_ADMIN_DELETE_RESET,
  PARCEL_ADMIN_DELETE_SUCCESS,
  PARCEL_ADMIN_DETAILS_FAIL,
  PARCEL_ADMIN_DETAILS_REQUEST,
  PARCEL_ADMIN_DETAILS_RESET,
  PARCEL_ADMIN_DETAILS_SUCCESS,
  PARCEL_ADMIN_LIST_FAIL,
  PARCEL_ADMIN_LIST_REQUEST,
  PARCEL_ADMIN_LIST_RESET,
  PARCEL_ADMIN_LIST_SUCCESS,
  PARCEL_ADMIN_UPDATE_FAIL,
  PARCEL_ADMIN_UPDATE_REQUEST,
  PARCEL_ADMIN_UPDATE_RESET,
  PARCEL_ADMIN_UPDATE_SUCCESS,
  PARCEL_LIST_FAIL,
  PARCEL_LIST_REQUEST,
  PARCEL_LIST_RESET,
  PARCEL_LIST_SUCCESS,
} from "../constants/parcelConstants";

export const adminParcelCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case PARCEL_ADMIN_CREATE_REQUEST:
      return { loading: true };
    case PARCEL_ADMIN_CREATE_SUCCESS:
      return { loading: false, message: action.payload };
    case PARCEL_ADMIN_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case PARCEL_ADMIN_CREATE_RESET:
      return {};
    default:
      return state;
  }
};
export const adminParcelDetailsReducer = (state = {}, action) => {
  switch (action.type) {
    case PARCEL_ADMIN_DETAILS_REQUEST:
      return { loading: true };
    case PARCEL_ADMIN_DETAILS_SUCCESS:
      return {
        loading: false,
        parcelDetails: action.payload,
      };
    case PARCEL_ADMIN_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    case PARCEL_ADMIN_DETAILS_RESET:
      return {};
    default:
      return state;
  }
};
export const adminParcelUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case PARCEL_ADMIN_UPDATE_REQUEST:
      return { loading: true };
    case PARCEL_ADMIN_UPDATE_SUCCESS:
      return { loading: false, message: action.payload };
    case PARCEL_ADMIN_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case PARCEL_ADMIN_UPDATE_RESET:
      return {};
    default:
      return state;
  }
};
export const adminParcelDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case PARCEL_ADMIN_DELETE_REQUEST:
      return { loading: true };
    case PARCEL_ADMIN_DELETE_SUCCESS:
      return { loading: false, message: action.payload };
    case PARCEL_ADMIN_DELETE_FAIL:
      return { loading: false, error: action.payload };
    case PARCEL_ADMIN_DELETE_RESET:
      return {};
    default:
      return state;
  }
};
export const adminParcelListReducer = (state = { parcels: [] }, action) => {
  switch (action.type) {
    case PARCEL_ADMIN_LIST_REQUEST:
      return { loading: true };
    case PARCEL_ADMIN_LIST_SUCCESS:
      return {
        loading: false,
        parcels: action.payload.parcels,
        page: action.payload.page,
        pages: action.payload.pages,
        success: true,
      };
    case PARCEL_ADMIN_LIST_FAIL:
      return { loading: false, error: action.payload };
    case PARCEL_ADMIN_LIST_RESET:
      return { parcels: [] };
    default:
      return state;
  }
};
