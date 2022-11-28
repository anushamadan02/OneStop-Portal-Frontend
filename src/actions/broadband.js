import { GET_BROADBAND_PLAN, CREATE_BROADBAND_PLAN, DELETE_BROADBAND,UPDATE_BROADBAND_PLAN} from '../constants/actionTypes';
import * as api from '../api/index.js';
//these action functions can do dispatch and perform api calls

export const getbroadbands= () => async (dispatch) => {
  try {
    const { data } = await api.fetchbroadband();
    console.log("get all broadband plans ")
    dispatch({ type: GET_BROADBAND_PLAN, payload: data});
  } catch (error) {
    console.log(error);
  }
};

export const createBroadbandPlan = (user, bpost) => async (dispatch) => {
  try {
    const { data } = await api.createBPlan(user, bpost);
    dispatch({ type: CREATE_BROADBAND_PLAN, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const deletebroadband = (user, broadbandid) => async (dispatch) => {
  try {
    await api.deletebroadband(user, broadbandid);
    dispatch({ type: DELETE_BROADBAND, payload: broadbandid });
  } catch (error) {
    console.log(error.message);
  }
};

export const updatebroadband = (userid, id, post) => async (dispatch) => {
  try {
    const { data } = await api.updatebroadband(userid, id, post);
    dispatch({ type: UPDATE_BROADBAND_PLAN, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

