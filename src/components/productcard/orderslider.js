import React from "react";
import Carousel, { consts } from "react-elastic-carousel";
import Ordercard from './ordercard'
import Item from './slideritem'
import {Button,Typography} from '@material-ui/core'
import {ArrowLeftRounded,ArrowRightRounded} from '@material-ui/icons';
import {getUserOrders} from '../../actions/userorders'

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';


const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 2 },
  { width: 768, itemsToShow: 3 },
  { width: 1200, itemsToShow: 4 },
];

function Orderslider({openPayment}) {
    var dispatch=useDispatch()
    const orders = useSelector((state) => state.orders);
    //console.log("order : ",orders)
    var profile = JSON.parse(localStorage.getItem("profile"));
    useEffect(()=>{
        dispatch(getUserOrders(profile?.user?._id))
      },[dispatch,openPayment])
    
    var orderjsx=null
    if(orders.length!=0){
        orderjsx=orders.map(order=>{
            var ordertotal=0;
            order.products.forEach(data => {
                ordertotal+=data.price
            });
           var prodjsx= order.products.map(prod=>{
             return(
             <Item>
                 <Ordercard prod={prod} status={order.status} ordertotal={ordertotal} address={order.address} 
                    orderdate={order.createdAt}//.getDate()+"/"+(order.createdAt.getMonth()+1)+"/"+order.createdAt.getFullYear()}
                    transectionid={order.transaction_id}
                    />
             </Item>)
            })
            return prodjsx
        })
    }

  return (
   
      <div className="App">
        <div style={{textAlign:"center",marginTop:"30px"}}>
            <Typography variant="h4" color="textSecondary" style={{marginBottom:"10px"}}>Order History</Typography>
        </div>
        
        {orders.length!=0?(<Carousel showEmptySlots breakPoints={breakPoints} renderArrow={({type,onClick,isEdge})=>{
            return(
               <Button onClick={onClick} disabled={isEdge}>{type===consts.PREV?<ArrowLeftRounded fontSize="large" color="primary"/>:<ArrowRightRounded fontSize="large" color="primary"/>}</Button>
            )
        }}>
          {orderjsx}
        </Carousel>):(
          <div style={{textAlign:"center"}}>
            <Typography variant="h6" color="textPrimary">Looks like You haven't bought anything yet!</Typography>
            <Typography variant="body1" color="textSecondary">let's start shoping now!</Typography>
          </div>
        )}
      </div>
  );
}
export default Orderslider