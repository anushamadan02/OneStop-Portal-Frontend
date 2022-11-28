import {BULKUPLOAD,ADDPRODUCT, UPDATEPRODUCT, DELETEPRODUCT, FETCHPRODUCTS,ADDREVIEW,UPDATEREVIEW,DELETEREVIEW,LIKE} from '../constants/actionTypes';
import * as api from '../api/index.js';

export const getProducts = () => async (dispatch) => {
    try {
      const { data } = await api.fetchProducts();
      console.log("getproduts")
    //  console.log("products: ",data)
      dispatch({ type: FETCHPRODUCTS, payload: data });
    } catch (error) {
      console.log(error);
    }
  };

  export const addProduct = (prod,id) => async (dispatch) => {
    try {
      const { data } = await api.createProduct(prod,id);
      //console.log("createproduct")
      dispatch({ type: ADDPRODUCT, payload: data });
    } catch (error) {
      console.log("from action: ",error);
    }
  };

  export const updateProduct = (id, prod) => async (dispatch) => {
    try {
      const { data } = await api.updateProduct(id, prod);
      console.log("updateprodut")
      dispatch({ type: UPDATEPRODUCT, payload: data });
    } catch (error) {
      console.log(error);
    }
  };
  
  export const deleteProduct = (id,userid) => async (dispatch) => {
    try {
      await api.deleteProduct(id,userid);
      console.log("deleteproduct")
      dispatch({ type: DELETEPRODUCT, payload: id });
    } catch (error) {
      console.log(error);
    }
  };

  export const bulkUpload=(data,userid)=>async (dispatch)=>{
    try{
      console.log("bulkupload: ",data)
      console.log(userid)
      const {proddata}=await api.bulkupload(data,userid)
      
      dispatch({type:BULKUPLOAD,payload:proddata})
    }catch(error){
      console.log(error)
    }
  }

  export const addReview=(userid,prodid,body)=>async (dispatch)=>{
    try {
      var {data}=await api.addreview(userid,prodid,body);
      console.log("addreview")
      dispatch({ type: ADDREVIEW, payload: data });
    } catch (error) {
      console.log(error);
    }
  }

  export const updateReview=(userid,prodid,body)=>async (dispatch)=>{
    try {
      var {data}=await api.updatereview(userid,prodid,body);
      console.log("updatereview")
      dispatch({ type: UPDATEREVIEW, payload: data });
    } catch (error) {
      console.log(error);
    }
  }

  export const deleteReview=(userid,prodid)=>async (dispatch)=>{
    try {
      var {data}=await api.deletereview(userid,prodid);
      console.log("deletereview")
      dispatch({ type: DELETEREVIEW, payload: data });
    } catch (error) {
      console.log(error);
    }
  }

  export const likeproduct=(userid,prodid,body)=>async (dispatch)=>{
    try {
      var {data}=await api.likeproduct(userid,prodid,body);
      console.log("like product")
      dispatch({ type: LIKE, payload: data });
    } catch (error) {
      console.log(error);
    }
  }