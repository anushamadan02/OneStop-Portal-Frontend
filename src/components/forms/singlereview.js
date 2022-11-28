import React,{useState,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Typography, Avatar, ListItemAvatar, ListItemText, Divider, ListItem } from '@material-ui/core';

import * as api from '../../api/index'
import Rating from '@material-ui/lab/Rating';
import StarBorderIcon from '@material-ui/icons/StarBorder';
const useStyles = makeStyles((theme) => ({
    inline: {
        display: 'inline',
    },
}));

export default function Reviews({ singlerev }) {
    const classes = useStyles();
    const [userprofile, setUserprofile] = useState(null)
    useEffect(async () => {
        const { data } = await api.fetchuser(singlerev.user)
        setUserprofile(data)
    }, [])
    return (
        <>
            <ListItem alignItems="flex-start" style={{width:"200%"}} >
                <ListItemAvatar>
                    <Avatar alt={userprofile?.name} src={userprofile?.profileimage} />
                </ListItemAvatar>
                <ListItemText
                    primary={userprofile?.name}
                    secondary={
                        <React.Fragment>
                            <br></br>
                            <div style={{display:"flex"}}>
                            <Typography
                                component="span"
                                variant="body2"
                                className={classes.inline}
                                color="textPrimary"
                            >
                                Rating: 
                            </Typography>
                            <div style={{marginBottom:"-5px",marginLeft:"5px",marginTop:"-4px"}}>
                                    <Rating
                                        name="customized-empty"
                                        defaultValue={singlerev.stars}
                                        precision={0.5}
                                        emptyIcon={<StarBorderIcon fontSize="inherit" />}
                                        readOnly
                                    />
                            </div>
                            </div>
                            <br></br>
                            {singlerev.comment}
                        </React.Fragment>
                    }
                />
            </ListItem>
            <Divider variant="inset" component="li" />
        </>
    );
}
