import {GET_BROADBAND_HIS} from '../constants/actionTypes';
import * as api from '../api/index.js';


export const getbroadbandhistory = (userid) => async (dispatch) => {
  try {
    const { data } = await api.getbroadbandhistory(userid);
    console.log("get broadband history")
    dispatch({ type: GET_BROADBAND_HIS, payload: data});
  } catch (error) {
    console.log(error);
  }
};




