import {UPGRADE_BROADBAND} from '../constants/actionTypes';
import * as api from '../api/index.js';


export const upgradeBroadbandPlan = (details, cardid, userid) => async (dispatch) => {
    try {
      const { data } = await api.upgradeBroadbandPlan(details, cardid, userid);
      dispatch({ type: UPGRADE_BROADBAND, payload: data });
    } catch (error) {
      console.log(error.message);
    }
  };
  