import React,{useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    display: 'flex',
    alignItems: 'center',
    width: 400,
    justifyContent:'center'
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
}));

export default function Searchbar({setSearch,setSearchterm}) {
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
    <Paper component="form" style={{marginTop:"20px", marginBottom:"20px"}} className={classes.root}>
      <InputBase
        className={classes.input}
        placeholder="Search.."
        inputProps={{ 'aria-label': 'search google maps' }}
        value={term}
        onChange={onChangeRun}
        fullWidth
      />
      <IconButton type="submit" onClick={onClickRun} className={classes.iconButton} aria-label="search">
        <SearchIcon />
        </IconButton>
    </Paper>
  );
}
