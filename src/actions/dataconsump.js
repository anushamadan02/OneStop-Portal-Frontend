import { GET_DATAC} from '../constants/actionTypes';
import * as api from '../api/index.js';
//these action functions can do dispatch and perform api calls

export const getdataconsump= () => async (dispatch) => {
  try {
    const { data } = await api.fetchdataconsump();
    console.log("get mobile data consumption")
    dispatch({ type: GET_DATAC, payload: data});
  } catch (error) {
    console.log(error);
  }
};