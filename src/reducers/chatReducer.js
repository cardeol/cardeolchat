import { ActionTypes } from '../actions/actionTypes'
import { messageTypes } from './messageTypes';

/**
 * @summary Initial State for the chat
 */
const initState = () => {
    let m = [];
    return { 
        messages: m,  // Message Array
        unread: 0, // number of unread messages
        connection_state: false, // is socket connected ?
        mid: 0 // latest ID for the message array
    }
};

/**
 * 
 * @param {object} state Redux State
 * @param {object} action Action performed by the distpatcher
 */
const chatReducer = (state = initState(), action) => {    
    let newid = state.mid + 1;
    const MAX_MESSAGES_TO_DISPLAY = 20;
    if (action.type === ActionTypes.CLEAR_UNREAD) {
        return {
            ...state,
            unread: 0
        }
    }
    if(action.type === ActionTypes.CHAT_SEND_MESSAGE) {
        if(state.connection_state) {
            window.socket.emit("send_message", action); // dom mounted in app.js
            return state;
        }
        let ErrorMessage ={
            text: "Chat not connected",
            user: action.user,
            id: newid,
            timestamp: new Date().getTime(),
            type: messageTypes.WARNING_MESSAGE
        }
        return {
            ...state,
            mid: newid,
            messages:  [...state.messages.slice(1 - MAX_MESSAGES_TO_DISPLAY)
                        .filter((e) => e.type !== messageTypes.WARNING_MESSAGE), 
                        ErrorMessage ] 
        }
    }
    if (action.type === ActionTypes.IS_CONNECTED) {
        return {
            ...state,
            connection_state: action.connection_state
        }
    };
    if (action.type === ActionTypes.CHAT_RECEIVE_MESSAGE) {
        let newMessage = {
            text:       action.text,
            user:       action.user,
            timestamp : new Date().getTime(),
            id:         newid,
            type:       messageTypes.COMMON_MESSAGE
        }        
        return { // return only last 19 messages without warnings
            ...state,            
            mid: newid,
            unread: state.unread + 1,
            messages: [...state.messages.slice(1 - MAX_MESSAGES_TO_DISPLAY)
                       .filter((e) => e.type !== messageTypes.WARNING_MESSAGE),  
                       newMessage ]            
        }
    }

    return state;
}

export default chatReducer;