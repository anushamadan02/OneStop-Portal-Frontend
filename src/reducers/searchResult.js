import { SEARCHPRODUCT} from '../constants/actionTypes';
export default (searchResults = [], action) => {
    switch (action.type) {
      case SEARCHPRODUCT:
           return action.payload
      default:
           return searchResults;
    }
  };