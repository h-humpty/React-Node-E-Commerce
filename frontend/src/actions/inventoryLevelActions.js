import axios from "axios";
import {
  INVENTORYLEVEL_LIST_REQUEST,
  INVENTORYLEVEL_LIST_SUCCESS,
  INVENTORYLEVEL_LIST_FAIL,
  INVENTORYLEVEL_CREATE_REQUEST,
  INVENTORYLEVEL_CREATE_SUCCESS,
  INVENTORYLEVEL_CREATE_FAIL,
  INVENTORYLEVEL_UPDATE_REQUEST,
  INVENTORYLEVEL_UPDATE_SUCCESS,
  INVENTORYLEVEL_UPDATE_FAIL,
  INVENTORYLEVEL_DETAILS_REQUEST,
  INVENTORYLEVEL_DETAILS_SUCCESS,
  INVENTORYLEVEL_DETAILS_FAIL,
  INVENTORYLEVEL_DELETE_REQUEST,
  INVENTORYLEVEL_DELETE_SUCCESS,
  INVENTORYLEVEL_DELETE_FAIL,
  INVENTORYLEVEL_GROUPED_REQUEST,
  INVENTORYLEVEL_GROUPED_SUCCESS,
  INVENTORYLEVEL_GROUPED_FAIL,
  INVENTORYLEVEL_SALARY_REQUEST,
  INVENTORYLEVEL_SALARY_SUCCESS,
  INVENTORYLEVEL_SALARY_FAIL,
} from "../constants/inventoryLevelConstants";
import { logout } from "./userActions";

export const listInventoryLevel = () => async (dispatch, getState) => {
  try {
    dispatch({ type: INVENTORYLEVEL_LIST_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(`/api/inventoryLevel`, config);

    dispatch({
      type: INVENTORYLEVEL_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: INVENTORYLEVEL_LIST_FAIL,
      payload: message,
    });
  }
};

export const salaryInventoryLevel = () => async (dispatch, getState) => {
  try {
    dispatch({ type: INVENTORYLEVEL_SALARY_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(`/api/inventoryLevel/salary`, config);

    dispatch({
      type: INVENTORYLEVEL_SALARY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: INVENTORYLEVEL_SALARY_FAIL,
      payload: message,
    });
  }
};

export const groupedInventoryLevel = () => async (dispatch, getState) => {
  try {
    dispatch({ type: INVENTORYLEVEL_GROUPED_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(`/api/inventoryLevel/grouped`, config);

    dispatch({
      type: INVENTORYLEVEL_GROUPED_SUCCESS,
      payload: data,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: INVENTORYLEVEL_GROUPED_FAIL,
      payload: message,
    });
  }
};

export const listInventoryLevelDetails = (category) => async (dispatch) => {
  try {
    dispatch({ type: INVENTORYLEVEL_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/inventoryLevel/${category}`);

    dispatch({
      type: INVENTORYLEVEL_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: INVENTORYLEVEL_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createInventoryLevel =
  (inventoryLevel) => async (dispatch, getState) => {
    try {
      dispatch({
        type: INVENTORYLEVEL_CREATE_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.post(
        `/api/inventoryLevel`,
        inventoryLevel,
        config
      );

      dispatch({
        type: INVENTORYLEVEL_CREATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed") {
        dispatch(logout());
      }
      dispatch({
        type: INVENTORYLEVEL_CREATE_FAIL,
        payload: message,
      });
    }
  };

export const updateInventoryLevel =
  (inventoryLevel) => async (dispatch, getState) => {
    try {
      dispatch({
        type: INVENTORYLEVEL_UPDATE_REQUEST,
      });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.put(
        `/api/inventoryLevel`,
        inventoryLevel,
        config
      );

      dispatch({
        type: INVENTORYLEVEL_UPDATE_SUCCESS,
        payload: data,
      });
      dispatch({ type: INVENTORYLEVEL_DETAILS_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed") {
        dispatch(logout());
      }
      dispatch({
        type: INVENTORYLEVEL_UPDATE_FAIL,
        payload: message,
      });
    }
  };

export const deleteInventory = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: INVENTORYLEVEL_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`/api/inventoryLevel/${id}`, config);

    dispatch({
      type: INVENTORYLEVEL_DELETE_SUCCESS,
    });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: INVENTORYLEVEL_DELETE_FAIL,
      payload: message,
    });
  }
};
