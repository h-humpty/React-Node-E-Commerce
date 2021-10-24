import React, { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import Message from "../components/Message";
import Loader from "../components/Loader";
// import Paginate from "../components/Paginate";
import { createInventory } from "../actions/inventoryActions";
import { listInventoryLevel } from "../actions/inventoryLevelActions";
import { INVENTORY_CREATE_RESET } from "../constants/inventoryConstants";
import Select from "react-select";

const InventoryCreateScreen = ({ history }) => {
  const dispatch = useDispatch();

  const date = new Date();
  const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
  const month =
    date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
  const year = date.getFullYear();
  const todayDate = `${year}-${month}-${day}`;

  console.log(day);

  const inventoryCreate = useSelector((state) => state.inventoryCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
  } = inventoryCreate;

  const inventoryLevelList = useSelector((state) => state.inventoryLevelList);
  const {
    loading: loadingList,
    error: errorList,
    success: successList,
    inventoryLevel,
  } = inventoryLevelList;

  // console.log(inventoryCategory);

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const [user, setUser] = useState(userInfo);

  const CL = inventoryLevel.map((item) => {
    return item.category;
  });

  const remove_duplicates = (arr) => {
    var obj = {};
    var ret_arr = [];
    for (var i = 0; i < arr.length; i++) {
      obj[arr[i]] = true;
    }
    for (var key in obj) {
      ret_arr.push({ label: key, value: true });
    }
    return ret_arr;
  };

  const categoryList = remove_duplicates(CL);

  const [category, setCategory] = useState(categoryList[0]);
  const [name, setName] = useState("");
  const [cost, setCost] = useState(0);
  const [size, setSize] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  const [paid, setPaid] = useState(true);
  const [datePaid, setDatePaid] = useState(todayDate);
  const [vendor, setVendor] = useState("");

  // console.log(datePaid);

  let undefine;

  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) {
      history.push("/login");
    }

    if (categoryList) {
      setCategory(categoryList[0]);
    }

    if (successCreate) {
      dispatch({ type: INVENTORY_CREATE_RESET });
      history.push(`/admin/inventorylist`);
      setCategory("");
      setName("");
      setCost(0);
      setSize(0);
      setQuantity(0);
      setTotalCost(0);
      setPaid(true);
      setDatePaid(todayDate);
      setUser(userInfo);
      setVendor("");
    } else {
      dispatch(listInventoryLevel());
    }
  }, [
    history,
    userInfo,
    successCreate,
    errorCreate,
    dispatch,
    todayDate,
    undefine,
  ]);

  useMemo(() => {
    if (quantity && cost) {
      setTotalCost(quantity * cost);
    }
  }, [cost, quantity]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createInventory({
        user,
        category,
        name,
        cost,
        size,
        quantity,
        totalCost,
        paid,
        datePaid: paid && new Date(datePaid).toISOString(),
        vendor,
      })
    );
  };

  // console.log(categoryList);

  if (!category && categoryList[0]) {
    undefine = categoryList[0].label;
  } else if (category && categoryList) {
    undefine = category;
  }

  // console.log(undefine);

  const IL = inventoryLevel
    .filter((items) => items.category === undefine && items)
    .map((items) => ({ label: items.item, value: true }));

  // console.log(category);
  // console.log(IL);

  return (
    <>
      <Link to='/admin/inventorylist' className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1>Create Inventory Item</h1>
        {loadingCreate && <Loader />}
        {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
        {loadingList ? (
          <Loader />
        ) : errorList ? (
          <Message variant='danger'>{errorList}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            {/*
             <Form.Group controlId='category'>
              <Form.Label>Category</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter Category'
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              ></Form.Control>
            </Form.Group> 
            */}
            <Form.Group controlId='category'>
              <Form.Label>Category</Form.Label>

              {categoryList[0] && (
                <Select
                  className='basic-single'
                  classNamePrefix='select'
                  isDisabled={false}
                  isLoading={false}
                  isClearable={false}
                  isRtl={false}
                  isSearchable={true}
                  options={categoryList}
                  name='products'
                  onChange={(e) => setCategory(e.label)}
                  required
                />
              )}
            </Form.Group>

            {/* 
            <Form.Group>
              {categoryList.map((item, idx) => {
                return (
                  <Form.Select key={idx} >
                    <option></option>
                  </Form.Select>
                );
              })}
            </Form.Group> */}

            {/* <Dropdown>
              <Dropdown.Toggle variant='success' id='dropdown-basic'>
                {category}
              </Dropdown.Toggle>

              {categoryList.map((item, idx) => {
                return (
                  <Dropdown.Menu key={idx}>
                    <Dropdown.Item>{item}</Dropdown.Item>
                  </Dropdown.Menu>
                );
              })}
            </Dropdown> */}
            {/* 
            <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group> */}

            {category && (
              <Form.Group controlId='category'>
                <Form.Label>Name</Form.Label>
                <Select
                  className='basic-single'
                  classNamePrefix='select'
                  // defaultValue={}
                  isDisabled={false}
                  isLoading={false}
                  isClearable={false}
                  isRtl={false}
                  isSearchable={true}
                  options={IL}
                  name='products'
                  onChange={(e) => setName(e.label)}
                  required
                />
              </Form.Group>
            )}

            <Form.Group controlId='vendor'>
              <Form.Label>Vendor</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter Vendor'
                value={vendor}
                onChange={(e) => setVendor(e.target.value)}
                required
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='cost'>
              <Form.Label>Cost</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter price'
                value={cost}
                onChange={(e) => setCost(e.target.value)}
                required
              ></Form.Control>
            </Form.Group>

           
              <Form.Group controlId='size'>
                <Form.Label>Size</Form.Label>
                <Form.Control
                  type='text'
                  placeholder='Enter Size'
                  value={size}
                  onChange={(e) => setSize(e.target.value)}
                  required
                ></Form.Control>
              </Form.Group>
          

            <Form.Group controlId='quantity'>
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter Quantity'
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                required
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='totalCost'>
              <Form.Label>Total Cost</Form.Label>
              <Form.Control
                type='text'
                placeholder='Total'
                required
                readOnly
                value={totalCost}
              ></Form.Control>
            </Form.Group>

            <fieldset>
              <Form.Label>Payment</Form.Label>
              <Form.Group className='mb-3'>
                <Form.Check
                  inline
                  label='Paid'
                  name='group1'
                  type='radio'
                  id='paidTrue'
                  value={true}
                  onChange={() => setPaid(true)}
                />
                <Form.Check
                  inline
                  label='Not Paid'
                  name='group1'
                  type='radio'
                  id='paidFalse'
                  value={false}
                  onChange={() => setPaid(false) && setDatePaid(null)}
                />
              </Form.Group>
            </fieldset>

            {paid && (
              <Form.Group controlId='totalCost'>
                <Form.Label>Payment Date</Form.Label>
                <Form.Control
                  type='date'
                  placeholder='Enter Date'
                  value={datePaid}
                  required
                  onChange={(e) => setDatePaid(e.target.value)}
                ></Form.Control>
              </Form.Group>
            )}

            <Button type='submit' variant='primary'>
              Next
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default InventoryCreateScreen;
