import Button from '@material-ui/core/Button';
import { Container, Fab,  Grid } from '@material-ui/core';
import useStyles from './mobilestyles';
import Posts from "../Posts/Posts"
import Form from "../Form/Form"
import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {getdataconsump} from "../../actions/dataconsump";
import DataUsageMPlans from "../DataUsageMPlans";
import Table from '../Table';
import Scroll from "./Scroll";
import MobileCurrent from '../MobileCurrentPlan';
import MPlansHistory from '../mplanshistory';
import {Switch} from  '@material-ui/core';
import { Add } from "@material-ui/icons";
import { History } from '@material-ui/icons';
import { Modal, Fade, Backdrop } from '@material-ui/core';
import "../progressbarStyles.css";
import "./PaymentForm.css";
import CloseIcon from '@material-ui/icons/Cancel';
import {getplanbyid} from "../../actions/plancart";

function Mobile() {
  const classes = useStyles();
  const posts = useSelector((state) => state.posts);
  console.log(posts)
  const dispatch = useDispatch();
  useEffect(() => {
    if (datas.length == 0)
      dispatch(getdataconsump());
  }, [dispatch])
  const [currentId, setCurrentId] = useState(0);
  const datas = useSelector((state) => state.datas);
  const [value, setValue] = React.useState('move');
  console.log(value)
  const handleChange = (event) => {
    setValue(event.target.value);
    console.log(value)
  };
  const [toggle, setToggle]=useState(false);
  const toggler=()=>{
    toggle? setToggle(false): setToggle(true);
  }

  console.log(datas)
  var profile=JSON.parse(localStorage.getItem('profile'))
  var user= profile?.user?._id
 
  const planuser = useSelector((state) => state.planuser);
  console.log(planuser)
  const [elevated, setElevated]=useState(2);

  // function handleSub(event) {
  //   clearTimeout(timer);
    
  //   if (event.detail === 1) {
  //     timer = setTimeout(() => {
  //       console.log("SINGLE CLICK");
  //     }, 200)
  
  //   } else if (event.detail === 2) {
  //     console.log("DOUBLE CLICK");
  //   }
  // }
  const [open_his, setOpen_his] = React.useState(false);
  const handleHis = () => {
    setOpen_his(true);
  };
  const handleClose_his = () => {
    setOpen_his(false);
    
  };
  const [open, setOpen] = React.useState(false);
  const handleAdd = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    
  };
  useEffect(() => {
    if (planuser.length == 0)
      dispatch(getplanbyid(user));
  }, [dispatch])
  
  console.log(planuser)

 
  const plans = useSelector((state) => state.plans);
    return (
      <Container maxWidth="lg">
        <div style={{ zIndex: 3 }}>
      <Scroll showBelow={50} />
      </div>
      <div><span  STYLE="color:black;font-weight:600;font-size:38px">MOBILE PLANS</span></div>
      {planuser.length===0?<> <div style={{ display: 'flex',flexDirection: 'row', marginBottom: "20px", alignItems:"center"}} >
             <span  STYLE="color:black;font-weight:400;font-size:14px"> Switch to view different layout </span> <Switch color="primary" style={{Bottom:"20px"}} onClick={toggler} alignItems="center" /> 
           </div>{toggle ?<> <Table data={posts}/> </>:<><Grid className={classes.container} container alignItems="stretch" spacing={3}>
<Posts setCurrentId={setCurrentId}  currentId={currentId} />
</Grid></>} </>:<>
      <Grid container style={{marginBottom:"20px"}} justify="space-between" alignItems="start" spacing={2}>
           <Grid item xs={12} sm={12} md={6}>
             <div style={{ display: 'flex',flexDirection: 'row', alignItems:"center"}} >
             <span  STYLE="color:black;font-weight:400;font-size:14px"> Switch to view different layout </span> <Switch color="primary" style={{Bottom:"20px"}} onClick={toggler} alignItems="center" /> 
           </div>
           {toggle ?<> <Table data={posts}/> </>:<><Grid container style={{marginTop:"20px", marginBottom:"20px"}} justify="space-between" alignItems="start" spacing={2}>
            <Grid item xs={12} sm={12} md={10}>
            <Posts setCurrentId={setCurrentId}  currentId={currentId} />
            </Grid></Grid></>}
          </Grid>
            <Grid item xs={12} sm={12} md={6}>
            {user!==undefined && planuser.length!=0?<><DataUsageMPlans/></>:<></>}
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
              <div className={classes.paper}style={{
              position: 'absolute', left: '50%', top:'50%',
              transform: 'translate(-50%, -50%)', marginTop:"10px"
              }}>
                <Button style={{ marginLeft: "auto"}} className={classes.logButton} endIcon={<CloseIcon />}  variant="contained" color="pink" size="small" fontSize="small" onClick={handleClose}>Close</Button>
             <Form currentId={currentId} setCurrentId={setCurrentId} />
              </div>
              </Fade>
              </Modal>

           <><MobileCurrent/></>
            { profile?.user?.role==1?(<Fab color="primary" aria-label="add" size="medium" style={{ position: "fixed", bottom: "142px", right: "44px" }}>
            <Add  onClick={handleAdd}  />
            </Fab>):<></>}
            <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={open_his}
            onClose={handleClose_his}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
            >
            <Fade in={open_his}>
            <div className={classes.paper}style={{
            position: 'absolute', left: '50%', top:'50%',
            transform: 'translate(-50%, -50%)', marginTop:"10px"
            }}>
               <div class="wrapperone">
               <Button style={{ marginLeft: "auto"}} className={classes.logButton} endIcon={<CloseIcon />}  variant="contained" color="pink" size="small" fontSize="small" onClick={handleClose_his}>Close</Button>
                         <><MPlansHistory/></> 
                         </div>
            </div>
            </Fade>
            </Modal>
            { profile?.user ?(<Fab color="primary" aria-label="add" size="medium" style={{ position: "fixed", bottom: "86px", right: "44px" }}>
            <History  onClick={handleHis} />
            </Fab>):<></>}
            </Grid>
            </Grid>
      
      </>}
        
            </Container>
  
    )}
    
  

  export default Mobile;
