

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useStyles from './mobilestyles';
import { Container, Card, CardContent, AppBar, Typography, Grow, Grid } from '@material-ui/core';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Line from "../Line";
import LanguageIcon from '@material-ui/icons/Language';
import StoreIcon from '@material-ui/icons/Store';
import PhoneAndroidIcon from '@material-ui/icons/PhoneAndroid';

import {
  FacebookLoginButton,
  TwitterLoginButton,
  InstagramLoginButton,
  LinkedInLoginButton,
} from "react-social-login-buttons";
import "./styles.css"
import pic from '../../images/people.jpg';
function Contactus() {
  function handleClick_1() {
    window.open('http://www.facebook.com/Telstra/');
  }
  function handleClick_2() {
    window.open('http://twitter.com/Telstra?ref_src=twsrc%5Egoogle%7Ctwcamp%5Eserp%7Ctwgr%5Eauthor');
    
  }
  function handleClick_3() {
    window.open('http://www.instagram.com/telstra/?hl=en');
  }
  function handleClick_4() {
    window.open('http://www.linkedin.com/company/telstra/mycompany/verification/');
  }

  const [elevated, setElevated]=useState(2);
  const classes = useStyles();
    return (
      <div >
            <Grid container style={{marginTop:"20px", marginBottom:"20px"}} justifyContent="space-between" alignItems="center" >
             <Grid item xs={12} sm={6} md={5} >
             <Card>
             <Typography className={classes.title} style={{marginTop:"10px", marginLeft:"20px",marginBottom:"30px",  marginRight:"20px", fontSize:"25px"}} gutterBottom variant="h6" component="h5">SEND US A MESSAGE</Typography>
          <CardContent>
             Messaging is a convenient way to get help. Think of it like sending an SMS — send your message, and you’ll be notified when we reply.
            </CardContent>
          </Card>
         
             </Grid>
             <Grid item xs={12} sm={6}>
             <img height='250px' width="330px" marginLeft="2px" src={pic} align="center" align="left"></img>
            </Grid>
          </Grid>
          <Container>
          <div><span  STYLE="color:black;font-weight:600;font-size:38px">GET IN TOUCH WITH US</span></div>
          <Line color="#3f51b5"/> 
          <Grid className={classes.container} style={{marginRight:"5px"}} container alignItems="stretch" spacing={3}>
<Grid item xs={12} sm={6} md={4}>
<Card  className={classes.card}  elevation={elevated}  
onMouseOver={() => setElevated(10)} 
onMouseOut={() => setElevated(2)} >

<CardContent>
  <div>
<span  STYLE="color:black;font-weight:600;font-size:20px;margin-bottom:20px"><PhoneAndroidIcon/>My Telstra App</span></div>
Manage your services on the go and send a message if you need.
</CardContent>
</Card>
</Grid>
<Grid item xs={12} sm={6} md={4}>
<Card  className={classes.card}  elevation={elevated}  
onMouseOver={() => setElevated(10)} 
onMouseOut={() => setElevated(2)} >

<CardContent>
<div><span  STYLE="color:black;font-weight:600;font-size:20px;margin-bottom:20px"><StoreIcon/>In Store</span></div>
Find your nearest Telstra store or Wi-Fi hotspot
</CardContent>
</Card>
</Grid>
<Grid item xs={12} sm={6} md={4}>
<Card  className={classes.card}  elevation={elevated}  
onMouseOver={() => setElevated(10)} 
onMouseOut={() => setElevated(2)} >

<CardContent>
<div><span  STYLE="color:black;font-weight:600;font-size:20px;margin-bottom:20px"><LanguageIcon/>Multilingual Support</span></div>
Speak to us in your preferred language. We've got you covered.
</CardContent>
</Card>
</Grid>
</Grid>
  </Container>
       <Typography className={classes.title} style={{marginTop:"10px", fontSize:"25px", fontStyle:"bold"}} gutterBottom variant="h6" component="h5">Find Us</Typography>
       <Line color="#3f51b5"/> 
       <div className="icons">
         <Container>
         <Grid  container alignItems="start" >
         <Grid item xs={12} sm={6} md={1}>
          <FacebookLoginButton onClick={handleClick_1} style={{width:"50px"}}>  <span></span></FacebookLoginButton>
          </Grid>
          <Grid item xs={12} sm={6} md={1}>
          <TwitterLoginButton onClick={handleClick_2}  style={{width:"50px"}}><span></span></TwitterLoginButton>
          </Grid>
          <Grid item xs={12} sm={6} md={1}>
          <InstagramLoginButton onClick={handleClick_3}  style={{width:"50px"}}><span></span></InstagramLoginButton>
          </Grid>
          <Grid item xs={12} sm={6} md={1}>
          <LinkedInLoginButton onClick={handleClick_4}  style={{width:"50px"}}><span></span></LinkedInLoginButton>
          </Grid>
                  </Grid>
  </Container>
      </div>
   </div>
    );
  }
  
  export default Contactus;