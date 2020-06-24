import React from 'react';
import uuid from "uuid"
// 没有写样式，不过还是能引入
import "./add.css"

let add = class Add extends React.Component {
  add = () => {
    let addComment = this.props.addComment;
    let name = this.refs.name.value;
    let content = this.content.value
    if( !name.trim() || !content.trim()){
      alert("名字和评论内容不能为空")
      return
  }
    addComment({id:uuid,name,content})
  }

  render() {
    return (
      <div className="col-md-4">
        <form className="form-horizontal">
          <div className="form-group">
            <label>用户名</label>
            <input type="text" className="form-control" ref="name" placeholder="用户名" />
          </div>
          <div className="form-group">
            <label>评论内容</label>
            <textarea className="form-control" rows="6" ref={content=>{this.content = content}} placeholder="评论内容"></textarea>
          </div>
          <div className="form-group">
            <div className="col-sm-offset-2 col-sm-10">
              <button type="button" className="btn btn-default pull-right" onClick={this.add}>提交</button>
            </div>
          </div>
        </form>
      </div>
    )
  }
}
export default add;