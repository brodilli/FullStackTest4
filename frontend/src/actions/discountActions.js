import axios from "axios";
import {
  DISCOUNT_ADMIN_CREATE_FAIL,
  DISCOUNT_ADMIN_CREATE_REQUEST,
  DISCOUNT_ADMIN_CREATE_SUCCESS,
  DISCOUNT_ADMIN_DELETE_FAIL,
  DISCOUNT_ADMIN_DELETE_REQUEST,
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
  DISCOUNT_ADMIN_UPDATE_SUCCESS,
  DISCOUNT_LIST_FAIL,
  DISCOUNT_LIST_REQUEST,
  DISCOUNT_LIST_RESET,
  DISCOUNT_LIST_SUCCESS,
} from "../constants/discountConstants";

export const adminCreateDiscount = (discount) => async (dispatch) => {
  try {
    dispatch({
      type: DISCOUNT_ADMIN_CREATE_REQUEST,
    });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(
      "/api/admin/discounts",
      { discount },
      config
    );

    dispatch({
      type: DISCOUNT_ADMIN_CREATE_SUCCESS,
      payload: data,
    });
    dispatch({
      type: DISCOUNT_ADMIN_LIST_RESET,
    });
    dispatch({
      type: DISCOUNT_LIST_RESET,
    });
  } catch (error) {
    dispatch({
      type: DISCOUNT_ADMIN_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    });
  }
};
export const adminDetailsDiscount = (id) => async (dispatch) => {
  try {
    dispatch({
      type: DISCOUNT_ADMIN_DETAILS_REQUEST,
    });
    const { data } = await axios.get(`/api/admin/discounts/${id}`);
    dispatch({
      type: DISCOUNT_ADMIN_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DISCOUNT_ADMIN_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response.data,
    });
  }
};
export const adminUpdateDiscount = (id, discount) => async (dispatch) => {
  try {
    dispatch({
      type: DISCOUNT_ADMIN_UPDATE_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.put(
      `/api/admin/discounts/${id}`,
      { discount },
      config
    );
    dispatch({
      type: DISCOUNT_ADMIN_UPDATE_SUCCESS,
      payload: data,
    });
    dispatch({
      type: DISCOUNT_ADMIN_DETAILS_RESET,
      payload: data,
    });
    dispatch({
      type: DISCOUNT_ADMIN_LIST_RESET,
    });
  } catch (error) {
    dispatch({
      type: DISCOUNT_ADMIN_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    });
  }
};
export const adminDeleteDiscount = (id) => async (dispatch) => {
  try {
    dispatch({
      type: DISCOUNT_ADMIN_DELETE_REQUEST,
    });
    const { data } = await axios.delete(`/api/admin/discounts/${id}`);
    dispatch({
      type: DISCOUNT_ADMIN_DELETE_SUCCESS,
      payload: data,
    });
    dispatch({
      type: DISCOUNT_ADMIN_LIST_RESET,
    });
  } catch (error) {
    dispatch({
      type: DISCOUNT_ADMIN_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response.data,
    });
  }
};
export const adminListDiscounts =
  (
    keyword = "",
    pageNumber = "",
    pageSize = "",
    sort = "",
    order = "",
    all = ""
  ) =>
  async (dispatch) => {
    try {
      dispatch({
        type: DISCOUNT_ADMIN_LIST_REQUEST,
      });
      const { data } = await axios.get(
        `/api/admin/discounts?keyword=${keyword}&pageNumber=${pageNumber}&pageSize=${pageSize}&sort=${sort}&order=${order}&all=${all}`
      );
      dispatch({
        type: DISCOUNT_ADMIN_LIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: DISCOUNT_ADMIN_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.response.data,
      });
    }
  };
