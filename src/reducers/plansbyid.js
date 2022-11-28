import {  GET_PLAN_BYID } from '../constants/actionTypes';

export default (plansuser= [], action) => {
  switch (action.type) {
      case GET_PLAN_BYID:
        return action.payload;
    default:
      return plansuser;
  }
};

