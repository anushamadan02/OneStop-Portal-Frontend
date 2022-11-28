import { GOOGLEAUTH } from '../constants/actionTypes';
import * as api from '../api/index.js';


export const googlesignin = (user) => async (dispatch) => {
  try {
    const { data } = await api.googlesignIn(user);
    dispatch({ type: GOOGLEAUTH, payload: data });
  } catch (error) {
    console.log(error);
  }
};

/*export const login = () => async (dispatch) => {
  try {
    const { data } = await api.getProfile();
    console.log("login:",data)
    dispatch({ type: AUTH, data });

  } catch (error) {
    console.log(error);
  }
};*/