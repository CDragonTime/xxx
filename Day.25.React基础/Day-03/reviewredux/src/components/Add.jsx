import React from "react"

export default class Add extends React.Component{
    render(){
        return(
            <button onClick={()=>{this.props.add()}}>
                +
            </button>
        )
    }
}
