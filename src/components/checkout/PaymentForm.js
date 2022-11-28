import React, { useEffect,useState} from 'react';
import {useDispatch} from 'react-redux'
import {Typography,Grid,TextField,FormControlLabel,Checkbox,InputLabel,MenuItem,FormHelperText,FormControl,Select} from '@material-ui/core';
import axios from 'axios'
import { makeStyles, withStyles  } from '@material-ui/core/styles';
import valid from "card-validator";
import base from '../../config/systemconfig'
const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const DarkerDisabledTextField = withStyles({
  root: {
    marginRight: 8,
    "& .MuiInputBase-root.Mui-disabled": {
      color: "rgba(0, 0, 0, 0.6)" // (default alpha is 0.38)
    }
  }
})(TextField);

export default function PaymentForm({setpayment,payment,setisValid}) {
  
  const classes = useStyles();
  const [cards, setCards] = useState([]);
  const [cardIndex, setCardIndex] = useState(-1);

  const dispatch=useDispatch()
  const profile=JSON.parse(localStorage.getItem('profile'))

  var numberValidation = valid.number("4111");
  console.log(numberValidation)
  useEffect(async ()=>{
    const {data}=await axios({
    method:"get",
    url:`${base.url}/paymentcards/${profile.user._id}`,
    headers: { "Content-Type": "application/json","Authorization": `Bearer ${profile.token}`}
  }) 
  setCards([...data])   
  },[dispatch])
  
  useEffect(()=>{
    if(cardIndex!=-1)
    setpayment({...cards[cardIndex]})
  },[cardIndex])
  
  const handleChange = (event) => {
    setCardIndex(event.target.value);
    if(cardIndex!=-1)
      setpayment({...cards[cardIndex]})
  };
  console.log(cardIndex)
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Payment method
      </Typography>
      <Grid container spacing={3}>
      <Grid item xs={12} md={12}>
      <FormControl className={classes.formControl} style={{width:"480px"}}>
        <InputLabel id="demo-simple-select-helper-label">Add a new payment card</InputLabel>
        <Select
          labelId="demo-simple-select-helper-label"
          id="demo-simple-select-helper"
          value={cardIndex}
          onChange={handleChange}
        >
          {cards.map((card,index)=>{
            return <MenuItem value={index}>{valid.number(card?.cardnumber).card?.niceType+" / "+card?.cardnumber}</MenuItem>
          })}
        </Select>
      </FormControl>
      </Grid>
       {cardIndex==-1?(<>
        <Grid item xs={12} md={12}>
          <TextField
            required
            id="cardNumber"
            label="Card number" 
            fullWidth style={{width:"480px"}}
            autoComplete="cc-number"
            helperText={valid.number(payment?.cardnumber).isValid?"Valid..!":"Invalid..!"}
            value={payment?.cardnumber}
            error={!valid.number(payment?.cardnumber).isValid}
            onChange={(e)=>setpayment({...payment,cardnumber:e.target.value,cardtype:valid.number(payment?.cardnumber)?.card?.niceType})}
          />
        </Grid>
       <Grid item xs={12} md={6}>
          <TextField required id="cardName" label="Name on card" fullWidth autoComplete="cc-name"
          onChange={(e)=>setpayment({...payment,cardname:e.target.value})} style={{marginTop:"-15px"}} 
          value={payment?.cardname} error={!valid.cardholderName(payment?.cardname).isValid}
          helperText={valid.cardholderName(payment?.cardname).isValid?"":"Invalid Name"}
          />
        </Grid>
        <Grid item xs={12} md={6}>
        <DarkerDisabledTextField
             disabled={true}
             id="outlined-basic"
             value={payment?.cardtype} 
             autoComplete="cc-name" 
             helperText="Card Type"
             fullWidth
        />
          
        </Grid>
        
        <Grid item xs={12} md={6}>
          <TextField required id="expDate" label="Expiry date" fullWidth 
          autoComplete="cc-exp" onChange={(e)=>setpayment({...payment,expirydate:e.target.value})}
          error={!valid.expirationDate(payment?.expirydate).isValid} style={{marginTop:"-25px"}} 
          value={payment?.expirydate} helperText={valid.expirationDate(payment?.expirydate).isValid?"":"Invalid expiry date"}
          />
        </Grid></>):null}
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cvv" 
            label="CVV"
            helperText="Last three digits on signature strip"
            fullWidth style={{marginTop:"-25px",marginBottom:"20px"}} 
            autoComplete="cc-csc"
            onChange={(e)=>setpayment({...payment,cvv:e.target.value})}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}