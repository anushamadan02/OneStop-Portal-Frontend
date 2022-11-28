import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Button,TextField, List, Grid, Typography, Avatar, ListItemAvatar, ListItemText, Divider, ListItem } from '@material-ui/core';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import Rating from '@material-ui/lab/Rating';
import Singlereview from './singlereview'
import { useSelector, useDispatch } from 'react-redux'
import { getUserOrders } from '../../actions/userorders';
import { useParams } from "react-router-dom";

import { addReview,updateReview,deleteReview } from '../../actions/products';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: '36ch',
        backgroundColor: theme.palette.background.paper,
    },
    inline: {
        display: 'inline',
    },
}));

export default function Reviews({ review,setUpdated,setOpenLogin }) {
    const classes = useStyles();
    const dispatch = useDispatch()
    const orders = useSelector(state => state.orders)
    const profile = JSON.parse(localStorage.getItem('profile'))
    const { productId } = useParams();
    const [isedit,setIsedit]=useState(false)

    var [newreview, setNewreview] = useState(null)
    var bought = false;
    var reviewed=false
    orders?.every(order => {
        order.products.every(prod => {
            if (prod._id == productId) {
                bought = true
                return false
            }
            return true
        })
        if (!bought)
            return true;
        else
            return false
    })
    review?.every(rev => {
        if (profile?.user._id == rev.user) {
            if(!newreview)
               setNewreview({...rev})
            reviewed=true
            return false
        }
        return true;
    })
    console.log("new review: ",newreview)
    useEffect(() => {
        dispatch(getUserOrders(profile?.user._id))
    }, [])

    const handleAdd=async()=>{
        if (!profile) 
            setOpenLogin(true)
        await dispatch(addReview(profile?.user._id,productId,newreview))
        setUpdated(true)
    }
    const handleEdit=async ()=>{
        if (!profile) 
            setOpenLogin(true)
        await dispatch(updateReview(profile?.user._id,productId,newreview))
        setUpdated(true)
        setIsedit(false)
    }
    const deletereview=async()=>{
        if (!profile) 
            setOpenLogin(true)
        await dispatch(deleteReview(profile?.user._id,productId));
        setUpdated(true)
    }
    const setedit=()=>{
        setIsedit(true)
    }
    
    var reviewjsx = review?.map(rev => {
        if(rev.user!=profile?.user._id)
           return <Singlereview singlerev={rev} />
    })
    var curstars=newreview?newreview.stars:0
    return (
        <div>
            <Divider style={{marginTop:"20px",backgroundColor:"#3f51b5"}}/>
            {review?.length!=0?(
            <Typography variant='h6' style={{marginTop:"20px"}}>Check reviews</Typography>
            ):<Typography variant='h6' style={{marginTop:"20px"}}>No reviews Available</Typography>}
            {bought?(<ListItem alignItems="flex-start" style={{ width: "200%" }} >
                <ListItemAvatar>
                    <Avatar alt={profile?.user.name} src={profile?.user.profileimage} />
                </ListItemAvatar>
                <ListItemText
                    primary={profile?.user.name}
                    secondary={
                        <React.Fragment>
                            <br></br>
                            <div style={{ display: "flex" }}>
                                <Typography
                                    component="span"
                                    variant="body2"
                                    className={classes.inline}
                                    color="textPrimary"
                                >
                                    {!reviewed?"Rate the product ":"Your review "}:
                                </Typography>
                                <div style={{ marginBottom: "-5px", marginLeft: "5px", marginTop: "-4px" }}>
                                    <Rating
                                        name="customized-empty"
                                        defaultValue={curstars}
                                        value={curstars}
                                        precision={0.5}
                                        emptyIcon={<StarBorderIcon fontSize="inherit" />}
                                        onChange={(event, newValue) => { setNewreview({ ...newreview, stars: newValue }) }}
                                        readOnly={reviewed?!isedit:false}           
                                   />
                                </div>
                            </div>
                            <br></br>
                            <TextField
                                id="outlined-multiline-static"
                                multiline
                                rows={2} variant="filled"
                                defaultValue={!reviewed?"":newreview?.comment}
                                style={{width:"450px"}}
                                onChange={(e)=>setNewreview({...newreview,comment:e.target.value})}
                                disabled={reviewed?!isedit:false}
                            />
                            <br></br>
                            <Button onClick={!reviewed?handleAdd:(isedit?handleEdit:setedit)} color="primary" variant="contained" style={{marginTop:"5px"}}>
                                {!reviewed?"Submit review":"Edit review"}
                            </Button>
                            {reviewed?<Button color="secondary" variant="contained" onClick={deletereview} style={{marginTop:"5px",marginLeft:"5px"}}>
                                Delete Review
                            </Button>:null}
                        </React.Fragment>
                    }
                />
            </ListItem>):null}
            
            <List className={classes.root}>
                {reviewjsx}
            </List>
        </div>
    );
}
//<Divider variant="inset" component="li" style={{marginLeft:"-10px",backgroundColor:"#3f51b5"}} />