import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Row,
  Col,
  ListGroup,
  Image,
  Form,
  Button,
  Card,
} from "react-bootstrap";
import Message from "../components/Message";
import { addToCart, removeFromCart } from "../actions/cartActions";

const CartScreen = ({ match, location, history }) => {
  const productId = match.params.id;

  const qty = location.search ? Number(location.search.split("=")[2]) : 1;
  const vid = location.search && location.search.split("=")[1].split("?")[0];

  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty, vid));
    }
  }, [dispatch, productId, qty, vid]);

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    history.push("/login?redirect=shipping");
  };

  // console.log(history)

  return (
    <Col>
      <h1
        style={{
          textAlign: "center",
          fontFamily: "Montserrat,sans-serif",
          fontWeight: "900",
          color: "#4a4a4a",
        }}
      >
        {" "}
        Cart
      </h1>
      <div style={{ display: "flex", width: "100%", flexDirection: "column" }}>
        {cartItems.length === 0 ? (
          <Message>
            Your Cart is Empty <Link to='/'>Go Back</Link>
          </Message>
        ) : (
          <div style={{ width: "100%" }}>
            {cartItems.map((item, index) => {
              return (
                <Row
                  key={item.vid}
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    flexBasis: "33.3%",
                    padding: "10px",
                    alignItems: "center",
                    textAlign: "center",
                  }}
                >
                  <Col md={2}>
                    <Link to={`/product/${item.product}`}>
                      <Image
                        style={{
                          objectFit: "cover",
                          height: "150px",
                          width: "150px",
                        }}
                        src={item.image}
                        fluid
                        rounded
                      ></Image>
                    </Link>
                  </Col>
                  <Col>x {item.qty}</Col>
                  <Col md={3}>
                    <Row>
                      <h4>{item.option1_value}</h4>
                    </Row>
                    <Row>{item.option2_value}</Row>
                    <Row>{item.name}</Row>
                  </Col>

                  <Col md={2}>Rs.{item.price}</Col>
                  {/* <Col md={2}>
                      <Form>
                        <Button
                          className='bi bi-plus'
                          type='button'
                          onClick={() =>
                            dispatch(
                              addToCart(
                                item.product,
                                Number(item.qty > 1 ? item.qty - 1 : item.qty)
                              )
                            )
                          }
                        >
                          <i className='fas fa-minus-square' />
                        </Button>
                        <h3>{item.qty}</h3>
                        <Button
                          type='button'
                          onClick={() =>
                            dispatch(
                              addToCart(item.product, Number(item.qty + 1))
                            )
                          }
                        >
                          <i className='fas fa-plus-square' />
                        </Button>
                      </Form>
                    </Col> */}
                  <Col md={2}>
                    <Button
                      type='button'
                      variant='light'
                      onClick={() => removeFromCartHandler(item.vid)}
                    >
                      <i className='fas fa-trash' />
                    </Button>
                  </Col>
                </Row>
              );
            })}
          </div>
        )}

        <Row
          style={{
            width: "100%",
            height: "fit-content",
            display: "flex",
            alignSelf: "center",
            justifyContent: "center",
            margin: "2rem"
          }}
        >
          <Row style={{ border: "1px solid rgba(0, 0, 0, 0.125" }}>
            <h3 style={{marginLeft: "1rem"}}>
              Subtotal:{" "}
              {
                <text>
                  Rs.
                  {cartItems
                    .reduce((acc, item) => acc + item.qty * item.price, 0)
                    .toFixed(0)}
                </text>
              }
              {/* ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) */}
            </h3>
          </Row>

          {/* <Button
                type='button'
                className='btn-block'
                disabled={cartItems.length === 0}
                onClick={checkoutHandler}
              >
                Checkout
              </Button> */}
        </Row>
      </div>
      {/* <div style={{height: "70px", width:"100%", backgroundColor:"#ed1c24", position:"fixed", bottom:"0"}}>

      </div> */}
    </Col>
  );
};

export default CartScreen;
