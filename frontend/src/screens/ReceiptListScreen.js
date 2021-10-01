import React, { useEffect, useState } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Row, Button, Col,} from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { listReceipt } from "../actions/receiptActions";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';



const ReceiptListScreen = ({ history, match }) => {


  const dispatch = useDispatch();

  const receiptList = useSelector((state) => state.receiptList);
  const { loading, error, receipt, page, pages } = receiptList;

  const [pageNumber, setPageNumber] = useState(1)

  console.log(receipt)


  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo || userInfo.isAdmin) {
      dispatch(listReceipt(pageNumber));
    } else {
      history.push("/login");
    }
  }, [dispatch, history, userInfo, match, pageNumber]);

  const handleChange = (event, value) => {
    setPageNumber(value)
  }
 
  return (
    <>
      <Row className='align-items-center'>
        <Col>
          <h1>Receipt</h1>
        </Col>
      
      </Row>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
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
              {receipt.receipts.map((receipt, idx) => {
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
                        <LinkContainer to={`receipt/${receipt.receipt_number}`}>
                          <Button variant='light' className='btn-sm'>
                            Details
                          </Button>
                        </LinkContainer>
                      </td>
                    </tr>
                  </tbody>
                );
              })}
            </>
          </Table>
        <Row style={{display: "grid", justifyContent: "center"}}>
        <Stack spacing={2}>
  
      <Pagination count={pages} page={page} onChange={handleChange} />
    </Stack>
        </Row>


          
        </>
      )}
    </>
  );
};

export default ReceiptListScreen;
