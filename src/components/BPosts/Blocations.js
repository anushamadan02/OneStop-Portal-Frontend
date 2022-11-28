import React, { useState, useEffect, useRef } from 'react';
import { Grid, CircularProgress } from '@material-ui/core';
import { getPosts } from '../../actions/posts';
import { useDispatch, useSelector } from 'react-redux';
import BPost from './BPost/BPost';
import Blocation from "./BPost/Blocation"
import useStyles from './styles';
import broadband from '../../reducers/broadband';
import { getbroadbands } from '../../actions/broadband';
import {getblocations} from "../../actions/broadbandlocations";

const Blocations = ({ currentId_blocation, setCurrentId_blocation, searchterm}) => {
  const dispatch = useDispatch();
  useEffect(() => {
    if (broadbands.length == 0)
      dispatch(getbroadbands());
  }, [dispatch])
  const broadbands = useSelector((state) => state.broadbands);
  console.log(broadbands)
  const classes = useStyles();

  useEffect(() => {
    if (blocations.length == 0)
      dispatch(getblocations());
  }, [dispatch])
  
  const blocations = useSelector((state) => state.blocations);
  const searchResults = useSelector((state) => state.searchResults)
  const [list, setList] = useState([]);

  if (!searchterm) {
    var blocationjsx = blocations.map((blocation) => (
    <Grid key={blocation._id} item xs={12} sm={8} md={3} >
      <Blocation blocation={blocation} currentId_blocation={currentId_blocation}  setCurrentId_blocation={setCurrentId_blocation}/>
    </Grid>
  ))
} else {
  var blocationjsx = searchResults.map((blocation) => (
    <Grid key={blocation._id} item xs={12} sm={8} md={3} >
      <Blocation blocation={blocation} currentId_blocation={currentId_blocation}  setCurrentId_blocation={setCurrentId_blocation} />
    </Grid>
  ))
}
  var arrayid=[]
  console.log(searchResults.availableplans)
  for (var t=0; t<searchResults.length; t++){
    for (var r=0; r< searchResults[t].availableplans.length; r++){
          arrayid.push(searchResults[t].availableplans[r])}
  }
  console.log(arrayid)
  var arraydata=[]
  console.log(broadbands)
  for (var l=0; l<broadbands.length; l++){
    for(var u=0; u<arrayid.length;u++){
      if (broadbands[l]._id===arrayid[u]){
        arraydata.push(broadbands[l])
      }
  }}
  console.log(arraydata)

  var blocationjsx_1 = arraydata.map((arrayd) => (
    <Grid key={arrayd._id} item style={{marginTop:"10px"}} xs={12} sm={8} md={5} >
      <BPost broadband={arrayd} />
    </Grid>
  ))
  return  (
    !blocations.length ? <CircularProgress /> : (
        <Grid className={classes.container} container justify="center" alignItems="center" alignContent="center" spacing={4} >
          {(searchterm&&(searchResults.length==0))?<div><CircularProgress/> </div>:<div></div>}
          {blocationjsx_1}
        </Grid>
      )
    )
  };
  

export default Blocations;


