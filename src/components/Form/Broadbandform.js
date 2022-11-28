import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import useStyles from './styles';
import { createBroadbandPlan, updatebroadband } from "../../actions/broadband"
import { Container } from '@material-ui/core';
import { Grow} from '@material-ui/core';
import Snackbar from '../notifications/snackbar'

    const BroadbandForm = ({currentId_broadband, setCurrentId_broadband}) => {
      const [bpostData, setBPostData] = useState({ name:"", monthlyprice:"", plantype:"", validity:"", data:"", uploadspeed:"", downloadspeed:"", speed:"",  installationcharges:""});
      const bpost = useSelector((state) => (currentId_broadband? state.broadbands.find((message) => message._id === currentId_broadband) : null));
      const [snackBarMsg, setSnackBarMsg] = useState(null)
      const dispatch = useDispatch();
      const classes = useStyles();
    
      useEffect(() => {
        if (bpost) setBPostData(bpost);
      }, [bpost]);
    
      const clear = () => {
        setCurrentId_broadband(0);
        setBPostData({name:"", monthlyprice:"", plantype:"", validity:"", data:"", uploadspeed:"", downloadspeed:"", speed:"",  installationcharges:""});
      };
      var profile=JSON.parse(localStorage.getItem('profile'))
      var user= profile?.user?._id
      console.log(user)
      const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (currentId_broadband === 0) {
          dispatch(createBroadbandPlan(user, bpostData));
          setSnackBarMsg({ message: "Broadband Plan added successfully", severity: "success" })
          clear();
        } else {
          dispatch(updatebroadband(user, currentId_broadband, bpostData));
          setSnackBarMsg({ message: "Broadband Plan updated successfully", severity: "success" })
          clear();
        }
      };
      return (
        <Container maxWidth="lg">
        <Grow in>
          <Container>
        <Paper className={classes.paper}>
          <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
          <Typography variant="h8">{currentId_broadband ? 'Editing a Broadband Plan' : `Add a Broadband Plan`}</Typography>
            <TextField  required size="small" name="name" variant="outlined" label="Name" fullWidth value={bpostData.name} onChange={(e) => setBPostData({ ...bpostData, name: e.target.value })} />
            <TextField  required size="small" name="monthlyprice" variant="outlined" label="Monthly Price" fullWidth value={bpostData.monthlyprice} onChange={(e) => setBPostData({ ...bpostData, monthlyprice: e.target.value })} />
            <TextField  required size="small" name="plantype" variant="outlined" label="Plan Type" fullWidth  value={bpostData.plantype} onChange={(e) => setBPostData({ ...bpostData, plantype: e.target.value })} />
            <TextField  required size="small" name="validity" variant="outlined" label="Validity" fullWidth value={bpostData.validity} onChange={(e) => setBPostData({ ...bpostData, validity: e.target.value })} />
            <TextField  required size="small" name="data" variant="outlined" label="Data" fullWidth value={bpostData.data} onChange={(e) => setBPostData({ ...bpostData, data: e.target.value })} />
            <TextField  required size="small" name="uploadspeed" variant="outlined" label="Upload Speed" fullWidth value={bpostData.uploadspeed} onChange={(e) => setBPostData({ ...bpostData, uploadspeed: e.target.value })} />
            <TextField  required size="small" name="downloadspeed" variant="outlined" label="Download Speed" fullWidth value={bpostData.downloadspeed} onChange={(e) => setBPostData({ ...bpostData, downloadspeed: e.target.value })} />
            <TextField  required size="small" name="speed" variant="outlined" label="Speed" fullWidth value={bpostData.speed} onChange={(e) => setBPostData({ ...bpostData, speed: e.target.value })} />
            <TextField  required size="small" name="installationcharges" variant="outlined" label="Installation Charges" fullWidth value={bpostData.installationcharges} onChange={(e) => setBPostData({ ...bpostData, installationcharges: e.target.value })} />
            <Button  size="small" className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
            <Button  size="small" variant="contained" color="primary" size="small" onClick={clear} fullWidth>Clear</Button>
          </form>
        </Paper>
        </Container>
</Grow>
{snackBarMsg ? <Snackbar snackBarMsg={snackBarMsg} setSnackBarMsg={setSnackBarMsg} /> : null}
</Container>
      );
    };
    
    export default BroadbandForm;


