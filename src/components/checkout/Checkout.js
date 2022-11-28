import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Paper,Stepper,Step,StepLabel,Button,Typography} from '@material-ui/core';
import axios from 'axios'
import base from '../../config/systemconfig'
import valid from "card-validator";

import CancelPresentationRoundedIcon from '@material-ui/icons/CancelPresentationRounded';
import AddressForm from './AddressForm';
import PaymentForm from './PaymentForm';
import Review from './Review';
import { useDispatch} from 'react-redux';
import { useState } from 'react';
import {placeOrder} from '../../actions/userorders';
import {emptyCart} from '../../actions/cart';
import Snackbar from '../notifications/snackbar'

const useStyles = makeStyles((theme) => ({  
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    [theme.breakpoints.up(600 + theme.spacing(1) * 2)]: {
      width: 500,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    padding: theme.spacing(1),
    [theme.breakpoints.up(600 + theme.spacing(1) * 2)]: {
      marginTop: theme.spacing(2),
      marginBottom: theme.spacing(2),
      padding: theme.spacing(1),
    },
  },
  stepper: {
    padding: theme.spacing(2, 0, 4),
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(0),
    marginLeft: theme.spacing(1),
  },
}));

const steps = ['Shipping address', 'Payment details', 'Review your order'];

function getStepContent(step,setAddress,address,setpayment,payment,order) {
  switch (step) {
    case 0:
      return <AddressForm setAddress={setAddress} address={address}/>;
    case 1:
      return <PaymentForm setpayment={setpayment} payment={payment} />;
    case 2:
      return <Review order={order} address={address} payment={payment}/>;
    default:
      throw new Error('Unknown step');
  }
}

export default function Checkout({order,setOpen,setProdtoRemove,isCart}) {
  const classes = useStyles();
  const [activeStep, setActiveStep] =useState(0);
  const [address,setAddress]=useState("")
  const [payment,setpayment]=useState(null)
  const [openNotification, setOpenNotification] = React.useState(false);
  const [snackBarMsg, setSnackBarMsg] = useState(null)

  const dispatch=useDispatch()
  const user=JSON.parse(localStorage.getItem('profile'))
  const handleNext = () => {
    if(activeStep!=1||(valid.cardholderName(payment.cardname).isValid&&valid.number(payment.cardnumber).isValid&&valid.expirationDate(payment.expirydate).isValid))
       setActiveStep(activeStep + 1);
    
  };
  const placeOrdernow=async()=>{
    var cartprodremove=[]
    var amount=0
    try{
    order.forEach(prod=>{
      amount+=prod.count*prod.price
      console.log("checkout:",prod)
      if(isCart)
        cartprodremove.push(prod._id)
    })
    console.log("checkout: ",cartprodremove)
    var paymentid;
    if(!payment._id)
    {
      const {data}=await axios({
      method:"post",
      url:`${base.url}/paymentcards/${user.user._id}`,
      data:{cardname:payment.cardname,cardtype:payment.cardtype,cardnumber:payment.cardnumber,expirydate:payment.expirydate},
      headers: {"Content-Type": "application/json","Authorization": `Bearer ${user.token}`}
      });
      paymentid=data._id
    }else{
      paymentid=payment._id
    }
    await dispatch(placeOrder(paymentid,user.user._id,{
      order:{
        products:order,
        amount:amount,
        address:(address.firstname+" "+address.lastname+", "+address.address1+", "
        +address.address2+", "+address.city+", "+address.state+", "+address.postalCode+", "+address.country)
      },
      cvv:payment.cvv
    }))
  }catch(error){
     return
  }
  setOpen(false);
  if(isCart&&cartprodremove.length>1)
    {
      await dispatch(emptyCart(user.user._id))
      setProdtoRemove([])
    }
  else if(isCart)
    setProdtoRemove([...cartprodremove])
  
  setSnackBarMsg({ message: "Order Successfully..!", severity: "success" })
  setOpenNotification(true)
  window.location.reload();
  }
  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <div>
      <main className={classes.layout}>
        <Paper className={classes.paper}>
        <CancelPresentationRoundedIcon onClick={()=>{setOpen(false)}} style={{marginTop:"-10px",marginRight:"-6px",float:"right",color:"red",height:"25px",}}/>
          <Typography component="h1" variant="h4" align="center">
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Thank you for your order.
                </Typography>
                <Typography variant="subtitle1">
                  Your order number is #2001539. We have emailed your order confirmation, and will
                  send you an update when your order has shipped.
                </Typography>
              </React.Fragment>
            ) : (
              <div>
                {getStepContent(activeStep,setAddress,address,setpayment,payment,order)}
                <div className={classes.buttons}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} className={classes.button}>
                      Back
                    </Button>
                  )}
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={activeStep==2?placeOrdernow:handleNext}
                    className={classes.button}
                  >
                    {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
                  </Button>
                </div>
                </div>
            )}
          </React.Fragment>
        </Paper>
        
      </main>
      <Snackbar open={openNotification}  setOpen={setOpenNotification} snackBarMsg={snackBarMsg} setSnackBarMsg={setSnackBarMsg} />
      </div>
  );
}