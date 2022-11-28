import { GET_CARDS, CREATE_CARDS} from '../constants/actionTypes';
import * as api from '../api/index.js';
//these action functions can do dispatch and perform api calls

export const getcards= (user) => async (dispatch) => {
  try {
    const { data } = await api.getcards(user);
    console.log("get all cards of user ")
    dispatch({ type: GET_CARDS, payload: data});
  } catch (error) {
    console.log(error);
  }
};

export const createCard = (user, pcard) => async (dispatch) => {
  try {
    const { data } = await api.createCard(user, pcard);
    dispatch({ type: CREATE_CARDS, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};



