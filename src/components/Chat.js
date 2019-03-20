import React from 'react'
import PropTypes from 'prop-types';
import Paper from "@material-ui/core/Paper";
import List from '@material-ui/core/List';
import { Actions } from '../actions/postActions';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import Messages from './Messages'
import Utils from '../lib/Utils';
import InputBox from './inputBox';
import { SocketContext } from '../hoc/SocketContext';

const styles = (theme) => ({
    toolbar: theme.mixins.toolbar    
});

/**
 * @summary Chat page connected to the redux store
 */
class Chat extends React.Component {

    static contextType = SocketContext; // socket passed as a local context from provider to this.context

    scrollDebounce = Utils.debounce(() => {  // avoid being called too many times at once
        var t = document.getElementById("_endChatNode");
        if(!t) return;
        var e = t.parentNode.parentNode;
        e.scrollTop = e.scrollHeight;                       
    },700);
       
    handleSubmit = (txt) => {
        if (txt === "") return false;
        let msg = {
            text: txt,
            user: this.props.settings.user_name
        };
        this.props.sendMessage(this.context, msg);
        this.scrollDebounce();       
        return false;
    }
        
    componentDidMount() {
        this.scrollDebounce();
        this.props.clearUnread();          
    }    
   
    componentDidUpdate(prevState) {
        this.scrollDebounce();
        this.props.clearUnread();             
    }

    
        
    render(props) {        
        
        const { classes } = this.props;
        const messagesOnEnter = this.props.settings.messages_on_enter;     
        return (
            <div className="ChatPage">
                <div className={classes.toolbar} />
                <Paper className="ChatContent">
                    <List>
                        <Messages messages={this.props.messages} settings={this.props.settings} />                        
                        <div id="_endChatNode" />
                    </List>
                </Paper>                          
                <div className="ChatFooter">           
                    <InputBox handleSubmit={this.handleSubmit} messagesOnEnter={messagesOnEnter} theme={this.props.settings.interface_theme} />                   
                </div>                
            </div>
        )
    }    
}

const mapStateToProps = (state, ownProps) => {
    return {
        settings: state.settingsReducer,
        messages: state.chatReducer.messages
    }    
}

const mapDispatchToProps = (dispatch) => {    
    return {
        saveSettings: (settings) => dispatch(Actions.saveSettings(settings)),
        sendMessage: (socket, message) => dispatch(Actions.sendMessage(socket, message)),
        clearUnread: () => dispatch(Actions.clearUnread())
    }
}

Chat.propTypes = {
    settings: PropTypes.object.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Chat));
//export default connect(mapStateToProps)(Chat);



