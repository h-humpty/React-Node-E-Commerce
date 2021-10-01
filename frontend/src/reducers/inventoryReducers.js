import {
  INVENTORY_LIST_REQUEST,
  INVENTORY_LIST_SUCCESS,
  INVENTORY_LIST_FAIL,
  INVENTORY_CREATE_RESET,
  INVENTORY_CREATE_FAIL,
  INVENTORY_CREATE_SUCCESS,
  INVENTORY_CREATE_REQUEST,
  INVENTORY_DELETE_REQUEST,
  INVENTORY_DELETE_SUCCESS,
  INVENTORY_DELETE_FAIL,
  INVENTORY_UPDATE_REQUEST,
  INVENTORY_UPDATE_SUCCESS,
  INVENTORY_UPDATE_FAIL,
  INVENTORY_UPDATE_RESET,
  INVENTORY_DETAILS_REQUEST,
  INVENTORY_DETAILS_SUCCESS,
  INVENTORY_DETAILS_FAIL,
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

export const inventoryListReducer = (
  state = { loading: true, inventory: [] },
  action
) => {
  switch (action.type) {
    case INVENTORY_LIST_REQUEST:
      return { loading: true, inventory: [] };
    case INVENTORY_LIST_SUCCESS:
      return {
        loading: false,
        inventory: action.payload,
        pages: action.payload.pages,
        page: action.payload.page,
      };
    case INVENTORY_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const inventorySalaryReducer = (
  state = { loading: true, inventory: [] },
  action
) => {
  switch (action.type) {
    case INVENTORY_SALARY_REQUEST:
      return { loading: true, inventory: [] };
    case INVENTORY_SALARY_SUCCESS:
      return {
        loading: false,
        inventory: action.payload,
      };
    case INVENTORY_SALARY_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const inventoryUnpaidReducer = (
  state = { loading: true, inventory: [] },
  action
) => {
  switch (action.type) {
    case INVENTORY_UNPAID_REQUEST:
      return { loading: true, inventory: [] };
    case INVENTORY_UNPAID_SUCCESS:
      return {
        loading: false,
        inventory: action.payload,
      };
    case INVENTORY_UNPAID_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const inventoryDatesReducer = (
  state = { loading: true, inventoryDates: [] },
  action
) => {
  switch (action.type) {
    case INVENTORY_DATES_REQUEST:
      return { loading: true, inventoryDates: [] };
    case INVENTORY_DATES_SUCCESS:
      return {
        loading: false,
        inventoryDates: action.payload
      };
    case INVENTORY_DATES_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const inventoryCostReducer = (
  state = { loading: true, inventoryCost: [] },
  action
) => {
  switch (action.type) {
    case INVENTORY_COST_REQUEST:
      return { loading: true, inventoryCost: [] };
    case INVENTORY_COST_SUCCESS:
      return {
        loading: false,
        inventoryCost: action.payload
      };
    case INVENTORY_COST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const inventoryGroupReducer = (
  state = { loading: true, inventory: [] },
  action
) => {
  switch (action.type) {
    case INVENTORY_GROUP_REQUEST:
      return { loading: true, inventory: [] };
    case INVENTORY_GROUP_SUCCESS:
      return {
        loading: false,
        inventory: action.payload,
        pages: action.payload.pages,
        page: action.payload.page,
      };
    case INVENTORY_GROUP_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const inventoryDetailReducer = (
  state = { loading: true, inventory: {} },
  action
) => {
  switch (action.type) {
    case INVENTORY_DETAILS_REQUEST:
      return { loading: true, ...state };
    case INVENTORY_DETAILS_SUCCESS:
      return { loading: false, inventory: action.payload };
    case INVENTORY_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const inventoryCreateReducer = (state = {}, action) => {
    switch (action.type) {
      case INVENTORY_CREATE_REQUEST:
        return { loading: true }
      case INVENTORY_CREATE_SUCCESS:
        return { loading: false, success: true, inventory: action.payload }
      case INVENTORY_CREATE_FAIL:
        return { loading: false, error: action.payload }
      case INVENTORY_CREATE_RESET:
        return {}
      default:
        return state
    }
  }


  export const inventoryDeleteReducer = (state = {}, action) => {
    switch (action.type) {
      case INVENTORY_DELETE_REQUEST:
        return { loading: true }
      case INVENTORY_DELETE_SUCCESS:
        return { loading: false, success: true }
      case INVENTORY_DELETE_FAIL:
        return { loading: false, error: action.payload }
      default:
        return state
    }
  }

  export const InventoryUpdateReducer = (state = {  inventory: {} }, action) => {
    switch (action.type) {
      case INVENTORY_UPDATE_REQUEST:
        return { loading: true }
      case INVENTORY_UPDATE_SUCCESS:
        return { loading: false, success: true, inventory: action.payload }
      case INVENTORY_UPDATE_FAIL:
        return { loading: false, error: action.payload }
      case INVENTORY_UPDATE_RESET:
        return { inventory: {} }
      default:
        return state
    }
  }