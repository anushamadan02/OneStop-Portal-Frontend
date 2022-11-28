import React, { useState, useEffect, useRef } from 'react';
// import {Carousel} from 'react-bootstrap'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import useStyles from './mobilestyles';
import pic1 from '../../images/one.jpg';
import pic2 from '../../images/two.jpg';
import pic3 from '../../images/three.jpg';
import pic4 from '../../images/five.png';
import pic5 from '../../images/four.jpg';
import pic6 from '../../images/six.jpg';
import { CardMedia } from '@material-ui/core/';
import Line from "../Line";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";



function ImageSlider(props) {
    const classes = useStyles();
    const [elevated, setElevated]=useState(2);
    const responsive = {
        desktop: {
          breakpoint: { max: 3000, min: 900 },
          items: 3,
          slidesToSlide: 3, // optional, default to 1.
          
        },
        tablet: {
          breakpoint: { max: 1024, min: 464 },
          items: 2,
          slidesToSlide: 2 // optional, default to 1.
        },
        mobile: {
          breakpoint: { max: 464, min: 0 },
          items: 1,
          slidesToSlide: 1 // optional, default to 1.
        }
      };
    return (
        <div class="carousel-inner"  >
           <Carousel
  swipeable={false}
  draggable={false}
//   showDots={true}
partialVisible={true}
  responsive={responsive}
  ssr={true} // means to render carousel on server-side.
  infinite={true}
  autoPlay={props.deviceType !== "mobile" ? true : false}
  autoPlaySpeed={1000}
  keyBoardControl={true}
  customTransition="all .5"
  transitionDuration={500}
  containerClass="carousel-container"
  removeArrowOnDeviceType={["tablet", "mobile","desktop"]}
  deviceType={props.deviceType}
  dotListClass="custom-dot-list-style"
  itemClass="carousel-item-padding-40-px"
>
  <div>
  <Card  className={classes.cardone}  elevation={elevated}  onMouseOver={() => setElevated(10)}  onMouseOut={() => setElevated(2)} >
                <CardMedia className={classes.media} image={pic1}/>
                <CardContent>
                Mobile Plans Usage can be viewed on this portal and your devices can be configured with high speed concentrated signal. Admins are able to add, modify and delete the plans as per the need.
                </CardContent>
                </Card>
  </div>
  <div><Card  className={classes.cardone}  elevation={elevated}  onMouseOver={() => setElevated(10)} onMouseOut={() => setElevated(2)} >
                <CardMedia className={classes.media} image={pic2}/>
                <CardContent>
                Tech products allows users to browse through a variety of different products. It allows them to add to favourites, add to cart and view purchase history. They are also allowed to publish reviews and view reviews.
                </CardContent>
                </Card></div>
  <div>
  <Card   className={classes.cardone}  elevation={elevated}  onMouseOver={() => setElevated(10)} onMouseOut={() => setElevated(2)} >
                <CardMedia className={classes.media} image={pic3}/>
                <CardContent>
                Customers can purchase broadband plans based on locations and they can easily upgrade and renew the current plan. Data consumption on daily basis is provided to the user so that he keeps a track.
                </CardContent>
                </Card>
  </div>
  <div><Card  className={classes.cardone}  elevation={elevated}  onMouseOver={() => setElevated(10)}  onMouseOut={() => setElevated(2)} >
                <CardMedia className={classes.media} image={pic4}/>
                <CardContent>
                The customers can download the payment invoice after a purchase order has been done. The purchased plans and the recharges made in the past can be viewed in the recharge history section.
                </CardContent>
                </Card>
                </div>
  <div>  <Card  className={classes.cardone}  elevation={elevated}  onMouseOver={() => setElevated(10)} onMouseOut={() => setElevated(2)} >
                <CardMedia className={classes.media} image={pic5}/>
                <CardContent>
                Customer can add, modify, and delete items from the cart and the favourites section. If he wishes to buy, A checkout page pops up where shipping and billing address is required which will be followed by a payment gateway
                </CardContent>
                </Card>
                </div>
  <div> <Card   className={classes.cardone}  elevation={elevated}  onMouseOver={() => setElevated(10)} onMouseOut={() => setElevated(2)} >
                <CardMedia className={classes.media} image={pic6}/>
                <CardContent>
                The portal is provided with many functionalities to satiate the needs of the customers. It is interactive, easy to use and user-friendly. The portal, optimised for mobile devices, will allow the customers to serve themselves. 
                </CardContent>
                </Card>
                </div>
</Carousel>
        </div>
    )}
    
  

  export default ImageSlider;