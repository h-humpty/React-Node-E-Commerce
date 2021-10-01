import React, { useEffect, useState, useCal } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Col, Modal, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { DateRangePicker } from "react-date-range";
import Message from "../components/Message";
import Loader from "../components/Loader";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
// import Paginate from "../components/Paginate";
import {
  groupInventory,
  listDatesInventory,
} from "../actions/inventoryActions";
import { listReceipt } from "../actions/receiptActions";
// import { INVENTORY_CREATE_RESET } from "../constants/productConstants";
// import { listDatesInventory } from "../actions/inventoryActions";
import "../css/Search.css";

const SalaryListScreen = ({ history, match }) => {
  const dispatch = useDispatch();

  const inventoryGroup = useSelector((state) => state.inventoryGroup);
  const { loading, error, success, inventory } = inventoryGroup;

  const receiptList = useSelector((state) => state.receiptList);
  const {
    loading: receiptLoading,
    error: errorReceipt,
    success: receiptSuccess,
    receipt,
  } = receiptList;


  const inventoryDatesList = useSelector((state) => state.inventoryDates);
  const {
    loading: loadingDates,
    error: errorDates,
    inventoryDates,
  } = inventoryDatesList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showSearch, setShowSearch] = useState(false);

  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) {
      history.push("/login");
    } else {
      dispatch(groupInventory());
      dispatch(listReceipt("All"));
    }
  }, [dispatch, history, userInfo, success]);

  const selectionRange = {
    startDate: startDate,
    endDate: endDate,
    key: "selection",
  };

  function handleSelect(ranges) {
    setStartDate(ranges.selection.startDate);
    setEndDate(ranges.selection.endDate);
  }

  const handleSubmit = () => {
    setShowSearch(false);
    dispatch(
      listDatesInventory(startDate.toISOString(), endDate.toISOString())
    );
  };

  let totalSale = 0;
  receipt &&
    receipt.map((x) => {
      if (x._id === "SALE" || x._id === null) {
        totalSale = totalSale + x.Total;
      }
    });

  const expectedCash =
    totalSale && inventory[0] && totalSale - parseInt(inventory[0].TotalCost);

  return (
    <>
      <Row className='align-items-center'>
        <Col>
          <h1>Financial Summary</h1>
        </Col>
      </Row>
    
      {loadingDates && !loading && inventory && totalSale && expectedCash ? (
        <>
          <div className='banner_search'>
            {showSearch && (
              <div className='search'>
                <DateRangePicker
                  ranges={[selectionRange]}
                  onChange={handleSelect}
                ></DateRangePicker>
                <Button onClick={handleSubmit}>Search Inventory</Button>
              </div>
            )}
            <Button
              className='banner_searchButton'
              variant='outlined'
              onClick={() => setShowSearch(!showSearch)}
            >
              Search Date
            </Button>
          </div>
          <Table striped responsive className='table-sm'>
            <thead>
              <tr>
                <th>CATEGORY</th>
                <th>FINANCIAL DETAILS</th>
              </tr>
            </thead>
            <>
              <tbody>
                <tr>
                  <td>Previous Cash</td>
                  <td>Rs. 0</td>
                </tr>

                <tr>
                  <td>Total Sale</td>
                  <td>Rs. {totalSale.toLocaleString()}</td>
                </tr>

                <tr>
                  <td>Total Expense</td>
                  <td>Rs. {inventory[0].TotalCost.toLocaleString()}</td>
                </tr>

                <tr>
                  <td>Expected Cash</td>
                  <td>Rs. {expectedCash.toLocaleString()}</td>
                </tr>

                <tr>
                  <td>Profit Margin</td>
                  <td>{((expectedCash / totalSale) * 100).toFixed(2)}%</td>
                </tr>
              </tbody>
            </>
          </Table>
          {/* <Paginate pages={pages} page={page} isAdmin={true} /> */}
        </>
      ) : (
        <>
          <div className='banner_search'>
            {showSearch && (
              <div className='search'>
                <DateRangePicker
                  ranges={[selectionRange]}
                  onChange={handleSelect}
                ></DateRangePicker>
                <Button onClick={handleSubmit}>Search Inventory</Button>
              </div>
            )}
            <Button
              className='banner_searchButton'
              variant='outlined'
              onClick={() => setShowSearch(!showSearch)}
            >
              Search Date
            </Button>
          </div>
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>EDITED BY</th>
                <th>DATE CREATED</th>
                <th>NAME</th>
                <th>MONTHLY SALARY</th>
                <th>PAID</th>
                <th>REMAINDER SALARY</th>
                <th>PAYMENT DATE</th>
                <th>EDIT/DELETE</th>
              </tr>
            </thead>
            <>
              {
                //   <tbody key={inventory._id}>
                //     <tr>
                //       <td>{inventory.edited_by}</td>
                //       {/* <td>{inventory.createdAt.slice(0, 10)}</td> */}
                //       <td>{inventory.item_name}</td>
                //       <td>{inventory.monthly_salary}</td>
                //       <td>{inventory.paid && "PAID"}</td>
                //       <td>{inventory.total_cost}</td>
                //       {/* <td>{inventory.date_paid.slice(0, 10)}</td> */}
                //       <td>
                //         <Button variant='light' className='btn-sm'>
                //           <i className='fas fa-edit'></i>
                //         </Button>
                //       </td>
                //     </tr>
                //   </tbody>
              }
            </>
          </Table>
          {/* <Paginate pages={pages} page={page} isAdmin={true} /> */}
        </>
      )}
    </>
  );
};

export default SalaryListScreen;
