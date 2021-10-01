import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
  return (
    <footer
      style={{
        display: "grid",
        height: "150px",
        backgroundColor: "floralwhite",
        alignContent: "center",
      }}
    >
      <Container>
        <Row>
          <Col
            style={{
              fontFamily: "Barlow Condensed,sans-serif",
              fontWeight: "500",
              marginBottom: "20px"
            }}
            className='text-center py-3'
          >
            © BACKYARD BBQ RESTAURANT ALL RIGHTS RESERVED
          </Col>
          <Col className='text-center py-3'>
{/* 
          <button
              style={{
                backgroundColor: "#DB4437",
                marginInline: "10px",
                alignContent: "center",
                display: "inline-flex",
              }}
              onClick={()=> window.open("https://goo.gl/maps/SuVkFVGJGHUektEk6")}
              className='social-media'
            >
              <i
                style={{ fontSize: "1.73em", marginRight: "9px" }}
                class="fas fa-map-marker-alt"
              ></i>{" "}
              FIND US ON GOOGLE MAPS
            </button> */}

            <button
              style={{
                backgroundColor: "#4267B2",
                marginInline: "10px",
                alignContent: "center",
                display: "inline-flex",
                width: "250px",
                justifyContent: "center",
                letterSpacing: "1px",
                padding: "10px"
              }}
              onClick={()=> window.open("https://www.facebook.com/Backyardbbqrestaurant/?ref=page_internal")}
              className='social-media'
            >
              <i
                style={{ fontSize: "1.73em", marginRight: "9px" }}
                class='fab fa-facebook-square'
              ></i>{" "}
              LIKE US ON FACEBOOK
            </button>

            <button
              style={{
                backgroundColor: "#F58529",
                marginInline: "10px",
                alignContent: "center",
                display: "inline-flex",
                width: "250px",
                justifyContent: "center",
                letterSpacing: "1px",
                padding: "10px"
              }}
              onClick={()=> window.open("https://www.instagram.com/backyard.bbq.restaurant/?hl=en")}
              className='social-media'
            >
              <i
                style={{ fontSize: "1.73em", marginRight: "9px" }}
                class='fab fa-instagram'
              ></i>{" "}
              FOLLOW US ON INSTAGRAM
            </button>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
