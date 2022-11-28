import React,{useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Input,FormControl,InputLabel,InputAdornment} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
    marginRight:"20px",
  },
}));

export default function Searchbar({setSearch}) {
  const classes = useStyles();
  const [term,setTerm]=useState("")
  const onChangeRun=(event)=>{
    setTerm(event.target.value)
  }
  const onClickRun=(e)=>{
    e.preventDefault();
    setSearch(term);   
  }
  //const searchResults=useSelector((state)=>state.searchResults)
  return (
    <FormControl  className={classes.margin}>
    <InputLabel htmlFor="input-with-icon-adornment" shrink>Search product</InputLabel>
    <Input
      id="input-with-icon-adornment"
      startAdornment={
        <InputAdornment position="end" onClick={onClickRun}>
          <SearchIcon />
        </InputAdornment>
      }
      value={term}
      onChange={onChangeRun}
    />
  </FormControl> 
  );
}
/*
<Paper component="form"  className={classes.root}>
      <InputBase
        className={classes.input}
        placeholder=""
        inputProps={{ 'aria-label': 'search google maps' }}
        value={term}
        onChange={onChangeRun}
        fullWidth
      />
      <IconButton type="submit"  onClick={onClickRun} className={classes.iconButton} aria-label="search">
        <SearchIcon/>
        </IconButton>
    </Paper>



   
*/