import React, { useState, useEffect } from 'react';
import { Typography,MenuItem, Paper , TextField} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { Container, AppBar, Grow, Grid } from '@material-ui/core';
import { createTheme, withStyles, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import {InputLabel,FormHelperText,FormControl,Select} from '@material-ui/core';
import useStyles_1 from "./styles";
import axios from 'axios';
import Line from '../Line';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import base from '../../config/systemconfig'

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function Payment() {
    const dispatch = useDispatch();
    const [cards, setCards] = useState([]);
    var profile=JSON.parse(localStorage.getItem('profile'))
    const [paydetails, setPayDetails] = useState({});
    const [cardIndex, setCardIndex] = useState(-1);
    const classes = useStyles();
    useEffect(async ()=>{
      const {data}=await axios({
        method:"get",
        url:`${base.url}/paymentcards/${profile?.user?._id}`,
        headers: { "Content-Type": "application/json","Authorization": `Bearer ${profile.token}`}
      }) 
      setCards([...data])   
      },[dispatch])
    console.log(cards)

    const[CardNumber, setCardNumber]=useState("")
    const handleChange = (event) => {
      setCardNumber(event.target.value)
      // setPayDetails({ ...paydetails, CardNumber: event.target.value })
    };
    console.log(CardNumber)
    const [open, setOpen] = React.useState(false);

    const handleOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
    return (
    <Container >
        {/* <TextField
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
          {cards.map((card) => (
            <option key={card.value} value={card.value}>
              {card.cardnumber}
            </option>
          ))}
          </TextField>
          <button type="button" onClick={handleOpen}>
        react-transition-group
      </button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <h2 id="transition-modal-title">Transition modal</h2>
            <p id="transition-modal-description">react-transition-group animates me.</p>
          </div>
        </Fade>
      </Modal> */}
    </Container>
    );
  }
  export default Payment;

 