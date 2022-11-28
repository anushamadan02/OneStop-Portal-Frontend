import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { Container, Button, AppBar, Typography, Grow, Grid } from '@material-ui/core';
import useStyles from './pages/mobilestyles';
import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {getdataconsump} from "../actions/dataconsump"
import { makeStyles } from '@material-ui/core/styles';
import {getplans} from "../actions/plancart";
import { getCurrentBroadbandPlan } from '../actions/currentbroadband';
import { getbroadbands } from '../actions/broadband';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Table_broadband_Upgrade from './TableBroadbandUpgrade';
import PaymentModal from './pages/paymentmodal';
import CloseIcon from '@material-ui/icons/Cancel';

const useStyles_1 = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 150,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
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


function BroadbandCurrent( BUpgrade, setBUpgrade) {
  
  const [rows, setRows]= useState({});
  const [clicked, setClicked] = useState(null);
  const [clickedrenew, setClickedRenew] = useState(null)

  const dispatch = useDispatch();
  
  useEffect(() => {
    if (datas.length === 0)
      dispatch(getdataconsump());
  }, [dispatch])

  useEffect(() => {
    if (plans.length === 0)
      dispatch(getplans());
  }, [dispatch])

  useEffect(() => {
    if (broadbands.length === 0)
      dispatch(getbroadbands());
  }, [dispatch])

  const broadbands = useSelector((state) => state.broadbands);
  const plans = useSelector((state) => state.plans);
  console.log(broadbands)
  var profile=JSON.parse(localStorage.getItem('profile'))
  var user=profile?.user?._id
  console.log(BUpgrade)
  useEffect(() => {
    if (currentbroadband.length === 0)
      dispatch(getCurrentBroadbandPlan(user));
  }, [dispatch])

  const currentbroadband = useSelector((state) => state.currentbroadband);
  console.log(currentbroadband)

  var broadbands_upgrades=[]
  for (var j=0; j<broadbands.length; j++){
    if(broadbands[j].monthlyprice+parseInt(broadbands[j].installationcharges)>currentbroadband[currentbroadband.length-1]?.amount){
      broadbands_upgrades.push(broadbands[j])
    }}
  console.log(broadbands_upgrades)


  if(currentbroadband.length!=0){
    var broadbandid=currentbroadband[currentbroadband.length-1].productId}
   console.log(broadbandid)


  var dataconsumed= 12;
  const datas = useSelector((state) => state.datas);

  const [open, setOpen] = React.useState(false);
  const [openr, setOpenRenew] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
 

  const handleClose = () => {
    setOpen(false);
    setClicked(false)
  };

  //Clicked turns on for payment for upgrade
  const openPayment = () => {
    setClicked(true)
    console.log(clicked)
  };
  const openUpgrade = () => {
    setClicked(false)
    console.log(clicked)
  
  };
  const classes = useStyles();
  const classes_1=useStyles_1();
  console.log(rows)
  if (rows?._id != null){
    localStorage.setItem('broadband',JSON.stringify(rows))
   }
  console.log(currentbroadband)
  const [elevated, setElevated]=useState(2);
  console.log(currentbroadband[0]?.productId)

  const handleRenew= () => {
    for (var l=0;   l<broadbands.length; l++){
      if(currentbroadband[0].productId===broadbands[l]._id){
        localStorage.setItem('broadband',JSON.stringify(broadbands[l]))
        setClickedRenew(true)
      }}

    setOpenRenew(true)
   };
   console.log(clickedrenew)
   const handleCloseRenew = () => {
    setClickedRenew(false)
    localStorage.removeItem('broadband')
    setOpenRenew(false);

  };
  console.log(clickedrenew)
    return (
     ( datas.length ===0 || broadbands.length ===0 || currentbroadband.length===0?<></>:
      <>
      <Container  style={{marginTop:"10px"}} maxWidth="lg">
        <Grow in>
          <Container>
        <Grid container  justify="space-between" alignItems="stretch" spacing={3}>
        <Card className={classes.card} style={{marginBottom:"5px", width:"300px"}}  elevation={elevated}   onMouseOver={() => setElevated(10)} onMouseOut={() => setElevated(2)} variant="outlined">
        <CardContent>
        <div style={{padding:"10px", backgroundColor:"#8cd2e8"}}>
        <Typography style={{ fontWeight:"fontWeightBold"}} className={classes.title} color="textSecondary" gutterBottom>
        MY CURRENT BROADBAND PLAN
        </Typography>
        <Typography className={classes.title} gutterBottom variant="h7" component="h5">Price -{currentbroadband[0]?.amount} /Month</Typography>
        <Typography className={classes.title} color="textSecondary" gutterBottom variant="h7" component="h6">Plan Type: {currentbroadband[0]?.plantype}</Typography>
        <Typography className={classes.title} color="textSecondary" gutterBottom variant="h7" component="h6">Validity: {currentbroadband[0]?.plantill.slice(0,10)} days</Typography>
        <Typography className={classes.title} color="textSecondary" gutterBottom variant="h7" component="h6">Data:{currentbroadband[0]?.usage} GB</Typography>
        </div>
        <div style={{padding:"10px", backgroundColor:"#203354", color:"white"}}>
        <Typography className={classes.title} gutterBottom variant="h7" component="h6">TOTAL: {currentbroadband[0]?.usage} GB </Typography>
        <Typography className={classes.title} gutterBottom variant="h7" component="h6">TOTAL USED:{dataconsumed} </Typography>
        <Typography className={classes.title} gutterBottom variant="h7" component="h6">BALANCE: 48</Typography>
        </div>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
        </Typography>
        {currentbroadband.length!=2?<>
        <div style={{ display: "flex", justifycontent:"space-around"}}  >
         <Button type="button" style={{ margin:"10px"}}  className={classes.buttonSubmit} variant="contained" color="primary" onClick={handleOpen}>
          UPGRADE 
      </Button>
       <Button type="button"  style={{ margin:"10px"}} className={classes.buttonSubmit} variant="contained" color="primary"  onClick={handleRenew}>
         RENEW
      </Button>
      </div>
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
          <div>
        <Button style={{ marginLeft: "auto"}} className={classes.logButton} endIcon={<CloseIcon />}  variant="contained" color="pink" size="small" fontSize="small" onClick={handleClose}>Close</Button>
          {clicked?<><PaymentModal clicked={clicked} clickedrenew={clickedrenew}  /> <Button type="button"   className={classes.buttonSubmit}  variant="contained" color="primary" onClick={openUpgrade} >
            Back
           </Button></> :
          <div class="wrapperone"><div className={classes_1.paper}>
          <h4 id="transition-modal-title">Choose among the following plans to upgrade</h4>
          <Table_broadband_Upgrade data={broadbands_upgrades} setRows={setRows} rows={rows}/>
          {rows?._id?<> <Button type="button"  className={classes.buttonSubmit} style={{marginTop:"20px", marginleft:"auto", display: "block"}} variant="contained" color="primary" onClick={openPayment} >
            Proceed to payment
           </Button></>:<></>}
        </div></div>}
         </div>
        </Fade>
      </Modal>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes_1.modal}
        open={openr}
        onClose={handleCloseRenew}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openr}>
          <div>
        <Button style={{ marginLeft: "auto"}} className={classes.logButton} endIcon={<CloseIcon />}  variant="contained" color="pink" size="small" fontSize="small" onClick={handleCloseRenew}>Close</Button>
        <PaymentModal clicked={clicked} clickedrenew={clickedrenew}/>
         </div>
        </Fade>
      </Modal>

     
         
         </>:<></>}
        </CardContent>
        <CardActions>
        </CardActions>
        </Card>
    </Grid>
    </Container>
</Grow>
</Container>
</>
  ));
  };
     
  
  export default BroadbandCurrent;