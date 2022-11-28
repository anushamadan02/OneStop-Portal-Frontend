import {SEARCH} from '../constants/actionTypes';
import * as api from '../api/index.js';

export const search = (searchterm) => async (dispatch) => {
    try {
      const { data } = await api.search(searchterm);
      console.log("search")
      dispatch({ type: SEARCH, payload: data });  //this action now can be imported anywhere and dispatched to reducer
    } catch (error) {
      console.log(error);
    }
    console.log("search front")
  };
