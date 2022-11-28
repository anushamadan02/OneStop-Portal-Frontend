import { SEARCH} from '../constants/actionTypes';


export default (searchResults = [], action) => {
    switch (action.type) {
      case SEARCH:
           return action.payload
      default:
        return searchResults;
    }
  };