import React from 'react';
import {connect} from "react-redux"
import {setInforms,getInforms} from "../actions/informAction.js"
import {setLoading} from "../actions/loadingAction"

class All extends React.Component{
    constructor(props){
        super(props)
        this.state = {
          informNum:[]
        }
      }
      componentWillReceiveProps(prevProps){
        console.log(prevProps)
        this.setState({informNum:prevProps.inform})
    }
    render(){
        return (
            <div>
                <ul>
                    {this.state.informNum && this.state.informNum.map((inform,index)=>
                        <li key={inform.id}>
                            {/* <h3>{inform.informTitle}</h3>
                            <p>{inform.informContent}</p>
                            <p>{inform.createTime}</p> */}
                            <div>{inform.guideTitle}</div>
                            <div>{inform.guideCreateuser}</div>
                            <div dangerouslySetInnerHTML = {{ __html:inform.guideContent }} style={{"width":"100%","overflow":"hidden","marginRight":"3px"}}></div>
                            <div>{inform.createTime}</div>
                        </li>
                    )}
                </ul>
            </div>
          );
    }
}
// 把值映射成props中的属性，再把操作的方法也映射过来
export default connect((state=>({inform:state.inform,loading:state.loading})),{setInforms,getInforms,setLoading})(All)