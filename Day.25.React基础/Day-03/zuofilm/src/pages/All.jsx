import React from 'react';
import Loading from "../components/Loading"
import Inform from "../components/Inform"
import store from "../store/index"
import Test from "../components/Test"
import {connect} from "react-redux"
import {setInforms,getInforms} from "../actions/informAction.js"
import {setLoading} from "../actions/loadingAction"

class All extends React.Component{
    constructor(props){
        super(props)
        this.state = {
          informNum:[],
          loading:false
        }
      }
    
    componentDidMount(){
        // store.dispatch(getInforms())
        this.props.getInforms()
    }
    render(){
        store.subscribe(()=>{
            this.setState({informNum:store.getState().inform
                            ,loading:store.getState().loading})
            // console.log(this.informNum)
        })
        return (
            <div>
                <h6 style={{"margin":"auto"}}>导航栏</h6>
                {/* <Test></Test> */}
                <Loading loading = {this.state.loading}></Loading>
                <Inform inform = {this.state.informNum}></Inform>
            </div>
          );
    }
}
// 把值映射成props中的属性，再把操作的方法也映射过来
export default connect((state=>({inform:state.inform,loading:state.loading})),{setInforms,getInforms,setLoading})(All)