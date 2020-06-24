//  引入仓库
import {createStore} from "redux"

import reducer from "./reducer"

// 导出仓库并指定管理员
export default createStore(reducer,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())