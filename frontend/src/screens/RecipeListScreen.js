import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { Row, Button, Col,  Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { deleteRecipe, listRecipes } from "../actions/recipeActions";


const RecipeListScreen = ({ history }) => {

  const dispatch = useDispatch();

  const recipeList = useSelector((state) => state.recipeList);
  const { loading, error, recipe } = recipeList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const recipeDelete = useSelector((state) => state.recipeDelete);
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = recipeDelete;

  useEffect(() => {
    if (userInfo || userInfo.isAdmin) {
      dispatch(listRecipes());
    } else {
      history.push("/login");
    }
  }, [dispatch, history, userInfo, successDelete]);


  const deleteHandler = (id) => {
    if (window.confirm("Are you sure")) {
      dispatch(deleteRecipe(id));
    }
  };

  return (
    <>
      <Col className='text-right'>
        <LinkContainer to={`/admin/recipe/create`}>
          <Button className='my-3'>
            <i className='fas fa-plus'></i> Create Recipe Item
          </Button>
        </LinkContainer>
      </Col>
      <Row className='align-items-center'>
        <Col>
        <h1 style={{ textAlign: "center" }}>RECIPES</h1>
        </Col>
      </Row>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
            <Row style={{ display: "flex" }}>
              {recipe.map((recipe, idx) => {
                return (
                  <Col
                  style={{ width: "25%" }}
                  key={idx}
                  sm={16}
                  md={6}
                  lg={4}
                  xl={3}
                >
                  <Card key={idx} className='my-3 p-3 rounded'>
                    <Link
                      style={{
                        boxShadow: "0 2px 10px 0 hsl(0deg 0% 61% / 50%)",
                      }}
                      to={`recipe/${recipe._id}/edit/${recipe.label}`}
                    >
                      <Card.Img
                        style={{
                          width: "100%",
                          height: "350px",
                          borderRadius: 3,
                          objectFit: "cover",
                        }}
                        src={recipe.image}
                        variant='top'
                      />
                    </Link>

                    <Card.Body>
                      <Card.Title style={{padding: "10px", minHeight: "100px"}} as='div'>
                        <strong>{recipe.label}</strong>
                      </Card.Title>
                      <Button
                        onClick={() => deleteHandler(recipe._id)}
                        
                        className='social-media'
                        type='button'
                        style={{
                          width: "100%",
                          backgroundColor: "red",
                          fontSize: "0.6em",
                        }}
                      >
                        DELETE
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
                );
              })}
            </Row>
        </>
      )}
    </>
  );
};

export default RecipeListScreen;
