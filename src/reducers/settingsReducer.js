import { ActionTypes } from '../actions/actionTypes'

/** 
 * @summary Default state for settings
 */
const defaultState = () => {
    return {
        socket_server: 'http://localhost:8082',
        user_name: "guest" + Math.floor(Math.random()*10000 + 1000),
        interface_theme: "light",
        clock_display: "HH:mm",
        messages_on_enter: true,
        language: 'en'
    }
}

/**
 * @summary Reducer to handle Settings State, mapped into Redux and persistent in localStorage
 */
const settingsReducer = (state = defaultState(), action) => {
    if (action.type === ActionTypes.RESET_TO_DEFAULTS) {
        var user = state.user_name;
        let initState = defaultState();
        return {            
            ...state,   // set previous state
            ...initState, // override with default state
            messages: [],
            user_name: user // override previous saved user
        }
    }

    if (action.type ===  ActionTypes.SAVE_SETTINGS) {
        return {
            ...state,
            ...action.settings
        }
    }

    return state;
}

export default settingsReducer;