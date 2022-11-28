import { CREATE_PLAN, GET_PLAN, GET_PLAN_BYID} from '../constants/actionTypes';

import * as api from '../api/index.js';
export const addtocart = (post) => async (dispatch) => {
    try {
      const { data } = await api.addtocart(post);
  
      dispatch({ type: CREATE_PLAN, payload: data });
    } catch (error) {
      console.log(error.message);
    }
  };

  export const getplans = () => async (dispatch) => {
    try {
      const { data } = await api.fetchplanscart();
      console.log("get plans")
      dispatch({ type: GET_PLAN, payload: data });
    } catch (error) {
      console.log(error.message);
    }
  };

  export const getplanbyid = (userid) => async (dispatch) => {
    try {
      const { data } = await api.getplanbyid(userid);
      console.log("get plans by id")
      dispatch({ type: GET_PLAN_BYID, payload: data });
    } catch (error) {
      console.log(error.message);
    }
  };