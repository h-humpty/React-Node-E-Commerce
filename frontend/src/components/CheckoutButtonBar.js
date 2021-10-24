import React, {
  useRef,
  useEffect,
  useState,
  useMemo,
  useCallback,
} from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Button } from "react-bootstrap";

const CheckoutButtonBar = () => {
  const history = useHistory();

  const ref = useRef();
  const [top, setTop] = useState(0);

  const getTop = () => {
    if (ref.current) {
      return ref.current.offsetTop;
    }
  };

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const checkoutHandler = () => {
    history.push("/login?redirect=shipping");
  };

  // console.log(top);

  useEffect(() => {
    setTop(getTop);
    window.addEventListener("resize", getTop);

    return () => {
      window.removeEventListener("resize", getTop);
    };
  }, [getTop]);

  return (
    <div
      ref={ref}
      style={{ backgroundColor: "#ed1c24", height: "70px", width: "100%" }}
    >
      <span style={{ lineHeight: "60px" }}>
        <span style={{ display: "inline-block" }} />
      </span>

      <div
        style={{
          position: "absolute",
          right: "5%",
          minWidth: "200px",
          top: `${top - 20}px`,
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
            width: "100%",
          }}
        >
          Checkout
        </Button>
      </div>
    </div>
  );
};

export default CheckoutButtonBar;
