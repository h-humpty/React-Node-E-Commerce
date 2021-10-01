import {
    RECEIPT_LIST_REQUEST,
    RECEIPT_LIST_SUCCESS,
    RECEIPT_LIST_FAIL,
    RECEIPT_UNPAID_REQUEST,
    RECEIPT_UNPAID_SUCCESS,
    RECEIPT_UNPAID_FAIL,
    RECEIPT_DETAILS_REQUEST,
    RECEIPT_DETAILS_SUCCESS,
    RECEIPT_DETAILS_FAIL,
    RECEIPT_DETAILS_RESET,
    RECEIPT_PAID_REQUEST,
    RECEIPT_PAID_SUCCESS,
    RECEIPT_PAID_FAIL,
    RECEIPT_REMOVE_REQUEST,
    RECEIPT_REMOVE_SUCCESS,
    RECEIPT_REMOVE_FAIL,

  } from "../constants/receiptConstants";
  
  export const receiptListReducer = (
    state = { loading: true, receipt: [] },
    action
  ) => {
    switch (action.type) {
      case RECEIPT_LIST_REQUEST:
        return { loading: true, receipt: [] };
      case RECEIPT_LIST_SUCCESS:
        return {
          loading: false,
          receipt: action.payload,
          pages: action.payload.pages,
          page: action.payload.page,
          
        };
      case RECEIPT_LIST_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };

    
  export const receiptUnpaidReducer = (
    state = { loading: true, receipt: [] },
    action
  ) => {
    switch (action.type) {
      case RECEIPT_UNPAID_REQUEST:
        return { loading: true, receipt: [] };
      case RECEIPT_UNPAID_SUCCESS:
        return {
          loading: false,
          receipt: action.payload,
        };
      case RECEIPT_UNPAID_FAIL:
        return { loading: false, error: action.payload };
      default:
        return state;
    }
  };


  
export const receiptDetailReducer = (
  state = { loading: true, receipt: {} },
  action
) => {
  switch (action.type) {
    case RECEIPT_DETAILS_REQUEST:
      return { loading: true, ...state };
    case RECEIPT_DETAILS_SUCCESS:
      return { loading: false, receipt: action.payload };
    case RECEIPT_DETAILS_FAIL:
      return { loading: false, error: action.payload };
      case RECEIPT_DETAILS_RESET:
        return {}
    default:
      return state;
  }
};

export const receiptPaidReducer = (
  state = { loading: true, receipt: {} },
  action
) => {
  switch (action.type) {
    case RECEIPT_PAID_REQUEST:
      return { loading: true, ...state };
    case RECEIPT_PAID_SUCCESS:
      return { loading: false, receipt: action.payload };
    case RECEIPT_PAID_FAIL:
      return { loading: false, error: action.payload };
      
    default:
      return state;
  }
};

export const receiptRemoveReducer = (
  state = { loading: true, receipt: {} },
  action
) => {
  switch (action.type) {
    case RECEIPT_REMOVE_REQUEST:
      return { loading: true, ...state };
    case RECEIPT_REMOVE_SUCCESS:
      return { loading: false, receipt: action.payload };
    case RECEIPT_REMOVE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};