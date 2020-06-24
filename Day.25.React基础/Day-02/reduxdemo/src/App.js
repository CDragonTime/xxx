import React from 'react';
import {createDecrementAction,createIncrementAction} from "./redux/action-creators.js"

class App extends React.Component {
  state = {
    num : 1,
    showNumber:0
  }
  componentDidMount(){
    console.log("测试是否成功：")
    console.dir(this.props.store.getState().number)
    // console.log(this.refs.selection.value)
  }
  
  addNumber = ()=>{
    // console.log(createIncrementAction(this.state.num))
    this.props.store.dispatch(createIncrementAction(this.state.num*1))
  }
  redNumber = ()=>{
    // console.log(this.props.store.dispatch)
    // console.log(this.props.store.getState())
    this.props.store.dispatch(createDecrementAction(this.state.num*1))
  }
  handleChange = (event)=>{
    this.setState({
      num:event.target.value
    })
  }
  render(){
    this.props.store.subscribe(()=>{
      // alert("监听数据变化需要订阅");
      this.setState({
        showNumber:this.props.store.getState().number
      })
    })
    return (
      <div>
        <select ref="selection" onChange={(event)=>{this.handleChange(event)}}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
        </select>
        <h1>测试数据{this.state.showNumber}</h1>
        <button onClick={this.addNumber}>同步加{this.state.num}</button>
        <button onClick={this.redNumber}>同步减{this.state.num}</button>
      </div>
    );
  }
}

export default App;
