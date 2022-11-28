import React from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core/';
import Line from "../../Line"
import useStyles from './styles';
import { jsPDF } from "jspdf";
import { useState } from 'react';
import axios from 'axios';

const Plan = ({ plan}) => {
  console.log(plan.id)
  const classes = useStyles();
  var profile=JSON.parse(localStorage.getItem('profile'))
  var doc =new jsPDF("p", "pt");

  doc.setFont(undefined, 'bold')
  
  doc.text(180,20, "MOBILE PLAN INVOICE");
 console.log(plan)
  doc.text(180,60, "Name: " + profile?.user?.name);
  doc.text(180,80, "Email ID: " + profile?.user?.email);
  doc.setFont(undefined, 'normal')
  doc.text(20,120, "Amount: Rs "+ String(plan.cost));
  doc.text(20,140, "Payment Status: "+ plan.status);
  doc.text(20,160, "Validity: " +String(plan.validity) +"days");
  doc.text(20,180, "Paid On: " + plan.createdAt.slice(0,10));
  doc.text(20,200, "Data Availed: "+ String(plan.data) +"GB");
  doc.text(20,220, "SMS: "+ String(plan.SMS));
  doc.text(20,240, "Reference number: "+ plan.transaction_id);

  
   const handleDownload = () => {
     doc.save("MobileInvoice.pdf");
   };
   const [sent, setSent]=useState(false);
   const handleMEmail = () => {
    const dataToSubmit={
      name: profile?.user?.name,
      email: profile?.user?.email,
      amount:plan?.cost,
      plantype:plan?.status,
      paymentstatus:plan?.validity,
      }
  
       axios.post('/mail', dataToSubmit)
       .then(res=>{
       setSent(true)
       })
       .catch(()=>{
         console.log("message not sent")
      })
    
  };
 
   const [elevated, setElevated]=useState(2);
  return (
    <Card className={classes.card} className={classes.card} elevation={elevated}  onMouseOver={() => setElevated(10)}  onMouseOut={() => setElevated(2)}>
      <div className={classes.overlay2}>
      </div>
      <div className={classes.details}>
      </div>
      <div className={classes.colorblock} style={{paddingBottom:"5px"}}>
      <Typography className={classes.title} gutterBottom variant="h6" component="h5">Plan - Rs {plan.plan}</Typography>
      <Typography variant="body2" style={{marginLeft:"10px"}} color="white" component="p">Payment Status- {plan.status}</Typography>
      <Typography variant="body2" style={{marginLeft:"10px"}} color="ehite" component="p">validity - {plan.validity} days</Typography>
      </div>
      <CardContent style={{top:"-20px"}}>
{/*       
      <Line color="#3f51b5"/> */}
        <Typography ariant="body2" color="textSecondary" component="p">Paid on - {plan.createdAt.slice(0,10)}</Typography>
        <Typography variant="body2" color="textSecondary" component="p">Data - {plan.data} GB</Typography>
        <Typography variant="body2" color="textSecondary" component="p">SMS - {plan.SMS}/ Day</Typography>
        <Button type="button" style={{marginTop:"10px"}} className={classes.buttonSubmit} variant="contained" color="primary" size="small" onClick={handleDownload}>
          Download Invoice
      </Button>
      
      </CardContent>
    </Card>
  );
};

export default Plan;
