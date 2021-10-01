import axios from "axios";
import {
  INVENTORYCATEGORY_LIST_REQUEST,
  INVENTORYCATEGORY_LIST_SUCCESS,
  INVENTORYCATEGORY_LIST_FAIL,
  INVENTORYCATEGORY_DETAILS_REQUEST,
  INVENTORYCATEGORY_DETAILS_SUCCESS,
  INVENTORYCATEGORY_DETAILS_FAIL,
} from "../constants/inventoryCategoryConstants";
import { logout } from "./userActions";

export const listInventoryCategory = () => async (dispatch, getState) => {
    try {
      dispatch({ type: INVENTORYCATEGORY_LIST_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      const { data } = await axios.get(`/api/inventoryCategory`, config);
     
      dispatch({
        type: INVENTORYCATEGORY_LIST_SUCCESS,
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
          type: INVENTORYCATEGORY_LIST_FAIL,
          payload: message,
        });
      }
  };


  export const listInventoryCategoryDetails = (id) => async (dispatch) => {
    try {
      dispatch({ type: INVENTORYCATEGORY_DETAILS_REQUEST });
  
      const { data } = await axios.get(`/api/inventoryCategory/${id}`);
  
      dispatch({
        type: INVENTORYCATEGORY_DETAILS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: INVENTORYCATEGORY_DETAILS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
  