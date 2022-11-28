import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography,MenuItem,Paper } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import useStyles from '../Form/styles';
import { createPost, updatePost } from '../../actions/posts';
import { Container, AppBar, Grow, Grid } from '@material-ui/core';
import {getplans} from "../../actions/plancart";
import { green } from '@material-ui/core/colors';
import { createTheme, withStyles, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import pic from '../../images/cards.png';
import { mobileplanpay } from '../../actions/paymentgateway';
import {broadbandpay} from '../../actions/paymentgateway';
import {getcards} from '../../actions/payment';
import { upgradeBroadbandPlan } from '../../actions/broadbandupgrade';
import {InputLabel,FormHelperText,FormControl,Select} from '@material-ui/core';
import useStyles_1 from "./styles";
import axios from 'axios';

const useStyles_form = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const BootstrapButton = withStyles({
    root: {
      boxShadow: 'none',
      textTransform: 'none',
      backgroundColor: '#0063cc',
      borderColor: '#0063cc',
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(','),
      '&:hover': {
        backgroundColor: '#0069d9',
        borderColor: '#0062cc',
        boxShadow: 'none',
      },
      '&:active': {
        boxShadow: 'none',
        backgroundColor: '#0062cc',
        borderColor: '#005cbf',
      },
      '&:focus': {
        boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
      },
    },
  })(Button);
  
  const ColorButton = withStyles((theme) => ({
    root: {
      color: theme.palette.getContrastText(green[500]),
      backgroundColor: green[500],
      '&:hover': {
        backgroundColor: green[700],
      },
    },
  }))(Button);
function PaymentForm_1(clicked, clickedrenew) {
    const [paydetails, setPayDetails] = useState({});
    const currentbroadband = useSelector((state) => state.currentbroadband);
    const dispatch = useDispatch();
    const classes = useStyles();
    const classes_form = useStyles_form();
    var TotalCost=0;
    const plansMobile = JSON.parse(localStorage.getItem("mobileplan"));
    const broadband = JSON.parse(localStorage.getItem("broadband"));
    console.log(currentbroadband[currentbroadband.length-1])
    console.log(broadband)
    let broadbandUpgradeDetails = {newplan:broadband, currentplan:currentbroadband[currentbroadband.length-1], address: paydetails.address, cvv:paydetails.cvv};
    let broadbandRenewDetails = {currentplan:currentbroadband[currentbroadband.length-1], address: paydetails.address, cvv:paydetails.cvv};
   
    console.log(broadbandUpgradeDetails)
    var profile=JSON.parse(localStorage.getItem('profile'))
    const [cardID, setCardId] = useState({});
    const [cardIndex, setCardIndex] = useState(-1);
    useEffect(() => {
      if (cards.length == 0)
        dispatch(getcards(profile?.user?._id));
    }, [dispatch])
    const cards = useSelector((state) => state.cards);
    if(plansMobile!=null){
      TotalCost=TotalCost+parseInt(plansMobile.cost)
    }
    if(broadband!=null){
      TotalCost=TotalCost+parseInt(broadband.monthlyprice)+parseInt(broadband.installationcharges)
    }
   
   
    const[CardNumber, setCardNumber]=useState("")
    const handleChange = (event) => {
      setCardNumber(event.target.value)
      setPayDetails({ ...paydetails, CardNumber: event.target.value })
    };
    console.log(CardNumber)
    console.log(paydetails)
    //if payment for upgrade stat is true, if payment for renew, statrenew true
    var stat=clicked.clicked.clicked;
    var statrenew=clicked.clicked.clickedrenew

  
    const handleSubmit = e => {
      e.preventDefault()
      for (var i=0; i<cards.length;i++) {
        if(cards[i].cardnumber===Number(paydetails.CardNumber)){
          setCardId(cards[i]._id)
        }
      }
      if (broadband!=null && stat===true && statrenew!=false && typeof(cardID)!= "object"){
        dispatch(upgradeBroadbandPlan(broadbandUpgradeDetails,cardID, profile?.user?._id));
        alert("Paid, Check Recharge history and current plan")
      
      }
      if(broadband!=null && stat!==true && statrenew!=true && typeof(cardID)!= "object"){
        dispatch(broadbandpay(paydetails, broadband._id, cardID, profile?.user?._id))
        alert("Paid, Check Recharge history and current plan")
     
      }
      if(broadband!=null && stat!==true && statrenew==true && typeof(cardID)!= "object"){
        dispatch(upgradeBroadbandPlan(broadbandRenewDetails,cardID, profile?.user?._id))
        alert("Paid, Check Recharge history and current plan")
     
      }
      if(plansMobile!=null && typeof(cardID)!= "object"){
        dispatch(mobileplanpay(paydetails, plansMobile._id, cardID, profile?.user?._id));
        alert("Paid, Check Recharge history and current plan")
     
        }
  
          //  if (plansMobile._id != " " && broadbandpay._id!=" ") {
          //    dispatch(mobileplanpay(paydetails, plansMobile._id,cardID, user));
          //    dispatch(broadbandpay(paydetails, plansMobile._id,cardID,  user))
          //    console.log("Payment done")
          //    localStorage.setItem("mobileplan", "");
          //    localStorage.setItem("broadband", "");
          //  } 
          //  else{
          //    if (plansMobile._id!= " "){
          //      dispatch(mobileplanpay(paydetails, plansMobile._id, cardID, user));
          //      console.log("Payment done")
          //      localStorage.setItem("mobileplan", "");
          //    }
          //    else{
          //      dispatch(broadbandpay(paydetails, plansMobile._id,cardID, user))
          //      console.log("Payment done")
          //      localStorage.setItem("broadband", "");
          //    }};
        };
      
    return (
 <div>
        <Paper className={classes.paper}>
          <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit} >
          <Typography> Payment Confirmation</Typography>
            <img height='40px' width="200px" marginLeft="2px" src={pic} align="center" align="left"></img>
           
            <TextField
          id="outlined-select-position-native"
          name="Card Number"
          select
          size="small" 
          value={paydetails.CardNumber}
          fullWidth
          onChange={handleChange}
          SelectProps={{
            native: true,
          }}
          variant="outlined"
        >
        
          <option> </option>
          {cards.map((card) => (
            <option key={card.value} value={card.value}>
              {card.cardnumber}
            </option>
          ))}
          </TextField>
     
  
            {/* <TextField style={{margin:"10px"}} size="small" name="CardNumber" variant="outlined" label="Card Number" fullWidth value={paydetails.CardNumber} onChange={(e) => setPayDetails({ ...paydetails, CardNumber: e.target.value })}/> */}
            <TextField style={{margin:"10px"}} size="small" name="cvv" variant="outlined" label="CVV" fullWidth value={paydetails.cvv} onChange={(e) => setPayDetails({ ...paydetails, cvv: e.target.value })} />
            <TextField style={{margin:"10px"}} size="small" name="address" variant="outlined" label="Address" fullWidth value={paydetails.address} onChange={(e) => setPayDetails({ ...paydetails, address: e.target.value })} />
            <Typography>Total Payment: {TotalCost}</Typography>
            <ColorButton  size="small" className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>CONFIRM PAYMENT</ColorButton>
          </form>
        </Paper>
     
    </div>

    );
  }
  
  export default PaymentForm_1;