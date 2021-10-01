import axios from "axios";
import {
  INVENTORY_LIST_REQUEST,
  INVENTORY_LIST_SUCCESS,
  INVENTORY_LIST_FAIL,
  INVENTORY_CREATE_REQUEST,
  INVENTORY_CREATE_SUCCESS,
  INVENTORY_CREATE_FAIL,
  INVENTORY_UPDATE_REQUEST,
  INVENTORY_UPDATE_SUCCESS,
  INVENTORY_UPDATE_FAIL,
  INVENTORY_DETAILS_REQUEST,
  INVENTORY_DETAILS_SUCCESS,
  INVENTORY_DETAILS_FAIL,
  INVENTORY_DELETE_REQUEST,
  INVENTORY_DELETE_SUCCESS,
  INVENTORY_DELETE_FAIL,
  INVENTORY_GROUP_REQUEST,
  INVENTORY_GROUP_SUCCESS,
  INVENTORY_GROUP_FAIL,
  INVENTORY_DATES_REQUEST,
  INVENTORY_DATES_SUCCESS,
  INVENTORY_DATES_FAIL,
  INVENTORY_COST_REQUEST,
  INVENTORY_COST_SUCCESS,
  INVENTORY_COST_FAIL,
  INVENTORY_SALARY_REQUEST,
  INVENTORY_SALARY_SUCCESS,
  INVENTORY_SALARY_FAIL,
  INVENTORY_UNPAID_REQUEST,
  INVENTORY_UNPAID_SUCCESS,
  INVENTORY_UNPAID_FAIL,
} from "../constants/inventoryConstants";
import { logout } from "./userActions";

export const listInventory = () => async (dispatch, getState) => {
  try {
    dispatch({ type: INVENTORY_LIST_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(
      `/api/inventory`, config
    );


    dispatch({
      type: INVENTORY_LIST_SUCCESS,
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
      type: INVENTORY_LIST_FAIL,
      payload: message,
    });
  }
};


export const salaryInventory = () => async (dispatch, getState) => {
  try {
    dispatch({ type: INVENTORY_SALARY_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(
      `/api/inventory/salary`, config
    );


    dispatch({
      type: INVENTORY_SALARY_SUCCESS,
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
      type: INVENTORY_SALARY_FAIL,
      payload: message,
    });
  }
};

export const unpaidInventory = () => async (dispatch, getState) => {
  try {
    dispatch({ type: INVENTORY_UNPAID_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(
      `/api/inventory/unpaid`, config
    );



    dispatch({
      type: INVENTORY_UNPAID_SUCCESS,
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
      type: INVENTORY_UNPAID_FAIL,
      payload: message,
    });
  }
};

export const listDatesInventory = (startDate,endDate) => async (dispatch, getState) => {
  try {
    dispatch({ type: INVENTORY_DATES_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(
      `/api/inventory/dates?startDate=${startDate}&endDate=${endDate}`, config
    );

    // console.log(inventory)

    dispatch({
      type: INVENTORY_DATES_SUCCESS,
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
      type: INVENTORY_DATES_FAIL,
      payload: message,
    });
  }
};

export const costInventory = () => async (dispatch, getState) => {
  try {
    dispatch({ type: INVENTORY_COST_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(`/api/inventory/inventorycost`, config);

    dispatch({
      type: INVENTORY_COST_SUCCESS,
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
      type: INVENTORY_COST_FAIL,
      payload: message,
    });
  }
};

export const groupInventory = () => async (dispatch, getState) => {
  try {
    dispatch({ type: INVENTORY_GROUP_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(`/api/inventory/inventorygroup`, config);

    dispatch({
      type: INVENTORY_GROUP_SUCCESS,
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
      type: INVENTORY_GROUP_FAIL,
      payload: message,
    });
  }
};

export const listInventoryDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: INVENTORY_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/inventory/${id}`);

    dispatch({
      type: INVENTORY_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: INVENTORY_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createInventory = (inventory) => async (dispatch, getState) => {
  try {
    dispatch({
      type: INVENTORY_CREATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.post(`/api/inventory`, inventory, config);

    dispatch({
      type: INVENTORY_CREATE_SUCCESS,
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
      type: INVENTORY_CREATE_FAIL,
      payload: message,
    });
  }
};

export const updateInventory = (inventory) => async (dispatch, getState) => {
  try {
    dispatch({
      type: INVENTORY_UPDATE_REQUEST,
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
      `/api/inventory/${inventory._id}`,
      inventory,
      config
    );

    dispatch({
      type: INVENTORY_UPDATE_SUCCESS,
      payload: data,
    });
    dispatch({ type: INVENTORY_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }
    dispatch({
      type: INVENTORY_UPDATE_FAIL,
      payload: message,
    });
  }
};

export const deleteInventory = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: INVENTORY_DELETE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`/api/inventory/${id}`, config);

    dispatch({
      type: INVENTORY_DELETE_SUCCESS,
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
      type: INVENTORY_DELETE_FAIL,
      payload: message,
    });
  }
};
