import {GET_DATAC} from '../constants/actionTypes';


export default (datas = [], action) => {
    switch (action.type) {
        case GET_DATAC:
            return action.payload;
        default:
            return datas
    }
}