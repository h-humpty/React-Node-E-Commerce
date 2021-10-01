import React, { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { listReceipt } from "../actions/receiptActions";
import { listInventoryLevel } from "../actions/inventoryLevelActions";
import { groupInventory } from "../actions/inventoryActions";
import { listRecipes } from "../actions/recipeActions";


const TotalStock = () => {
  const dispatch = useDispatch();

  const receiptList = useSelector((state) => state.receiptList);
  const { loading, error, receipt } = receiptList;

  const inventoryLevelList = useSelector((state) => state.inventoryLevelList);
  const {
    loading: loadingInventoryLevel,
    error: errorInventoryLevel,
    inventoryLevel,
  } = inventoryLevelList;

  const inventoryGroupList = useSelector((state) => state.inventoryGroup);
  const {
    loading: loadingInventoryGroup,
    error: errorInventoryGroup,
    inventory: inventoryGroup,
  } = inventoryGroupList;

  const recipeList = useSelector((state) => state.recipeList);
  const { loading: loadingRecipe, error: errorRecipe, recipe } = recipeList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  //   console.log(inventoryLevel);

  const [data, setData] = useState([
    { updated_at: "", item: "", category: "", in_stock: 0, variant_id: "" },
  ]);

  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (userInfo || userInfo.isAdmin) {
      dispatch(listReceipt());
      dispatch(listInventoryLevel());
      dispatch(groupInventory());
      dispatch(listRecipes());
    }
  }, [dispatch, userInfo]);

  const remove_duplicates = (arr) => {
    var obj = {};
    var ret_arr = [];
    for (var i = 0; i < arr.length; i++) {
      obj[arr[i]] = true;
    }
    for (var key in obj) {
      ret_arr.push(key);
    }
    return ret_arr;
  };

  // const inventoryLevelsDuplicates = remove_duplicates(
  //   inventoryLevel.map((item) => item.item)
  // );

  // const filteredItems = inventoryGroup.filter((items) => {
  //   for (let i = 0; i < inventoryLevel.length; i++) {
  //     if (items._id === inventoryLevel[i].item) {
  //       return items;
  //     }
  //   }
  // });
  

  const updatedInventoryLevel = useCallback(() => 
      {
        inventoryLevel.forEach((inventorylevel) => {
          const { updated_at, item, category, in_stock } = inventorylevel;
    
          const inventoryLevelDate = (updated_at).toISOString();
          // let inventoryDate = inventoryLevelDate.toISOString();
    
          // console.log(inventoryLevelDate.getTime())
          // console.log(updated_at)
    
          receipt.forEach((receipts) => {
            const { updated_at, created_at, line_items } = receipts;
    
            const receiptsDate = new Date(created_at);
    
            // console.log(receiptsDate.getTime())
    
            if (receiptsDate.getTime() > inventoryLevelDate.getTime()) {
              line_items.map((lineItems) => {
                const { variant_id, item_name, variant_name, quantity } = lineItems;
    
                let splitted = variant_name && variant_name.split("/");
                let name = splitted && splitted[0];
                // let size = splitted && splitted[1];
                let updatedQuantity = in_stock - quantity;
                let list = [...data, { updated_at: "", item: "", category: "", in_stock: 0, variant_id: "" }];
                if (name === item) {
                  // console.log(name + " / " + item)
                  // console.log(lineItems +  " / " + inventorylevel)
    
                  list[index]["updated_at"] = created_at;
                  list[index]["item"] = item;
                  list[index]["category"] = category;
                  list[index]["in_stock"] = updatedQuantity;
                  list[index]["variant_id"] = variant_id;
    
                  // list.push({
                  //   updated_at: created_at,
                  //   item: item,
                  //   category: category,
                  //   in_stock: updatedQuantity,
                  //   variant_id: variant_id,
                  // });
    
                  setData([list]);
                  setIndex((index) => index + 1);
                  // return setData(() => [list]);
    
                  // return {
                  //   updated_at: created_at,
                  //   item: item,
                  //   category: category,
                  //   in_stock: updatedQuantity,
                  //   variant_id: variant_id,
                  // };
                } else {
                  recipe.map((recipes) => {
                    const { label, ingredients } = recipes;
    
                    if (label === name) {
                      ingredients.map((ingredient) => {
                        const { text, weight } = ingredient;
    
                        inventoryLevel.find((item) => {
                          if (item.item === text) {
                            const totalWeight = weight * quantity;
    
                            list[index]["updated_at"] = created_at;
                            list[index]["item"] = item;
                            list[index]["category"] = category;
                            list[index]["in_stock"] = in_stock - totalWeight;
                            list[index]["variant_id"] = variant_id;
    
                            // list.push({
                            //   updated_at: created_at,
                            //   item: item,
                            //   category: category,
                            //   in_stock: in_stock - totalWeight,
                            //   variant_id: variant_id,
                            // });
                            setIndex((index) => index + 1);
                            setData([list])
                            
                          }
                        });
                      });
                    }
                  });
                }
               
              });
            }
          });
        });
      },
    [data, index, inventoryLevel, receipt, recipe]) 
  useEffect(() => {
    if (inventoryLevel && receipt) {
      updatedInventoryLevel();
    }
  }, [inventoryLevel, receipt, updatedInventoryLevel]);

  //   console.log(Date.now);
  //   console.log(filteredItems);
  //   console.log(receipt);

  // console.log(updatedInventoryLevel);
  console.log(data);
  // console.log(index);
  // console.log(arr)

  return <div></div>;
};

export default TotalStock;
