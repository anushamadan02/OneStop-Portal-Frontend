import React from 'react';
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from '@material-ui/core/';
import Line from "../../Line"
import useStyles from './styles';
import { jsPDF } from "jspdf";
import { useState } from 'react';

const BPlan = ({ broadbandhis}) => {
  const classes = useStyles();
  var profile=JSON.parse(localStorage.getItem('profile'))
 console.log(broadbandhis)
 console.log(profile?.user)
 var doc =new jsPDF("p", "pt");

 doc.setFont(undefined, 'bold')
 
 doc.text(180,20, "BROADBAND PLAN INVOICE");

 doc.text(180,60, "Name: " + profile?.user?.name);
 doc.text(180,80, "Email ID: " + profile?.user?.email);
 doc.setFont(undefined, 'normal')
 doc.text(20,120, "Amount: Rs "+ String(broadbandhis.amount));
 doc.text(20,140, "Plan Type: "+ broadbandhis.plantype);
 doc.text(20,160, "Date Bought: " + broadbandhis.createdAt.slice(0,10));
 doc.text(20,180, "Payment Status: " + broadbandhis.paymentstatus);
 doc.text(20,200, "Plan Valid From: "+ broadbandhis.planfrom.slice(0,10));
 doc.text(20,220, "Plan Valid Till: "+ broadbandhis.plantill.slice(0,10));
 doc.text(20,240, "Data Availed: "+ broadbandhis.usage + "GB");
 doc.text(20,260, "Reference Number: "+ broadbandhis.referenceno);
 
  const handleDownload = () => {
    doc.save("BroadbandInvoice.pdf");
  };

  const [elevated, setElevated]=useState(2);
  return (
    <Card className={classes.card} elevation={elevated}  
    onMouseOver={() => setElevated(10)} 
    onMouseOut={() => setElevated(2)}>
      <div className={classes.colorblock} style={{paddingBottom:"5px",paddingTop:"5px", marginBottom:"20px"}}>
      <Typography className={classes.title} gutterBottom variant="h7" component="h5">Price -{broadbandhis.amount} /Mo</Typography>
        <Typography className={classes.title} color="white" gutterBottom variant="h7" component="h6">Plan Type: {broadbandhis.plantype}</Typography>
        </div>
        <Typography className={classes.title} color="textSecondary" gutterBottom variant="h7" component="h6">Bought At:{broadbandhis.createdAt.slice(0,10)}  </Typography>
        <Typography className={classes.title} color="textSecondary" gutterBottom variant="h7" component="h6">Plan From: {broadbandhis.planfrom.slice(0,10)} </Typography>
        <Typography className={classes.title} color="textSecondary" gutterBottom variant="h7" component="h6">Plan Till: {broadbandhis.plantill.slice(0,10)}</Typography>
        <Typography className={classes.title} color="textSecondary" gutterBottom variant="h7" component="h6">Data:{broadbandhis.usage} GB</Typography>
        <Button type="button" style={{marginBottom:"10px", marginLeft:"15px", width:"160px", justifyContent:"center"}}  variant="contained" color="primary" size="small" onClick={handleDownload}>
          Download Invoice
      </Button>
    </Card>
  );
};

export default BPlan;
