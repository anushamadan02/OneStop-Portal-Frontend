import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {googlesignin} from '../../actions/auth'
import { makeStyles } from '@material-ui/core/styles';

import {Button,Paper, Typography} from '@material-ui/core';
import CancelPresentationRoundedIcon from '@material-ui/icons/CancelPresentationRounded';
import { GoogleLogin } from 'react-google-login';
import { Link, useHistory, useLocation } from 'react-router-dom';
import Icon from '../icons/googleicon'


  
  function getModalStyle() {
    const top = 50 ;
    const left = 50 ;
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
      textAlign:"center"
    };
  }
  
  const useStyles = makeStyles((theme) => ({
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));

const Googlesignin = ({open,setOpen}) => {
    const classes = useStyles();
    const [modalStyle] = React.useState(getModalStyle);
    const dispatch = useDispatch();
    var history = useHistory()
    const token = JSON.parse(localStorage.getItem("profile"))?.token;
    //console.log("Token", token)
    var googleSuccess = async (res) => {
        const result = res?.profileObj;
        const token = res?.tokenId;

       // console.log("google response", result, "  ", token)
        try {
          //console.log(result)
          await dispatch(googlesignin({ _id: result.googleId, name: result.name, email: result.email, googleId: result.googleId,profileimage:result.imageUrl }))
        } catch (error) {
            console.log(error);
        }finally{
            setOpen(false)
           window.location.reload()
        }
    };
    const googleError = () => alert('Google Sign In was unsuccessful. Try again later');
    return(
        <div style={modalStyle} className={classes.paper}>
        <CancelPresentationRoundedIcon onClick={()=>{setOpen(false)}} style={{marginTop:"-18px",marginRight:"-32px",float:"right",color:"red",height:"25px",}}/>
       
            <Typography variant="h6" color="primary" style={{marginBottom:"5px"}}>Looks like you are not signed in!</Typography>
             <Typography variant="body1" color="primary" style={{marginBottom:"5px"}}>Sign in First..!</Typography>
        <GoogleLogin
            clientId="107969636236-navdrh3p4eil5r5hf4ifr6hi8kcn7grv.apps.googleusercontent.com"
            render={(renderProps) => (
              <Button
              style={{marginLeft:"10px"}} 
              color="primary" 
              onClick={renderProps.onClick} 
              startIcon={<Icon />}
              variant="contained">
                Google Sign In
              </Button>
                )}
            onSuccess={googleSuccess}
            onFailure={googleError}
            cookiePolicy="single_host_origin"
          />
          </div>
    )

}
export default Googlesignin

//107969636236-navdrh3p4eil5r5hf4ifr6hi8kcn7grv.apps.googleusercontent.com