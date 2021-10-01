import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import { listInventoryDetails, updateInventory } from '../actions/inventoryActions'
import { INVENTORY_UPDATE_RESET } from '../constants/inventoryConstants'

const ProductEditScreen = ({ match, history }) => {
  const inventoryId = match.params.id

  const [category, setCategory] = useState("");
  const [name, setName] = useState("");
  const [cost, setCost] = useState(0);
  const [size, setSize] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  const [paid, setPaid] = useState(true);
  const [datePaid, setDatePaid] = useState("");

  const dispatch = useDispatch()

  const inventoryDetail = useSelector((state) => state.inventoryDetail)
  const { loading, error, inventory } = inventoryDetail

  const inventoryUpdate = useSelector((state) => state.inventoryUpdate)
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = inventoryUpdate

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const [user, setUser] = useState(userInfo);

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: INVENTORY_UPDATE_RESET })
      history.push('/admin/inventorylist')
    } else {
      if (!inventory.item_name || inventory._id !== inventoryId) {
        dispatch(listInventoryDetails(inventoryId))
      } else {

        setCategory(inventory.category)
        setName(inventory.item_name)
        setCost(inventory.item_cost)
        setSize(inventory.item_size)
        setQuantity(inventory.item_quantity)
        setTotalCost(inventory.total_cost)
        setPaid(inventory.paid)
        setDatePaid(inventory.date_paid)
        setUser(userInfo)
      }
    }
  }, [dispatch, history, successUpdate, inventory, userInfo, inventoryId])

  

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(
      updateInventory({
        user,
        name,
        category,
        cost,
        size,
        quantity,
        totalCost,
        paid,
        datePaid,
      })
    )
  }

  return (
    <>
      <Link to='/admin/inventorylist' className='btn btn-light my-3'>
        Go Back
      </Link>
      <FormContainer>
        <h1>Update Inventory Item</h1>
        {loadingUpdate  && <Loader />}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='category'>
              <Form.Label>Category</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter Category'
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter Name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='cost'>
              <Form.Label>Cost</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter Cost'
                value={cost}
                onChange={(e) => setCost(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='size'>
              <Form.Label>Size</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter Size'
                value={size}
                onChange={(e) => setSize(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='quantity'>
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter Quantity'
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='totalCost'>
              <Form.Label>Total Cost</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter Total Cost'
                value={totalCost}
                onChange={(e) => setTotalCost(e.target.value)}
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
              <Form.Group controlId='paymentDate'>
                <Form.Label>Payment Date</Form.Label>
                <Form.Control
                  type='date'
                  placeholder='Enter Date'
                  value={datePaid}
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
  )
}

export default ProductEditScreen
