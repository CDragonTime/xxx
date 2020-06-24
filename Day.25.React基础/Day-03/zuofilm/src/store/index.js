import { createStore,applyMiddleware,compose } from "redux"
import reducer from "../reducer/index"
import ThunkMiddleware from "redux-thunk"
let state = {
    loading:false,
    inform:[]
}
let strongCreateStore = 
applyMiddleware(ThunkMiddleware)(createStore)
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store =  strongCreateStore(reducer,state,composeEnhancers())

export default store;