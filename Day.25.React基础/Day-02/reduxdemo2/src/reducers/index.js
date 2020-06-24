// 进行管理员的集合操作
import {combineReducers} from "redux"
import changeNumber from "./changeNumber"

const reducer = combineReducers(
    // 没有指定初始名
    {changeNumber}
)
export default reducer