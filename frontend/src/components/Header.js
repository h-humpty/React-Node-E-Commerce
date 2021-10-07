import React from "react";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/userActions";
import logo from "../../src/BACKYARD-BBQ.svg";

const Header = () => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <header>
      <Navbar
        style={{ backgroundColor: "#ed1c24", }}
        
        variant='dark'
        expand='lg'
        collapseOnSelect
      >
        <Container style={{display: "contents"}}>
          <LinkContainer to='/'>
            <img
              style={{ height: "80px", width: "200px", cursor: "pointer" }}
              src={logo}
              alt='BACKYARD BBQ RESTAURANT'
            />
          </LinkContainer>
          {/* <Route render={({ history }) => <SearchBox history={history} />} /> */}
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse style={{backgroundColor: "#ed1c24", zIndex:1, transition: "none 0s ease 0s" }} id='basic-navbar-nav'>
            <Nav style={{textTransform: "uppercase"}} className='ml-auto '>
              {userInfo ? (
                <NavDropdown title={userInfo.name} id='username'>
                  <LinkContainer to='/profile'>
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to='/login'>
                  <Nav.Link >
                    <i className='fas fa-user'></i> SIGN IN
                  </Nav.Link>
                </LinkContainer>
              )}
              {userInfo && userInfo.isAdmin && (
                <NavDropdown  title='ADMIN' id='adminmenu'>
                  
                  <LinkContainer to='/admin/userlist'>
                    <NavDropdown.Item>Users</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/productlist'>
                    <NavDropdown.Item>Products</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/orderlist'>
                    <NavDropdown.Item>Orders</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/inventorylist'>
                    <NavDropdown.Item>Expenses</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/receiptlist'>
                    <NavDropdown.Item>Receipts</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/salarylist'>
                    <NavDropdown.Item>Salaries</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/recipelist'>
                    <NavDropdown.Item>Recipes</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/inventorylevellist'>
                    <NavDropdown.Item>Inventory Levels</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/billlist'>
                    <NavDropdown.Item>
                      Bill Payable / Recieavable
                    </NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/financialsummary'>
                    <NavDropdown.Item>Financial Summary</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
              <LinkContainer to='/products'>
                <Nav.Link className='header-font'>MENU</Nav.Link>
              </LinkContainer>
              <LinkContainer to='/cart'>
                <Nav.Link className='header-font'>
                  <i className='fas fa-shopping-cart'></i> CART
                </Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div
        style={{
          height: "50px",
          backgroundColor: "floralwhite",
          display: "grid",
          boxShadow: "0 1px 2px 0 hsl(0deg 0% 61% / 50%)",
          justifyContent: "center",
          textAlign: "center",
          alignItems: "center",
        }}
      >
        <a
          href={"https://goo.gl/maps/SuVkFVGJGHUektEk6"}
          target='_blank'
          rel='noreferrer'
        >
          <i
            style={{
              marginRight: "9px",
              color: "#ed1c24",
              alignSelf: "center",
              fontSize: "27px",
            }}
            class='fas fa-map-marker-alt'
          ></i>
          <text
            style={{
              color: "darkorange",
              fontSize: "20px",
              fontWeight: "400",
              letterSpacing: ".05rem",
            }}
          >
            Find us on Google Maps
          </text>
        </a>
      </div>
    </header>
  );
};

export default Header;
