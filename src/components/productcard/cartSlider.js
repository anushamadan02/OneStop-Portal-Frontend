import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import {updateCart} from '../../actions/cart'
import Card from './cartproduct'
import { getCart } from '../../actions/cart';
import {Button, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Googlemodal from '../googleauth/googlemodal'
import Checkoutmodal from '../checkout/checkoutModal'


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  }
}));

function Cart() {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const [openPayment,setOpenpayment]=useState(false)
  var [prodtoRemove,setProdtoRemove]=useState([])
  const history=useHistory();
  var profile = JSON.parse(localStorage.getItem("profile"));
  const classes = useStyles();
  const [order,setOrder]=useState([])
  var orderdata=[]
  useEffect(()=>{
    prodtoRemove.forEach(async p=>{
      await dispatch(updateCart(profile.user._id,{id:p,quantity:0}))
    })
  },[prodtoRemove,dispatch])
  const [open, setOpen] = React.useState(false);
  const handleNavigation=(e)=>{
         e.preventDefault()
         history.push('/products')
  }
  const placeorder=(e)=>{
    cart.forEach(prod=>{
      orderdata.push({
        count:prod.quantity,_id:prod.product._id,name:prod.product.name,
        description:prod.product.description,price:prod.product.price,
        category:prod.product.category,summary:prod.product.summary
      })
    })
    setOrder(orderdata)
    setOpenpayment(true)
  }
  useEffect(()=>{
    if(cart.length===0)
      dispatch(getCart(profile?.user?._id))
  },[dispatch])
  
  var prodjsx = cart.map(prod => {
     return <Grid container item lg={3} sm={6} xs={12} style={{ marginTop: "3px" }}><Card prod={prod} setProdtoRemove={setProdtoRemove} prodtoRemove={prodtoRemove}/></Grid>
  });
    return (
      <div className={classes.root}>
      <Grid container item lg={12} spacing={1} style={{textAlign:"center"}} >
        {
          profile?
        (cart.length != 0 ? prodjsx : (
          <div style={{textAlign:"center",width:"100%"}}>
            <Typography variant="h2">Hey, it feels so light!</Typography>
            <Typography variant="h6">There is nothing in your bag. Lets add Some</Typography>
          <br></br>
         </div>
        )):(<div style={{textAlign:"center",width:"100%"}}>
          <Typography variant="h2">Hey, Looks like you have not signed in!</Typography>
          <Typography variant="h6">Sign in to view your cart</Typography>
        <br></br>
       </div>)
      }
      </Grid>
      {profile &&
    //  <Paper style={{marginTop: "10px",height:"50px" }}>
      <Grid container justify="center" alignItems="center" alignContent="center" spacing={3}
        style={{ marginTop: "20px" }}>
          <div style={{marginTop:"6px"}}>
      <Button variant="contained" color="primary" onClick={handleNavigation}>Continue Shoping</Button>
      {cart.length!=0 && <Button variant="contained" style={{marginLeft:"5px"}} color="primary" onClick={placeorder}>Place Order</Button>}
      </div>
      </Grid>
     // </Paper>
      }
      <Googlemodal open={open} setOpen={setOpen}/>
      <Checkoutmodal open={openPayment} setOpen={setOpenpayment}  order={order} setProdtoRemove={setProdtoRemove} isCart={true} />
      </div>
    );
  }
  
  export default Cart;