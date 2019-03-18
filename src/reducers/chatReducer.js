import { ActionTypes } from '../actions/actionTypes'
import { messageTypes } from './messageTypes';

const initState = () => {
    let m = [];
    return { 
        messages: m,
        unread: 0,
        connection_state: false,
        mid: 0
    }
};


const chatReducer = (state = initState(), action) => {    
    let newid = state.mid + 1;
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
            messages: [...state.messages, ErrorMessage]
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
            messages: [...state.messages.slice(-19).filter((e) => e.type !== messageTypes.WARNING_MESSAGE) , newMessage ]            
        }
    }

    return state;
}

export default chatReducer;