import React,{useEffect} from 'react';
import { useState } from 'react';
import {Share} from "@material-ui/icons";
import {useHistory} from 'react-router-dom'

import { makeStyles } from '@material-ui/core/styles';
import {Card,CardHeader,CardMedia,CardContent,IconButton,Typography} from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import * as api from '../../api/index'
//import {REMOVE} from "../../constants/actionTypes"
const useStyles = makeStyles((theme) => ({
  root: {
    width:"300px",
    height:"390px",
    marginRight:"5px",
    marginBottom:"5px"
  },
  media: {
    margin: "auto",
    height:"40%",
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

function Ordercard({prod,status,ordertotal,address,orderdate,transectionid}) {
  const classes = useStyles();
  const [raised,setRaised]=useState(2);
  const [photo,setPhoto]=useState(null)
  const history=useHistory()

  var profile = JSON.parse(localStorage.getItem("profile"));
  useEffect(async()=>{
    var {data}=await api.getproductphoto(prod._id)
   
   setPhoto(data)
  },[])

  const openProduct=()=>{
    history.push(`/product/${prod._id}`)
 }
  return (
    <Card className={classes.root}  
    elevation={raised} 
    onMouseOver={() => setRaised(10)} 
    onMouseOut={() => setRaised(2)}
    raised={raised}>
      <CardMedia
        component="image"
        alt={prod.name}
        className={classes.media}
        height="140"
        image={(photo!=null)?`data:${photo?.contentType};base64,${Buffer.from(photo?.data?.data).toString('base64')}`:""}
        title={prod.name}
        onClick={openProduct}
      />
      <CardHeader
        title={prod.name}
        action={
            <IconButton aria-label="share">
          <Share />
        </IconButton>}
        titleTypographyProps={{variant:'h6' }}
      />
      
      <CardContent style={{marginTop:"-20px"}}>
      <div style={{display:"inline-block",width:"100%",marginTop:"-50px"}}>
        <span style={{float:"left"}}> <Typography variant="body2" color="textPrimary" component="p">
            <b>Price: </b>{prod.price} Rs.
          </Typography></span> 
          <span style={{float:"right"}}><Typography variant="body2" color="textPrimary" component="p">
           <b>Quantity:</b> {prod.count}
          </Typography> </span> 
      </div>
      <div style={{display:"inline-block",width:"100%"}}>
      <span style={{float:"left"}}><Typography variant="body2" component="p">
      <b style={{color:"black"}}>Status:</b>
            {status!="Processing"?<span style={{color:"red"}}><b>{status}</b></span>:<span style={{color:"green"}}><b>{status}</b></span>}
        </Typography></span>
        <span style={{float:"right"}}> <Typography variant="body2" color="textPrimary" component="p">
          <b>Order Total:</b> {ordertotal}
        </Typography></span>
      </div>
      <div style={{display:"inline-block",width:"100%"}}>
        <Typography variant="body2" color="textPrimary" component="p">
          <span style={{float:"left"}}><b>Address: </b></span><span style={{float:"right"}}>{address}</span>
        </Typography>
      </div>
      <div style={{display:"inline-block",width:"100%"}}>
        <Typography variant="body2" color="textPrimary" component="p">
          <b>Order Date: </b><span style={{float:"right"}}>{orderdate}</span>
        </Typography>
      </div>
      <div style={{display:"inline-block",width:"100%",marginTop:"-50px"}}>
      <Typography variant="body2" color="textPrimary" component="p">
          <b>Transaction Id: </b><span style={{float:"right"}}>{transectionid?.slice(0,20)}</span>
        </Typography>
      </div>
      </CardContent>    
    </Card>
  );
}

  
  export default Ordercard;

 