import React, { useEffect, useState } from "react";
// import { LinkContainer } from "react-router-bootstrap";
import {
  Table,
  Row,
  Button,
  Col,
  Tabs,
  Tab,
  Modal,
  Form,
} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import {
  unpaidReceipt,
  listReceiptDetails,
  paidReceipt,
  removeReceipt,
} from "../actions/receiptActions";
import { unpaidInventory, updateInventory } from "../actions/inventoryActions";
import { RECEIPT_DETAILS_RESET } from "../constants/receiptConstants";

const BillScreen = ({ history }) => {
  // const pageNumber = match.params.pageNumber || 1;

  const [show, setShow] = useState(false);
  const [payableShow, setPayableShow] = useState(false);

  const [receiptId, setReceiptId] = useState("");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [payableDate, setPayableDate] = useState(
    new Date().toISOString().slice(0, 10)
  );
  const [payableId, setPayableId] = useState("");

  const dispatch = useDispatch();

  const receiptUnpaid = useSelector((state) => state.receiptUnpaid);
  const {
    loading: loadingUnpaid,
    error: errorUnpaid,

    receipt,
  } = receiptUnpaid;

  const receiptPaid = useSelector((state) => state.receiptPaid);
  const { success: successPaid } = receiptPaid;

  const receiptRemove = useSelector((state) => state.receiptRemove);
  const { success: successRemove } = receiptRemove;

  const inventoryUnpaid = useSelector((state) => state.inventoryUnpaid);
  const {
    loading: loadingInventory,
    error: errorInventory,
    success: successInventory,
    inventory,
  } = inventoryUnpaid;

  const inventoryUpdate = useSelector((state) => state.inventoryUpdate);
  const { success: successInventoryUpdate } = inventoryUpdate;

  const receiptDetails = useSelector((state) => state.receiptDetails);
  const { success: successDetails } = receiptDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const [showArr, setShowArr] = useState(
    receipt &&
      receipt.map((items) => {
        if (items.paid === false) {
          return false;
        }
      })
  );

  useEffect(() => {
    if (userInfo || userInfo.isAdmin) {
      dispatch(unpaidReceipt());
      dispatch(unpaidInventory());
    } else {
      history.push("/login");
    }

    if (successDetails || successPaid || successRemove) {
      dispatch({ type: RECEIPT_DETAILS_RESET });
      history.push("/admin/billlist");
      setReceiptId("");
    }

    if (successInventoryUpdate) {
      history.push("/admin/billlist");
      setPayableDate(new Date().toISOString().slice(0, 10));
      setPayableId("");
    }
  }, [
    dispatch,
    history,
    userInfo,
    successInventory,
    successDetails,
    successPaid,
    successRemove,
    successInventoryUpdate,
  ]);

  const reduceBillsRecievable = () => {
    if (!loadingUnpaid && receipt) {
      const TotalCost = receipt
        .filter((items) => items.paid === false)
        .reduce((a, b) => a + parseInt(b.total_money), 0);
      return (
        <Row
          style={{
            width: "100%",
            flex: 1,
            bottom: 0,
            alignContent: "flex-end",
            alignItems: "flex-end",
          }}
        >
          <h5>Total Bills Recievable Rs : {TotalCost.toLocaleString()}</h5>
        </Row>
      );
    }
  };

  const reduceBillsPayable = () => {
    if (!loadingInventory && inventory) {
      const TotalCost = inventory
        .filter((items) => items.paid === false)
        .reduce((a, b) => a + parseInt(b.total_cost), 0);
      return (
        <Row
          style={{
            width: "100%",
            flex: 1,
            bottom: 0,
            alignContent: "flex-end",
            alignItems: "flex-end",
          }}
        >
          <h5>Total Bills Payable Rs : {TotalCost.toLocaleString()}</h5>
        </Row>
      );
    }
  };

  const submitPaid = (idx) => {
    handleClose(idx);
    dispatch(
      paidReceipt({
        receiptNumber: receiptId,
        date: new Date(date).toISOString(),
      })
    );
  };

  // const submitRemove = (receiptNumber) => {
  //   dispatch(removeReceipt(receiptNumber));
  // };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(listReceiptDetails(receiptId));
  };

  const submitPayableHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateInventory({
        _id: payableId,
        datePaid: new Date(payableDate).toISOString(),
        paid: true,
      })
    );
  };

  const handleOpen = (idx, receipt) => {
    let list = [...showArr];
    list[idx] = true;
    setShowArr(list);
    setReceiptId(receipt);
  };

  const handleClose = (idx) => {
    let list = [...showArr];
    list[idx] = false;
    setShowArr(list);
  };

  const handlePayableOpen = (id) => {
    setPayableShow(true);
    setPayableId(id);
  };

  return (
    <>
      <Tabs
        defaultActiveKey='bills_recievable'
        id='uncontrolled-tab'
        className='mb-3'
      >
        <Tab eventKey='bills_recievable' title='Bills Recievable'>
          <Row className='align-items-center'>
            <Col>
              <h1>Bills Recievable</h1>
            </Col>
          </Row>
          {loadingUnpaid ? (
            <Loader />
          ) : errorUnpaid ? (
            <Message variant='danger'>{errorUnpaid}</Message>
          ) : (
            <>
              <Row className='align-items-center'>
                <Button className='my-3' onClick={() => setShow(true)}>
                  <i className='fas fa-plus'></i> Add Bill Receivable
                </Button>

                <Modal show={show} onHide={() => setShow(false)}>
                  <Modal.Header closeButton>
                    <Modal.Title>Add Bill Receivable</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <Form onSubmit={submitHandler}>
                      <Form.Group controlId='id' style={{ padding: 10 }}>
                        <Form.Label style={{ padding: 10 }}>
                          Receipt Number
                        </Form.Label>
                        <Form.Control
                          type='text'
                          placeholder='Enter ID'
                          value={receiptId}
                          onChange={(e) => setReceiptId(e.target.value)}
                        ></Form.Control>
                      </Form.Group>

                      <Row style={{ margin: 15 }}>
                        <Button
                          variant='primary'
                          type='submit'
                          onClick={() => setShow(false)}
                        >
                          Save Changes
                        </Button>
                      </Row>
                    </Form>
                  </Modal.Body>
                </Modal>
              </Row>
              <Table striped bordered hover responsive className='table-sm'>
                <thead>
                  <tr>
                    <th>DATE CREATED</th>
                    <th>RECEIPT NUMBER</th>
                    <th>POINTS EARNED</th>
                    <th>POINTS BALANCE</th>
                    <th>TOTAL DISCOUNT</th>
                    <th>TOTAL MONEY</th>
                    <th>DETAIL</th>
                  </tr>
                </thead>
                <>
                  {receipt.map((receipt, idx) => {
                    if (receipt.paid === false) {
                      return (
                        <tbody key={idx}>
                          <tr>
                            <td>{receipt.receipt_date}</td>
                            <td>{receipt.receipt_number}</td>
                            <td>{receipt.points_earned}</td>
                            <td>{receipt.points_balance}</td>

                            <td>Rs. {receipt.total_discount}</td>
                            <td>Rs. {receipt.total_money}</td>
                            <td>
                              <Button
                                onClick={() =>
                                  handleOpen(idx, receipt.receipt_number)
                                }
                                variant='light'
                                className='btn-sm'
                              >
                                Details
                              </Button>

                              <Modal
                                show={showArr[idx]}
                                onHide={() => handleClose(idx)}
                              >
                                <Modal.Header closeButton>
                                  <Modal.Title>
                                    Paid Bill Receivable
                                  </Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                  <Form.Group
                                    controlId='date'
                                    style={{ padding: 10 }}
                                  >
                                    <Form.Label style={{ padding: 10 }}>
                                      Date Paid
                                    </Form.Label>
                                    <Form.Control
                                      type='date'
                                      placeholder='Enter Date Paid'
                                      value={date}
                                      onChange={(e) => setDate(e.target.value)}
                                    ></Form.Control>
                                  </Form.Group>

                                  <Row style={{ margin: 15 }}>
                                    <Button
                                      variant='primary'
                                      type='submit'
                                      onClick={() => submitPaid(idx)}
                                    >
                                      Paid
                                    </Button>
                                  </Row>
                                </Modal.Body>
                              </Modal>
                            </td>
                          </tr>
                        </tbody>
                      );
                    }
                  })}
                </>
              </Table>
              {/* <Paginate pages={pages} page={page} isAdmin={true} /> */}
            </>
          )}
          {reduceBillsRecievable()}
        </Tab>

        <Tab eventKey='bills_payable' title='Bills Payable'>
          <Row className='align-items-center'>
            <Col>
              <h1>Bills Payable</h1>
            </Col>
          </Row>
          {loadingInventory ? (
            <Loader />
          ) : errorInventory ? (
            <Message variant='danger'>{errorInventory}</Message>
          ) : (
            <>
              <Table striped bordered hover responsive className='table-sm'>
                <thead>
                  <tr>
                    <th>USER</th>
                    <th>DATE CREATED</th>
                    <th>VENDOR</th>
                    <th>CATEGORY</th>
                    <th>ITEM</th>
                    <th>QUANTITY</th>
                    <th>COST</th>
                    <th>TOTAL COST</th>
            
                    <th>EDIT/DELETE</th>
                  </tr>
                </thead>
                <>
                  {inventory &&
                    inventory.map((inventory) => {
                      if (inventory.paid === false) {
                        return (
                          <tbody key={inventory._id}>
                            <tr>
                              <td>{inventory.edited_by}</td>
                              <td>{inventory.createdAt.slice(0, 10)}</td>
                              <td>{inventory.vendor}</td>
                              <td>{inventory.category_name }</td>
                              <td>{inventory.item_name}</td>
                              <td>{inventory.item_quantity}</td>
                              <td>{inventory.item_cost}</td>
                              <td>{inventory.total_cost}</td>
                        
                              <td>
                                <Button
                                  variant='light'
                                  className='btn-sm'
                                  onClick={() =>
                                    handlePayableOpen(inventory._id)
                                  }
                                >
                                  <i className='fas fa-edit'></i>
                                </Button>

                                <Modal
                                  show={payableShow}
                                  onHide={() => setPayableShow(false)}
                                >
                                  <Modal.Header closeButton>
                                    <Modal.Title>Bill Payment Date</Modal.Title>
                                  </Modal.Header>
                                  <Modal.Body>
                                    <Form onSubmit={submitPayableHandler}>
                                      <Form.Group
                                        controlId='date'
                                        style={{ padding: 10 }}
                                      >
                                        <Form.Label style={{ padding: 10 }}>
                                          Paid Date
                                        </Form.Label>
                                        <Form.Control
                                          type='date'
                                          placeholder='Enter Date'
                                          value={payableDate}
                                          onChange={(e) =>
                                            setPayableDate(e.target.value)
                                          }
                                        ></Form.Control>
                                      </Form.Group>

                                      <Row style={{ margin: 15 }}>
                                        <Button
                                          variant='primary'
                                          type='submit'
                                          onClick={() => setPayableShow(false)}
                                        >
                                          Save Changes
                                        </Button>
                                      </Row>
                                    </Form>
                                  </Modal.Body>
                                </Modal>
                              </td>
                            </tr>
                          </tbody>
                        );
                      }
                    })}
                </>
              </Table>
              {/* <Paginate pages={pages} page={page} isAdmin={true} /> */}
            </>
          )}
          {reduceBillsPayable()}
        </Tab>
      </Tabs>
    </>
  );
};

export default BillScreen;
