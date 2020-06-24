import {createStore} from "redux"
// 导入管理员
import reducer from "../reducers/index"

const initNumber = {
    numAction : 20
}

// 导出仓库
let store = createStore(reducer,initNumber,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

export default store