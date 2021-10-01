import React, { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Card, Button, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  listProductDetails,
  createProductReview,
} from "../actions/productActions";
import Message from "../components/Message";
import Loader from "../components/Loader";
import Rating from "../components/Rating";
import { PRODUCT_CREATE_REVIEW_RESET } from "../constants/productConstants";
import { IndexLinkContainer } from "react-router-bootstrap";

const ProductScreen = ({ match, history }) => {
  const [qty, setQty] = useState([]);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [productList, setProductList] = useState({});

  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { error, loading, product } = productDetails;

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const productReviewCreate = useSelector((state) => state.productReviewCreate);
  const { success: successProductReview, error: errorProductReview } =
    productReviewCreate;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productFind =
    productList &&
    product.variants &&
    product.variants.filter(
      (x) => x.option1_value === productList[x.option1_value]
    );

  //   console.log(productFind)
  // console.log(cartItems);
  // console.log(product)
  // console.log(qty);
  // console.log(productList)
  useEffect(() => {
    dispatch(listProductDetails(match.params.id));

    let obj = {};

    product.variants &&
      product.variants.map((items) => {
        const pName = items.option1_value
          ? items.option1_value
          : product.item_name;

        obj[pName] = 1;
      });

    setProductList(() => ({ ...obj }));

    if (successProductReview) {
      setRating(0);
      setComment("");
    }

    if (productFind) {
   
      // console.log(list);

      // product.variants &&
      //   product.variants.map((items, index1) => {
      //     cartItems.map((cart, index2) => {
      //       if (cart.vid === items.variant_id) {
      //         list[cart.option1_value] = cart.qty;
      //       }
      //     });
      //   });

      // setProductList(() => ({ ...list }));
    }
    if (successProductReview) {
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    }
  }, [dispatch, match, product._id]);


   useMemo(() => {

    if(productList) {
      let list = {...productList}
      product.variants &&
        product.variants.map((items, index1) => {
          cartItems.map((cart, index2) => {
            if (cart.vid === items.variant_id) {
              list[cart.option1_value] = cart.qty;
            }
          });
        });

      setProductList(() => ({ ...list }));
    }

  }, [cartItems, product.variants])

  // const submitHandler = (e) => {
  //   e.preventDefault();
  //   dispatch(
  //     createProductReview(match.params.id, {
  //       rating,
  //       comment,
  //     })
  //   );
  // };

  const decrement = (index) => {
    const list = { ...productList };

    if (list[index] > 1) {
      list[index] += -1;
      setProductList(list);
    }
  };

  const increment = (index) => {
    const list = { ...productList };
    list[index] += 1;
    setProductList(list);
  };

  const addToCartHandler = (vid, index) => {
    history.push(
      `/cart/${match.params.id}?vid=${vid}?qty=${productList[index]}`
    );
  };

  return (
    <>
      {/* <Link className='btn btn-light my-3' to='/products'>
        GO BACK
      </Link> */}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <h1 style={{ textAlign: "center" }}>
            <strong>{product.item_name}</strong>
          </h1>
          <Row style={{ display: "flex", justifyContent: "center" }}>
            {product.variants.map((item, index) => {
              return (
                <Col
                  style={{ padding: "5px" }}
                  sm={16}
                  md={6}
                  lg={4}
                  xl={3}
                  key={index}
                >
                  <Card className='my-3 p-3 rounded'>
                    {item.option1_value && (
                      <Card.Text
                        style={{ textAlign: "center", marginBotton: "10px" }}
                        as='div'
                      >
                        <strong> {item.option1_value} </strong>
                      </Card.Text>
                    )}
                    <Card.Img
                      style={{
                        width: "100%",
                        height: "350px",
                        borderRadius: 3,
                        objectFit: "cover",
                      }}
                      src={product.image_url}
                      variant='top'
                    />

                    <Card.Body>
                      {item.option2_value && (
                        <Card.Text>{item.option2_value}</Card.Text>
                      )}
                      <Card.Title>Rs. {item.default_price}</Card.Title>

                      <Col
                        style={{
                          marginTop: "10px",
                          marginBottom: "5px",
                          width: "100%",
                        }}
                        className='text-center py-3'
                      >
                        <Button
                          className='social-media'
                          type='button'
                          onClick={() => decrement(item.option1_value)}
                          style={{
                            backgroundColor: "red",
                            alignContent: "center",
                            display: "inline-flex",
                            marginInline: "10px",
                          }}
                        >
                          <i
                            style={{ fontSize: "1.1em" }}
                            className='fas fa-minus-square'
                          />
                        </Button>

                        <Card.Subtitle
                          style={{
                            marginInline: "10px",
                            alignContent: "center",
                            display: "inline-flex",
                          }}
                        >
                          Quantity : {productList[item.option1_value]}
                        </Card.Subtitle>

                        <Button
                          type='button'
                          className='social-media'
                          onClick={() => increment(item.option1_value)}
                          style={{
                            backgroundColor: "red",
                            alignContent: "center",
                            display: "inline-flex",
                            marginInline: "10px",
                          }}
                        >
                          <i
                            style={{ fontSize: "1.1em" }}
                            className='fas fa-plus-square'
                          />
                        </Button>
                      </Col>

                      <Button
                        onClick={() =>
                          addToCartHandler(item.variant_id, item.option1_value)
                        }
                        className='social-media'
                        type='button'
                        style={{
                          width: "100%",
                          backgroundColor: "red",
                          fontSize: "0.6em",
                        }}
                      >
                        ADD TO CART
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
          </Row>
          {/* <Row>
            <Col md={6}>
              <h2>Reviews</h2>
              {product.reviews.length === 0 && <Message>No Reviews</Message>}
              <ListGroup variant='flush'>
                {product.reviews.map((review) => (
                  <ListGroup.Item key={review._id}>
                    <strong>{review.name}</strong>
                    <Rating value={review.rating}></Rating>
                    <p>{review.createdAt.substring(0, 10)}</p>
                    <p>{review.comment}</p>
                  </ListGroup.Item>
                ))}
                <ListGroup.Item>
                  <h2>Write a Customer Review</h2>
                  {errorProductReview && (
                    <Message variant='danger'>{errorProductReview}</Message>
                  )}
                  {userInfo ? (
                    <Form onSubmit={submitHandler}>
                      <Form.Group controlId='rating'>
                        <Form.Label>Rating</Form.Label>
                        <Form.Control
                          as='select'
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                        >
                          <option value=''>Select..</option>
                          <option value='1'>Poor</option>
                          <option value='2'>Fair</option>
                          <option value='3'>Good</option>
                          <option value='4'>Very Good</option>
                          <option value='5'>Excellent</option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group controlId='comment'>
                        <Form.Label>Comment</Form.Label>
                        <Form.Control
                          as='textarea'
                          row='3'
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                      <Button type='submit' variant='primary'>
                        Submit
                      </Button>
                    </Form>
                  ) : (
                    <Message>
                      Please <Link to='/login'>sign in</Link> to write a review
                    </Message>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row> */}
        </>
      )}
    </>
  );
};

export default ProductScreen;
