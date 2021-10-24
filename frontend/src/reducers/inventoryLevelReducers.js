import {
    INVENTORYLEVEL_LIST_REQUEST,
    INVENTORYLEVEL_LIST_SUCCESS,
    INVENTORYLEVEL_LIST_FAIL,
    INVENTORYLEVEL_CREATE_RESET,
    INVENTORYLEVEL_CREATE_FAIL,
    INVENTORYLEVEL_CREATE_SUCCESS,
    INVENTORYLEVEL_CREATE_REQUEST,
    INVENTORYLEVEL_DELETE_REQUEST,
    INVENTORYLEVEL_DELETE_SUCCESS,
    INVENTORYLEVEL_DELETE_FAIL,
    INVENTORYLEVEL_UPDATE_REQUEST,
    INVENTORYLEVEL_UPDATE_SUCCESS,
    INVENTORYLEVEL_UPDATE_FAIL,
    INVENTORYLEVEL_UPDATE_RESET,
    INVENTORYLEVEL_DETAILS_REQUEST,
    INVENTORYLEVEL_DETAILS_SUCCESS,
    INVENTORYLEVEL_DETAILS_FAIL,
    INVENTORYLEVEL_GROUPED_REQUEST,
    INVENTORYLEVEL_GROUPED_SUCCESS,
    INVENTORYLEVEL_GROUPED_FAIL,
    INVENTORYLEVEL_SALARY_REQUEST,
    INVENTORYLEVEL_SALARY_SUCCESS,
    INVENTORYLEVEL_SALARY_FAIL,
  } from "../constants/inventoryLevelConstants";

  
export const inventoryLevelListReducer = (
    state = { loading: true, inventoryLevel: []},
    action
  ) => {
    switch (action.type) {
      case INVENTORYLEVEL_LIST_REQUEST:
        return { loading: true, inventoryLevel: [] };
      case INVENTORYLEVEL_LIST_SUCCESS:
        return {
          loading: false,
          inventoryLevel: action.payload,
          success: true
        };
      case INVENTORYLEVEL_LIST_FAIL:
        return { loading: false, error: action.payload};
      default:
        return state;
    }
  };

    
export const inventoryLevelSalaryReducer = (
  state = { loading: true, inventoryLevel: [] },
  action
) => {
  switch (action.type) {
    case INVENTORYLEVEL_SALARY_REQUEST:
      return { loading: true, inventoryLevel: [] };
    case INVENTORYLEVEL_SALARY_SUCCESS:
      return {
        loading: false,
        inventoryLevel: action.payload,
      };
    case INVENTORYLEVEL_SALARY_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
  
  export const inventoryLevelGroupedReducer = (
    state = { loading: true, inventoryLevelGrouped: [] },
    action
  ) => {
    switch (action.type) {
      case INVENTORYLEVEL_GROUPED_REQUEST:
        return { loading: true, inventoryLevelGrouped: [] };
      case INVENTORYLEVEL_GROUPED_SUCCESS:
        return {
          loading: false,
          inventoryLevelGrouped: action.payload,
        };
      case INVENTORYLEVEL_GROUPED_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };

  export const inventoryLevelDetailReducer = (
    state = { loading: true, inventoryLevelDetail: {} },
    action
  ) => {
    switch (action.type) {
      case INVENTORYLEVEL_DETAILS_REQUEST:
        return { loading: true, ...state };
      case INVENTORYLEVEL_DETAILS_SUCCESS:
        return { loading: false, inventoryLevelDetail: action.payload };
      case INVENTORYLEVEL_DETAILS_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };
  
  export const inventoryLevelCreateReducer = (state = {}, action) => {
      switch (action.type) {
        case INVENTORYLEVEL_CREATE_REQUEST:
          return { loading: true }
        case INVENTORYLEVEL_CREATE_SUCCESS:
          return { loading: false, success: true, inventoryLevel: action.payload }
        case INVENTORYLEVEL_CREATE_FAIL:
          return { loading: false, error: action.payload }
        case INVENTORYLEVEL_CREATE_RESET:
          return {}
        default:
          return state
      }
    }
  
  
    export const inventoryLevelDeleteReducer = (state = {}, action) => {
      switch (action.type) {
        case INVENTORYLEVEL_DELETE_REQUEST:
          return { loading: true }
        case INVENTORYLEVEL_DELETE_SUCCESS:
          return { loading: false, success: true }
        case INVENTORYLEVEL_DELETE_FAIL:
          return { loading: false, error: action.payload }
        default:
          return state
      }
    }
  
    export const InventoryLevelUpdateReducer = (state = {  inventoryLevel: {} }, action) => {
      switch (action.type) {
        case INVENTORYLEVEL_UPDATE_REQUEST:
          return { loading: true }
        case INVENTORYLEVEL_UPDATE_SUCCESS:
          return { loading: false, success: true, inventoryLevel: action.payload }
        case INVENTORYLEVEL_UPDATE_FAIL:
          return { loading: false, error: action.payload }
        case INVENTORYLEVEL_UPDATE_RESET:
          return { inventoryLevel: {} }
        default:
          return state
      }
    }