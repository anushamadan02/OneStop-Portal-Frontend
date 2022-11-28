import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  listItem: {
    padding: theme.spacing(0, 0),
  },
  total: {
    fontWeight: 700,
  },
  title: {
    marginTop: theme.spacing(1),
  },
}));

export default function Review({order,payment,address}) {
  const classes = useStyles();
  const profile=JSON.parse(localStorage.getItem('profile'))
  var amount=0
  order.forEach(d=>{
    amount+=d.price*d.count
  })
  return (
    <div >
      <Typography variant="h6">
        Order summary
      </Typography>
      <List disablePadding>
        {order.map((product) => (
          <ListItem className={classes.listItem} key={product.name}>
            <ListItemText primary={product.name} secondary={product.summary}  />
            <Typography variant="body2" >{product.price} * {product.count}= {product.count*product.price} Rs</Typography>
          </ListItem>
        ))}
        <ListItem className={classes.listItem}>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" className={classes.total} >
            {amount}
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" className={classes.title} >
            Shipping
          </Typography>
          <Typography >{profile.user.name}</Typography>
          <Typography >{address.address1}</Typography>
          <Typography >{address.address2}</Typography>
          <Typography >{address.city}, {address.state}</Typography>
          <Typography >{address.postalCode}</Typography>
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" className={classes.title} style={{float:"right"}} >
            Payment details
          </Typography>
          <Grid container>
              <React.Fragment key={payment.cardnumber}>
                <Grid item xs={12}>
                  <Typography style={{float:"right"}} >{payment.cardtype}</Typography>
                  <Typography style={{float:"right"}}>{payment.cardnumber}</Typography>
                </Grid>
                <Grid item xs={12}>
                <Typography style={{float:"right"}}>{payment.expirydate+" "}</Typography>
                <Typography style={{float:"right"}}>Expiry date: </Typography>
                </Grid>  
              </React.Fragment>
          </Grid>
        </Grid>
      </Grid>
      </div>
  );
}