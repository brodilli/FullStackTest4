import axios from "axios";
import {
  LOOKUP_ADMIN_CREATE_FAIL,
  LOOKUP_ADMIN_CREATE_REQUEST,
  LOOKUP_ADMIN_CREATE_SUCCESS,
  LOOKUP_ADMIN_DELETE_FAIL,
  LOOKUP_ADMIN_DELETE_REQUEST,
  LOOKUP_ADMIN_DELETE_SUCCESS,
  LOOKUP_ADMIN_DETAILS_FAIL,
  LOOKUP_ADMIN_DETAILS_REQUEST,
  LOOKUP_ADMIN_DETAILS_RESET,
  LOOKUP_ADMIN_DETAILS_SUCCESS,
  LOOKUP_ADMIN_GROUP_LIST_FAIL,
  LOOKUP_ADMIN_GROUP_LIST_REQUEST,
  LOOKUP_ADMIN_GROUP_LIST_SUCCESS,
  LOOKUP_ADMIN_LIST_FAIL,
  LOOKUP_ADMIN_LIST_REQUEST,
  LOOKUP_ADMIN_LIST_RESET,
  LOOKUP_ADMIN_LIST_SUCCESS,
  LOOKUP_ADMIN_UPDATE_FAIL,
  LOOKUP_ADMIN_UPDATE_REQUEST,
  LOOKUP_ADMIN_UPDATE_SUCCESS,
  LOOKUP_LIST_FAIL,
  LOOKUP_LIST_REQUEST,
  LOOKUP_LIST_RESET,
  LOOKUP_LIST_SUCCESS,
} from "../constants/lookupConstants";

export const adminCreateLookup = (lookup) => async (dispatch) => {
  try {
    dispatch({
      type: LOOKUP_ADMIN_CREATE_REQUEST,
    });
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post("/api/admin/lookups", { lookup }, config);

    dispatch({
      type: LOOKUP_ADMIN_CREATE_SUCCESS,
      payload: data,
    });
    dispatch({
      type: LOOKUP_ADMIN_LIST_RESET,
    });
  } catch (error) {
    dispatch({
      type: LOOKUP_ADMIN_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    });
  }
};
export const adminDetailsLookup = (id) => async (dispatch) => {
  try {
    dispatch({
      type: LOOKUP_ADMIN_DETAILS_REQUEST,
    });
    const { data } = await axios.get(`/api/admin/lookups/${id}`);
    dispatch({
      type: LOOKUP_ADMIN_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: LOOKUP_ADMIN_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response.data,
    });
  }
};
export const adminUpdateLookup = (id, lookup) => async (dispatch) => {
  try {
    dispatch({
      type: LOOKUP_ADMIN_UPDATE_REQUEST,
    });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.put(
      `/api/admin/lookups/${id}`,
      { lookup },
      config
    );
    dispatch({
      type: LOOKUP_ADMIN_UPDATE_SUCCESS,
      payload: data,
    });
    dispatch({
      type: LOOKUP_ADMIN_DETAILS_RESET,
      payload: data,
    });
    dispatch({
      type: LOOKUP_ADMIN_LIST_RESET,
    });
  } catch (error) {
    dispatch({
      type: LOOKUP_ADMIN_UPDATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response,
    });
  }
};
export const adminDeleteLookup = (id) => async (dispatch) => {
  try {
    dispatch({
      type: LOOKUP_ADMIN_DELETE_REQUEST,
    });
    const { data } = await axios.delete(`/api/admin/lookups/${id}`);
    dispatch({
      type: LOOKUP_ADMIN_DELETE_SUCCESS,
      payload: data,
    });
    dispatch({
      type: LOOKUP_ADMIN_LIST_RESET,
    });
  } catch (error) {
    dispatch({
      type: LOOKUP_ADMIN_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response.data,
    });
  }
};
export const adminListGroupsLookups = () => async (dispatch) => {
  try {
    dispatch({
      type: LOOKUP_ADMIN_GROUP_LIST_REQUEST,
    });
    const { data } = await axios.get("/api/admin/lookups-groups");
    dispatch({
      type: LOOKUP_ADMIN_GROUP_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: LOOKUP_ADMIN_GROUP_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.response.data,
    });
  }
};

export const adminListLookups =
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
        type: LOOKUP_ADMIN_LIST_REQUEST,
      });
      const { data } = await axios.get(
        `/api/admin/lookups?keyword=${keyword}&pageNumber=${pageNumber}&pageSize=${pageSize}&sort=${sort}&order=${order}&all=${all}`
      );
      dispatch({
        type: LOOKUP_ADMIN_LIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: LOOKUP_ADMIN_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.response.data,
      });
    }
  };
