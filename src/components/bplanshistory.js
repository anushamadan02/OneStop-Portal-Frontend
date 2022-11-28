import React, { useState, useEffect, useRef } from 'react';
import { Grid, CircularProgress, Paper } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import useStyles from './Posts/styles';
import {getbroadbandhistory} from "../actions/broadbandhis";
import BPlan from "../components/BPosts/BPost/BPlan";
import { makeStyles } from '@material-ui/core/styles';

const BPlansHistory= () => {
  const dispatch = useDispatch();
  var user=JSON.parse(localStorage.getItem('profile'))
  useEffect(() => {
    if (broadbandhistory.length == 0)
      dispatch(getbroadbandhistory(user?.user?._id));
  }, [dispatch])

  const broadbandhistory = useSelector((state) => state.broadbandhistory);
  console.log(broadbandhistory)

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
    broadbandhistory.length==0 ?<> </> : (
      <Paper className={classes_1.paper}>
        <h4 id="transition-modal-title">RECHARGE HISTORY</h4>
      <Grid className={classes.container} container alignItems="stretch" spacing={3}>
        {broadbandhistory.map((broadbandhis) => (
        <Grid key={broadbandhis._id} item xs={12} sm={6} md={4}>
          <BPlan broadbandhis={broadbandhis}  />
        </Grid>
      ))}
      </Grid>
      </Paper>
    )
  );
};

export default BPlansHistory;




