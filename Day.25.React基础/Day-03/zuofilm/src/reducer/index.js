import { combineReducers } from "redux"
import inform from "./informReducer.js"
import loading from "./loadingReducer.js"

export default combineReducers({
    inform,
    loading
})