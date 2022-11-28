import React, { useState, useEffect, useRef } from 'react';
import { Grid, CircularProgress, Typography } from '@material-ui/core';
import { getPosts } from '../../actions/posts';
import { useDispatch, useSelector } from 'react-redux';
import Post from './Post/Post';
import useStyles from './styles';
import Snackbar from '../notifications/snackbar';
import {getplanbyid} from "../../actions/plancart";

const Posts = ({setCurrentId, currentId}) => {
  const dispatch = useDispatch();
  useEffect(() => {
    if (posts.length === 0)
      dispatch(getPosts());
  }, [dispatch])

  const posts = useSelector((state) => state.posts);
  const [snackBarMsg, setSnackBarMsg] = useState(null)
  

  console.log(posts)
  const classes = useStyles();
  var profile=JSON.parse(localStorage.getItem('profile'))
  var user= profile?.user?._id
 
  useEffect(() => {
    if (planuser.length === 0)
      dispatch(getplanbyid(user));
  }, [dispatch])
    const planuser = useSelector((state) => state.planuser);
  console.log(planuser)


  return  (
    posts.length==0 ? <CircularProgress /> : (
      <>
    
      {planuser.length===0?<><Grid className={classes.container} container alignItems="stretch" spacing={3}>
        {posts.map((post) => (
          <Grid key={post._id} item xs={12} sm={8} md={3}>
            <Post setSnackBarMsg={setSnackBarMsg} post={post} setCurrentId={setCurrentId}  currentId={currentId} />
          </Grid>
        ))}
      </Grid></>:<>  <Grid className={classes.container} container alignItems="stretch" spacing={3}>
        {posts.map((post) => (
          <Grid key={post._id} item xs={12} sm={8} md={6}>
            <Post setSnackBarMsg={setSnackBarMsg} post={post} setCurrentId={setCurrentId}  currentId={currentId} />
          </Grid>
        ))}
      </Grid></>}
    
      {snackBarMsg ? <Snackbar snackBarMsg={snackBarMsg} setSnackBarMsg={setSnackBarMsg} /> : null}
      </>
    )
  );
};

export default Posts;
