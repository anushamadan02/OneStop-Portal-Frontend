import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {ButtonGroup,Button,Card,CardHeader,CardMedia,CardContent,CardActions,Collapse,IconButton,Typography} from '@material-ui/core';
import { red } from '@material-ui/core/colors';
import {Add,Remove,Shop,AddShoppingCartRounded,Share,Delete,Edit,Favorite} from "@material-ui/icons";
import { useDispatch} from 'react-redux';
import { useState } from 'react';
import {deleteProduct,likeproduct} from '../../actions/products'
import {addProductToCart} from '../../actions/cart'
import Googlemodal from '../googleauth/googlemodal'
import Checkoutmodal from '../checkout/checkoutModal'
import Snackbar from '../notifications/snackbar'
import {useHistory} from 'react-router-dom'
const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    width:"250px",
    height:"310px",
    marginRight:"1px",
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

function ProductCard({prod,role=0,setselected,setOpen}) {
  const classes = useStyles();
  const [raised,setRaised]=useState(2);
  const [count,setCount]=useState(0);
  const [openLogin,setOpenLogin]=useState(false)
  const [openPayment,setOpenpayment]=useState(false)
  const [snackBarMsg, setSnackBarMsg] = useState(null)
  const [openNotification, setOpenNotification] = useState(false);
  const history=useHistory();

  var profile = JSON.parse(localStorage.getItem("profile"));
  var display=(count>0)
  var like=false
  prod.like.every(p=>{
    if(p==profile?.user._id)
      {
        like=true
        return false
      }
      return true
  })
  const dispatch=useDispatch()
  console.log("role card:",role)
  const handleDelete=async ()=>{
      dispatch(deleteProduct(prod._id,profile.user._id))
      setSnackBarMsg({ message: "Product Deleted Successfully..!", severity: "success" })
      setOpenNotification(true)
  }
  const handleUpdate=async ()=>{
      setOpen(true)
      setselected({...prod})
  }
  const handleAddcart=(e)=>{
    e.preventDefault()
    if(!profile)
      setOpenLogin(true)
    else
      {
        dispatch(addProductToCart(profile.user._id,{product:prod._id,quantity:count}))
        setCount(0)
        setSnackBarMsg({ message: "Added to cart Successfully..!", severity: "success" })
        setOpenNotification(true)
      }
  }
  
  const handleBuynow=()=>{
     if(!profile){
      setOpenLogin(true)
     }else{
      setOpenpayment(true)
     }
  }
  const handleLike=async ()=>{
     if(like)
      await dispatch(likeproduct(profile?.user._id,prod._id,{like:-1}))
     else
      await dispatch(likeproduct(profile?.user._id,prod._id,{like:1}))
  }
  const openProduct=()=>{
     history.push(`/product/${prod._id}`)
  }
  return (
    <Card className={classes.root} 
    elevation={raised}  
    onMouseOver={() => setRaised(10)} 
    onMouseOut={() => setRaised(2)}
    
    >
      <CardMedia
        component="image"
        alt={prod.name}
        className={classes.media}
        height="140"
        image={prod.photo?`data:${prod?.photo?.contentType};base64,${Buffer.from(prod?.photo?.data.data).toString('base64')}`:""}
        title={prod.name}
        onClick={openProduct}
      />
      <CardHeader
        title={prod.name}
        subheader={prod.summary.length>=29?prod.summary.slice(0,27)+"..":prod.summary}
        action={
            <IconButton aria-label="share">
          <Share />
        </IconButton>
        }
        titleTypographyProps={{variant:'h6' }}
        subheaderTypographyProps={{variant:'subtitle2' }}
      />
      <CardContent>
      <div style={{display:"inline-block",width:"100%",marginTop:"-50px"}}>
        <span style={{float:"left"}}> <Typography variant="body1" color="textPrimary" component="p">
            Rs. {prod.price}
          </Typography></span> 
          <span style={{float:"right",marginTop:"-5px"}}> <ButtonGroup size="small" aria-label="small outlined button group">
        <IconButton disabled={!display} onClick={()=>setCount(count-1)} color="secondary"><Remove fill/></IconButton>
        {display &&(<Button disabled><span style={{fontWeight:"bold",color:"blue"}}>{count}</span></Button>)}
        <IconButton onClick={()=>setCount(count+1)} color="primary"><Add fill/></IconButton>
      </ButtonGroup></span> 
      </div>
      </CardContent >
      <CardActions style={{marginTop:"-10px",display: 'flex'}}>
      {like?<Favorite color="secondary" onClick={role===0?handleLike:()=>{}}/>
      :<Favorite style={{color:"#bdbdbd"}} onClick={role===0?handleLike:()=>{}} />}
      <span>{prod.like.length}</span>
      <Button
        variant="contained"
        color={role==0?"primary":"secondary"}
        onClick={role==0?handleAddcart:handleDelete}
        style={{marginLeft:"auto",marginRight:"-60px"}}
      >{role==0?<AddShoppingCartRounded/>:<Delete/>}</Button>
      <Button
        variant="contained"
        color="primary"
        onClick={role==0?handleBuynow:handleUpdate}
        style={{marginLeft:"auto"}}
      >{role==0?<Shop/>:<Edit/>}</Button>
      </CardActions>
      <Googlemodal open={openLogin} setOpen={setOpenLogin}/>
      <Checkoutmodal open={openPayment} setOpen={setOpenpayment} isCart={false}
      order={[{_id:prod._id,count:count,name:prod.name,description:prod.description,summary:prod.summary,price:prod.price,category:prod.category}]}
      />
      <Snackbar open={openNotification}  setOpen={setOpenNotification} snackBarMsg={snackBarMsg} setSnackBarMsg={setSnackBarMsg} />
    </Card>
  );
}

  
  export default ProductCard;

  /*
  //inside contentHeader for top right corner of card
         action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
  */