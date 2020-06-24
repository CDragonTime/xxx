import React from 'react';
import Add from "./components/add/add"
import List from "./components/list/list"

//使用函数添加不了状态
class App extends React.Component {
  state = {
    comments: [
      { id: "001", name: "旺财", content: "我觉得还行" },
      { id: "002", name: "小强", content: "太难了" },
      { id: "003", name: "赵六", content: "有vue基础，学着可以" },
    ]
  }
  addComment = (comment1) => {
    let comment = this.state.comments;
    // let comment = [...this.state.comments];
    console.log(this.state.comments)
    console.log("-----------------")
    console.log([...this.state.comments])
    comment.unshift(comment1)
    this.setState(comment)
  }
  deleteCom = (id) => {
    // let comment = [...this.state.comments]
    let comment = this.state.comments
    console.log(this.state.comments)
    console.log("-----------------")
    console.log([...this.state.comments])
    let index = comment.findIndex((item) => {return id == item.id })
    comment.splice(index,1);
    this.setState(comment)
  }
  render() {
    let { comments } = this.state;
    return (
      <div>
        <header className="site-header jumbotron">
          <div className="container">
            <div className="row">
              <div className="col-xs-12">
                <h1>请发表对React的评论</h1>
              </div>
            </div>
          </div>
        </header>
        <div className="container">
          <Add addComment={this.addComment}></Add>
          <List comments={comments} deleteCom={this.deleteCom}></List>
        </div>
      </div>
    );
  }
}

export default App;
