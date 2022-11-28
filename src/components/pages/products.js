import ProductCard from '../productcard/card'
import { getProducts } from '../../actions/products';
import { getCart } from '../../actions/cart';
import {search} from '../../actions/searchproduct'
import ProductForm from '../forms/productform'
import Searchbar from '../searchbar'
import Scroll from '../upscroll'

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import useWindowSize from '../customhooks/useWindowSize'

import { Grid, CircularProgress,Paper, Fab, Typography, Modal, Fade, Backdrop } from '@material-ui/core';
import { Add } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    marginLeft:"5px",
  },
   modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
  },
}));

function Product() {
  const products = useSelector((state) => state.products);
  const searchResults = useSelector((state) => state.searchResultsProduct);
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const classes = useStyles();
  const [excelsubmit,setexcelsubmit]=useState(false)
  const [open, setOpen] = React.useState(false);
  const [selected,setselected]=useState(null)
  const [searchtext,setSearchtext]=useState("")
  const [height,width]=useWindowSize()

  var profile = JSON.parse(localStorage.getItem("profile"));
  const handleAdd = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    setselected(null)
  };

  useEffect(() => {
    if(profile)
       dispatch(getCart(profile.user._id))
    if(searchtext!=""){
       dispatch(search(searchtext));
    }else if ((products.length == 0)||(excelsubmit)) {
      dispatch(getProducts());
      if(excelsubmit)
         setexcelsubmit(false)
      console.log("dispatching getProducts")
    }
  }, [dispatch,searchtext,excelsubmit])
  console.log("role products: ",profile?.user?.role)
  var res=[]
  if(searchtext!='')
     res=searchResults;
  else
     res=products;
  
  var prodjsx = res.map(prod => {
    var flag=true;
    if(cart)
    cart.forEach(p=>{
       if(p.product._id==prod._id)
         flag=false;
    })
    if(flag) 
     return (<Grid container item lg={3} sm={6} md={4} xs={12} style={{ marginTop: "3px" }}> 
              <ProductCard prod={prod} role={profile?profile.user.role:0} setselected={setselected} setOpen={setOpen} />
            </Grid>)
    else
     return <></>
  });
//justify="center" alignItems="center" alignContent="center"
//
  return (
    <div className={classes.root}>
      <Scroll />     
      <div style={{float:"right",marginRight:"40px"}}>
      <Searchbar setSearchtext={setSearchtext}/>
      </div>
      <Grid container item lg={12} spacing={1} >
      {
      !(searchtext!=''&&res.length==0)?(products.length!=0)? prodjsx : <CircularProgress />
      :
      <Typography style={{marginBottom:"10px"}} color="secondary" variant="h6" align="center">Not Found</Typography>
      }
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
          <div className={classes.paper} style={{marginTop:"50px"}}>
                <ProductForm selected={selected} handleClose={handleClose} setselected={setselected} setexcelsubmit={setexcelsubmit}/>
          </div>
        </Fade>
      </Modal>
      
     { profile?.user?.role==1?(<Fab color="primary" aria-label="add" size="large" style={{ position: "fixed", bottom: "10px", right: "10px" }}>
        <Add onClick={handleAdd} />
      </Fab>):null}
    </Grid>
    </div>
  );
}

export default Product;