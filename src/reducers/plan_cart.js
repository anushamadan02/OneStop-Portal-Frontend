import {  CREATE_PLAN, GET_PLAN, } from '../constants/actionTypes';

export default (plans = [], action) => {
  switch (action.type) {
    case CREATE_PLAN:
      return [...plans, action.payload];
      case GET_PLAN:
        return action.payload;
    default:
      return plans;
  }
};

