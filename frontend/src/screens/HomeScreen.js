import React, { useEffect, useState, useMemo } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Row, Col, Card, Container } from "react-bootstrap";
import Product from "../components/Product";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { listTopProducts } from "../actions/productActions";
import ItemsCarousel from "react-items-carousel";

const HomeScreen = ({ match, history }) => {


  const dispatch = useDispatch();

  const productTopRated = useSelector((state) => state.productTopRated);
  const { loading, error, products } = productTopRated;
  const [screenWidth, setScreenWidth] = useState(window.innerWidth)

  const [index, setIndex] = useState(0);

  useEffect(() => {
    dispatch(listTopProducts());
    
  }, [dispatch, screenWidth]);


  const handleClick = (id) => {
    history.push(`/product/${id}`);
  };

  return (
    <div style={{overflowX: "hidden"}}>
      <Helmet>
        <title>Welcome to Backyard BBQ</title>
        <meta
          name='description'
          content='Restaurant online store for delivery'
        ></meta>
      </Helmet>

      {!loading && (
        <div
          style={{
            backgroundImage: `url(${products[2].variants.variant_image})`,
            height: "65vh",
            backgroundSize: "cover",
            flex: 1,
          }}
          className='div-image'
        >
          <div
            style={{
              display: "grid",
              height: "100%",
              justifyItems: "center",
              alignContent: "center",
            }}
          >
            <h1
              style={{
                color: "white",
               
                textShadow: "3px 3px black",
                textAlign: "center",
              }}
            >
              ENJOY ALL YOUR FAVORITE MEALS AT
            </h1>
            <h2
              style={{
                color: "white",
               
                textAlign: "center",
                textShadow: "3px 3px black",
              }}
            >
              BACKYARD BBQ RESTAURANT
            </h2>
            <Link
              style={{ justifyContent: "center", display: "flex" }}
              to='/products'
            >
              <button className='center' variant='contained'>
                START ORDER
              </button>
            </Link>
          </div>
        </div>
      )}
      <Container>
        <h1
          style={{
            textAlign: "center",
            fontFamily: "Montserrat,sans-serif",
            fontWeight: "900",
            color: "#4a4a4a",
            fontSize: "2.7rem",
          }}
        >
          BACKYARD BBQ'S DEALS
        </h1>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error} </Message>
        ) : (
          <div className="carousel-slider" >
            {/* {products.map((product, idx) => (
              <Col key={idx} sm={16} md={6} lg={4} xl={3}>
                <Product product={product} />
              </Col>
            ))} */}

            <ItemsCarousel
              requestToChangeActive={setIndex}
              activeItemIndex={index}
              numberOfCards={screenWidth < 850 ? 1 : 3}
              gutter={20}
              leftChevron={
                <i
                  style={{ color: "black" }}
                  class='fas fa-chevron-circle-left'
                ></i>
              }
              rightChevron={
                <i
                  style={{ color: "black" }}
                  class='fas fa-chevron-circle-right'
                ></i>
              }
              outsideChevron
              chevronWidth={40}
              slidesToScroll={screenWidth < 850 ? 1 : 3}
              alwaysShowChevrons={false}
              className="carousel-card"
            >
              {products.map((product, idx) => {
                return (
                  <Card
                    style={{ border: "1px solid rgba(0, 0, 0, 0.125)" }}
                    key={idx}
                    className='my-3 p-3 rounded'
                  >
                    <Card.Img
                      style={{
                        width: "100%",
                        height: "350px",
                        borderRadius: 3,
                        objectFit: "cover",
                        cursor: "default",
                      }}
                      src={product.variants.variant_image}
                      variant='top'
                    />

                    <Card.Body>
                      <Card.Title as='div'>
                        <strong>{product.variants.option1_value}</strong>
                      </Card.Title>
                    </Card.Body>
                    <button
                      onClick={() => handleClick(product._id)}
                      className='center-smaller'
                    >
                      ADD TO ORDER
                    </button>
                  </Card>
                );
              })}
            </ItemsCarousel>
          </div>
        )}
      </Container>
      {!loading && (
        <div
          style={{
            display: "flex",
            width: "100%",
            flex: 2,
   
          }}

          className="home-div"
        >
          <div
            style={{
              backgroundImage: `url(https://lamarquise.ae/wp-content/uploads/2020/09/Mix-Grill-Platter-01.jpg)`,
              width: "100%",

              backgroundSize: "cover",
              flex: 1,
              backgroundPosition: "center",
              display: "flex",
            }}
            className='div-image'
          />
          <div
            style={{
              display: "flex",
              height: "100%",
              width: "100%",
              flex: 1,
              flexDirection: "column",
              backgroundColor: "floralwhite ",
              justifyContent: "center",
            }}
          >
            <h3
              style={{
                color: "#4a4a4a",
                fontSize: "40px",
                fontWeight: "900",
                textAlign: "center",
                fontFamily: "Montserrat,sans-serif",
                padding: "30px",
              }}
            >
              Try our new Arabic Platter !
            </h3>
            <h4
              style={{
                color: "#4a4a4a",
                fontSize: "20px",
                textAlign: "center",
                padding: "30px",
                lineHeight: "2rem",
              }}
            >
              Every month we come out with a new and unique premium deals for
              you to try. Stop by your local Backyard BBQ today to try this
              month's exclusive deal. Hurry in before it's gone and keep your
              eyes peeled for next month's deal.
            </h4>

            <Link
              style={{
                justifyContent: "center",
                display: "flex",
                alignSelf: "center",
                margin: "2rem",
              }}
              to='/products'
            >
              <button className='center' variant='contained'>
                LEARN MORE
              </button>
            </Link>
          </div>
        </div>
      )}

      {!loading && (
        <div
          style={{
            backgroundImage: `url(https://images.prismic.io/brinker-chilis/75f65348-f119-445b-8271-f41beb916ded_ChilisWeb_OutToIta_FajitaArray_Q3F20.jpg?auto=compress,format&rect=0,0,1600,512&w=1600&h=512)`,
            width: "100%",
            height: "600px",
            backgroundSize: "cover",
            flex: 1,
            backgroundPosition: "center",
          }}
          className='div-image'
        >
          <div
            style={{
              display: "grid",
              height: "100%",
              justifyItems: "center",
              alignContent: "center",
            }}
          >
            <h3
              style={{
                color: "white",
                fontSize: "50px",
                fontWeight: "900",
                textAlign: "center",
                fontFamily: "Montserrat,sans-serif",
              }}
            >
              Get Backyard BBQ for Delivery or Pickup now !
            </h3>
            <h4
              style={{
                color: "white",
                fontSize: "20px",
                textAlign: "center",
                lineHeight: "2rem",
              }}
            >
              We've got food deals the whole family will love for lunch or
              dinner!
            </h4>

            <Link
              style={{
                justifyContent: "center",
                display: "flex",
                padding: "30px",
              }}
              to='/products'
            >
              <button className='center' variant='contained'>
                ORDER NOW
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomeScreen;
