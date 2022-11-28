import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {Badge, Button,Avatar, Typography, List, Toolbar, CssBaseline, Drawer, AppBar, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';

import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import { useDispatch, useSelector } from 'react-redux';
import useWindowSize from './customhooks/useWindowSize'
import { googlesignin } from '../actions/auth'
import * as actiontypes from '../constants/actionTypes'

import { GoogleLogin } from 'react-google-login';
import { Link} from 'react-router-dom';
import Icon from './icons/googleicon'
import { Home, PhoneAndroid, Router, Shop, ShoppingCart, AccountBox, ContactSupport } from "@material-ui/icons";
import pic from '../images/Telstra_2.png';
import { useEffect } from 'react';

const drawerWidth = 230;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        height: "50px",
        
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
        color:"white"
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        background:"#EFE8FA",
        zIndex:"1200",
    },
    drawerOpen: {
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9) + 1,
        },
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: theme.spacing(0, 1),
        //   height: "30px",
        ...theme.mixins.toolbar,
    },
    large: {
        width: theme.spacing(7),
        height: theme.spacing(7),
      },
      content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(3),
      },
      small: {
        width: theme.spacing(3),
        height: theme.spacing(3),
      },
}));

export default function Newnavbar() {
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const cart = useSelector((state) => state.cart);
    const [height,width]=useWindowSize()
    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };

    const dispatch = useDispatch();
    var icons = [<Home />, <PhoneAndroid />, <Router />, <Shop />, <ShoppingCart />]
    var links = ['/', '/mobile', '/broadband', '/products', '/cart']
    
    
    useEffect(()=>{
       console.log(width)
       if(width<770)
        setOpen(false)
    },[height,width])
    const token = JSON.parse(localStorage.getItem("profile"))?.token;
    const user=JSON.parse(localStorage.getItem('profile'))?.user
    var googleSuccess = async (res) => {
        const result = res?.profileObj;
        const token = res?.tokenId;

        console.log("google response", result, "  ", token)
        try {
            await dispatch(googlesignin({ _id: result.googleId, name: result.name, email: result.email, googleId: result.googleId, profileimage: result.imageUrl }))
            window.location.reload();
        } catch (error) {
            console.log(error);
        }
    };
    const googleError = () => alert('Google Sign In was unsuccessful. Try again later');
  
    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
                style={{ background:  "#2874f0"}}//'#309AEB'
            >
                <Toolbar style={{ height: "45px" }}>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        style={{marginTop:"-5px"}}
                        className={clsx(classes.menuButton, {
                            [classes.hide]: open,
                        })}
                    >
                        <MenuIcon />
                    </IconButton>
                    <span style={{marginLeft:"-25px"}}><a href="https://telstra.unily.com/">
                         <img style={{height:"25px"}} color="white" src={pic} align="center" align="left"></img></a>
                    </span>
                    <Typography variant="h6" noWrap>
                       <span style={{fontWeight:"bolder",color:"white"}}>&nbsp;Telstra</span>
                    </Typography>
                   
                   <div style={{marginInlineStart:"auto"}}>
                       <Link to="/profile" style={{fontWeight:"bold",textDecoration:"none",color:"white",fontSize:"16px"}}>
                          <AccountBox/> Profile
                        </Link>
                  
                       <Link to="/contactus" style={{fontWeight:"bold",textDecoration:"none",color:"white",fontSize:"16px",marginLeft:"35px"}}>
                           <ContactSupport/>About Us
                        </Link>
                    </div>
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                className={clsx(classes.drawer, {
                    [classes.drawerOpen]: open,
                    [classes.drawerClose]: !open,
                })}
                classes={{
                    paper: clsx({
                        [classes.drawerOpen]: open,
                        [classes.drawerClose]: !open,
                    }),
                }}
            >
                {open?(user?<div style={{width:"220px"}}>
                 <Avatar style={{float:'left'}} alt={user?.name} src={user?.profileimage} className={classes.large} />
                 <div style={{marginTop:"-51px"}}>
                 <Typography style={{float:"right",fontSize:"20px"}} variant="h6">{user?.name.charAt(0).toUpperCase() + user?.name.slice(1).toLowerCase()}</Typography>
                 <Typography style={{float:"right"}} variant="caption">{user?.email}</Typography>
                 </div>
                </div>:null):null}
                <Divider style={!open?{marginTop:"45px"}:{marginTop:"0px"}}/>
                <List>
                    {['Home', 'Mobile', 'Broadband', 'Tech Products', 'My Cart'].map((text, index) => {
                        return (
                            
                            <Link className="tags" style={{ textDecoration: 'none', color: "black" }} to={links[index]}>
                                <ListItem button key={text}>
                                    <ListItemIcon>{index!=4?icons[index]:
                                    <Badge badgeContent={cart.length} color="primary">
                                        {icons[index]}
                                    </Badge>
                                    }</ListItemIcon>
                                    <ListItemText primary={text} />
                                </ListItem>
                            </Link>
                            
                        )

                    })}

                    {!token ? <GoogleLogin
                        clientId="107969636236-navdrh3p4eil5r5hf4ifr6hi8kcn7grv.apps.googleusercontent.com"
                        render={(renderProps) => (
                            <Link className="tags"
                                style={{ textDecoration: 'none', color: "black" }}
                                onClick={renderProps.onClick}>
                                <ListItem button key={"Google Sign In"}>
                                    <ListItemIcon><Icon /></ListItemIcon>
                                    <ListItemText primary={"Google Sign In"} />
                                </ListItem>
                            </Link>
                        )}
                        onSuccess={googleSuccess}
                        onFailure={googleError}
                        cookiePolicy="single_host_origin"
                    /> :
                        <Link className="tags"
                            style={{ textDecoration: 'none', color: "black" }}
                            onClick={()=>{
                                dispatch({type:actiontypes.LOGOUT})
                                window.location.reload();
                              }}
                        >
                            <ListItem button key={"Log out"}>
                                    <ListItemIcon><LockOpenIcon/></ListItemIcon>
                                    <ListItemText primary={"Log out"} />
                            </ListItem>
                        </Link>
                    }
                </List>
            </Drawer>
        {(open)?
            <div className={classes.toolbar} style={{position:"fixed",top:"45%",marginLeft:192,zIndex:"2000"}} >
                <IconButton onClick={handleDrawerClose} style={{color:"white",backgroundColor:"#a9c2ed", height: "30px", width: "30px",marginRight:"-20px"}}>
                    <ChevronLeftIcon />
                </IconButton>
            </div>
        :null}   
        </div>
    );
}