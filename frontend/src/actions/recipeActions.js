import axios from "axios";
import {
  RECIPE_LIST_REQUEST,
  RECIPE_LIST_SUCCESS,
  RECIPE_LIST_FAIL,
  RECIPE_DETAILS_REQUEST,
  RECIPE_DETAILS_SUCCESS,
  RECIPE_DETAILS_FAIL,
  RECIPE_DELETE_SUCCESS,
  RECIPE_DELETE_REQUEST,
  RECIPE_DELETE_FAIL,
  RECIPE_CREATE_REQUEST,
  RECIPE_CREATE_SUCCESS,
  RECIPE_CREATE_FAIL,
  RECIPE_UPDATE_REQUEST,
  RECIPE_UPDATE_SUCCESS,
  RECIPE_UPDATE_FAIL,
} from "../constants/recipeConstants";
import { logout } from "./userActions";

export const listRecipes = () => async (dispatch, getState) => {
    try {
      dispatch({ type: RECIPE_LIST_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState()
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
  
      const { data } = await axios.get(`/api/recipes`, config);
  
      dispatch({
        type: RECIPE_LIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: RECIPE_LIST_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

  export const listRecipeDetails = (id) => async (dispatch, getState) => {
    try {
      dispatch({ type: RECIPE_DETAILS_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState()
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
  
      const { data } = await axios.get(`/api/recipes/${id}`, config);
  
      dispatch({
        type: RECIPE_DETAILS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: RECIPE_DETAILS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

  
export const createRecipe = (recipe) => async (dispatch, getState) => {
    try {
      dispatch({
        type: RECIPE_CREATE_REQUEST,
      });
  
      const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };

      const { data } = await axios.post(`/api/recipes`, recipe, config);
  
      dispatch({
        type: RECIPE_CREATE_SUCCESS,
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
        type: RECIPE_CREATE_FAIL,
        payload: message,
      });
    }
  };
  
  
  export const updateRecipe = (recipe) => async (dispatch, getState) => {
    try {
      dispatch({
        type: RECIPE_UPDATE_REQUEST,
      })
  
      const {
        userLogin: { userInfo },
      } = getState()
  
      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
  
      const { data } = await axios.put(
        `/api/recipes/${recipe._id}`,
        recipe,
        config
      )
  
      dispatch({
        type: RECIPE_UPDATE_SUCCESS,
        payload: data,
      })
      dispatch({ type: RECIPE_DETAILS_SUCCESS, payload: data })
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      if (message === 'Not authorized, token failed') {
        dispatch(logout())
      }
      dispatch({
        type: RECIPE_UPDATE_FAIL,
        payload: message,
      })
    }
  }
  
  export const deleteRecipe = (id) => async (dispatch, getState) => {
    try {
      dispatch({
        type: RECIPE_DELETE_REQUEST,
      })
  
      const {
        userLogin: { userInfo },
      } = getState()
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      }
  
      await axios.delete(`/api/recipes/${id}`, config)
  
      dispatch({
        type: RECIPE_DELETE_SUCCESS,
      })
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message
      if (message === 'Not authorized, token failed') {
        dispatch(logout())
      }
      dispatch({
        type: RECIPE_DELETE_FAIL,
        payload: message,
      })
    }
  }