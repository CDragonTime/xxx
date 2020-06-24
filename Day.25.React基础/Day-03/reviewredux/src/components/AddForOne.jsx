import React from "react"

export default class AddForOne extends React.Component{
    render(){
        return(
            <button onClick={()=>{
                this.props.add()
            }}>
            偶数可以+
            </button>
        )
    }
}
