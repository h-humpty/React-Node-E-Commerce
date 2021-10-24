import React, { useEffect, useState, Fragment, useMemo } from "react";
import { Link } from "react-router-dom";
import { Button, Form, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import Message from "../components/Message";
import Loader from "../components/Loader";
import Select from "react-select";
import {
  listRecipes,
  updateRecipe,
  listRecipeDetails,
} from "../actions/recipeActions";
import { listProductFiltered } from "../actions/productActions";
import { listInventoryLevel } from "../actions/inventoryLevelActions";
import {
  RECIPE_UPDATE_RESET,
  RECIPE_DETAILS_RESET,
} from "../constants/recipeConstants";
import axios from "axios";

const RecipeEditScreen = ({ history, match }) => {
  const recipeId = match.params.id;
  const pName = match.params.name;

  // console.log(match);

  const dispatch = useDispatch();

  const recipeUpdate = useSelector((state) => state.recipeUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = recipeUpdate;

  const inventoryLevelList = useSelector((state) => state.inventoryLevelList);
  const { success: successLevelList, inventoryLevel } = inventoryLevelList;

  const recipeDetails = useSelector((state) => state.recipeDetails);
  const { loading, success, recipe } = recipeDetails;

  // console.log(recipe)

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const [label, setLabel] = useState({});
  const [image, setImage] = useState("");
  const [ingredients, setIngredients] = useState([
    { text: "", weight: 0, image: "", category: "", cost: 0, average_cost: 0 },
  ]);
  const [variant_id, setVariant_id] = useState("");
  const [totalCost, setTotalCost] = useState(0);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [productDetail, setProductDetail] = useState({});

  // console.log(filteredCategories);

  // console.log(history.goBack)
  useMemo(() => {
    dispatch({ type: RECIPE_DETAILS_RESET });
  }, [dispatch]);

  // console.log(productDetail);

  useMemo(async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    if (pName) {
      const { data } = await axios.get(
        `/api/products/variants?name=${pName}`,
        config
      );

      setProductDetail(data[0]);
    }
  }, [pName, userInfo]);

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: RECIPE_UPDATE_RESET });
      history.push(`/admin/recipelist`);
    }

    dispatch(listProductFiltered());
    dispatch(listRecipes());
    dispatch(listInventoryLevel());
    dispatch(listRecipeDetails(recipeId));
  }, [
    dispatch,
    history,
    recipeId,
    successUpdate,
    userInfo,
    ingredients,
    setIngredients,
  ]);
  // console.log(success);

  useMemo(() => {
    if (successLevelList) {
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
        });

      setFilteredCategories([...filtered]);
    }
  }, [inventoryLevel, successLevelList]);

  useMemo(() => {
    if (success && filteredCategories[0] && ingredients.length <= 1) {
      let list = recipe.ingredients.map((items, idx) => {
        let averageCost = filteredCategories
          .filter((item) => items.text === item.label)
          .map((i) => {
            return {
              average_cost: i.average_cost
                ? (i.average_cost / 1000) * items.weight
                : 0,
            };
          });

        return {
          ...items,
          index: idx,
          label: items.text,
          value: idx + 1,
          ...averageCost[0],
        };
      });

      setIngredients([...list]);
      setLabel({ value: true, label: recipe.label });
      setVariant_id(recipe.variant_id && recipe.variant_id);
      setImage(recipe.image);
    }
  }, [filteredCategories, ingredients, recipe, success, setIngredients]);

  useMemo(() => {
    if (ingredients) {
      setTotalCost(
        ingredients.reduce((a, b) => {
          return a + b.average_cost;
        }, 0)
      );
    }
  }, [ingredients]);

  const handleInputChange = (e, index) => {
    let list = [...ingredients];

    list[index]["index"] = index;

    if (e.target) {
      list[index]["weight"] = e.target.value;
    }

    let findCategory = [];

    if (e.label) {
      findCategory = filteredCategories.filter((items) => {
        if (items.label === e.label) {
          return items;
        }
      });
    } else {
      findCategory = filteredCategories.filter((items) => {
        if (items.label === list[index]["text"]) {
          return items;
        }
      });
    }

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

  const handleRemoveClick = (index) => {
    const list = [...ingredients];
    list.splice(index, 1);
    setIngredients(list);
  };

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
      updateRecipe({
        _id: recipeId,
        label: label.label,
        image,
        ingredients,
        variant_id,
      })
    );
  };

  // console.log(productDetail)

  return (
    filteredCategories &&
    ingredients[0] && (
      <>
        <Link to='/admin/recipelist' className='btn btn-light my-3'>
          Go Back
        </Link>

        <h1 style={{ textAlign: "center" }}>{recipe && recipe.label}</h1>
        <div style={{ flex: 1 }}>
          <FormContainer>
            <div
              style={{
                backgroundImage: `url(${image})`,
                width: "100%",
                height: "500px",
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                flex: 1,
              }}
              className='div-image'
            ></div>
            {loadingUpdate && loading}
            {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
            {filteredCategories && ingredients && (
              <Form onSubmit={submitHandler}>
                <h2 style={{ padding: 50, textAlign: "center" }}>
                  Ingredients
                </h2>

                {ingredients.map((i, index) => {
                  return (
                    <Row className='create-update' key={index}>
                      {filteredCategories[0] && ingredients[0] && (
                        <Form.Group
                          as={Col}
                          controlId='Item'
                          style={{
                            width: "100%",
                            flexDirection: "row",
                            alignItems: "center",
                            padding: 10,
                            borderRadius: 15,
                            flex: 3,
                          }}
                        >
                          <Form.Label>Ingredient</Form.Label>
                          <Row></Row>
                          <Fragment>
                            {filteredCategories[0] && ingredients[0].value && (
                              <Select
                                className='basic-single '
                                classNamePrefix='select '
                                defaultValue={
                                  ingredients[index].value && ingredients[index]
                                }
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
                      )}

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
                          value={
                            ingredients[index].average_cost > 0
                              ? ingredients[index].average_cost.toFixed(2)
                              : 0
                          }
                          readOnly
                        ></Form.Control>
                      </Form.Group>

                      <Form.Group
                        as={Col}
                        controlId='buttons'
                        style={{
                          width: "100%",
                          padding: "10px",
                          borderRadius: 15,
                          flexDirection: "flex-end",
                          textAlign: "center",
                        }}
                      >
                        <Form.Label>Add/Remove</Form.Label>
                        <div style={{ width: 10, height: 0 }}></div>
                        {ingredients.length - 1 === index && (
                          <Button
                            as={Col}
                            onClick={() => handleAddClick(index)}
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

                { (
                  <Row style={{ display: "flex", flex: 2 }}>
                    {productDetail !== undefined && productDetail.variants && <Form.Group
                      as={Col}
                      controlId='sellingPrice'
                      style={{
                        flex: 1,
                        padding: 10,
                        borderRadius: 15,
                      }}
                    >
                      <Form.Label>Selling Price</Form.Label>
                      <Form.Control
                        name='sellingPrice'
                        type='text'
                        placeholder='Selling Price'
                        value={productDetail.variants.default_price}
                        readOnly
                      ></Form.Control>
                    </Form.Group>}
                    

                    <Form.Group
                      as={Col}
                      controlId='totalCost'
                      style={{
                        flex: 1,
                        padding: 10,
                        borderRadius: 15,
                      }}
                    >
                      <Form.Label>Total Cost</Form.Label>
                      <Form.Control
                        name='totalCost'
                        type='text'
                        placeholder='Total Cost'
                        value={totalCost ? totalCost.toFixed(2): 0}
                        readOnly
                      ></Form.Control>
                    </Form.Group>
                  </Row>
                )}

                <Row>
                  <Button
                    type='submit'
                    variant='primary'
                    style={{ backgroundColor: "red", border: 0 }}
                  >
                    Submit
                  </Button>
                </Row>
              </Form>
            )}
          </FormContainer>
        </div>
      </>
    )
  );
};

export default RecipeEditScreen;
