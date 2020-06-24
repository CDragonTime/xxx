// 引入常量
import {INCREMENT,DECREMENT} from "./action-type.js"

export const createIncrementAction = (value)=>{
    return {type:INCREMENT,data:value}
}
export const createDecrementAction = (value)=>{
    return {type:DECREMENT,data:value}
}