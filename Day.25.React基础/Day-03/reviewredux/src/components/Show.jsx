import React from "react"

export default class Show extends React.Component{
    render(){
        return(
            <div>
                <h3>展示计算数值:{this.props.num}</h3>
            </div>
        )
    }
}