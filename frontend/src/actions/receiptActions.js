import axios from "axios";
import {
  RECEIPT_LIST_REQUEST,
  RECEIPT_LIST_SUCCESS,
  RECEIPT_LIST_FAIL,
  RECEIPT_DETAILS_REQUEST,
  RECEIPT_DETAILS_SUCCESS,
  RECEIPT_DETAILS_FAIL,
  RECEIPT_UNPAID_REQUEST,
  RECEIPT_UNPAID_SUCCESS,
  RECEIPT_UNPAID_FAIL,
  RECEIPT_PAID_REQUEST,
  RECEIPT_PAID_SUCCESS,
  RECEIPT_PAID_FAIL,
  RECEIPT_REMOVE_REQUEST,
  RECEIPT_REMOVE_SUCCESS,
  RECEIPT_REMOVE_FAIL,
} from "../constants/receiptConstants";
import { logout } from "./userActions";
// const receiptData = require("../receiptData");

export const listReceipt =
  (pageNumber = "") =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: RECEIPT_LIST_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      console.log(pageNumber)

      if (pageNumber === "All") {
        const { data } = await axios.get(
          `/api/receipt?display=All`,
          config
        );

        dispatch({
          type: RECEIPT_LIST_SUCCESS,
          payload: data,
        });
      } else {
        const { data } = await axios.get(
          `/api/receipt?pageNumber=${pageNumber}`,
          config
        );

        dispatch({
          type: RECEIPT_LIST_SUCCESS,
          payload: data,
        });
      }
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      if (message === "Not authorized, token failed") {
        dispatch(logout());
      }
      dispatch({
        type: RECEIPT_LIST_FAIL,
        payload: message,
      });
    }
  };

export const unpaidReceipt = () => async (dispatch, getState) => {
  try {
    dispatch({ type: RECEIPT_UNPAID_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/receipt/unpaid`, config);
    // console.log(data);

    dispatch({
      type: RECEIPT_UNPAID_SUCCESS,
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
      type: RECEIPT_UNPAID_FAIL,
      payload: message,
    });
  }
};

export const listReceiptDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: RECEIPT_DETAILS_REQUEST });

    const { data } = await axios.put(`/api/receipt?receiptNumber=${id}`);

    dispatch({
      type: RECEIPT_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: RECEIPT_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const paidReceipt = (receipt) => async (dispatch) => {
  try {
    dispatch({ type: RECEIPT_PAID_REQUEST });

    console.log(receipt.receiptNumber);

    const { data } = await axios.put(
      `/api/receipt/paid?receiptNumber=${receipt.receiptNumber}`,
      receipt
    );

    dispatch({
      type: RECEIPT_PAID_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: RECEIPT_PAID_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const removeReceipt = (id) => async (dispatch) => {
  try {
    dispatch({ type: RECEIPT_REMOVE_REQUEST });

    const { data } = await axios.put(`/api/receipt/remove?receiptNumber=${id}`);

    dispatch({
      type: RECEIPT_REMOVE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: RECEIPT_REMOVE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
