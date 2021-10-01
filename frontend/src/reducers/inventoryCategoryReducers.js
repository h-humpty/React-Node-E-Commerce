import {
  INVENTORYCATEGORY_LIST_REQUEST,
  INVENTORYCATEGORY_LIST_SUCCESS,
  INVENTORYCATEGORY_LIST_FAIL,
  INVENTORYCATEGORY_DETAILS_REQUEST,
  INVENTORYCATEGORY_DETAILS_SUCCESS,
  INVENTORYCATEGORY_DETAILS_FAIL,
} from "../constants/inventoryCategoryConstants";

export const inventoryCategoryListReducer = (
  state = { loading: true, inventoryCategory: [] },
  action
) => {
  switch (action.type) {
    case INVENTORYCATEGORY_LIST_REQUEST:
      return { loading: true, inventoryCategory: [] };
    case INVENTORYCATEGORY_LIST_SUCCESS:
      return {
        loading: false,
        inventoryCategory: action.payload,
      };
    case INVENTORYCATEGORY_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const inventoryCategoryDetailReducer = (
  state = { loading: true, inventoryCategory: {} },
  action
) => {
  switch (action.type) {
    case INVENTORYCATEGORY_DETAILS_REQUEST:
      return { loading: true, ...state };
    case INVENTORYCATEGORY_DETAILS_SUCCESS:
      return { loading: false, inventoryCategory: action.payload };
    case INVENTORYCATEGORY_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
