import {CREATEORDER, GETUSERORDERS} from '../constants/actionTypes';

export default (orders = [], action) => {
  switch (action.type) {
    case GETUSERORDERS:
      return action.payload;
    case CREATEORDER:
      return [action.payload,...orders];
    default:
      return orders;
  }
};