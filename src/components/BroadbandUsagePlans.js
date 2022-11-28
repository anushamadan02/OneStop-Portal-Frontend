import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { Container, Typography, Grow, Grid } from '@material-ui/core';
import useStyles from './pages/mobilestyles';
import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {getdataconsump} from "../actions/dataconsump"
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import {getplans} from "../actions/plancart";
import { getbroadbands } from '../actions/broadband';
import { CircularProgressbar, buildStyles  } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { easeQuadInOut } from "d3-ease";
import AnimatedProgressProvider from "./AnimatedProgressProvider";

const useStyles_1 = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 150,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));


function BroadbandMUsagePlans() {
  const classes_1=useStyles_1
  const [elevated, setElevated]=useState(2);
  const [currentValue, setCurrentValue] = useState(0);
  const [state_start, setState_start] = React.useState({
    age: '',
    name: 'hai',
  });
  const [state_end, setState_end] = React.useState({
    age: '',
    name: 'hai',
  });
  const dispatch = useDispatch();
  const [expanded, setExpanded] = React.useState(false);


  useEffect(() => {
    if (datas.length ===0)
      dispatch(getdataconsump());
  }, [dispatch])

  useEffect(() => {
    if (plans.length === 0)
      dispatch(getplans());
  }, [dispatch])

  useEffect(() => {
    if (broadbands.length === 0)
      dispatch(getbroadbands());
  }, [dispatch])

  const broadbands = useSelector((state) => state.broadbands);
  
  console.log(broadbands)


  const plans = useSelector((state) => state.plans);
  console.log(plans)

  
  const datas = useSelector((state) => state.datas);
  const handleChange_start = (event) => {
    const name = event.target.name;
    setState_start({
      ...state_start,
      [name]: event.target.value,
    });
  };
  const handleChange_end = (event) => {
    const name = event.target.name;
    setState_end({
      ...state_end,
      [name]: event.target.value,
    });
  };
  var startingdata=state_start.start;
  var endingdata=state_end.end;
  var Total_Consumption=0;
  for(var i=parseInt(startingdata); i<= parseInt(endingdata); i++){
      Total_Consumption=Total_Consumption+datas[i].dc
  }
  const classes = useStyles();
  console.log(Math.round((datas[datas.length-1]?.dc /2)*100).toFixed(2))
  const percentage= Math.round((datas[datas.length-1]?.dc /2)*100).toFixed(2)


    return (
     ( datas.length ==0 || broadbands.length ==0?<></>:
      <>
      <Container maxWidth="lg">
        <Grow in>
          <Container>
            <Grid container style={{marginTop:"20px"}} justify="space-between" alignItems="stretch" spacing={3}>
            <Card style={{marginBottom:"10px", width:"320px"}} className={classes.root}  elevation={elevated}   onMouseOver={() => setElevated(10)} onMouseOut={() => setElevated(2)} variant="outlined">
              <CardContent>
              <Grid container alignItems="stretch" spacing={3}>
                <Grid  item xs={12} sm={6} md={6}>
                <AnimatedProgressProvider
                  valueStart={0}
                  valueEnd={percentage}
                  duration={1.4}
                  easingFunction={easeQuadInOut}
                >
                  {(value) => {
                    const roundedValue = Math.round(value)
                    return (
                      <CircularProgressbar
                        value={value}
                        text={`${roundedValue}%`}

                        styles={buildStyles({ pathTransition: 'none',  textColor: "black",
                        pathColor: "#203354" ,
                        trailColor:  "#8cd2e8"})}
                      />
                    )
                  }}
                </AnimatedProgressProvider>
                </Grid>
                <Grid  item xs={12} sm={6} md={6}>
                <Typography style={{marginTop:"10px"}} className={classes.title} color="textSecondary" gutterBottom> Last 3 Days consumption</Typography>
      <div><span  STYLE="color:grey;font-weight:600;font-size:14px"> 16-9-2021:  </span><span  STYLE="font-size:13px">{datas[datas.length-1].dc} GB</span></div>
      <div><span  STYLE="color:grey;font-weight:600;font-size:14px"> 15-9-2021:  </span><span  STYLE="font-size:13px">{datas[datas.length-2].dc} GB</span></div>
      <div><span  STYLE="color:grey;font-weight:600;font-size:14px"> 14-9-2021:  </span><span  STYLE="font-size:13px">{datas[datas.length-3].dc} GB</span></div>
                </Grid>
                </Grid>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                 BROADBAND DATA USAGE TODAY : {datas[datas.length-1].dc}/ 2 GB
                </Typography>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                </Typography>
                <div>
      <div>
      <FormControl className={classes.formControl}>
        <InputLabel shrink htmlFor="age-native-label-placeholder">
          Start date
        </InputLabel>
        <NativeSelect
          value={state_start.startingdate}
          onChange={handleChange_start}
          inputProps={{
            name: 'start',
            id: 'age-native-label-placeholder',
          }}
        >
          <option value="">None</option>
          <option value={1}>1/9/21</option>
          <option value={2}>2/9/21</option>
          <option value={3}>3/9/21</option>
          <option value={4}>4/9/21</option>
          <option value={5}>5/9/21</option>
          <option value={6}>6/9/21</option>
          <option value={7}>7/9/21</option>
          <option value={8}>8/9/21</option>
          <option value={9}>9/9/21</option>
          <option value={10}>10/9/21</option>
          <option value={12}>11/9/21</option>
          <option value={13}>12/9/21</option>
          <option value={14}>13/9/21</option>
          )
        </NativeSelect>
      </FormControl> 
      <div>
      </div>
      <div>
      </div>
      <FormControl style={{marginBottom:"10px"}} className={classes.formControl_1}>
        <InputLabel shrink htmlFor="age-native-label-placeholder">
          End Date
        </InputLabel>
        <NativeSelect
          value={state_end.endingdate}
          onChange={handleChange_end}
          inputProps={{
            name: 'end',
            id: 'age-native-label-placeholder',
          }}
        >
          <option value="">None</option>
          <option value={15}>15/9/21</option>
          <option value={16}>16/9/21</option>
          <option value={17}>17/9/21</option>
          <option value={18}>18/9/21</option>
          <option value={19}>19/9/21</option>
          <option value={20}>20/9/21</option>
          <option value={21}>21/9/21</option>
          <option value={22}>22/9/21</option>
          <option value={23}>23/9/21</option>
          <option value={24}>24/9/21</option>
          <option value={25}>25/9/21</option>
          <option value={26}>26/9/21</option>
          <option value={27}>27/9/21</option>
        </NativeSelect>
      </FormControl>
      </div>
      BROADBAND CONSUMPTION : {Total_Consumption}
      
      </div>
        </CardContent>
        <CardActions>
        </CardActions>
        </Card>
       
    </Grid>
    </Container>
</Grow>
</Container>
</>
  ));
  };
     
  
  export default BroadbandMUsagePlans;