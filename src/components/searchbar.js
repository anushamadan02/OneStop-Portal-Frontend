import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import {TextField,Grid,Paper} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
}));

export default function Searchbar({setSearchtext}) {
  const classes = useStyles();
  const [text,setText]=useState("")
  function handleSubmit(e){
    e.preventDefault();
    setSearchtext(text);
  }
  return (
    <div className={classes.margin}>
      <Paper elevation={5}>
        <Grid container spacing={0} alignItems="flex-end">
          <Grid item>
            
            <TextField 
            id="input-with-icon-grid" 
            label="Search products.."
            value={text}
            onChange={(e)=>{
              setText(e.target.value)
              if(text=='')
              setSearchtext(text)
            }} 
            style={{marginTop:"-15px"}}
            onSubmit={handleSubmit}
            >
            </TextField>
            <SearchIcon type="submit" onClick={handleSubmit} onSubmit={handleSubmit} style={{marginRight:"10px",marginBottom:"-20px"}}/>
          </Grid>
        </Grid>
          </Paper>
    </div>
  );
}
/*
 <InputBase
        className={classes.input}
        placeholder="Search Products.."
        inputProps={{ 'aria-label': 'Search Products...' }}
        onChange={(e)=>{
            setText(e.target.value)
            if(text=='')
            setSearchtext(text)
        }}
        value={text}
      />
      <IconButton type="submit" onClick={handleSubmit} className={classes.iconButton} aria-label="search">
        <SearchIcon />
      </IconButton>
*/