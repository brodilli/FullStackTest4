import {
  DEVELOPMENT_ADMIN_CREATE_FAIL,
  DEVELOPMENT_ADMIN_CREATE_REQUEST,
  DEVELOPMENT_ADMIN_CREATE_RESET,
  DEVELOPMENT_ADMIN_CREATE_SUCCESS,
  DEVELOPMENT_CREATE_FAIL,
  DEVELOPMENT_CREATE_REQUEST,
  DEVELOPMENT_CREATE_RESET,
  DEVELOPMENT_CREATE_SUCCESS,
  DEVELOPMENT_ADMIN_DELETE_FAIL,
  DEVELOPMENT_ADMIN_DELETE_REQUEST,
  DEVELOPMENT_ADMIN_DELETE_RESET,
  DEVELOPMENT_ADMIN_DELETE_SUCCESS,
  DEVELOPMENT_ADMIN_DETAILS_FAIL,
  DEVELOPMENT_ADMIN_DETAILS_REQUEST,
  DEVELOPMENT_ADMIN_DETAILS_RESET,
  DEVELOPMENT_ADMIN_DETAILS_SUCCESS,
  DEVELOPMENT_ADMIN_LIST_FAIL,
  DEVELOPMENT_ADMIN_LIST_REQUEST,
  DEVELOPMENT_ADMIN_LIST_RESET,
  DEVELOPMENT_ADMIN_LIST_SUCCESS,
  DEVELOPMENT_ADMIN_UPDATE_FAIL,
  DEVELOPMENT_ADMIN_UPDATE_REQUEST,
  DEVELOPMENT_ADMIN_UPDATE_SUCCESS,
  DEVELOPMENT_LIST_FAIL,
  DEVELOPMENT_LIST_REQUEST,
  DEVELOPMENT_LIST_RESET,
  DEVELOPMENT_LIST_SUCCESS,
  DEVELOPMENT_DETAILS_REQUEST,
  DEVELOPMENT_DETAILS_SUCCESS,
  DEVELOPMENT_DETAILS_FAIL,
  DEVELOPMENT_DETAILS_RESET,
  DEVELOPMENT_LIST_DETAILS_REQUEST,
  DEVELOPMENT_LIST_DETAILS_SUCCESS,
  DEVELOPMENT_LIST_DETAILS_FAIL,
  DEVELOPMENT_LIST_DETAILS_RESET,
  DEVELOPMENT_SEARCH_REQUEST,
  DEVELOPMENT_LIMITS_REQUEST,
  DEVELOPMENT_LIMITS_SUCCESS,
  DEVELOPMENT_LIMITS_FAIL,
  DEVELOPMENT_LIMITS_RESET,
} from "../constants/developmentConstants";

export const adminDevelopmentCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case DEVELOPMENT_ADMIN_CREATE_REQUEST:
      return { loading: true };
    case DEVELOPMENT_ADMIN_CREATE_SUCCESS:
      return { loading: false, message: action.payload.message };
    case DEVELOPMENT_ADMIN_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case DEVELOPMENT_ADMIN_CREATE_RESET:
      return {};
    default:
      return state;
  }
};
export const adminDevelopmentDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case DEVELOPMENT_ADMIN_DELETE_REQUEST:
      return { loading: true };
    case DEVELOPMENT_ADMIN_DELETE_SUCCESS:
      return { loading: false, message: action.payload };
    case DEVELOPMENT_ADMIN_DELETE_FAIL:
      return { loading: false, error: action.payload };
    case DEVELOPMENT_ADMIN_DELETE_RESET:
      return {};
    default:
      return state;
  }
};
export const adminDevelopmentUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case DEVELOPMENT_ADMIN_UPDATE_REQUEST:
      return { loading: true };
    case DEVELOPMENT_ADMIN_UPDATE_SUCCESS:
      return { loading: false, message: action.payload };
    case DEVELOPMENT_ADMIN_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const adminDevelopmentDetailsReducer = (state = {}, action) => {
  switch (action.type) {
    case DEVELOPMENT_ADMIN_DETAILS_REQUEST:
      return { loading: true };
    case DEVELOPMENT_ADMIN_DETAILS_SUCCESS:
      return {
        loading: false,
        developmentDetails: action.payload,
      };
    case DEVELOPMENT_ADMIN_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    case DEVELOPMENT_ADMIN_DETAILS_RESET:
      return {};
    default:
      return state;
  }
};
export const adminDevelopmentsListReducer = (
  state = { developments: [] },
  action
) => {
  switch (action.type) {
    case DEVELOPMENT_ADMIN_LIST_REQUEST:
      return { loading: true };
    case DEVELOPMENT_ADMIN_LIST_SUCCESS:
      return {
        loading: false,
        developments: action.payload.developments,
        page: action.payload.page,
        pages: action.payload.pages,
        success: true,
      };
    case DEVELOPMENT_ADMIN_LIST_FAIL:
      return { loading: false, error: action.payload };
    case DEVELOPMENT_ADMIN_LIST_RESET:
      return { developments: [] };
    default:
      return state;
  }
};
export const developmentsListReducer = (
  state = { developments: [], filterLimits: {} },
  action
) => {
  switch (action.type) {
    case DEVELOPMENT_LIST_REQUEST:
      return { loading: true };
    case DEVELOPMENT_LIST_SUCCESS:
      return {
        loading: false,
        success: true,
        developments: action.payload.developments,
      };
    case DEVELOPMENT_LIST_FAIL:
      return { loading: false, error: action.payload };
    case DEVELOPMENT_LIST_RESET:
      return { developments: [] };
    default:
      return state;
  }
};

export const developmentSearchReducer = (
  state = { developments: [] },
  action
) => {
  switch (action.type) {
    case DEVELOPMENT_SEARCH_REQUEST:
      return { loading: true };
    case DEVELOPMENT_LIST_SUCCESS:
      return {
        loading: false,
        success: true,
        developments: action.payload.developments,
      };
    case DEVELOPMENT_LIST_FAIL:
      return { loading: false, error: action.payload };
    case DEVELOPMENT_LIST_RESET:
      return { developments: [] };
    default:
      return state;
  }
};

export const developmentLimitsReducer = (
  state = { filterLimits: {} },
  action
) => {
  switch (action.type) {
    case DEVELOPMENT_LIMITS_REQUEST:
      return { loading: true };
    case DEVELOPMENT_LIMITS_SUCCESS:
      return {
        loading: false,
        success: true,
        filterLimits: action.payload,
      };
    case DEVELOPMENT_LIMITS_FAIL:
      return { loading: false, error: action.payload };
    case DEVELOPMENT_LIMITS_RESET:
      return { filterLimits: {} };
    default:
      return state;
  }
};
