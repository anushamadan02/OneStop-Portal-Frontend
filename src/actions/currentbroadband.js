import {GET_CURRENT_BROADBAND} from '../constants/actionTypes';
import * as api from '../api/index.js';


export const getCurrentBroadbandPlan = (userid) => async (dispatch) => {
  try {
    const { data } = await api.getCurrentBroadbandPlan(userid);
    console.log("get current broadband")
    dispatch({ type: GET_CURRENT_BROADBAND, payload: data});
  } catch (error) {
    console.log(error);
  }
};




