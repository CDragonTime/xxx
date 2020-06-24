import React from "react"
import Item from "../items/items"

export default class list extends React.Component {
    render() {
        let { comments,deleteCom } = this.props
        return (
            <div className="col-md-8">
                <h3 className="reply">评论回复：</h3>
                <h2 style={{display:comments.length === 0 ? "block":"none"}}>暂无评论，点击左侧添加评论！！！</h2>
                <ul className="list-group">
                    {comments.map((item)=>{
                        return <Item item={item} key={item.id} deleteCom = {deleteCom}></Item>
                    })}
                </ul>
            </div>

        )
    }
}