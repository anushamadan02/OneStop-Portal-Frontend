import {GET_USERS} from '../constants/actionTypes';
import * as api from '../api/index.js';
//these action functions can do dispatch and perform api calls

export const getusers= () => async (dispatch) => {
  try {
    const { data } = await api.fetchusers();
    console.log("get all users ")
    dispatch({ type: GET_USERS, payload: data});
  } catch (error) {
    console.log(error);
  }
};


