import React, { useEffect, useState } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Row, Button, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionActions from "@material-ui/core/AccordionActions";
import { costInventory } from "../actions/inventoryActions";

import {
  groupedInventoryLevel,
  listInventoryLevel,
} from "../actions/inventoryLevelActions";

const InventoryLevelListScreen = ({ history }) => {
  const dispatch = useDispatch();

  const inventoryLevelGroups = useSelector(
    (state) => state.inventoryLevelGrouped
  );
  const {
    loading: loadingInventoryLevel,
  
    inventoryLevelGrouped,
  } = inventoryLevelGroups;

  const inventoryLevels = useSelector((state) => state.inventoryLevelList);
  const { loading, inventoryLevel } = inventoryLevels;

  const inventoryCosts = useSelector((state) => state.inventoryCost);
  const {
    loading: loadingCost,
    inventoryCost,
  } = inventoryCosts;

  // console.log(inventoryCost);

  // console.log(inventoryLevel)

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo || userInfo.isAdmin) {
      dispatch(groupedInventoryLevel());
      dispatch(listInventoryLevel());
      dispatch(costInventory());
    } else {
      history.push("/login");
    }
  }, [dispatch, history, userInfo]);

  // const costs = inventoryCost.map((item) => ({
  //   item_name: item._id,
  //   average_cost: item.TotalCost / item.TotalQuantity,
  // }));

  // console.log(inventoryLevel)

  return (
    <>
      <Row className='align-items-center'>
        <Col>
          <h1>INVENTORY LEVEL</h1>
          {/* <TotalStock/> */}
        </Col>
      </Row>
      { loadingInventoryLevel && loading && loadingCost ? 
        <Loader />
       : (
        <>
          {/* <Table striped bordered hover responsive className='table-sm'> */}
          {/* <thead>
              <tr>
                <th>CATEGORY</th>
                <th>TOTAL COST</th>
                <th>DETAIL</th>
              </tr>
            </thead> */}
          {/* <>
              {inventoryLevel.map((inventory, idx) => {
                return (
                  <tbody key={idx}>
                    <tr>
                      <td>{inventory._id}</td>

                      <td>Rs. {inventory.TotalCost}</td>

                      <td> */}
          {/* <LinkContainer to={`receipt/${receipt.receipt_number}`}> */}
          {/* <Button variant='light' className='btn-sm'> */}
          {/* <div style={{ width: "100%" }}> */}
          <Table hover bordered variant='light'>
            <thead>
              <tr>
                <th>
                  <h6>CATEGORY</h6>
                </th>
              </tr>
            </thead>
            {inventoryLevelGrouped.map((inventory, idx) => {
              return (
                <tbody style={{ backgroundColor: "white" }} key={idx}>
                  <tr style={{ flex: 1, backgroundColor: "white" }}>
                    <Accordion
                      style={{ width: "100%", backgroundColor: "white" }}
                    >
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls='panel1c-content'
                        id='panel1c-header'
                        style={{ width: "100%" }}
                      >
                        <h6>{inventory._id}</h6>
                      </AccordionSummary>

                      <AccordionDetails style={{ width: "100%" }}>
                        <Table
                          bordered
                          hover
                          variant='light'
                          style={{ width: "100%" }}
                        >
                          <thead>
                            <tr>
                              <th>LAST UPDATED</th>
                              <th>CATEGORY</th>
                              <th>TOTAL STOCK</th>
                              <th>AVERAGE COST</th>
                              <th>VENDOR</th>
                            </tr>
                          </thead>
                          {inventoryLevel &&
                            inventoryLevel.map((items, idx) => {
                              // console.log(items)
                              if (items.category === inventory._id) {
                                return (
                                  <tbody key={idx}>
                                    <tr>
                                      <td>
                                        {items.updated_at && new Date(items.updated_at)
                                          .toISOString()
                                          .slice(0, 10)}
                                      </td>
                                      <td>{items.item}</td>
                                      <td>{items.in_stock}</td>
                                      <td>Rs. {items.average_cost}</td>
                                      <td>{items.vendor}</td>
                                    </tr>
                                  </tbody>
                                );
                              }
                            })}
                        </Table>
                      </AccordionDetails>
                    </Accordion>
                  </tr>
                </tbody>
              );
            })}
          </Table>
          {/* </div> */}
        </>
      )}
    </>
  );
};

export default InventoryLevelListScreen;
