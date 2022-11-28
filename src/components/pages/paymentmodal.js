import React, { useState, useEffect } from 'react';
import {  Button, Typography, Paper } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import useStyles from '../Form/styles';
import { createPost, updatePost } from '../../actions/posts';
import {  Grid } from '@material-ui/core';
import { green } from '@material-ui/core/colors';
import { withStyles, makeStyles} from '@material-ui/core/styles';
import PaymentForm from './PaymentForm';
import PaymentForm_1 from './PaymentForm_1';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import { Card, CardContent} from '@material-ui/core/';
import useStyles_1 from "./styles"
import "./PaymentForm.css";



  const useStyles_2 = makeStyles((theme) => ({
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
function PaymentModal(clicked, clickedrenew) {
    const dispatch = useDispatch();
    console.log(window.innerWidth )
    const classes = useStyles();
    const classes_1 = useStyles_1();
    const [value, setValue] = React.useState('move');
    const details = JSON.parse(localStorage.getItem("profile"));
    const plansMobile = JSON.parse(localStorage.getItem("mobileplan"));
    const broadband = JSON.parse(localStorage.getItem("broadband"));
    const [bwarn, setBWarning] = React.useState(false);
    const [mwarn, setMWarning] = React.useState(false);
    const [styling, setStyling] = React.useState("");

  const classes_2 = useStyles_2();
  const handleChange = (event) => {
    setValue(event.target.value);
    console.log(value)
  };
  const handleRemoveBroadband = () => {
    console.log("B is clicked")
    localStorage.removeItem("broadband")
    setBWarning(true)

  };
  const handleRemoveMobile = () => {
    localStorage.removeItem("mobileplan")
    console.log("M is clicked")
    setMWarning(true)
  };
  
  console.log(clicked)
    return (
      <div class="wrapper">
          <div className={classes_2.paper} >
      <FormControl component="fieldset">
      <RadioGroup row aria-label="page" name="page1" value={value} onChange={handleChange}>
      <FormControlLabel value="add" control={<Radio color="primary" />} label="Add Card" />
      <FormControlLabel value="move" control={<Radio color="primary" />} label="Continue with Payment" />
      </RadioGroup>
      </FormControl>
      <Grid container  justify="space-between" alignItems="Top" >
              <Grid item xs={6} sm={6}>
              {value==="add"? <PaymentForm/>: <PaymentForm_1 clicked={clicked} clickedrenew={clickedrenew}/> }
              {broadband!=null?<><Button type="button" style={{marginTop:"10px" , width:"250px"}} size="small" className={classes.buttonSubmit} variant="contained" color="primary"  onClick={handleRemoveBroadband}>
          Remove Broadband plan
      </Button></>:<></>}

       {plansMobile!=null?<><Button type="button" style={{width:"250px"}} size="small" className={classes.buttonSubmit} variant="contained" color="primary"  onClick={handleRemoveMobile}>
          Remove Mobile plan
      </Button></>:<></>}
              </Grid>
              <Grid style={{marginLeft:"5px"}}item xs={6} sm={5}>
  <Card style={{ width:"230px", justifyContent:"start"}}>
  <div style={{justifyContent:"center", textAlign:"center", marginBottom:"20px"}}>
  <Typography style={{justifyContent:"center", color:"#203354"}} variant="h8">Plans Selected</Typography></div>
     
              {
      plansMobile != null && mwarn===false ?<>
      <Card style={{height:"170px", width:"200px", marginBottom:"10px", marginLeft: "20px"}}  >
      <Typography  style={{marginLeft:"10px", marginTop:"10px", color:"#203354"}} variant="h8">MOBILE PLAN</Typography>
      <CardContent >
      <div><span  STYLE="color:grey;font-weight:600;font-size:14px">PLAN: </span><span  STYLE="font-size:13px">{plansMobile?.plan}</span></div>
      <div><span  STYLE="color:grey;font-weight:600;font-size:14px">VALIDITY: </span><span  STYLE="font-size:13px">{plansMobile?.validity}</span></div>
      <div><span  STYLE="color:grey;font-weight:600;font-size:14px">DATA: </span><span  STYLE="font-size:13px">{plansMobile?.data}</span></div>
      <div><span  STYLE="color:grey;font-weight:600;font-size:14px"> SMS: </span><span  STYLE="font-size:13px">{plansMobile?.SMS}</span></div>
      <div><span  STYLE="color:grey;font-weight:600;font-size:14px">COST: </span><span  STYLE="font-size:13px">{plansMobile?.cost}</span></div>
      </CardContent>
      </Card>
    </>:<></>
      }

{
       broadband !=null  && bwarn===false?<>
      <Card style={{height:"170px", width:"200px", marginTop:"20px",  marginBottom:"20px", marginLeft: "20px"}} >
      <Typography style={{marginLeft:"10px",  marginTop:"10px", color:"#203354"}} variant="h8">BROADBAND PLAN</Typography>
      <CardContent >
      <div><span  STYLE="color:grey;font-weight:600;font-size:14px">PLAN: </span><span  STYLE="font-size:13px">{broadband?.name}</span></div>
      <div><span  STYLE="color:grey;font-weight:600;font-size:14px">VALIDITY: </span><span  STYLE="font-size:13px">{broadband?.validity}</span></div>
      <div><span  STYLE="color:grey;font-weight:600;font-size:14px">DATA: </span><span  STYLE="font-size:13px">{broadband?.data}</span></div>
      <div><span  STYLE="color:grey;font-weight:600;font-size:14px"> COST: </span><span  STYLE="font-size:13px">{broadband?.monthlyprice+broadband?.installationcharges}</span></div>
      <div><span  STYLE="color:grey;font-weight:600;font-size:14px">SPEED:</span><span  STYLE="font-size:13px">{broadband?.uploadspeed}</span></div>
      </CardContent>
      </Card>
    </>:<></>
      }
      
      
     </Card>
              </Grid>
            </Grid>
          </div>
          </div>

    );
  }
  
  export default PaymentModal;

 