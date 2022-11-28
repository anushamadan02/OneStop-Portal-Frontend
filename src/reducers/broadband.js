import {CREATE_BROADBAND_PLAN, DELETE_BROADBAND, GET_BROADBAND_PLAN, UPDATE_BROADBAND_PLAN} from '../constants/actionTypes';


export default (broadbands = [], action) => {
    switch (action.type) {
        case GET_BROADBAND_PLAN:
            return action.payload;
        case CREATE_BROADBAND_PLAN:
            return [...broadbands, action.payload];
        case DELETE_BROADBAND:
            return broadbands.filter((broadband) => broadband._id !== action.payload);
        case UPDATE_BROADBAND_PLAN:
            return broadbands.map((broadband) => (broadband._id === action.payload._id ? action.payload : broadband));
        default:
            return broadbands
    }
}