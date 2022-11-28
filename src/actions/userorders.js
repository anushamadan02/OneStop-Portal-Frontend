import {CREATEORDER,GETUSERORDERS} from '../constants/actionTypes';
import * as api from '../api/index.js';

export const placeOrder = (cardid,userid,order) => async (dispatch) => {
    try {
      const { data } = await api.createOrder(cardid,userid,order);
      console.log("createorder")
      dispatch({ type: CREATEORDER, payload: data });
    } catch (error) {
      console.log(error);
    }
};

export const getUserOrders = (userid) => async (dispatch) => {
    try {
      const { data } = await api.fetchUserOrders(userid);
      console.log("getuserorders")
      dispatch({ type: GETUSERORDERS, payload: data });
    } catch (error) {
      console.log(error);
    }
  };