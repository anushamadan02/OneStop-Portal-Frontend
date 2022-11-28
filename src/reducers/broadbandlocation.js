import { GET_BLOCATION } from '../constants/actionTypes';


export default (blocations = [], action) => {
  switch (action.type) {
    case GET_BLOCATION:
      return action.payload;
    default:
      return blocations;
  }
};
