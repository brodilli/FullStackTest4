import axios from "axios";
import {
  PAYMENT_METHOD_ADMIN_CREATE_FAIL,
  PAYMENT_METHOD_ADMIN_CREATE_REQUEST,
  PAYMENT_METHOD_ADMIN_CREATE_SUCCESS,
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
  PAYMENT_METHOD_ADMIN_DELETE_FAIL,
  PAYMENT_METHOD_ADMIN_DELETE_REQUEST,
  PAYMENT_METHOD_ADMIN_DELETE_SUCCESS,
  PAYMENT_METHOD_CREATE_FAIL,
  PAYMENT_METHOD_CREATE_REQUEST,
  PAYMENT_METHOD_CREATE_SUCCESS,
  PAYMENT_METHOD_LIST_FAIL,
  PAYMENT_METHOD_LIST_REQUEST,
  PAYMENT_METHOD_LIST_RESET,
  PAYMENT_METHOD_LIST_SUCCESS,
  PAYMENT_METHOD_DETAILS_REQUEST,
  PAYMENT_METHOD_DETAILS_SUCCESS,
  PAYMENT_METHOD_DETAILS_FAIL,
  PAYMENT_METHOD_CART_REQUEST,
  PAYMENT_METHOD_CART_SUCCESS,
  PAYMENT_METHOD_CART_FAIL,
  PAYMENT_METHOD_LIST_DETAILS_REQUEST,
  PAYMENT_METHOD_LIST_DETAILS_SUCCESS,
  PAYMENT_METHOD_LIST_DETAILS_FAIL,
  PAYMENT_METHOD_SEARCH_REQUEST,
  PAYMENT_METHOD_SEARCH_SUCCESS,
  PAYMENT_METHOD_SEARCH_FAIL,
  PAYMENT_METHOD_LIMITS_SUCCESS,
  PAYMENT_METHOD_LIMITS_REQUEST,
  PAYMENT_METHOD_LIMITS_FAIL,
} from "../constants/paymentMethodConstants";

export const adminListPaymentMethods =
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
        type: PAYMENT_METHOD_ADMIN_LIST_REQUEST,
      });
      const { data } = await axios.get(
        `/api/admin/payment-methods?keyword=${keyword}&pageNumber=${pageNumber}&pageSize=${pageSize}&sort=${sort}&order=${order}&all=${all}`
      );
      dispatch({
        type: PAYMENT_METHOD_ADMIN_LIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: PAYMENT_METHOD_ADMIN_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.response.data,
      });
    }
  };
export const adminDetailsPaymentMethod = (id) => async (dispatch) => {
  try {
    dispatch({
      type: PAYMENT_METHOD_ADMIN_DETAILS_REQUEST,
    });
    const { data } = await axios.get(`/api/admin/payment-methods/${id}`);
    dispatch({
      type: PAYMENT_METHOD_ADMIN_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PAYMENT_METHOD_ADMIN_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response.data,
    });
  }
};

export const adminCreatePaymentMethod = (paymentMethod) => async (dispatch) => {
  try {
    dispatch({
      type: PAYMENT_METHOD_ADMIN_CREATE_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      "/api/admin/payment-methods",
      paymentMethod,
      config
    );

    dispatch({
      type: PAYMENT_METHOD_ADMIN_CREATE_SUCCESS,
      payload: data,
    });

    dispatch({
      type: PAYMENT_METHOD_ADMIN_LIST_RESET,
    });
    dispatch({
      type: PAYMENT_METHOD_LIST_RESET,
    });
  } catch (error) {
    dispatch({
      type: PAYMENT_METHOD_ADMIN_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const adminDeletePaymentMethod = (id) => async (dispatch) => {
  try {
    dispatch({
      type: PAYMENT_METHOD_ADMIN_DELETE_REQUEST,
    });
    const { data } = await axios.delete(`/api/admin/payment-methods/${id}`);

    dispatch({
      type: PAYMENT_METHOD_ADMIN_DELETE_SUCCESS,
      payload: data,
    });
    dispatch({
      type: PAYMENT_METHOD_ADMIN_LIST_RESET,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: PAYMENT_METHOD_ADMIN_DELETE_FAIL,
      payload: message,
    });
  }
};
export const adminUpdatePaymentMethod = (id, paymentMethod) => async (dispatch) => {
  try {
    dispatch({
      type: PAYMENT_METHOD_ADMIN_UPDATE_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.put(
      `/api/admin/payment-methods/${id}`,
      paymentMethod,
      config
    );

    dispatch({
      type: PAYMENT_METHOD_ADMIN_UPDATE_SUCCESS,
      payload: data,
    });

    dispatch({
      type: PAYMENT_METHOD_ADMIN_DETAILS_RESET,
    });

    dispatch({
      type: PAYMENT_METHOD_ADMIN_LIST_RESET,
    });
  } catch (error) {
    dispatch({
      type: PAYMENT_METHOD_ADMIN_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listPaymentMethods =
  (all = false) =>
  async (dispatch) => {
    try {
      dispatch({
        type: PAYMENT_METHOD_LIST_REQUEST,
      });
      const { data } = await axios.get("/api/paymentMethods", {
        params: { all },
      });
      dispatch({
        type: PAYMENT_METHOD_LIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: PAYMENT_METHOD_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.response.data,
      });
    }
  };

export const detailsPaymentMethod = (id) => async (dispatch) => {
  try {
    dispatch({
      type: PAYMENT_METHOD_DETAILS_REQUEST,
    });
    const { data } = await axios.get(`/api/payment-methods/${id}`);
    dispatch({
      type: PAYMENT_METHOD_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PAYMENT_METHOD_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response.data,
    });
  }
};

export const limitsByPaymentMethod = (id) => async (dispatch) => {
  try {
    dispatch({
      type: PAYMENT_METHOD_LIMITS_REQUEST,
    });
    const { data } = await axios.get(`/api/payment-methods/${id}/limits`);
    dispatch({
      type: PAYMENT_METHOD_LIMITS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PAYMENT_METHOD_LIMITS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response.data,
    });
  }
};
