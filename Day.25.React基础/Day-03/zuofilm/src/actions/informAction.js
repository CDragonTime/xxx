import axios from "axios"
import {setLoading} from "./loadingAction"

export function setInforms (inform) {
    return {
        type : "SET_INFORMS",
        inform
    }
}

export function getInforms(){
    // 参数传多影响不大，多穿没有什么问题
    return function(dispatch,getState){
        const url = "http://localhost:9990/springboot/informController/selectAllInform"
        const url1 = "http://localhost:9990/springboot/guideController/selectAllGuide?pageNum=1&pageSize=12"
        dispatch(setLoading(true))
        axios.get(url1).then((result)=>{
            console.log(result.data)
            dispatch(setInforms(result.data.data))
            dispatch(setLoading(false))
        }).catch((error)=>{
            console.log(error)
            dispatch(setLoading(false))
        })
    }
}