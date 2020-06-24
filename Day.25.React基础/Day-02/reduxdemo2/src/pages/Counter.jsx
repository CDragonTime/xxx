import React from 'react';
// import {connect} from 'react-redux'
import {connect} from "react-redux"
import {bindActionCreators} from "redux"
import * as actions from "../actions/createActions"

import Add from "../components/Add"
import Show from "../components/Show"
import Sub from "../components/Sub"

class Counter extends React.Component{
    componentDidMount(){
        console.log(this.props.addNumber)
    }
    render() {
        return (
            <div>
            <Show num = {this.props.counter}></Show>
            <Add add = {this.props.addNumber}/>
            <Sub sub = {this.props.subNumber}/>
            </div>
        );
    }
}

// state 只有这个组件得到store，才能拿到state
function mapStateToProps(state){
    console.log(state)  // 把state映射到组件的props
    return{
        counter:state.changeNumber
    }
}
// dispatch 只有这个组件得到store，才能拿到dispatch
function mapDispatchToProps(dispatch){ 
    // console.log(dispatch)  
    return bindActionCreators(actions,dispatch)
}

// 这么写，Counter组件就变成了智能组件
// 仓库中的状态和方法作为组件的props来使用的
export default connect(mapStateToProps,mapDispatchToProps)(Counter)