import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import useStyles from './styles';
import { createPost, updatePost } from '../../actions/posts';
import { Container,  Grow} from '@material-ui/core';
import {getplans} from "../../actions/plancart";
import Snackbar from '../notifications/snackbar'


    const Form = ({currentId, setCurrentId}) => {
      const [postData, setPostData] = useState({ plan: '', validity: '', data: '', SMS: '', cost: ''});
      const post = useSelector((state) => (currentId ? state.posts.find((message) => message._id === currentId) : null));
      const [snackBarMsg, setSnackBarMsg] = useState(null)
      const dispatch = useDispatch();
      const classes = useStyles();
      useEffect(() => {
        if (plans.length == 0)
          dispatch(getplans());
      }, [dispatch])
    
      const plans = useSelector((state) => state.plans);
      // var user=plans[plans.length-1].user
     
      useEffect(() => {
        if (post) setPostData(post);
      }, [post]);
      const details = localStorage.getItem("profile");
     
      //console.log(JSON.parse(localStorage.getItem('profile')).user._id)
      var profile=JSON.parse(localStorage.getItem('profile'))
      const clear = () => {
        setCurrentId(0);
        setPostData({ plan: '', validity: '', data: '', SMS: '', cost: '' });
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (currentId === 0) {
          dispatch(createPost(profile?.user?._id, postData));
          setSnackBarMsg({ message: "MobilePlan added successfully", severity: "success" })
          clear();
        } else {
          dispatch(updatePost(profile?.user?._id, currentId, postData));
          setSnackBarMsg({ message: "Mobile Plan updated successfully", severity: "success" })
          clear();
        }
      };
      return (
        <Container maxWidth="lg">
        <Grow in>
          <Container>
        <Paper className={classes.paper}>
          <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
          <Typography variant="h8">{currentId ? 'Editing a Mobile Plan' : `Add a Mobile Plan`}</Typography>
            <TextField  required size="small" name="plan" variant="outlined" label="Plan" fullWidth value={postData.plan} onChange={(e) => setPostData({ ...postData, plan: e.target.value })} />
            <TextField  required size="small" name="validity" variant="outlined" label="Validity" fullWidth value={postData.validity} onChange={(e) => setPostData({ ...postData, validity: e.target.value })} />
            <TextField  required size="small" name="data" variant="outlined" label="Data" fullWidth  value={postData.data} onChange={(e) => setPostData({ ...postData, data: e.target.value })} />
            <TextField  required size="small" name="SMS" variant="outlined" label="SMS" fullWidth value={postData.SMS} onChange={(e) => setPostData({ ...postData, SMS: e.target.value })} />
            <TextField  required size="small" name="cost" variant="outlined" label="Cost" fullWidth value={postData.cost} onChange={(e) => setPostData({ ...postData, cost: e.target.value })} />
            <Button  required size="small" className={classes.buttonSubmit} variant="contained" color="primary" size="large" type="submit" fullWidth>Submit</Button>
            <Button  required size="small" data-testid="button" variant="contained" color="primary" size="small" onClick={clear} fullWidth>Clear</Button>
          </form>
        </Paper>
        </Container>
</Grow>
{snackBarMsg ? <Snackbar snackBarMsg={snackBarMsg} setSnackBarMsg={setSnackBarMsg} /> : null}
</Container>

      );
    };
    
    export default Form;


