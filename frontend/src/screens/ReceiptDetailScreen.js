import React, { useEffect } from "react";
import { Row, Col, ListGroup, Card} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { listReceiptDetails } from "../actions/receiptActions";

const ReceiptDetailScreen = ({ match, history }) => {
  const receiptId = match.params.id;

  const dispatch = useDispatch();

  const receiptDetails = useSelector((state) => state.receiptDetails);
  const { receipt, loading, error } = receiptDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  console.log(receiptDetails)

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    }

    if (!receipt || receipt.receipt_number !== receiptId) {
      dispatch(listReceiptDetails(receiptId));
    }
  }, [dispatch, history, userInfo, receipt, receiptId]);

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : (
    <>
      <h1>Order {receipt.receipt_number}</h1>
      <Row>
        <Col md={8}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>Details</h2>
              <p>
                <strong>Date: </strong> {receipt.receipt_date}
              </p>
              <p>
                <strong>Customer ID: </strong>
                {receipt.customer_id}
              </p>
              <p>
                <strong>Points Earned:</strong>
                {receipt.points_earned}
              </p>
              <p>
                <strong>Points Balance:</strong>
                {receipt.points_balance}
              </p>
            </ListGroup.Item>

            <ListGroup.Item>
              <h2>Items</h2>

              <ListGroup variant='flush'>
                {receipt.line_items.map((item, index) => (
                  <ListGroup.Item key={index}>
                    <Row>
                      <Col md={1}></Col>
                      <Col>{item.variant_name}</Col>
                      <Col md={4}>
                        {item.quantity} x Rs. {item.price} = 
                        Rs. {item.quantity * item.price}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={4}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>Receipt Summary</h2>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total Discount</Col>
                  <Col>Rs. {receipt.total_discount}</Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Total</Col>
                  <Col>Rs. {receipt.total_money}</Col>
                </Row>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default ReceiptDetailScreen;
