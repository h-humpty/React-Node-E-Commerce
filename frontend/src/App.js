import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Container } from "react-bootstrap";
import Header from "./components/Header";
import Footer from "./components/Footer";
import CheckoutButtonBar from "./components/CheckoutButtonBar";
import HomeScreen from "./screens/HomeScreen";
import ProductsScreen from "./screens/ProductsScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";
import ShippingScreen from "./screens/ShippingScreen";
import PaymentScreen from "./screens/PaymentScreen";
import PlaceOrderScreen from "./screens/PlaceOrderScreen";
import OrderScreen from "./screens/OrderScreen";
import UserListScreen from "./screens/UserListScreen";
import UserEditScreen from "./screens/UserEditScreen";
import ProductListScreen from "./screens/ProductListScreen";
import ProductEditScreen from "./screens/ProductEditScreen";
import OrderListScreen from "./screens/OrderListScreen";
import InventoryListScreen from "./screens/InventoryListScreen";
import InventoryCreateScreen from "./screens/InventoryCreateScreen";
import InventoryEditScreen from "./screens/inventoryEditScreen";
import ReceiptListScreen from "./screens/ReceiptListScreen";
import ReceiptDetailScreen from "./screens/ReceiptDetailScreen";
import RecipeListScreen from "./screens/RecipeListScreen";
import RecipeCreateScreen from "./screens/RecipeCreateScreen";
import RecipeEditScreen from "./screens/RecipeEditScreen";
import InventoryLevelListScreen from "./screens/InventoryLevelListScreen";
import SalaryListScreen from "./screens/SalaryListScreen";
import FinancialSummaryScreen from "./screens/FinancialSummaryScreen";
import BillScreen from "./screens/BillScreen";

const App = () => {
  const withHeader = () => {
    return (
      <div>
        <Header />
        <main className='py-3'>
          <Switch>
            <Route path='/page/:pageNumber' component={HomeScreen} exact />
            <Route
              path='/search/:keyword/page/:pageNumber'
              component={HomeScreen}
              exact
            />
            <Route path='/search/:keyword' component={HomeScreen} exact />
            <Route path='/' component={HomeScreen} exact />
            <Container>
              {/* <Route path="/" render={ ( props ) => ( props.location.pathname !== "/") && <Header /> }> */}
              <Route path='/products' component={ProductsScreen} />
              <Route path='/login' component={LoginScreen} />
              <Route path='/order/:id' component={OrderScreen} />
              <Route path='/placeorder' component={PlaceOrderScreen} />
              <Route path='/shipping' component={ShippingScreen} />
              <Route path='/payment' component={PaymentScreen} />
              <Route path='/register' component={RegisterScreen} />
              <Route path='/profile' component={ProfileScreen} />
              <Route path='/product/:id' component={ProductScreen} />
              <Route path='/admin/userlist' component={UserListScreen} />
              <Route path='/admin/user/:id/edit/' component={UserEditScreen} />
              <Route path='/admin/productlist' component={ProductListScreen} />
              <Route
                path='/admin/product/:id/edit'
                component={ProductEditScreen}
              />
              <Route path='/admin/orderlist' component={OrderListScreen} />
              <Route path='/admin/receiptlist' component={ReceiptListScreen} />
              <Route
                path='/admin/receipt/:id'
                component={ReceiptDetailScreen}
              />
              <Route
                path='/admin/inventorylist'
                component={InventoryListScreen}
              />
              <Route
                path='/admin/inventory/create'
                component={InventoryCreateScreen}
              />
              <Route
                path='/admin/inventory/:id/edit'
                component={InventoryEditScreen}
              />
              <Route
                path='/admin/inventorylevellist'
                component={InventoryLevelListScreen}
              />
              <Route path='/admin/recipelist' component={RecipeListScreen} />
              <Route
                path='/admin/recipe/create'
                component={RecipeCreateScreen}
              />
              <Route
                path='/admin/recipe/:id/edit/:name'
                component={RecipeEditScreen}
              />
              <Route path='/admin/salarylist' component={SalaryListScreen} />
              <Route
                path='/admin/financialsummary'
                component={FinancialSummaryScreen}
              />
              <Route path='/admin/billlist' component={BillScreen} />
              <Route
                path='/admin/productlist/:pageNumber'
                component={ProductListScreen}
                exact
              />
            </Container>
          </Switch>
        </main>

        <Footer />
      </div>
    );
  };

  const addedCartButton = () => {
    return (
      <div>
        <Header />
        <main className='py-3'>
          <Switch>
            <Container>
              <Route path='/cart/:id?' exact component={CartScreen} />
            </Container>
          </Switch>
        </main>
        <CheckoutButtonBar />
        <Footer />
      </div>
    );
  };

  return (
    <Router>
      <Switch>
        <Route exact path='/cart/:id?' component={addedCartButton} />
        <Route path='/' component={withHeader} />
      </Switch>
    </Router>
  );
};

export default App;
