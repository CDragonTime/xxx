import React from "react"
export default class item extends React.Component {
    deleteComm = (id)=>{
        let {deleteCom} = this.props
        if(window.confirm("你确定要删除吗？")){
            deleteCom(id)
        }
    }
    render() {
        let { item} = this.props
        return (
            <li className="list-group-item">
            <div className="handle">
              <a href="#" onClick = {()=>{this.deleteComm(item.id)}}>删除</a>
            </div>
            <p className="user"><span >{item.name}</span><span>说:</span></p>
            <p className="centence">{item.content}</p>
          </li>

        )
    }
}