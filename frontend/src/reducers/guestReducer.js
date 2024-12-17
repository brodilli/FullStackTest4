import {
  USER_ADMIN_CREATE_FAIL,
  USER_ADMIN_CREATE_REQUEST,
  USER_ADMIN_CREATE_RESET,
  USER_ADMIN_CREATE_SUCCESS,
  USER_ADMIN_DELETE_FAIL,
  USER_ADMIN_DELETE_REQUEST,
  USER_ADMIN_DELETE_RESET,
  USER_ADMIN_DELETE_SUCCESS,
  USER_ADMIN_DETAILS_FAIL,
  USER_ADMIN_DETAILS_REQUEST,
  USER_ADMIN_DETAILS_RESET,
  USER_ADMIN_DETAILS_SUCCESS,
  USER_ADMIN_LIST_FAIL,
  USER_ADMIN_LIST_REQUEST,
  USER_ADMIN_LIST_RESET,
  USER_ADMIN_LIST_SUCCESS,
  USER_ADMIN_UPDATE_FAIL,
  USER_ADMIN_UPDATE_REQUEST,
  USER_ADMIN_UPDATE_SUCCESS,
} from "../constants/userConstants";

export const adminUserCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_ADMIN_CREATE_REQUEST:
      return { loading: true };
    case USER_ADMIN_CREATE_SUCCESS:
      return { loading: false, message: action.payload.message };
    case USER_ADMIN_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case USER_ADMIN_CREATE_RESET:
      return {};
    default:
      return state;
  }
};
export const adminUserDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_ADMIN_DELETE_REQUEST:
      return { loading: true };
    case USER_ADMIN_DELETE_SUCCESS:
      return { loading: false, message: action.payload };
    case USER_ADMIN_DELETE_FAIL:
      return { loading: false, error: action.payload };
    case USER_ADMIN_DELETE_RESET:
      return {};
    default:
      return state;
  }
};
export const adminUserUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_ADMIN_UPDATE_REQUEST:
      return { loading: true };
    case USER_ADMIN_UPDATE_SUCCESS:
      return { loading: false, message: action.payload };
    case USER_ADMIN_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const adminUserDetailsReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_ADMIN_DETAILS_REQUEST:
      return { loading: true };
    case USER_ADMIN_DETAILS_SUCCESS:
      return {
        loading: false,
        userDetails: action.payload,
        success: true,
      };
    case USER_ADMIN_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    case USER_ADMIN_DETAILS_RESET:
      return {};
    default:
      return state;
  }
};
export const adminUserListReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case USER_ADMIN_LIST_REQUEST:
      return { loading: true };
    case USER_ADMIN_LIST_SUCCESS:
      return {
        loading: false,
        users: action.payload.users,
        page: action.payload.page,
        pages: action.payload.pages,
        success: true,
      };
    case USER_ADMIN_LIST_FAIL:
      return { loading: false, error: action.payload };
    case USER_ADMIN_LIST_RESET:
      return { users: [] };
    default:
      return state;
  }
};
