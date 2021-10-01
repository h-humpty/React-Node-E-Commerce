import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Button } from "react-bootstrap";

const CheckoutButtonBar = () => {
  const history = useHistory();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  // console.log(history)

  const checkoutHandler = () => {
    history.push("/login?redirect=shipping");
  };

  return (
    <div style={{ backgroundColor: "#ed1c24", height: "70px", width: "100%" }}>
      <span style={{ lineHeight: "60px" }}>
        <span style={{ display: "inline-block" }} />
      </span>

      <div
        style={{
          top: "92%",
          position: "absolute",
          right: "5%",
          minWidth: "200px",
        }}
      >
        <Button
          type='button'
          className='btn-block'
          disabled={cartItems.length === 0}
          onClick={checkoutHandler}
          style={{
            color: "#fff",
            backgroundColor: "#4582ec",
            boxShadow: "0 5px 5px 0 rgba(0,0,0,0.15)",
            fontSize: "20px",
            borderRadius: "5px",
            width: "100%"
          }}
        >
          Checkout
        </Button>
      </div>
    </div>
  );
};

export default CheckoutButtonBar;
