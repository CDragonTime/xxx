export function increment(){
    return{
        type:"INCREMENT"
    }
}

export function decrement(){
    return{
        type:"DECREMENT"
    }
}

export function incrementAsync(){
    // 增强后就可以返回一个函数
    return function(dispatch,getState){
        // 异步操作写在此处
        setTimeout(()=>{
            console.log("!!!!!!")
            dispatch(increment())
        },3000)
    }
}

export function incrementOne(){
    // 增强后就可以返回一个函数
    return function(dispatch,getState){
        // 同步逻辑代码也可以写与此,getState是方法
        let {numAction} = getState()
        // console.log((numAction))
        if(!(numAction%2)){
            dispatch(increment())
        }
    }
}