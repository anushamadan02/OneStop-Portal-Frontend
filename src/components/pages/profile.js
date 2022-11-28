
import React, { useState, useEffect, useRef } from 'react';
import BroadbandCurrent from "../BroadbandCurrent";
import MobileCurrent from "../MobileCurrentPlan";
import { makeStyles } from '@material-ui/core/styles';
import {Button,Input,InputLabel,FormControl,Typography,AccordionSummary,AccordionDetails,Accordion,Avatar} from '@material-ui/core';
import CartSlider from '../productcard/cartSlider'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import * as api from '../../api/index'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '95%',
    marginLeft:"0.5%",
    marginRight:"0.5%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  large: {
    position:"relative",
    left:"40%",
  },
}));

export default function Profile() {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState("panel1");
  const [BUpgrade, setBUpgrade] = useState(false);
  var profile=JSON.parse(localStorage.getItem('profile'))
  var user=profile?.user
  const [body,setBody]=useState({mobile:user?.mobile,address:user?.address})
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const handleUpdate=async()=>{
     var {data}=await api.updateuser(user?._id,body)
     console.log("profile data:",data)
     localStorage.setItem('profile',JSON.stringify({...profile,user:{...user,mobile:data.mobile,address:data.address}}))
     user=JSON.parse(localStorage.getItem('profile'))?.user
     window.location.reload()
  }
  return (
    <div className={classes.root}>
      <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        ><b>Profile</b>
        </AccordionSummary>
        <AccordionDetails>
        <div style={{width:"100%",textAlign:"center",alignItems:"center",marginTop:"-50px"}}>
        <Avatar alt="Remy Sharp" src={user?.profileimage} className={classes.large} style={{width:"140px",height:"140px"}} />
        <form className={classes.root} noValidate autoComplete="off">
            <FormControl fullWidth style={{width:"40%"}}>
                <InputLabel htmlFor="component-simple">Name</InputLabel>
                <Input id="component-simple" value={user?.name} disabled/>
            </FormControl>
            <br></br>
            <br></br>
            <FormControl fullWidth style={{width:"40%"}}>
                <InputLabel htmlFor="component-simple">E-mail</InputLabel>
                <Input id="component-simple" value={user?.email} disabled />
            </FormControl>
            <br></br>
            <br></br>
            <FormControl fullWidth style={{width:"40%"}}>
                <InputLabel htmlFor="component-simple">Mobile number</InputLabel>
                <Input id="component-simple" value={body?.mobile} disabled={user?.mobile}
                onChange={(e)=>setBody({...body,mobile:e.target.value})} />
            </FormControl>
            <br></br>
            <br></br>
            <FormControl fullWidth style={{width:"40%"}}>
                <InputLabel htmlFor="component-simple">Address</InputLabel>
                <Input id="component-simple" value={body?.address} disabled={user?.address}
                onChange={(e)=>setBody({...body,address:e.target.value})} />
            </FormControl>
            <br></br>
            <br></br>
            {(!user?.address||!user?.mobile)?(<Button variant="contained" color="primary" onClick={handleUpdate}>Update</Button>):null}
          </form>
        </div>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
        ><b>My Cart</b>
        </AccordionSummary>
        <AccordionDetails>
           <CartSlider/>         
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3bh-content"
          id="panel3bh-header"
        >
          <b>My Mobile Plan</b>
        </AccordionSummary>
        <AccordionDetails>
           <MobileCurrent/>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel4bh-content"
          id="panel4bh-header"
        >
          <b>My Broadband Plan</b>
        </AccordionSummary>
        <AccordionDetails>
           <BroadbandCurrent BUpgrade={BUpgrade} setBUpgrade={setBUpgrade}/>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}