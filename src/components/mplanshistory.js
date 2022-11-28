import React, { useState, useEffect, useRef } from 'react';
import { Grid,Paper } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import useStyles from './Posts/styles';
import {getplans} from "../actions/plancart";
import {getplanbyid} from "../actions/plancart";
import Plan from "../components/Posts/Post/Plan";
import { makeStyles } from '@material-ui/core/styles';

const MPlansHistory= () => {
  const dispatch = useDispatch();
  var profile=JSON.parse(localStorage.getItem('profile'))
  var user= profile?.user?._id
  useEffect(() => {
    if (plans.length == 0)
      dispatch(getplans());
  }, [dispatch])

  useEffect(() => {
    if (planuser.length == 0)
      dispatch(getplanbyid(user));
  }, [dispatch])

  const plans = useSelector((state) => state.plans);
  console.log(plans)

  const planuser = useSelector((state) => state.planuser);
  console.log(planuser)
  const classes = useStyles();
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
      width:"700px"
    },
  }));
  const classes_1= useStyles_1()
  return  (
    planuser.length==0 ? <></> : (
      <Paper className={classes_1.paper}>
        <h4 id="transition-modal-title">RECHARGE HISTORY</h4>
      <Grid className={classes.container} container alignItems="stretch" spacing={3}>
     
        {planuser.map((plan) => (
          
          <Grid key={plan._id} item xs={12} sm={6} md={4}>
            <Plan plan={plan}  />
          </Grid>
        ))}
      </Grid>
      </Paper>
    )
  );
};

export default MPlansHistory
