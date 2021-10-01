import React from "react";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";


const Product = ({ product }) => {
  return (
    <Card
      className='my-3 p-3 rounded'
    >
      <Link to={`/product/${product._id}`}>
        <Card.Img
          style={{ width: "100%", height: "350px", borderRadius: 3 }}
          src={product.variants.variant_image}
          variant='top'
        />
      </Link>
      <Card.Body>
          <Card.Title as='div'>
            <strong>{product.variants.option1_value}</strong>
          </Card.Title>
        
      </Card.Body>
    </Card>
  );
};

export default Product;
