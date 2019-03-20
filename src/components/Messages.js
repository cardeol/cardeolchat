import React from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { format } from "date-fns";
import { messageTypes } from '../reducers/messageTypes'
import SnackbarContent from '@material-ui/core/SnackbarContent'
import { emojify } from 'react-emojione';
import WarningIcon from '@material-ui/icons/Warning'

/**
 * @summary Helper Module for link [href] parser
 * @method sanitizeLinks Replaces links with empty spaces
 * @method getFirstLink Link parser to return the first link found
 * @method isYoutube Check if the input string is a youtube link (basic implementation)
 * @method isImage Check if the given string is an image comparing with common extensions (png, gif, jpg)
 */
const LinkHelper = (() => {
    var global_reg = {
        EMAIL: /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/,
        WEB: /(https?:\/\/(?:www\.|(?!www))[^\s\.]+\.[^\s]{2,}|www\.[^\s]+\.[^\s]{2,})/,
        YOUTUBE: /http(?:s?):\/\/(?:www\.)?youtu(?:be\.com\/watch\?v=|\.be\/)([\w\-\_]*)(&(amp;)?‌​[\w\?‌​=]*)?/
    }

    return {
        sanitizeLinks: function (str) {
            var email_matches = str.match(new RegExp(global_reg.EMAIL, "gi"));
            if (email_matches && email_matches.length) {
                email_matches.map((e) => {
                    str = str.replace(e);
                });
            }
            var links = str.match(new RegExp(global_reg.WEB, "gi"));
            if (links && links.length) {
                links.map(e => {
                    str = str.replace(e, '');
                });
            }
            return emojify(str, { output: 'unicode', style: { width: 16, height: 16 } });

        },
        getFirstLink: (str) => {
            var match = str.match(new RegExp(global_reg.WEB, "gi"));
            if (!!match && match.length) return match[0].replace('watch?v=', 'embed/'); // youtube case
            match = str.match(new RegExp(global_reg.EMAIL, "gi"));
            if (!!match && match.length) return match[0];
            return "";
        },
        isYoutube: (link) => { 
            // TODO:  can be improved with a proper regex
            return !!link && link.indexOf("youtu") >= 0 && link.indexOf("http") >= 0;
        },
        isImage: (link) => {
            return !!link && (link.indexOf(".png") >= 0 || link.indexOf(".gif") >= 0 || link.indexOf(".jpeg") >= 0 || link.indexOf(".jpg") >= 0);
        }
    }
})();

/**
 * @summary Functional Compoment to display a message list for the chat container
 * @param {object} message message with (id, user timestamp, text) chatReducer
 * @param {settings} settings implemented in settingsReducer forwareded from Messages
 * @returns {JSX}
 */
const Message = ({ message, settings }) => {
    let { id, user, timestamp } = message;
    let link = LinkHelper.getFirstLink(message.text);  // getting only first link
    let text = LinkHelper.sanitizeLinks(message.text);
    let itsme = user === settings.user_name;
    let maincolor = message.type === messageTypes.WARNING_MESSAGE ? "#FF0000" : "#777777";
    const isYoutube = LinkHelper.isYoutube(link);
    const isImage = LinkHelper.isImage(link);
    let msg = (
        <div key={id} style={{ textAlign: itsme ? "right" : "left" }}>
            <Typography color="primary" variant="body2" style={{ display: "inline-block" }}>
                {itsme ? "" : user}
            </Typography>
            <Typography variant="caption" style={{ display: "inline-block" }}>
                {format(timestamp, settings.clock_display)}
            </Typography>
            <Typography style={{ color: maincolor }} variant="body1" paragraph>
                {text}
            </Typography>
            {(link.indexOf("http") >= 0) && !isYoutube ? ( // web
                <a target="_blank" href={link}>{link}</a>
            ) : null}
            {(link.indexOf("@") >= 0) ? ( // email
                <a target="_blank" href={"mailto:" + link}>{link}</a>
            ) : null}
            {isYoutube ? ( // youtube iframe
                <div className="yt_container">
                <iframe title={"video_" + id} src={link} className="yt_video"></iframe>
                </div>
            ) : null}
            {isImage ? ( // image
                <img alt={"image_" + id} src={link} style={{ width: "80%", height: "auto", marginLeft: "auto", marginRight: "auto" }} />
            ) : null}
        </div>
    )
    if (message.type === messageTypes.WARNING_MESSAGE) {
        msg = (
            <SnackbarContent key={id}
                aria-describedby="client-snackbar"
                style={{ backgroundColor: "red" }}
                message={
                    <span color="secondary" style={{ display: "block" }}>
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

/**
 * @param {Array} messages Message list coming from the reducer/service
 * @param {object} settings settings implemented in settings reducer
 * @returns {JSX}
 */
const Messages = ({ messages, settings }) => (
    <div>
        {messages.map(message => <Message key={message.id} message={message} settings={settings} />)}
    </div>
);

export default Messages;
