import {ADDTOCART,UPDATECART,FETCHCART,DELETEFROMCART,EMPTYCART} from '../constants/actionTypes';
import * as api from '../api/index.js';

export const getCart = (id) => async (dispatch) => {
    try {
      const { data } = await api.getcart(id);
      console.log("getcart:",data)
      dispatch({ type: FETCHCART, payload: data });
    } catch (error) {
      console.log(error);
    }
  };
  export const addProductToCart = (userid,prod) => async (dispatch) => {
    console.log("add to cart controller")
    try {
      const { data } = await api.addproducttocart(userid,prod);
      console.log("addingtocart")
      dispatch({ type: ADDTOCART, payload: data });
    } catch (error) {
      console.log("from action: ",error);
    }
  };
  export const updateCart = (userid,prod) =>async (dispatch) => {
    try {
        if(prod.quantity===0){
            await api.deletefromcart(userid,prod.id)
            console.log("deleting product from cart")
            dispatch({ type: DELETEFROMCART, payload: prod.id });
        }else{
            api.updatecart(userid,prod);
            console.log("updatingcart")
            dispatch({ type: UPDATECART, payload: prod });
        }
    } catch (error) {
      console.log("from action: ",error);
    }
  };
  export const emptyCart = (userid) => async (dispatch) => {
    console.log("empty cart")
    try {
      const { data } = await api.emptyCart(userid);
      console.log("addingtocart")
      dispatch({ type: EMPTYCART, payload: data });
    } catch (error) {
      console.log("from action: ",error);
    }
  };