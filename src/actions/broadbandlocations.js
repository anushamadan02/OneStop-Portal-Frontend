import {GET_BLOCATION} from '../constants/actionTypes';
import * as api from '../api/index.js';


export const getblocations = () => async (dispatch) => {
  try {
    const { data } = await api.getblocations();
    console.log("get all broadband locations")
    dispatch({ type: GET_BLOCATION, payload: data});
  } catch (error) {
    console.log(error);
  }
};






