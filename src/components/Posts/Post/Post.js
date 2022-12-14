import React from 'react';
import { useState, useEffect, useRef } from 'react';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { useDispatch } from 'react-redux';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import Line from "../../Line"
import { addtocart} from '../../../actions/plancart';
import useStyles from './styles';
import { purple } from '@material-ui/core/colors';
import { Container, Card, CardActions, CardContent, CardMedia, Button, Avatar, Typography, Grid } from '@material-ui/core/';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { updatePost, deletePost } from '../../../actions/posts';
import { useSelector } from 'react-redux';
import { createTheme, withStyles, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Form from '../../Form/Form';
import CloseIcon from '@material-ui/icons/Cancel';
import {BrowserRouter as Router,Switch,Route,Link} from "react-router-dom";
import Googlemodal from '../../googleauth/googlemodal';
import PaymentModal from '../../pages/paymentmodal';
//import "react-responsive-modal/styles.css";
// import { Modal } from "react-responsive-modal";


const BootstrapButton = withStyles({
  root: {
    boxShadow: 'none',
    textTransform: 'none',
    backgroundColor: '#0063cc',
    borderColor: '#0063cc',
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:hover': {
      backgroundColor: '#0069d9',
      borderColor: '#0062cc',
      boxShadow: 'none',
    },
    '&:active': {
      boxShadow: 'none',
      backgroundColor: '#0062cc',
      borderColor: '#005cbf',
    },
    '&:focus': {
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
    },
  },
})(Button);

const ColorButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: purple[500],
    '&:hover': {
      backgroundColor: purple[700],
    },
  },
}))(Button);

const useStyles_2 = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const useStyles_3 = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const Post = ({setSnackBarMsg, post, setCurrentId,currentId}) => {
  const dispatch = useDispatch();
  const classes = useStyles(); 
  const classes_1 = useStyles_2(); 
  const classes_2 = useStyles_3();
  const [open, setOpen] = React.useState(false);
   const details = localStorage.getItem("profile");
      //console.log(JSON.parse(localStorage.getItem('profile')).user._id)
   var profile=JSON.parse(localStorage.getItem('profile'))
   var user= profile?.user?._id
   const[Mactivated, setMactivated]=React.useState(0);
   const[Mstate, setMstate]=React.useState(false);
   const [modal, setModal]=useState(false)
   const [open_pay, setOpen_Pay] = React.useState(false);

   const mobiletocard= () => {
    if(!profile){
    setModal(true)}
    else{
    setOpen_Pay(true)
    setMactivated(post._id)
    setMstate(true)
    localStorage.setItem('mobileplan',JSON.stringify(post));
    }
  };
  console.log(Mactivated)

  const handleOpen = () => {
    // setOpen_Pay(true)
    setOpen(true);
    setCurrentId(post._id)
    
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleClose_Pay = () => {
    setOpen_Pay(false);
  };
  
  const [elevated, setElevated]=useState(2);
  
  const handleDelete=async ()=>{
      await dispatch(deletePost(user, post._id))
      setSnackBarMsg({ message: "Plan deleted sucessfully", severity: "success" })
  }
  return (
    <Card className={classes.card}  elevation={elevated}  
    onMouseOver={() => setElevated(10)} 
    onMouseOut={() => setElevated(2)}
    >
    <div className={classes.colorblock}>
    <Typography className={classes.title} style={{marginTop:"10px"}} gutterBottom variant="h6" component="h5">Plan - Rs {post.plan}</Typography>
    <Typography className={classes.title} gutterBottom variant="h6" component="h6">validity - {post.validity} days</Typography>
    </div>
    <CardContent >
    {/* <Line color="#3f51b5"/> */}
    <Typography variant="body2" color="textSecondary" component="p">Data - {post.data} GB</Typography>
      <Typography variant="body2" color="textSecondary" component="p">SMS - {post.SMS}/ Day</Typography>
      <Typography variant="body2" color="textSecondary" component="p">Rs - {post.cost}</Typography>
    </CardContent>
    <CardActions className={classes.cardActions}>
    {profile?.user?.role===1?<>
    <Button
    variant="contained"
    color="secondary"
    style={{maxWidth: '40px', maxHeight: '30px', minWidth: '40px', minHeight: '30px', marginTop: "30px", paddingRight:"5px"}}
    onClick={handleDelete}
    className={classes.button}
    startIcon={<DeleteIcon style={{justifyContent:"center"}} />}>
  </Button></>:<></>}

  {profile?.user?.role===1?<>
  <ColorButton
    variant="contained"
    color="primary"
    style={{maxWidth: '40px', maxHeight: '30px', minWidth: '40px', minHeight: '30px', marginTop: "30px", paddingRight:"5px"}}
    onClick={handleOpen}
    className={classes.button}
    startIcon={<EditIcon style={{justifyContent:"center"}} />}
  >
  </ColorButton>
  <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes_1.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes_1.paper}>
          <Form currentId={currentId} setCurrentId={setCurrentId} />
          </div>
        </Fade>
      </Modal>
      </>:<></>}
  
  <Button
    variant="contained"
    color="primary"
    // href="/Payment"
    onClick={mobiletocard}
    style={{maxWidth: '40px', maxHeight: '30px', minWidth: '40px', minHeight: '30px', marginTop: "30px", paddingRight:"5px"}}
    className={classes_1.button}
    startIcon={<ShoppingCartIcon style={{justifyContent:"center"}} />}>
  </Button>
  <Modal
   aria-labelledby="transition-modal-title"
   aria-describedby="transition-modal-description"
   className={classes_2.modal}
   open={open_pay}
   onClose={handleClose_Pay}
   closeAfterTransition
   BackdropComponent={Backdrop}
   BackdropProps={{
     timeout: 500,
   }}
 >
   <Fade in={open_pay}>
   <div>
    <Button style={{ marginLeft: "auto"}}  className={classes.logButton} endIcon={<CloseIcon />}  variant="contained" color="secondary" size="small" fontSize="small" onClick={handleClose_Pay}>Close</Button>
    <PaymentModal />
    </div>
   </Fade>
 </Modal>
    </CardActions>
    <Googlemodal open={modal} setOpen={setModal}/>
  </Card>
  );
};

export default Post;
