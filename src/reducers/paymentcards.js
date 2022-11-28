import {GET_CARDS, CREATE_CARDS} from '../constants/actionTypes';


export default (cards = [], action) => {
    switch (action.type) {
        case GET_CARDS:
            return action.payload;
        case CREATE_CARDS:
            return [...cards, action.payload];
        default:
            return cards
    }
}