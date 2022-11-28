import { makeStyles } from '@material-ui/core/styles';

export default makeStyles({
  media: {
    margin: "auto",
    height:"40%",
  },
  border: {
    border: 'solid',
  },
  fullHeightCard: {
    height: '100%',
  },
  card: {
    display: 'flex',
    margin:"2px",
    flexDirection: 'column',
    justifyContent: 'center',
    justifyItems:"center",
    borderRadius: '15px',
    width:"100%",
    width:"200px",
    position: 'relative',
  },
  overlay: {
    position: 'absolute',
    top: '20px',
    left: '20px',
    color: 'white',
  },
  overlay2: {
    position: 'absolute',
    top: '20px',
    right: '20px',
    color: 'white',
  },
  grid: {
    display: 'flex',
  },
  details: {
    display: 'flex',
    justifyContent: 'space-between',
    margin: '20px',
  },
  title: {
    padding: '0 16px',
  },
  cardActions: {
    flexDirection: 'row',
    justifyContent: "center",
    alignItems:"top",
  },
  colorblock: {
    backgroundColor:"#203354",
    color: '#fff',
    
  },
  logButton:{
    display: 'flex',
    fontSize:"10px",
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
});
