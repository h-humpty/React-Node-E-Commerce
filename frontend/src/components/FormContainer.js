import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const FormContainer = ({ children }) => {
  return (
    <Container>
      <Row className='justify-content-md-center'>
        <Col
          style={{
            display: "grid",
            alignContent: "center",
            width: "100%",
          }}
          md={10}
        >
          {children}
        </Col>
      </Row>
    </Container>
  );
};

export default FormContainer;
