import axios from "axios";
import {
  PARCEL_ADMIN_CREATE_FAIL,
  PARCEL_ADMIN_CREATE_REQUEST,
  PARCEL_ADMIN_CREATE_SUCCESS,
  PARCEL_ADMIN_DELETE_FAIL,
  PARCEL_ADMIN_DELETE_REQUEST,
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
  PARCEL_ADMIN_UPDATE_SUCCESS,
  PARCEL_LIST_FAIL,
  PARCEL_LIST_REQUEST,
  PARCEL_LIST_RESET,
  PARCEL_LIST_SUCCESS,
} from "../constants/parcelConstants";

export const adminCreateParcel = (parcel) => async (dispatch) => {
  try {
    dispatch({
      type: PARCEL_ADMIN_CREATE_REQUEST,
    });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post("/api/admin/parcels", { parcel }, config);

    dispatch({
      type: PARCEL_ADMIN_CREATE_SUCCESS,
      payload: data,
    });
    dispatch({
      type: PARCEL_ADMIN_LIST_RESET,
    });
    dispatch({
      type: PARCEL_LIST_RESET,
    });
  } catch (error) {
    dispatch({
      type: PARCEL_ADMIN_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    });
  }
};
export const adminDetailsParcel = (id) => async (dispatch) => {
  try {
    dispatch({
      type: PARCEL_ADMIN_DETAILS_REQUEST,
    });
    const { data } = await axios.get(`/api/admin/parcels/${id}`);
    dispatch({
      type: PARCEL_ADMIN_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: PARCEL_ADMIN_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response.data,
    });
  }
};
export const adminUpdateParcel = (id, parcel) => async (dispatch) => {
  try {
    dispatch({
      type: PARCEL_ADMIN_UPDATE_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.put(
      `/api/admin/parcels/${id}`,
      { parcel },
      config
    );
    dispatch({
      type: PARCEL_ADMIN_UPDATE_SUCCESS,
      payload: data,
    });
    dispatch({
      type: PARCEL_ADMIN_DETAILS_RESET,
      payload: data,
    });
    dispatch({
      type: PARCEL_ADMIN_LIST_RESET,
    });
  } catch (error) {
    dispatch({
      type: PARCEL_ADMIN_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    });
  }
};
export const adminDeleteParcel = (id) => async (dispatch) => {
  try {
    dispatch({
      type: PARCEL_ADMIN_DELETE_REQUEST,
    });
    const { data } = await axios.delete(`/api/admin/parcels/${id}`);
    dispatch({
      type: PARCEL_ADMIN_DELETE_SUCCESS,
      payload: data,
    });
    dispatch({
      type: PARCEL_ADMIN_LIST_RESET,
    });
  } catch (error) {
    dispatch({
      type: PARCEL_ADMIN_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response.data,
    });
  }
};
export const adminListParcels =
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
        type: PARCEL_ADMIN_LIST_REQUEST,
      });
      const { data } = await axios.get(
        `/api/admin/parcels?keyword=${keyword}&pageNumber=${pageNumber}&pageSize=${pageSize}&sort=${sort}&order=${order}&all=${all}`
      );
      dispatch({
        type: PARCEL_ADMIN_LIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: PARCEL_ADMIN_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.response.data,
      });
    }
  };
