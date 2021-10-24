import React, { useEffect, useState, Fragment, useMemo } from "react";
import { Link } from "react-router-dom";
import { Button, Form, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import Message from "../components/Message";
import Loader from "../components/Loader";
import Select from "react-select";
// import {FormControl, MenuItem, Select, InputLabel} from '@material-ui/core/';
// import Paginate from "../components/Paginate";
import { createRecipe } from "../actions/recipeActions";
import { listProductFiltered } from "../actions/productActions";
import { listRecipes } from "../actions/recipeActions";
import { listInventoryLevel } from "../actions/inventoryLevelActions";
import { RECIPE_CREATE_RESET } from "../constants/recipeConstants";

const RecipeCreateScreen = ({ history }) => {
  const dispatch = useDispatch();

  const [label, setLabel] = useState("");
  const [image, setImage] = useState("");
  const [ingredients, setIngredients] = useState([
    { text: "", weight: 0, image: "", category: "", cost: 0, average_cost: 0 },
  ]);
  const [variant_id, setVariant_id] = useState("");
  const [totalCost, setTotalCost] = useState(0);

  const recipeCreate = useSelector((state) => state.recipeCreate);
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
  } = recipeCreate;

  const productFiltered = useSelector((state) => state.productFiltered);
  const {
    loading: loadingFiltered,
    error: errorFiltered,
    success: successFiltered,
    products,
  } = productFiltered;

  const recipeList = useSelector((state) => state.recipeList);
  const { loading, error, recipe } = recipeList;

  const inventoryLevelList = useSelector((state) => state.inventoryLevelList);
  const {
    loading: loadingInventoryLevelList,
    error: errorInventoryLevelError,
    success: successInventoryLevelSuccess,
    inventoryLevel,
  } = inventoryLevelList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const [user, setUser] = useState(userInfo);
  const [selectProducts, setSelectProducts] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);

  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) {
      history.push("/login");
    } else {
      dispatch(listProductFiltered());
      dispatch(listRecipes());
      dispatch(listInventoryLevel());
    }

    if (successCreate) {
      dispatch({ type: RECIPE_CREATE_RESET });
      history.push(`/admin/recipelist`);
      setLabel("");
      setImage("");
      setIngredients([]);
      setUser(userInfo);
    }
  }, [history, userInfo, successCreate, dispatch]);

  // console.log(productFiltered)
  console.log(ingredients);

  useMemo(() => {
    if (successFiltered) {
      let filtered = products
        .map((items) => {
          if (
            items.category !== "Delivery" &&
            items.category !== "Deals" &&
            items.category !== "Crockery" &&
            items.category === items.option1_name
          ) {
            return {
              variant_id: items.variant_id,
              label: items._id,
              product: items.id,
              value: true,
              image_url: items.image,
            };
          }
        })
        .filter((filtered) => filtered);

      setSelectProducts([...filtered]);
    }
  }, [products, successFiltered]);

  useMemo(() => {
    if (successInventoryLevelSuccess) {
      let filtered = inventoryLevel
        .filter((item) => {
          if (
            item.category === "Grocery" ||
            item.category === "Spice" ||
            item.category === "Fruits & Vegetables" ||
            item.category === "Dairy" ||
            item.category === "Wheat" ||
            item.category === "Poultry" ||
            item.category === "Beef" ||
            item.category === "Mutton" ||
            item.item === "Tap Water"
          )
            return item;
        })
        .map((item) => {
          return {
            value: true,
            label: item.item,
            _id: item._id,
            category: item.category,
            average_cost: item.average_cost ? item.average_cost : 0,
          };
        })
        .sort(function (a, b) {
          if (a.label < b.label) {
            return -1;
          }
          if (a.label > b.label) {
            return 1;
          }
          return 0;
        });

      setFilteredCategories([...filtered]);
    }
  }, [inventoryLevel, successInventoryLevelSuccess]);

  // console.log(filteredCategories)

  const handleInputChangeProducts = (e) => {
    setLabel(e.label);
    setImage(e.image_url);
    setVariant_id(e.variant_id);
  };

  const handleInputChange = (e, index) => {
    let list = [...ingredients];

    if (e.target) {
      list[index]["weight"] = e.target.value;
    }

    // console.log( e.label)

    let findCategory = filteredCategories.filter((items) => {
      if (items.label === list[index]["text"]) {
        return items;
      } else if (items.label === e.label) {
        return items;
      }
    });

    // console.log(findCategory[0]);
    if (findCategory.length > 0) {
      list[index]["category"] = findCategory[0].category;
      list[index]["text"] = findCategory[0].label;
      list[index]["label"] = findCategory[0].label;

      if (list[index]["weight"] > 0) {
        list[index]["average_cost"] =
          findCategory[0].average_cost > 0
            ? (findCategory[0].average_cost / 1000) * list[index]["weight"]
            : 0;
      }
    }

    setIngredients(list);
  };

  // handle click event of the Remove button
  const handleRemoveClick = (index) => {
    const list = [...ingredients];
    list.splice(index, 1);
    setIngredients(list);
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    setIngredients([
      ...ingredients,
      {
        text: "",
        weight: 0,
        image: "",
        category: "",
        cost: 0,
        average_cost: 0,
      },
    ]);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      createRecipe({
        user,
        label,
        image,
        ingredients,
        variant_id,
        total_cost: totalCost,
      })
    );
  };

  useEffect(() => {
    if (ingredients) {
      setTotalCost(() => ingredients.reduce((a, b) => a + b.average_cost, 0));
    }
  }, [ingredients]);

  // console.log(totalCost)
  // reduce((acc, item) => item.rating + acc, 0)

  // let sum = ingredients && ingredients.reduce((a, b) => a + b.average_cost, 0);

  // console.log(sum);
  // console.log({ user, label, image, ingredients, variant_id });

  return (
    <>
      <Link to='/admin/recipelist' className='btn btn-light my-3'>
        Go Back
      </Link>

      <FormContainer style={{ flex: 1 }}>
        <h1>Create Recipe Item</h1>

        {errorCreate &&
          loadingCreate &&
          loading &&
          loadingFiltered &&
          selectProducts &&
          filteredCategories &&
          products(<Message variant='danger'>{errorCreate}</Message>)}
        {errorFiltered ? (
          <Message variant='danger'>{errorFiltered}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            {/* <Form.Group controlId='label'> */}
            <Form.Label style={{ padding: 10 }}>Item Name</Form.Label>
            <Fragment>
              {selectProducts[0] && successFiltered && (
                <Select
                  className='basic-single'
                  classNamePrefix='select'
                  defaultValue={selectProducts[0]}
                  isDisabled={false}
                  isLoading={false}
                  isClearable={false}
                  isRtl={false}
                  isSearchable={true}
                  options={selectProducts}
                  name='products'
                  onChange={(e) => handleInputChangeProducts(e)}
                />
              )}
            </Fragment>
            {/* </Form.Group> */}

            <Form.Group controlId='name' style={{ padding: 10 }}>
              <Form.Label style={{ padding: 10 }}>Image URL</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter Image'
                value={image}
                readOnly
              ></Form.Control>
            </Form.Group>
            <h2 style={{ padding: 10 }}>Ingredients</h2>

            {ingredients.map((i, index) => {
              return (
                <Row
                  className='create-update'
                  key={index}
                  style={{ width: "100%", padding: 10 }}
                >
                  <Form.Group
                    as={Col}
                    controlId='Item'
                    style={{
                      width: "100%",
                      flexDirection: "row",
                      alignItems: "center",
                      padding: 10,
                      borderRadius: 15,
                      flex: 2,
                    }}
                  >
                    <Form.Label>Ingredient</Form.Label>
                    <Fragment>
                      {filteredCategories[0] &&
                        successInventoryLevelSuccess && (
                          <Select
                            className='basic-single'
                            classNamePrefix='select'
                            defaultValue={filteredCategories[0]}
                            isDisabled={false}
                            isLoading={false}
                            isClearable={false}
                            isRtl={false}
                            isSearchable={true}
                            name='text'
                            options={filteredCategories}
                            onChange={(e) => handleInputChange(e, index)}
                          />
                        )}
                    </Fragment>
                  </Form.Group>

                  {/* add weight to input */}
                  <Form.Group
                    as={Col}
                    controlId='weight'
                    style={{
                      width: "65%",
                      alignItems: "center",
                      padding: 10,
                      borderRadius: 15,
                    }}
                  >
                    <Form.Label>Weight (Grams)</Form.Label>
                    <Form.Control
                      name='weight'
                      type='text'
                      placeholder='Enter Weight'
                      value={i.weight}
                      onChange={(e) => handleInputChange(e, index)}
                    ></Form.Control>
                  </Form.Group>

                  <Form.Group
                    as={Col}
                    controlId='averageCost'
                    style={{
                      width: "65%",
                      alignItems: "center",
                      padding: 10,
                      borderRadius: 15,
                    }}
                  >
                    <Form.Label>Average Cost</Form.Label>
                    <Form.Control
                      name='averageCost'
                      type='text'
                      placeholder='Cost'
                      value={ingredients[index].average_cost}
                      // onChange={() => setTotalCost(sum)}
                      readOnly
                    ></Form.Control>
                  </Form.Group>

                  <Form.Group
                    as={Col}
                    controlId='buttons'
                    style={{
                      width: "100%",

                      borderRadius: 15,
                      flexDirection: "flex-end",
                    }}
                  >
                    <Form.Label>Add/Remove</Form.Label>
                    <div style={{ width: 10, height: 0 }}></div>
                    {ingredients.length - 1 === index && (
                      <Button
                        as={Col}
                        className='my-3'
                        onClick={handleAddClick}
                        style={{
                          marginRight: 5,
                          backgroundColor: "red",
                          border: 0,
                        }}
                      >
                        <i className='fas fa-plus'></i>
                      </Button>
                    )}

                    {ingredients.length !== 1 && (
                      <Button
                        className='my-3'
                        onClick={() => handleRemoveClick(index)}
                        style={{ backgroundColor: "red", border: 0 }}
                      >
                        <i className='fas fa-minus'></i>
                      </Button>
                    )}
                  </Form.Group>
                </Row>
              );
            })}
            <Row style={{ display: "grid", placeItems: "end" }}>
              <Form.Group
                as={Col}
                controlId='totalCost'
                style={{
                  width: "50%",
                  alignItems: "flex-end",
                  padding: 10,
                  borderRadius: 15,
                }}
              >
                <Form.Label>Total Cost</Form.Label>
                <Form.Control
                  name='totalCost'
                  type='text'
                  placeholder='Total Cost'
                  value={totalCost}
                  // onChange={() => setTotalCost(sum)}
                  readOnly
                ></Form.Control>
              </Form.Group>
            </Row>

            <Row>
              <Button
                style={{ backgroundColor: "red", border: 0 }}
                type='submit'
                variant='primary'
              >
                Submit
              </Button>
            </Row>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default RecipeCreateScreen;
