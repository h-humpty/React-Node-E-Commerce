import axios from "axios";
import {
  EMPLOYEE_LIST_REQUEST,
  EMPLOYEE_LIST_SUCCESS,
  EMPLOYEE_LIST_FAIL,
  EMPLOYEE_CREATE_REQUEST,
  EMPLOYEE_CREATE_SUCCESS,
  EMPLOYEE_CREATE_FAIL,
  EMPLOYEE_UPDATE_REQUEST,
  EMPLOYEE_UPDATE_SUCCESS,
  EMPLOYEE_UPDATE_FAIL,
  EMPLOYEE_DELETE_REQUEST,
  EMPLOYEE_DELETE_SUCCESS,
  EMPLOYEE_DELETE_FAIL,
} from "../constants/employeeConstants";
import { logout } from "./userActions";

export const listEmployee = () => async (dispatch, getState) => {
  try {
    dispatch({ type: EMPLOYEE_LIST_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(`/api/employees`, config);

    dispatch({ type: EMPLOYEE_LIST_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;

    if (message === "Not authorized, token failed") {
      dispatch(logout());
    }

    dispatch({ type: EMPLOYEE_LIST_FAIL, payload: message });
    console.error(error);
  }
};


export const createEmployee = (employee) => async (dispatch, getState) => {
    try {
      dispatch({
        type: EMPLOYEE_CREATE_REQUEST,
      });
  
      const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
  
      const { data } = await axios.post(`/api/employees`, employee, config);
  
      dispatch({
        type: EMPLOYEE_CREATE_SUCCESS,
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
        type: EMPLOYEE_CREATE_FAIL,
        payload: message,
      });
    }
  };

  export const updateEmployee = (employee) => async (dispatch, getState) => {
    try {
      dispatch({
        type: EMPLOYEE_UPDATE_REQUEST,
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
        `/api/employees/${employee._id}`,
        employee,
        config
      );
  
      dispatch({
        type: EMPLOYEE_UPDATE_SUCCESS,
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
        type: EMPLOYEE_UPDATE_FAIL,
        payload: message,
      });
    }
  };

  
export const deleteEmployee = (id) => async (dispatch, getState) => {
    try {
      dispatch({
        type: EMPLOYEE_DELETE_REQUEST,
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
        type: EMPLOYEE_DELETE_SUCCESS,
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
        type: EMPLOYEE_DELETE_FAIL,
        payload: message,
      });
    }
  };
  