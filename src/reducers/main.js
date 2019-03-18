import { combineReducers } from 'redux'

import chatReducer from './chatReducer'
import settingsReducer from './settingsReducer';

export default combineReducers({
    chatReducer,
    settingsReducer
})