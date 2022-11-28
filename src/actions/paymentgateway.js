import {PAY_BROADBAND, PAY_MOBILE } from '../constants/actionTypes';

import * as api from '../api/index.js';

export const mobileplanpay = (paydetails, postid, cardid, userid) => async (dispatch) => {
  try {
    const { data } = await api.mobileplanpay(paydetails, postid, cardid, userid);
    dispatch({ type: PAY_MOBILE, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};


export const broadbandpay = (paydetails, broadbandid, cardid, userid) => async (dispatch) => {
    try {
      const { data } = await api.broadbandpay(paydetails, broadbandid, cardid, userid);
      dispatch({ type: PAY_BROADBAND, payload: data });
    } catch (error) {
      console.log(error.message);
    }
  };
  