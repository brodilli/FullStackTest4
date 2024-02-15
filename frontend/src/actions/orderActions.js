import axios from "axios";
import { saveAs } from "file-saver";
import {
  ORDER_ADMIN_CREATE_FAIL,
  ORDER_ADMIN_CREATE_REQUEST,
  ORDER_ADMIN_CREATE_SUCCESS,
  ORDER_ADMIN_DETAILS_FAIL,
  ORDER_ADMIN_DETAILS_REQUEST,
  ORDER_ADMIN_DETAILS_RESET,
  ORDER_ADMIN_DETAILS_SUCCESS,
  ORDER_ADMIN_LIST_FAIL,
  ORDER_ADMIN_LIST_REQUEST,
  ORDER_ADMIN_LIST_RESET,
  ORDER_ADMIN_LIST_SUCCESS,
  ORDER_ADMIN_UPDATE_FAIL,
  ORDER_ADMIN_UPDATE_REQUEST,
  ORDER_ADMIN_UPDATE_SUCCESS,
  ORDER_ADMIN_DELETE_FAIL,
  ORDER_ADMIN_DELETE_REQUEST,
  ORDER_ADMIN_DELETE_SUCCESS,
  ORDER_CREATE_FAIL,
  ORDER_CREATE_REQUEST,
  ORDER_CREATE_SUCCESS,
  ORDER_LIST_FAIL,
  ORDER_LIST_REQUEST,
  ORDER_LIST_RESET,
  ORDER_LIST_SUCCESS,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_CART_REQUEST,
  ORDER_CART_SUCCESS,
  ORDER_CART_FAIL,
  ORDER_LIST_DETAILS_REQUEST,
  ORDER_LIST_DETAILS_SUCCESS,
  ORDER_LIST_DETAILS_FAIL,
  ORDER_UPDATE_REQUEST,
  ORDER_UPDATE_SUCCESS,
  ORDER_UPDATE_FAIL,
  ORDER_DETAILS_RESET,
  ORDER_ADMIN_LIST_ALL_REQUEST,
  ORDER_ADMIN_LIST_ALL_SUCCESS,
  ORDER_ADMIN_LIST_ALL_FAIL,
  ORDER_ADMIN_EXPORT_REQUEST,
  ORDER_ADMIN_EXPORT_SUCCESS,
  ORDER_ADMIN_EXPORT_FAIL,
  ORDER_LIST_ALL_REQUEST,
  ORDER_LIST_ALL_SUCCESS,
  ORDER_LIST_ALL_FAIL,
  ORDER_EXPORT_REQUEST,
  ORDER_EXPORT_SUCCESS,
  ORDER_EXPORT_FAIL,
} from "../constants/orderConstants";

export const adminListOrders =
  (keyword = "", pageNumber = "", pageSize = "", sort = "", order = "") =>
  async (dispatch) => {
    try {
      dispatch({
        type: ORDER_ADMIN_LIST_REQUEST,
      });
      const { data } = await axios.get(
        `/api/admin/orders?keyword=${keyword}&pageNumber=${pageNumber}&pageSize=${pageSize}&sort=${sort}&order=${order}`
      );
      dispatch({
        type: ORDER_ADMIN_LIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ORDER_ADMIN_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.response.data,
      });
    }
  };
