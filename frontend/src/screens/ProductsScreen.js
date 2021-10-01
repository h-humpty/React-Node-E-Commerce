import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { listProducts } from "../actions/productActions";

const ProductsScreen = ({ match }) => {
  // const keyword = match.params.keyword;
  // const pageNumber = match.params.pageNumber || 1;

  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  console.log(productList);

  return (
    <>
      <Helmet>
        <title>Welcome to Backyard BBQ</title>
        <meta
          name='description'
          content='Retaurant online store for delivery'
        ></meta>
      </Helmet>

      {/* {!keyword && <ProductCarousel />} */}
      <h1 style={{ textAlign: "center" }}>BACKYARD BBQ'S MENU</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Row style={{ display: "flex" }}>
          {products.map((product, idx) => {
            if (
              product.item_name !== "Cigarette" &&
              product.item_name !== "Delivery Charges" &&
              product.item_name !== "Crockery"
            ) {
              return (
                <Col
                  style={{ width: "25%" }}
                  key={idx}
                  sm={16}
                  md={6}
                  lg={4}
                  xl={3}
                >
                  <Card key={idx} className='my-3 p-3 rounded'>
                    <Link
                      style={{
                        boxShadow: "0 2px 10px 0 hsl(0deg 0% 61% / 50%)",
                      }}
                      to={`/product/${product._id}`}
                    >
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
                    </Link>

                    <Card.Body>
                      <Card.Title as='div'>
                        <strong>{product.item_name}</strong>
                      </Card.Title>
                    </Card.Body>
                  </Card>
                </Col>
              );
            }
          })}
        </Row>
      )}
    </>
  );
};

export default ProductsScreen;
