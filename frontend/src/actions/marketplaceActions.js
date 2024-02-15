import axios from "axios";
import {
  MARKETPLACE_ADMIN_CREATE_FAIL,
  MARKETPLACE_ADMIN_CREATE_REQUEST,
  MARKETPLACE_ADMIN_CREATE_SUCCESS,
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
  MARKETPLACE_ADMIN_DELETE_FAIL,
  MARKETPLACE_ADMIN_DELETE_REQUEST,
  MARKETPLACE_ADMIN_DELETE_SUCCESS,
  MARKETPLACE_CREATE_FAIL,
  MARKETPLACE_CREATE_REQUEST,
  MARKETPLACE_CREATE_SUCCESS,
  MARKETPLACE_LIST_FAIL,
  MARKETPLACE_LIST_REQUEST,
  MARKETPLACE_LIST_RESET,
  MARKETPLACE_LIST_SUCCESS,
  MARKETPLACE_DETAILS_REQUEST,
  MARKETPLACE_DETAILS_SUCCESS,
  MARKETPLACE_DETAILS_FAIL,
  MARKETPLACE_LIST_DETAILS_REQUEST,
  MARKETPLACE_LIST_DETAILS_SUCCESS,
  MARKETPLACE_LIST_DETAILS_FAIL,
} from "../constants/marketplaceConstants";

export const adminListMarketplaces =
  (keyword = "", pageNumber = "", pageSize = "", sort = "", order = "") =>
  async (dispatch) => {
    try {
      dispatch({
        type: MARKETPLACE_ADMIN_LIST_REQUEST,
      });
      const { data } = await axios.get(
        `/api/admin/marketplaces?keyword=${keyword}&pageNumber=${pageNumber}&pageSize=${pageSize}&sort=${sort}&order=${order}`
      );
      dispatch({
        type: MARKETPLACE_ADMIN_LIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: MARKETPLACE_ADMIN_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.response.data,
      });
    }
  };
export const adminDetailsMarketplace = (id) => async (dispatch) => {
  try {
    dispatch({
      type: MARKETPLACE_ADMIN_DETAILS_REQUEST,
    });
    const { data } = await axios.get(`/api/admin/marketplaces/${id}`);
    dispatch({
      type: MARKETPLACE_ADMIN_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: MARKETPLACE_ADMIN_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response.data,
    });
  }
};

export const adminCreateMarketplace = (marketplace) => async (dispatch) => {
  try {
    dispatch({
      type: MARKETPLACE_ADMIN_CREATE_REQUEST,
    });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(
      "/api/admin/marketplaces",
      { marketplace },
      config
    );

    dispatch({
      type: MARKETPLACE_ADMIN_CREATE_SUCCESS,
      payload: data,
    });
    dispatch({
      type: MARKETPLACE_ADMIN_LIST_RESET,
    });
    dispatch({
      type: MARKETPLACE_LIST_RESET,
    });
  } catch (error) {
    dispatch({
      type: MARKETPLACE_ADMIN_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    });
  }
};
export const adminDeleteMarketplace = (id) => async (dispatch) => {
  try {
    dispatch({
      type: MARKETPLACE_ADMIN_DELETE_REQUEST,
    });
    const { data } = await axios.delete(`/api/admin/marketplaces/${id}`);

    dispatch({
      type: MARKETPLACE_ADMIN_DELETE_SUCCESS,
      payload: data,
    });
    dispatch({
      type: MARKETPLACE_ADMIN_LIST_RESET,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: MARKETPLACE_ADMIN_DELETE_FAIL,
      payload: message,
    });
  }
};
export const adminUpdateMarketplace = (id, marketplace) => async (dispatch) => {
  try {
    dispatch({
      type: MARKETPLACE_ADMIN_UPDATE_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.put(
      `/api/admin/marketplaces/${id}`,
      { marketplace },
      config
    );
    dispatch({
      type: MARKETPLACE_ADMIN_UPDATE_SUCCESS,
      payload: data,
    });
    dispatch({
      type: MARKETPLACE_ADMIN_DETAILS_RESET,
      payload: data,
    });
    dispatch({
      type: MARKETPLACE_ADMIN_LIST_RESET,
    });
  } catch (error) {
    dispatch({
      type: MARKETPLACE_ADMIN_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    });
  }
};
export const listMarketplaces = () => async (dispatch) => {
  try {
    dispatch({
      type: MARKETPLACE_LIST_REQUEST,
    });
    const { data } = await axios.get("/api/marketplaces");
    dispatch({
      type: MARKETPLACE_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: MARKETPLACE_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response.data,
    });
  }
};

export const detailsMarketplace = (id) => async (dispatch) => {
  try {
    dispatch({
      type: MARKETPLACE_DETAILS_REQUEST,
    });
    const { data } = await axios.get(`/api/marketplaces/${id}`);
    dispatch({
      type: MARKETPLACE_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: MARKETPLACE_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response.data,
    });
  }
};
