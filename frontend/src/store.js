import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  productListReducer,
  productDetailReducer,
  productDeleteReducer,
  productCreateReducer,
  productUpdateReducer,
  productReviewCreateReducer,
  productTopRatedReducer,
  productFilteredReducer,
} from "./reducers/productReducers";
import { cartReducer } from "./reducers/cartReducers";
import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
  userDeleteReducer,
  userListReducer,
  userUpdateReducer,
} from "./reducers/userReducer";
import {
  orderCreateReducer,
  orderDetailsReducer,
  orderPayReducer,
  orderListMyReducer,
  orderListReducer,
  orderDeliverReducer,
} from "./reducers/orderReducers";
import {
  inventoryListReducer,
  inventoryDetailReducer,
  inventoryCreateReducer,
  InventoryUpdateReducer,
  inventoryDeleteReducer,
  inventoryGroupReducer,
  inventoryDatesReducer,
  inventoryCostReducer,
  inventorySalaryReducer,
  inventoryUnpaidReducer,
} from "./reducers/inventoryReducers";

import {
  inventoryCategoryListReducer,
  inventoryCategoryDetailReducer,
} from "./reducers/inventoryCategoryReducers";

import {
  receiptListReducer,
  receiptUnpaidReducer,
  receiptDetailReducer,
  receiptPaidReducer,
  receiptRemoveReducer,
} from "./reducers/receiptReducers";

import {
  recipeListReducer,
  recipeDetailReducer,
  recipeCreateReducer,
  recipeUpdateReducer,
  recipeDeleteReducer,
} from "./reducers/recipeReducers";

import {
  inventoryLevelListReducer,
  inventoryLevelDetailReducer,
  inventoryLevelCreateReducer,
  InventoryLevelUpdateReducer,
  inventoryLevelDeleteReducer,
  inventoryLevelGroupedReducer,
  inventoryLevelSalaryReducer,
} from "./reducers/inventoryLevelReducers";

import {
  employeeListReducer,
  employeeCreateReducer,
  employeeDeleteReducer,
  employeeUpdateReducer,
} from "./reducers/employeeReducers";

const reducer = combineReducers({
  productList: productListReducer,
  productUpdate: productUpdateReducer,
  productDetails: productDetailReducer,
  productDelete: productDeleteReducer,
  productCreate: productCreateReducer,
  productReviewCreate: productReviewCreateReducer,
  productTopRated: productTopRatedReducer,
  productFiltered: productFilteredReducer,
  cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,
  orderCreate: orderCreateReducer,
  orderDetails: orderDetailsReducer,
  orderPay: orderPayReducer,
  orderListMy: orderListMyReducer,
  orderList: orderListReducer,
  orderDeliver: orderDeliverReducer,
  inventoryList: inventoryListReducer,
  inventorySalary: inventorySalaryReducer,
  inventoryUnpaid: inventoryUnpaidReducer,
  inventoryDetail: inventoryDetailReducer,
  inventoryDelete: inventoryDeleteReducer,
  inventoryUpdate: InventoryUpdateReducer,
  inventoryCreate: inventoryCreateReducer,
  inventoryCategoryList: inventoryCategoryListReducer,
  inventoryCategoryDetails: inventoryCategoryDetailReducer,
  inventoryCost: inventoryCostReducer,
  inventoryGroup: inventoryGroupReducer,
  inventoryDates: inventoryDatesReducer,
  receiptList: receiptListReducer,
  receiptDetails: receiptDetailReducer,
  receiptUnpaid: receiptUnpaidReducer,
  receiptPaid: receiptPaidReducer,
  receiptRemove: receiptRemoveReducer,
  recipeList: recipeListReducer,
  recipeDetails: recipeDetailReducer,
  recipeDelete: recipeDeleteReducer,
  recipeUpdate: recipeUpdateReducer,
  recipeCreate: recipeCreateReducer,
  inventoryLevelList: inventoryLevelListReducer,
  inventoryLevelSalary: inventoryLevelSalaryReducer,
  inventoryLevelGrouped: inventoryLevelGroupedReducer,
  inventoryLevelDetail: inventoryLevelDetailReducer,
  inventoryLevelDelete: inventoryLevelDeleteReducer,
  inventoryLevelUpdate: InventoryLevelUpdateReducer,
  inventoryLevelCreate: inventoryLevelCreateReducer,
  employeeList: employeeListReducer,
  employeeDelete: employeeDeleteReducer,
  employeeUpdate: employeeUpdateReducer,
  employeeCreate: employeeCreateReducer,
});

const cartItemsFromStorage = localStorage.getItem("cartItems")
  ? JSON.parse(localStorage.getItem("cartItems"))
  : [];

const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

const shippingAddressFromStorage = localStorage.getItem("shippingAddress")
  ? JSON.parse(localStorage.getItem("shippingAddress"))
  : {};

const initialState = {
  cart: {
    cartItems: cartItemsFromStorage,
    shippingAddress: shippingAddressFromStorage,
  },
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
