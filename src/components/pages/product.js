import { useParams } from "react-router-dom";

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Divider,ButtonGroup, Button, IconButton, Typography, Grid, Paper } from '@material-ui/core';
import { Add, Remove, Shop, AddShoppingCartRounded,Update, Share, Delete, Edit, Favorite } from "@material-ui/icons";
import * as api from '../../api/index'
import Reviews from '../forms/reviews'

import { deleteProduct, likeproduct } from '../../actions/products'
import { addProductToCart, getCart } from '../../actions/cart'
import Googlemodal from '../googleauth/googlemodal'
import Checkoutmodal from '../checkout/checkoutModal'
import Snackbar from '../notifications/snackbar'
import { updateCart } from '../../actions/cart'

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    imageList: {
        width: 500,
        height: 450,
    },
}));

export default function Product() {
    const classes = useStyles();
    // const theme = useTheme();
    const { productId } = useParams();
    const dispatch = useDispatch()
    const cart = useSelector(state => state.cart)
    
    const [openLogin, setOpenLogin] = useState(false)
    const [openPayment, setOpenpayment] = useState(false)
    const [snackBarMsg, setSnackBarMsg] = useState(null)
    const [openNotification, setOpenNotification] = useState(false);
    const [prod, setProd] = useState(null)
    const [count, setCount] = useState(1);
    const [photo, setPhoto] = useState(null)
    const [incart,setIncart]=useState(-1)
    const [updated,setUpdated]=useState(false)
    const [cartupdated,setCartupdated]=useState(false)
    const [prodtoremove,setProdtoRemove]=useState([])
    const profile = JSON.parse(localStorage.getItem('profile'))
    var role = profile?.user?.role
    var display = (count > 0)
    var  likecount = prod?.like.length
    var like=false
    
    prod?.like.every(p => {
        if (p == profile?.user?._id) {
            like=true;
            return false
        }
        return true
    })
  
    useEffect(()=>{
        console.log("cart: ",prodtoremove)
        prodtoremove.forEach(async p=>{
          console.log("cartp: ",p)
          await dispatch(updateCart(profile?.user?._id,{id:p,quantity:0}))
        })
      },[prodtoremove,dispatch])
    useEffect(async ()=>{
        console.log("useEffect from product page cart updated: ",cartupdated)
         await dispatch(getCart(profile?.user?._id))
         setCartupdated(false)
         setUpdated(true)
    },[cartupdated,incart])
    useEffect(async()=>{
        var { data } = await api.getproductphoto(productId)
        setPhoto(data)
    },[])
    useEffect(async () => { 
       console.log("useEffect from product page: ",updated)
        var { data } = await api.fetchProductbyid(productId)
        setProd(data)
        
        prod?.like.every(p => {
            if (p == profile?.user?._id) {
                like=true
                return false
            }
            return true
        })
        likecount=prod?.like.length
        
        cart.every((d) => {   
            if (d.product._id == productId) {
                {
                    setIncart(d.quantity)
                    setCount(d.quantity)
                }
                return false
            }
            return true
        })
        
        setUpdated(false)
        setCartupdated(false)
    }, [updated,incart])
    
    const handleDelete = async () => {
        dispatch(deleteProduct(prod._id, profile?.user?._id))
        setSnackBarMsg({ message: "Product Deleted Successfully..!", severity: "success" })
        setOpenNotification(true)
    }
    const handleUpdate = async () => {
        setOpen(true)
        setselected({ ...prod })
    }
    const handleAddcart = (e) => {
        e.preventDefault()
        if (!profile)
            setOpenLogin(true)
        else {
            dispatch(addProductToCart(profile?.user?._id, { product: prod?._id, quantity: count }))
            setCount(0)
            setSnackBarMsg({ message: "Added to cart Successfully..!", severity: "success" })
            setOpenNotification(true)
        }
        setCartupdated(true)
    }
    const updateUserCart = (e) => {
        if (!profile) 
            {
                setOpenLogin(true)
                console.log(openLogin)
            }
        e.preventDefault()
        dispatch(updateCart(profile?.user?._id, { id: productId, quantity: count }))
        setIncart(count)
        setCartupdated(true)
    }
    const removeFromCart = () => {
        if (!profile) 
            setOpenLogin(true)
        dispatch(updateCart(profile?.user?._id, { id: productId, quantity: 0 }))
        window.location.reload()
    }

    const handleBuynow = () => {
        if (!profile) {
            setOpenLogin(true)
        } else {
            setOpenpayment(true)
        }
        setCartupdated(true)
    }
    const handleLike = async () => {
        if (!profile) 
            setOpenLogin(true)
        if (like)
            {
                await dispatch(likeproduct(profile?.user?._id, prod._id, { like: -1 }))
                var temp=prod?.like.filter(d=>profile?.user?._id!=d)
                setProd({...prod,like:temp})
            }
        else
            {
                await dispatch(likeproduct(profile?.user._id, prod._id, { like: 1 }))
                setProd({...prod,like:[...prod?.like,profile?.user._id]})
            }
            
    }
    return (
        <div className={classes.root}>
            <Grid container spacing={0}>
                <Grid item xs={12} sm={12} md={6} lg={6}>
                    <Paper className={classes.paper}>
                        <img alt={prod?.name} style={{ height: "100%", width: "100%" }}
                            src={(photo != null) ? `data:${photo?.contentType};base64,${Buffer.from(photo?.data?.data).toString('base64')}` : ""}
                        />
                    </Paper>
                </Grid>
                <Grid item xs={12} md={6} sm={12} lg={6}>
                    <Paper className={classes.paper}>
                        <Typography variant="h5" style={{ color: "#212121" }}>{prod?.name}</Typography>
                        <br></br>
                        <Typography variant="body1" style={{ color: "#424242" }}>{prod?.summary}</Typography>
                        <br></br>
                        <div>
                            <Typography variant="body2">{prod?.description}</Typography>
                        </div>
                        <br></br>
                        <br></br>
                        <div>
                            <div style={{ display: "inline-block", width: "100%", marginTop: "-50px" }}>
                                <span style={{ float: "left", marginLeft: "20%" }}>
                                    <Typography variant="body1" color="textPrimary" component="p">
                                        Rs. {prod?.price}
                                    </Typography>
                                </span>
                                <span style={{ marginRight: "-10%" }}>
                                    <ButtonGroup size="small" aria-label="small outlined button group">
                                        <IconButton disabled={!display} onClick={() => setCount(count - 1)} color="secondary"><Remove fill /></IconButton>
                                        {display && (<Button disabled><span style={{ fontWeight: "bold", color: "blue" }}>{count}</span></Button>)}
                                        <IconButton onClick={() => setCount(count + 1)} color="primary"><Add fill /></IconButton>
                                    </ButtonGroup>
                                </span>
                            </div>
                            <br></br><br></br><br></br>
                            <div style={{ float: "left", marginLeft: "5%" }}>
                                {like ? <Favorite color="secondary" onClick={role == 0 ? handleLike : () => { }} />
                                    : <Favorite style={{ color: "#bdbdbd" }} onClick={role == 0 ? handleLike : () => { }} />}
                                <span >&nbsp;{likecount}&nbsp;Likes</span>
                            </div>
                            {incart==-1 ? <div style={{marginRight:"-5%"}}>
                                <span style={{ marginRight: "20%" }}>
                                    <Button
                                        variant="contained"
                                        color={role == 0 ? "primary" : "secondary"}
                                        onClick={role == 0 ? handleAddcart : handleDelete}
                                        style={{ marginLeft: "auto", marginRight: "-80px" }}
                                        size="small"
                                    >{role==0?"Add to cart":"Delete"}&nbsp;{role == 0 ? <AddShoppingCartRounded /> : <Delete />}</Button>
                                </span>

                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={role == 0 ? handleBuynow : handleUpdate}
                                    style={{ marginLeft: "auto" }}
                                    size="small"
                                >{role==0?"Buy now":"Update product"}&nbsp;{role == 0 ? <Shop /> : <Edit />}</Button>
                            </div> :
                                <div>
                                    <Button
                                        variant="contained"
                                        color="secondary"
                                        style={{ marginRight: "5px" }}
                                        onClick={removeFromCart}
                                    >Remove from cart<Delete /></Button>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                     //   style={{ marginLeft: "auto" }}
                                        onClick={incart == count ? handleBuynow : updateUserCart}
                                    >{incart==count?"Buy now":"Update cart"}{incart == count ? <Shop /> : <Update />}</Button>
                                </div>}
                        </div>
                        
                        <Reviews review={prod?.review} setUpdated={setUpdated} setOpenLogin={setOpenLogin}/>
                    </Paper>
                </Grid>
            </Grid>
            <Googlemodal open={openLogin} setOpen={setOpenLogin} />
            <Checkoutmodal open={openPayment} setOpen={setOpenpayment} isCart={incart!=-1} setProdtoRemove={setProdtoRemove}
                order={[{ _id: prod?._id, count: count, name: prod?.name, summary: prod?.summary, description: prod?.description, price: prod?.price, category: prod?.category }]}
            />
            <Snackbar open={openNotification} setOpen={setOpenNotification} snackBarMsg={snackBarMsg} setSnackBarMsg={setSnackBarMsg} />
        </div>
    );
}