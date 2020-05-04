import playReducer from './playReducer'
import optionReducer from './optionReducer'
import optionListReducer from './optionListReducer'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
    play: playReducer,
    option: optionReducer,
    optionList: optionListReducer
});

export default rootReducer