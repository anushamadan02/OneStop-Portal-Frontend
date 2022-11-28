import {BULKUPLOAD,ADDPRODUCT, UPDATEPRODUCT, DELETEPRODUCT, FETCHPRODUCTS,ADDREVIEW,UPDATEREVIEW,DELETEREVIEW,LIKE} from '../constants/actionTypes';

export default (products = [], action) => {
  switch (action.type) {
    case FETCHPRODUCTS:
      return action.payload;
    case ADDPRODUCT:
      return [...products, action.payload];
    case UPDATEPRODUCT:
      return products.map((product) => (product._id === action.payload._id ? action.payload : product));
    case DELETEPRODUCT:
      return products.filter((product) => product._id !== action.payload);
    case BULKUPLOAD:
      console.log("payload: ",action.payload)
      return products;
    case ADDREVIEW:
    case DELETEREVIEW:
    case UPDATEREVIEW:
    case LIKE:
      products.every((prod,index)=>{
        if(action.payload._id==prod._id){
           products[index]=action.payload
           return false
        }
        return true
      })
      return [...products]
    default:
      return products;
  }
};