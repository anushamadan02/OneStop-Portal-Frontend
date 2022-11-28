import * as actionType from '../constants/actionTypes';

const authReducer = (state = { authData: null }, action) => {
  switch (action.type) {
    case actionType.GOOGLEAUTH:
      localStorage.setItem('profile', JSON.stringify({ ...action?.payload }));
      return { ...state, authData: action.data, loading: false, errors: null };

    case actionType.AUTH:
      localStorage.setItem('profile', JSON.stringify({ ...action?.data }));
      console.log("auth");
      return { ...state, authData: action.data, loading: false, errors: null };
    case actionType.LOGOUT:
      localStorage.clear();
      console.log("logout")
      return { ...state, authData: null, loading: false, errors: null };
    default:
      return state;
  }
};
export default authReducer;
