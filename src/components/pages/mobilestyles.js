import { makeStyles } from '@material-ui/core/styles';

export default makeStyles({
  media: {
    height: 0,
    paddingTop: '54.25%',
    
  },
  border: {
    border: 'solid',
  },
  fullHeightCard: {
    height: '100%',
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    justifyItems:"center",
    borderRadius: '15px',
    width:"250px",
    position: 'relative',
  },
  cardone: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    justifyItems:"center",
    borderRadius: '15px',
    height: "300px",
    height: "100%",
    width:"250px",
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
    padding: '0 16px 8px 16px',
    display: 'flex',
    justifyContent: 'space-between',
  },
  logButton:{
    display: 'flex',
    fontSize:"10px",
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
});
