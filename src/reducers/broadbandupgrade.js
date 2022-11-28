import {UPGRADE_BROADBAND } from '../constants/actionTypes';


export default (details = [], action) => {
  switch (action.type) {
    case UPGRADE_BROADBAND:
      return [...details, action.payload];
    default:
      return details;
  }
};

