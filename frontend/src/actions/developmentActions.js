import axios from "axios";
import {
  DEVELOPMENT_ADMIN_CREATE_FAIL,
  DEVELOPMENT_ADMIN_CREATE_REQUEST,
  DEVELOPMENT_ADMIN_CREATE_SUCCESS,
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
  DEVELOPMENT_ADMIN_DELETE_FAIL,
  DEVELOPMENT_ADMIN_DELETE_REQUEST,
  DEVELOPMENT_ADMIN_DELETE_SUCCESS,
  DEVELOPMENT_CREATE_FAIL,
  DEVELOPMENT_CREATE_REQUEST,
  DEVELOPMENT_CREATE_SUCCESS,
  DEVELOPMENT_LIST_FAIL,
  DEVELOPMENT_LIST_REQUEST,
  DEVELOPMENT_LIST_RESET,
  DEVELOPMENT_LIST_SUCCESS,
  DEVELOPMENT_DETAILS_REQUEST,
  DEVELOPMENT_DETAILS_SUCCESS,
  DEVELOPMENT_DETAILS_FAIL,
  DEVELOPMENT_CART_REQUEST,
  DEVELOPMENT_CART_SUCCESS,
  DEVELOPMENT_CART_FAIL,
  DEVELOPMENT_LIST_DETAILS_REQUEST,
  DEVELOPMENT_LIST_DETAILS_SUCCESS,
  DEVELOPMENT_LIST_DETAILS_FAIL,
  DEVELOPMENT_SEARCH_REQUEST,
  DEVELOPMENT_SEARCH_SUCCESS,
  DEVELOPMENT_SEARCH_FAIL,
  DEVELOPMENT_LIMITS_SUCCESS,
  DEVELOPMENT_LIMITS_REQUEST,
  DEVELOPMENT_LIMITS_FAIL,
} from "../constants/developmentConstants";

export const adminListDevelopments =
  (
    keyword = "",
    pageNumber = "",
    pageSize = "",
    sort = "",
    order = "",
    all = false
  ) =>
  async (dispatch) => {
    try {
      dispatch({
        type: DEVELOPMENT_ADMIN_LIST_REQUEST,
      });
      const { data } = await axios.get(
        `/api/admin/developments?keyword=${keyword}&pageNumber=${pageNumber}&pageSize=${pageSize}&sort=${sort}&order=${order}&all=${all}`
      );
      dispatch({
        type: DEVELOPMENT_ADMIN_LIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: DEVELOPMENT_ADMIN_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.response.data,
      });
    }
  };
export const adminDetailsDevelopment = (id) => async (dispatch) => {
  try {
    dispatch({
      type: DEVELOPMENT_ADMIN_DETAILS_REQUEST,
    });
    const { data } = await axios.get(`/api/admin/developments/${id}`);
    dispatch({
      type: DEVELOPMENT_ADMIN_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DEVELOPMENT_ADMIN_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response.data,
    });
  }
};

export const adminCreateDevelopment = (formData) => async (dispatch) => {
  try {
    dispatch({
      type: DEVELOPMENT_ADMIN_CREATE_REQUEST,
    });
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    const { data } = await axios.post(
      "/api/admin/developments",
      formData,
      config
    );

    dispatch({
      type: DEVELOPMENT_ADMIN_CREATE_SUCCESS,
      payload: data,
    });
    dispatch({
      type: DEVELOPMENT_ADMIN_LIST_RESET,
    });
    dispatch({
      type: DEVELOPMENT_LIST_RESET,
    });
  } catch (error) {
    dispatch({
      type: DEVELOPMENT_ADMIN_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    });
  }
};
export const adminDeleteDevelopment = (id) => async (dispatch) => {
  try {
    dispatch({
      type: DEVELOPMENT_ADMIN_DELETE_REQUEST,
    });
    const { data } = await axios.delete(`/api/admin/developments/${id}`);

    dispatch({
      type: DEVELOPMENT_ADMIN_DELETE_SUCCESS,
      payload: data,
    });
    dispatch({
      type: DEVELOPMENT_ADMIN_LIST_RESET,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: DEVELOPMENT_ADMIN_DELETE_FAIL,
      payload: message,
    });
  }
};
export const adminUpdateDevelopment = (id, formData) => async (dispatch) => {
  try {
    dispatch({
      type: DEVELOPMENT_ADMIN_UPDATE_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    const { data } = await axios.put(
      `/api/admin/developments/${id}`,
      formData,
      config
    );
    dispatch({
      type: DEVELOPMENT_ADMIN_UPDATE_SUCCESS,
      payload: data,
    });
    dispatch({
      type: DEVELOPMENT_ADMIN_DETAILS_RESET,
      payload: data,
    });
    dispatch({
      type: DEVELOPMENT_ADMIN_LIST_RESET,
    });
  } catch (error) {
    dispatch({
      type: DEVELOPMENT_ADMIN_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    });
  }
};

export const listDevelopments =
  (all = false) =>
  async (dispatch) => {
    try {
      dispatch({
        type: DEVELOPMENT_LIST_REQUEST,
      });
      const { data } = await axios.get("/api/developments", {
        params: { all },
      });
      dispatch({
        type: DEVELOPMENT_LIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: DEVELOPMENT_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.response.data,
      });
    }
  };

export const detailsDevelopment = (id) => async (dispatch) => {
  try {
    dispatch({
      type: DEVELOPMENT_DETAILS_REQUEST,
    });
    const { data } = await axios.get(`/api/developments/${id}`);
    dispatch({
      type: DEVELOPMENT_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DEVELOPMENT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response.data,
    });
  }
};

export const limitsByDevelopment = (id) => async (dispatch) => {
  try {
    dispatch({
      type: DEVELOPMENT_LIMITS_REQUEST,
    });
    const { data } = await axios.get(`/api/developments/${id}/limits`);
    dispatch({
      type: DEVELOPMENT_LIMITS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DEVELOPMENT_LIMITS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response.data,
    });
  }
};
