import {
  MARKETPLACE_ADMIN_CREATE_FAIL,
  MARKETPLACE_ADMIN_CREATE_REQUEST,
  MARKETPLACE_ADMIN_CREATE_RESET,
  MARKETPLACE_ADMIN_CREATE_SUCCESS,
  MARKETPLACE_CREATE_FAIL,
  MARKETPLACE_CREATE_REQUEST,
  MARKETPLACE_CREATE_RESET,
  MARKETPLACE_CREATE_SUCCESS,
  MARKETPLACE_ADMIN_DELETE_FAIL,
  MARKETPLACE_ADMIN_DELETE_REQUEST,
  MARKETPLACE_ADMIN_DELETE_RESET,
  MARKETPLACE_ADMIN_DELETE_SUCCESS,
  MARKETPLACE_ADMIN_DETAILS_FAIL,
  MARKETPLACE_ADMIN_DETAILS_REQUEST,
  MARKETPLACE_ADMIN_DETAILS_RESET,
  MARKETPLACE_ADMIN_DETAILS_SUCCESS,
  MARKETPLACE_ADMIN_LIST_FAIL,
  MARKETPLACE_ADMIN_LIST_REQUEST,
  MARKETPLACE_ADMIN_LIST_RESET,
  MARKETPLACE_ADMIN_LIST_SUCCESS,
  MARKETPLACE_ADMIN_UPDATE_FAIL,
  MARKETPLACE_ADMIN_UPDATE_REQUEST,
  MARKETPLACE_ADMIN_UPDATE_SUCCESS,
  MARKETPLACE_LIST_FAIL,
  MARKETPLACE_LIST_REQUEST,
  MARKETPLACE_LIST_RESET,
  MARKETPLACE_LIST_SUCCESS,
  MARKETPLACE_DETAILS_REQUEST,
  MARKETPLACE_DETAILS_SUCCESS,
  MARKETPLACE_DETAILS_FAIL,
  MARKETPLACE_DETAILS_RESET,
  MARKETPLACE_CART_REQUEST,
  MARKETPLACE_CART_SUCCESS,
  MARKETPLACE_CART_FAIL,
  MARKETPLACE_CART_RESET,
  MARKETPLACE_LIST_DETAILS_REQUEST,
  MARKETPLACE_LIST_DETAILS_SUCCESS,
  MARKETPLACE_LIST_DETAILS_FAIL,
  MARKETPLACE_LIST_DETAILS_RESET,
} from "../constants/marketplaceConstants";

export const adminMarketplaceCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case MARKETPLACE_ADMIN_CREATE_REQUEST:
      return { loading: true };
    case MARKETPLACE_ADMIN_CREATE_SUCCESS:
      return { loading: false, message: action.payload.message };
    case MARKETPLACE_ADMIN_CREATE_FAIL:
      return { loading: false, error: action.payload };
    case MARKETPLACE_ADMIN_CREATE_RESET:
      return {};
    default:
      return state;
  }
};
export const adminMarketplaceDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case MARKETPLACE_ADMIN_DELETE_REQUEST:
      return { loading: true };
    case MARKETPLACE_ADMIN_DELETE_SUCCESS:
      return { loading: false, message: action.payload };
    case MARKETPLACE_ADMIN_DELETE_FAIL:
      return { loading: false, error: action.payload };
    case MARKETPLACE_ADMIN_DELETE_RESET:
      return {};
    default:
      return state;
  }
};
export const adminMarketplaceUpdateReducer = (state = {}, action) => {
  switch (action.type) {
    case MARKETPLACE_ADMIN_UPDATE_REQUEST:
      return { loading: true };
    case MARKETPLACE_ADMIN_UPDATE_SUCCESS:
      return { loading: false, message: action.payload };
    case MARKETPLACE_ADMIN_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const adminMarketplaceDetailsReducer = (state = {}, action) => {
  switch (action.type) {
    case MARKETPLACE_ADMIN_DETAILS_REQUEST:
      return { loading: true };
    case MARKETPLACE_ADMIN_DETAILS_SUCCESS:
      return {
        loading: false,
        marketplaceDetails: action.payload,
      };
    case MARKETPLACE_ADMIN_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    case MARKETPLACE_ADMIN_DETAILS_RESET:
      return {};
    default:
      return state;
  }
};
export const adminMarketplaceListReducer = (
  state = { marketplaces: [] },
  action
) => {
  switch (action.type) {
    case MARKETPLACE_ADMIN_LIST_REQUEST:
      return { loading: true };
    case MARKETPLACE_ADMIN_LIST_SUCCESS:
      return {
        loading: false,
        marketplaces: action.payload.marketplaces,
        page: action.payload.page,
        pages: action.payload.pages,
        success: true,
      };
    case MARKETPLACE_ADMIN_LIST_FAIL:
      return { loading: false, error: action.payload };
    case MARKETPLACE_ADMIN_LIST_RESET:
      return { marketplaces: [] };
    default:
      return state;
  }
};
export const marketplaceListReducer = (
  state = { marketplaces: [] },
  action
) => {
  switch (action.type) {
    case MARKETPLACE_LIST_REQUEST:
      return { loading: true };
    case MARKETPLACE_LIST_SUCCESS:
      return {
        loading: false,
        marketplaces: action.payload.marketplaces,
      };
    case MARKETPLACE_LIST_FAIL:
      return { loading: false, error: action.payload };
    case MARKETPLACE_LIST_RESET:
      return { marketplaces: [] };
    default:
      return state;
  }
};

export const marketplaceDetailsReducer = (state = {}, action) => {
  switch (action.type) {
    case MARKETPLACE_DETAILS_REQUEST:
      return { loading: true };
    case MARKETPLACE_DETAILS_SUCCESS:
      return {
        loading: false,
        marketplace: action.payload.marketplace,
      };
    case MARKETPLACE_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    case MARKETPLACE_DETAILS_RESET:
      return {};
    default:
      return state;
  }
};
