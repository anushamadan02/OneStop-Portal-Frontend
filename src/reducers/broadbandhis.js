import { GET_BROADBAND_HIS } from '../constants/actionTypes';


export default (broadbandhistory = [], action) => {
  switch (action.type) {
    case GET_BROADBAND_HIS:
      return action.payload;
    default:
      return broadbandhistory
  }
};
