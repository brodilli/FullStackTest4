import {
  LOOKUP_ADMIN_CREATE_FAIL,
  LOOKUP_ADMIN_CREATE_REQUEST,
  LOOKUP_ADMIN_CREATE_SUCCESS,
  LOOKUP_ADMIN_DELETE_FAIL,
  LOOKUP_ADMIN_CREATE_RESET,
  LOOKUP_ADMIN_DELETE_REQUEST,
  LOOKUP_ADMIN_DELETE_RESET,
  LOOKUP_ADMIN_DELETE_SUCCESS,
  LOOKUP_ADMIN_DETAILS_FAIL,
  LOOKUP_ADMIN_DETAILS_REQUEST,
  LOOKUP_ADMIN_DETAILS_RESET,
  LOOKUP_ADMIN_DETAILS_SUCCESS,
  LOOKUP_ADMIN_LIST_FAIL,
  LOOKUP_ADMIN_LIST_REQUEST,
  LOOKUP_ADMIN_LIST_RESET,
  LOOKUP_ADMIN_LIST_SUCCESS,
  LOOKUP_ADMIN_UPDATE_FAIL,
  LOOKUP_ADMIN_UPDATE_REQUEST,
  LOOKUP_ADMIN_UPDATE_RESET,
  LOOKUP_ADMIN_UPDATE_SUCCESS,
  LOOKUP_ADMIN_GROUP_LIST_REQUEST,
  LOOKUP_ADMIN_GROUP_LIST_SUCCESS,
  LOOKUP_ADMIN_GROUP_LIST_FAIL,
  LOOKUP_ADMIN_GROUP_LIST_RESET,
  LOOKUP_LIST_FAIL,
  LOOKUP_LIST_REQUEST,
  LOOKUP_LIST_RESET,
  LOOKUP_LIST_SUCCESS,
} from "../constants/lookupConstants";

export const adminLookupCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case LOOKUP_ADMIN_CREATE_REQUEST:
      return { loading: true };
    case LOOKUP_ADMIN_CREATE_SUCCESS:
      return { loading: false, message: action.payload };
    case LOOKUP_ADMIN_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case LOOKUP_ADMIN_CREATE_RESET:
      return {};
    default:
      return state;
  }
};
export const adminLookupDetailsReducer = (state = {}, action) => {
  switch (action.type) {
    case LOOKUP_ADMIN_DETAILS_REQUEST:
      return { loading: true };
    case LOOKUP_ADMIN_DETAILS_SUCCESS:
      return {
        loading: false,
        lookupDetails: action.payload,
      };
    case LOOKUP_ADMIN_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    case LOOKUP_ADMIN_DETAILS_RESET:
      return {};
    default:
      return state;
  }
};
export const adminLookupUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case LOOKUP_ADMIN_UPDATE_REQUEST:
      return { loading: true };
    case LOOKUP_ADMIN_UPDATE_SUCCESS:
      return { loading: false, message: action.payload };
    case LOOKUP_ADMIN_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    case LOOKUP_ADMIN_UPDATE_RESET:
      return {};
    default:
      return state;
  }
};
export const adminLookupDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case LOOKUP_ADMIN_DELETE_REQUEST:
      return { loading: true };
    case LOOKUP_ADMIN_DELETE_SUCCESS:
      return { loading: false, message: action.payload };
    case LOOKUP_ADMIN_DELETE_FAIL:
      return { loading: false, error: action.payload };
    case LOOKUP_ADMIN_DELETE_RESET:
      return {};
    default:
      return state;
  }
};
export const adminLookupListReducer = (state = { lookups: [] }, action) => {
  switch (action.type) {
    case LOOKUP_ADMIN_LIST_REQUEST:
      return { loading: true };
    case LOOKUP_ADMIN_LIST_SUCCESS:
      return {
        loading: false,
        lookups: action.payload.lookups,
        page: action.payload.page,
        pages: action.payload.pages,
        success: true,
      };
    case LOOKUP_ADMIN_LIST_FAIL:
      return { loading: false, error: action.payload };
    case LOOKUP_ADMIN_LIST_RESET:
      return { lookups: [] };
    default:
      return state;
  }
};
export const adminLookupGroupListReducer = (state = { groups: [] }, action) => {
  switch (action.type) {
    case LOOKUP_ADMIN_GROUP_LIST_REQUEST:
      return { loading: true };
    case LOOKUP_ADMIN_GROUP_LIST_SUCCESS:
      return {
        loading: false,
        success: true,
        groups: action.payload.attributeGroups,
      };
    case LOOKUP_ADMIN_GROUP_LIST_FAIL:
      return { loading: false, error: action.payload };
    case LOOKUP_ADMIN_GROUP_LIST_RESET:
      return { groups: [] };
    default:
      return state;
  }
};
