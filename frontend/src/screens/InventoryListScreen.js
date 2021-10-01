import React, { useEffect, useState } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { DateRangePicker } from "react-date-range";
import Message from "../components/Message";
import Loader from "../components/Loader";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
// import Paginate from "../components/Paginate";
import {
  listInventory,
  deleteInventory,
  listDatesInventory,
} from "../actions/inventoryActions";
// import { INVENTORY_CREATE_RESET } from "../constants/productConstants";
// import { listDatesInventory } from "../actions/inventoryActions";
import "../css/Search.css";

const InventoryListScreen = ({ history, match }) => {
  const dispatch = useDispatch();

  const inventoryList = useSelector((state) => state.inventoryList);
  const { loading, error, inventory } = inventoryList;

  const inventoryDelete = useSelector((state) => state.inventoryDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = inventoryDelete;

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
      dispatch(listInventory());
    }
  }, [dispatch, history, userInfo, successDelete]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure")) {
      dispatch(deleteInventory(id));
    }
  };

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

  const reduceTotalCost = () => {
    if (loadingDates && !loading) {
      const TotalCost = inventory
        .map((items) => items.total_cost)
        .reduce((a, b) => a + b, 0);
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
          <h5>Total Rs : {TotalCost.toLocaleString()}</h5>
        </Row>
      );
    } else if (!loadingDates) {
      const TotalCost = inventoryDates
        .map((items) => items.total_cost)
        .reduce((a, b) => a + b, 0);

      return (
        <Row style={{ flex: 1, bottom: 0 }}>
          <h5>Total Rs : {TotalCost.toLocaleString()}</h5>
        </Row>
      );
    }
  };

  console.log(inventory)

  return (
    <>
      <Row className='align-items-center'>
        <Col>
          <h1>Inventory</h1>
        </Col>
        <Col className='text-right'>
          <LinkContainer to={`/admin/inventory/create`}>
            <Button className='my-3'>
              <i className='fas fa-plus'></i> Create Inventory Item
            </Button>
          </LinkContainer>
        </Col>
      </Row>
      {/* {loadingDelete && <Loader />} */}
      {/* {errorDelete && <Message variant='danger'>{errorDelete}</Message>} */}
      {/* {loadingCreate && <Loader />} */}
      {/* {errorCreate && <Message variant='danger'>{errorCreate}</Message>} */}
      {loadingDates && !loading ? (
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
                <th>USER</th>
                <th>DATE CREATED</th>
                <th>VENDOR</th>
                <th>CATEGORY</th>
                <th>ITEM</th>
                <th>QUANTITY</th>
                <th>COST</th>
                <th>TOTAL COST</th>
                <th>PAID</th>
                <th>PAYMENT DATE</th>
                <th>EDIT/DELETE</th>
              </tr>
            </thead>
            <>
              {inventory &&
                inventory.map((inventory) => {
                  return (
                    <tbody key={inventory._id}>
                      <tr>
                        <td>{inventory.edited_by}</td>
                        <td>{inventory.createdAt.slice(0, 10)}</td>
                        <td>{inventory.vendor}</td>
                        <td>{inventory.category_name}</td>
                        <td>{inventory.item_name}</td>
                        <td>{inventory.item_quantity}</td>
                        <td>{inventory.item_cost}</td>
                        <td>{inventory.total_cost}</td>
                        <td>{inventory.paid && "PAID"}</td>
                        <td>{inventory.date_paid.slice(0, 10)}</td>
                        <td>
                          <LinkContainer
                            to={`/admin/inventory/${inventory._id}/edit`}
                          >
                            <Button variant='light' className='btn-sm'>
                              <i className='fas fa-edit'></i>
                            </Button>
                          </LinkContainer>
                          <Button
                            variant='danger'
                            className='btn-sm'
                            onClick={() => deleteHandler(inventory._id)}
                          >
                            <i className='fas fa-trash'></i>
                          </Button>
                        </td>
                      </tr>
                    </tbody>
                  );
                })}
            </>
          </Table>
          {/* <Paginate pages={pages} page={page} isAdmin={true} /> */}
          {reduceTotalCost()}
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
                <th>USER</th>
                <th>DATE CREATED</th>
                <th>VENDOR</th>
                <th>CATEGORY</th>
                <th>ITEM</th>
                <th>QUANTITY</th>
                <th>COST</th>
                <th>TOTAL COST</th>
                <th>PAID</th>
                <th>PAYMENT DATE</th>
                <th>EDIT/DELETE</th>
              </tr>
            </thead>
            <>
              {inventoryDates &&
                inventoryDates.map((inventory) => {
                  return (
                    <tbody key={inventory._id}>
                      <tr>
                        <td>{inventory.edited_by}</td>
                        <td>{inventory.createdAt.slice(0, 10)}</td>
                        <td>{inventory.vendor}</td>
                        <td>{inventory.category_name}</td>
                        <td>{inventory.item_name}</td>
                        <td>{inventory.item_quantity}</td>
                        <td>{inventory.item_cost}</td>
                        <td>{inventory.total_cost}</td>
                        <td>{inventory.paid && "PAID"}</td>
                        <td>{inventory.date_paid.slice(0, 10)}</td>
                        <td>
                          <LinkContainer
                            to={`/admin/inventory/${inventory._id}/edit`}
                          >
                            <Button variant='light' className='btn-sm'>
                              <i className='fas fa-edit'></i>
                            </Button>
                          </LinkContainer>
                          <Button
                            variant='danger'
                            className='btn-sm'
                            onClick={() => deleteHandler(inventory._id)}
                          >
                            <i className='fas fa-trash'></i>
                          </Button>
                        </td>
                      </tr>
                    </tbody>
                  );
                })}
            </>
          </Table>
          {/* <Paginate pages={pages} page={page} isAdmin={true} /> */}
          {reduceTotalCost()}
        </>
      )}
    </>
  );
};

export default InventoryListScreen;
