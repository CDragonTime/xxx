import React from "react"
import Add from "../components/Add"
import Sub from "../components/Sub.jsx"
import Show from "../components/Show.jsx"
import AddAsync from "../components/AddAsync.jsx"
import AddForOne from "../components/AddForOne.jsx"
import store from "../store/index"
import { connect } from "react-redux"
import { increment, decrement,incrementAsync,incrementOne } from "../actions/createAction"

class Counter extends React.Component {
    componentDidMount() {
        console.log(store.getState())
    }
    render() {
        return (
            <div>
                <p>灵活组件Counter</p>
                <Show num = {this.props.num}></Show>
                <Add add = {this.props.increment}></Add>
                <Sub sub = {this.props.decrement}></Sub>
                <AddAsync add = {this.props.incrementAsync}></AddAsync>
                <AddForOne add = {this.props.incrementOne}></AddForOne>
            </div>
        )
    }
}

/* function mapStateToProps(state){
    return{     //把状态映射过来
        changeNumber:state.changeNumber
    }
} */
// 简化代码:let mapStateToProps = (state)=>({changeNumber:state.changeNumber})

/* function mapDispatchToProps(dispatch, action) {

} */
// 直接把actions的创建方法映射过来
export default connect(state => ({ num: state.numAction }), { increment, decrement,incrementAsync,incrementOne })(Counter)