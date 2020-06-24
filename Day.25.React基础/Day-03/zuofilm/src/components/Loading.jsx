import React from 'react';

export default class Loading extends React.Component{
    constructor(props){
        super(props)
        this.state = {
          loading:false
        }
      }
      componentWillReceiveProps(prevProps){
        console.log(prevProps)
        this.setState({loading:prevProps.loading})
    }
    render(){
        return (
            <div>
                <h1>{this.state.loading? "正在加载···":null}</h1>
            </div>
          );
    }
}
