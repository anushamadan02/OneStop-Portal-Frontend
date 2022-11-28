import {ADDTOCART,UPDATECART,FETCHCART,DELETEFROMCART,EMPTYCART} from '../constants/actionTypes';

export default (cart = [], action) => {
  switch (action.type) {
    case FETCHCART:
    case ADDTOCART:
      return action.payload;
    case UPDATECART:
      return cart.map((prod) =>{
       if(prod.product._id==action.payload.id)
       {
           prod.quantity=action.payload.quantity
       }
       return prod;
      });
    case DELETEFROMCART:
      return cart.filter((prod) => prod.product._id != action.payload);
    case EMPTYCART:
      return [...action.payload]  
    default:
      return cart;
  }
};