import { ActionTypes } from './actionTypes'

export const Actions = {
    hasBeenConnected(b) {
        return {
            type: ActionTypes.IS_CONNECTED,
            connection_state: b
        }        
    },
    clearUnread: () => {
        return {
            type: ActionTypes.CLEAR_UNREAD
        }
    },
    resetToDefault: () => {
        return {
            type: ActionTypes.RESET_TO_DEFAULTS
        }
    },    
    saveSettings: (newsettings) => {
        return {
            type: ActionTypes.SAVE_SETTINGS,
            settings: newsettings
        }
    },
    sendMessage: (socket, message)  => {        
        socket.emit("send_message", message); // dom mounted in app.js
        return {
            ...message,
            type: ActionTypes.CHAT_SEND_MESSAGE,
        }
    },
    receiveMessage: (message) => {
        return {
            ...message,
            type: ActionTypes.CHAT_RECEIVE_MESSAGE,
        }
    }

}
