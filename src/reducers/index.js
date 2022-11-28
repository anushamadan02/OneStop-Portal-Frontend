import {combineReducers} from 'redux';
import products from './products';
import orders from './orders';
import auth from './auth';
import posts from './posts';
import datas from "./dataconsump";
import plans from "./plan_cart"
import broadbands from "./broadband";
import blocations from "./broadbandlocation"
import paydetails  from './paymentgateway';
import cards from "./paymentcards";
import searchResults from "./search";
import currentbroadband from './currentbroadband';
import broadbandhistory  from './broadbandhis';
import planuser from "./plansbyid";
import searchResultsProduct from './searchResult';
import cart from './cart';
import details from './broadbandupgrade';



export default combineReducers({
    //considering the key and the value is the same, we are able to keep the first one
    products,orders,auth,searchResultsProduct,cart,posts,datas,plans,broadbands, blocations, paydetails, cards, searchResults, currentbroadband, broadbandhistory, planuser, details
});