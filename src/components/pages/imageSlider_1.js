import React, { useState, useEffect, useRef } from 'react';
import {Carousel} from 'react-bootstrap'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import useStyles from './mobilestyles';
import pic4 from '../../images/five.png';
import pic5 from '../../images/four.jpg';
import pic6 from '../../images/six.jpg';
import { CardMedia } from '@material-ui/core/';
import Line from "../Line";

function ImageSlider() {

    const [elevated, setElevated]=useState(2);
    const classes = useStyles();
    return (
        <div class="carousel-inner" style={{margin:"auto"}}>
            <Carousel interval={1000}>
                <Carousel.Item>
                <Card style={{position: 'absolute', left: '50%',transform: 'translate(-50%)', marginTop:"10px"}} className={classes.card}  elevation={elevated}  onMouseOver={() => setElevated(10)}  onMouseOut={() => setElevated(2)} >
                <CardMedia className={classes.media} image={pic4}/>
                <CardContent>
                Telstra Smart Modem targets your devices with a concentrated signal. And switches to 4G in an outage. Included for new customers. 4G coverage required. 4G speeds capped at 25/2 Mbps. Actual speeds may be lower
                </CardContent>
                </Card>
                </Carousel.Item>
                <Carousel.Item>
                <Card style={{position: 'absolute', left: '50%',transform: 'translate(-50%)', marginTop:"10px"}} className={classes.card}  elevation={elevated}  onMouseOver={() => setElevated(10)} onMouseOut={() => setElevated(2)} >
                <CardMedia className={classes.media} image={pic5}/>
                <CardContent>
                Home phone service
                + unlimited standard Australian mobile calls + 100 GBs of Data Consumption
                Our internet plans come with a home phone service included. Plus unlimited calls to standard Australian mobiles.
                </CardContent>
                </Card>
                </Carousel.Item>
                <Carousel.Item>
                <Card  style={{position: 'absolute', left: '50%',transform: 'translate(-50%)', marginTop:"10px"}} className={classes.card}  elevation={elevated}  onMouseOver={() => setElevated(10)} onMouseOut={() => setElevated(2)} >
                <CardMedia className={classes.media} image={pic6}/>
                <CardContent>
                Broadband Protect
                Cyber threat protection for your family
                With parental controls, social network protection and device protection to help keep everyone at home safe online.
                Ability to stream movies, play games and lots more
                </CardContent>
                </Card>
                </Carousel.Item>
            </Carousel>
        </div>

     
    
    )}
    
  

  export default ImageSlider;