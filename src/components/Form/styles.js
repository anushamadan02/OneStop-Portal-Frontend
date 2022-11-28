
import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(0.5),
    },
  },
  paper: {
    padding: theme.spacing(1),
    width: "270px"
  },
  form: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    width: "250px"
  },
 
  buttonSubmit: {
    marginBottom: 10,
  },
  logButton:{
    display: 'flex',
    fontSize:"10px",
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
  
}));
