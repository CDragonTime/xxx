import { createStore,applyMiddleware,compose } from "redux"
import reducer from "../reducer/index"
// 使用中间件进行增强
import ThunkMiddleware from "redux-thunk"
let state = {
    // 这里的名称需要和管理员的reducer名字相同
    numAction:60
}

// 增强仓库，使其能派发异步的action 
let strongCreateStore =  applyMiddleware(ThunkMiddleware)(createStore)

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// 使用增强后的创建仓库
const store =  strongCreateStore(reducer,state,composeEnhancers())

export default store;