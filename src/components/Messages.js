import React from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { format } from "date-fns";
import { messageTypes } from '../reducers/messageTypes'
import SnackbarContent from '@material-ui/core/SnackbarContent'
import { emojify } from 'react-emojione';
import WarningIcon from '@material-ui/icons/Warning'

const getLinks = (str) => { // extract links using a regex
    var expression = /(https?:\/\/(?:www\.|(?!www))[^\s\.]+\.[^\s]{2,}|www\.[^\s]+\.[^\s]{2,})/gi;
    var matches = str.match(expression);
    if(!matches) return "";
    return matches[0].replace('watch?v=', 'embed/');    
}

const Message = ({ message, settings }) => {
    let {
        id,
        user,
        timestamp,
        text        
    } = message;        
    let link = getLinks(text);  // getting only first link
    if(link.length > 0) {
        text = text.replace(link,"");
    }
    let itsme = user === settings.user_name;            
    let maincolor = message.type === messageTypes.WARNING_MESSAGE ? "red" : "#777777";    
    let msg = (<div key={id} className="" style={{ textAlign: itsme ? "right" : "left" }}>
        <Typography color="primary" variant="body2" style={{ display: "inline-block" }}>
            {itsme ? "" : user}
        </Typography>
        <Typography variant="caption" style={{ display: "inline-block" }}>
            {format(timestamp, settings.clock_display)}
        </Typography>
        <Typography style={{ color: maincolor }} variant="body1" paragraph>
            {emojify(text, { output : 'unicode', style: { width: 16, height: 16 } })}
        </Typography>
        {(link.indexOf("http") >= 0) ? (
            <a href={link}>{link}</a>
        ) : null}
        {(link.indexOf("youtu") >= 0) ? (
            <iframe src={link} style={{ width: "80%", height: "auto", marginLeft: "auto", marginRight: "auto"}}></iframe>
        ) : null}
        {(link.indexOf(".png") >= 0) || link.indexOf(".gif") >= 0 || link.indexOf(".jpeg") >= 0 || link.indexOf(".jpg") >= 0 ? (
            <img src={link} style={{ width: "80%", height: "auto", marginLeft: "auto", marginRight: "auto" }} />
        ) : null}
    </div>)
    if(message.type === messageTypes.WARNING_MESSAGE) {
        msg = (
            <SnackbarContent key={id}
                aria-describedby="client-snackbar"
                style={{ backgroundColor : "red" }}
                message={
                    <span id="client-snackbar" color="secondary" style={{ display: "block"}}>
                        <WarningIcon />
                        <span style={{ paddingLeft: 10 }}>{text}</span>
                    </span>
                }                
            />
        )
    }

    return (
        <Grid container style={{ width: "100%", display: "block" }}>
            {msg}            
        </Grid>

    );
};


const Messages = ({ messages, settings }) => (
    <div>        
        {messages.map(message => <Message key={message.id} message={message} settings={settings} />)}        
    </div>
);



export default Messages;
