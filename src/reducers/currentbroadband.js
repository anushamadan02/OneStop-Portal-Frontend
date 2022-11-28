import { GET_CURRENT_BROADBAND } from '../constants/actionTypes';


export default (currentbroadband = [], action) => {
  switch (action.type) {
    case GET_CURRENT_BROADBAND:
      return action.payload;
    default:
      return currentbroadband;
  }
};