export const adminListAllOrders = () => async (dispatch) => {
  try {
    dispatch({
      type: ORDER_ADMIN_LIST_ALL_REQUEST,
    });
    const { data } = await axios.get("/api/admin/orders?all=1");
    dispatch({
      type: ORDER_ADMIN_LIST_ALL_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_ADMIN_LIST_ALL_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response.data,
    });
  }
};
export const listAllOrders = () => async (dispatch) => {
  try {
    dispatch({
      type: ORDER_LIST_ALL_REQUEST,
    });
    const { data } = await axios.get("/api/orders?all=1");
    dispatch({
      type: ORDER_LIST_ALL_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_LIST_ALL_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response.data,
    });
  }
};
export const adminDetailsOrder = (id) => async (dispatch) => {
  try {
    dispatch({
      type: ORDER_ADMIN_DETAILS_REQUEST,
    });
    const { data } = await axios.get(`/api/admin/orders/${id}`);
    dispatch({
      type: ORDER_ADMIN_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_ADMIN_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response.data,
    });
  }
};
export const adminExportOrder = (exportSettings) => async (dispatch) => {
  try {
    dispatch({
      type: ORDER_ADMIN_EXPORT_REQUEST,
    });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      responseType: "blob",
    };

    const response = await axios.post(
      "/api/admin/orders/export",
      { exportSettings },
      config
    );

    // Save the file using file-saver
    saveAs(new Blob([response.data]), "Ordenes.xlsx");

    dispatch({
      type: ORDER_ADMIN_EXPORT_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: ORDER_ADMIN_EXPORT_FAIL,
      payload:
        error.response && error.response?.data?.message
          ? error.response.data.message
          : error.response,
    });
  }
};
export const adminCreateOrder = (formData) => async (dispatch) => {
  try {
    dispatch({
      type: ORDER_ADMIN_CREATE_REQUEST,
    });
    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };
    const { data } = await axios.post("/api/admin/orders", formData, config);

    dispatch({
      type: ORDER_ADMIN_CREATE_SUCCESS,
      payload: data,
    });
    dispatch({
      type: ORDER_ADMIN_LIST_RESET,
    });
    dispatch({
      type: ORDER_LIST_RESET,
    });
  } catch (error) {
    dispatch({
      type: ORDER_ADMIN_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    });
  }
};
export const adminDeleteOrder = (id) => async (dispatch) => {
  try {
    dispatch({
      type: ORDER_ADMIN_DELETE_REQUEST,
    });
    const { data } = await axios.delete(`/api/admin/orders/${id}`);

    dispatch({
      type: ORDER_ADMIN_DELETE_SUCCESS,
      payload: data,
    });
    dispatch({
      type: ORDER_ADMIN_LIST_RESET,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({
      type: ORDER_ADMIN_DELETE_FAIL,
      payload: message,
    });
  }
};
export const adminUpdateOrder = (id, status) => async (dispatch) => {
  try {
    dispatch({
      type: ORDER_ADMIN_UPDATE_REQUEST,
    });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.put(
      `/api/admin/orders/${id}`,
      { status },
      config
    );
    dispatch({
      type: ORDER_ADMIN_UPDATE_SUCCESS,
      payload: data,
    });
    dispatch({
      type: ORDER_ADMIN_DETAILS_RESET,
      payload: data,
    });
    dispatch({
      type: ORDER_ADMIN_LIST_RESET,
    });
  } catch (error) {
    dispatch({
      type: ORDER_ADMIN_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    });
  }
};
export const listOrders =
  (keyword = "", pageNumber = "", pageSize = "", sort = "", order = "") =>
  async (dispatch) => {
    try {
      dispatch({
        type: ORDER_LIST_REQUEST,
      });
      const { data } = await axios.get(
        `/api/orders?keyword=${keyword}&pageNumber=${pageNumber}&pageSize=${pageSize}&sort=${sort}&order=${order}`
      );
      dispatch({
        type: ORDER_LIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ORDER_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.response.data,
      });
    }
  };

export const detailsOrder = (id) => async (dispatch) => {
  try {
    dispatch({
      type: ORDER_DETAILS_REQUEST,
    });
    const { data } = await axios.get(`/api/orders/${id}`);
    dispatch({
      type: ORDER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response.data,
    });
  }
};
export const updateOrder = (id, status) => async (dispatch) => {
  try {
    dispatch({
      type: ORDER_UPDATE_REQUEST,
    });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.put(`/api/orders/${id}`, { status }, config);
    dispatch({
      type: ORDER_UPDATE_SUCCESS,
      payload: data,
    });
    dispatch({
      type: ORDER_DETAILS_RESET,
      payload: data,
    });
    dispatch({
      type: ORDER_LIST_RESET,
    });
  } catch (error) {
    dispatch({
      type: ORDER_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    });
  }
};

export const exportOrder = (exportSettings) => async (dispatch) => {
  try {
    dispatch({
      type: ORDER_EXPORT_REQUEST,
    });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      responseType: "blob",
    };

    const response = await axios.post(
      "/api/orders/export",
      { exportSettings },
      config
    );

    // Save the file using file-saver
    saveAs(new Blob([response.data]), "Ordenes.xlsx");

    dispatch({
      type: ORDER_EXPORT_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_EXPORT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    });
  }
};
