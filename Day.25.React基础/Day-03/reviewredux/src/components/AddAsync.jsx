import React from "react"

export default class AddAsync extends React.Component{
    render(){
        return(
            <button onClick={()=>{
                setTimeout(()=>{
                    console.log("??????")
                    this.props.add()
                },1000)
            }}>
                异步++
            </button>
        )
    }
}
