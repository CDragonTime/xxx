import React from 'react';
import Counter from "./pages/Counter.jsx"

class App extends React.Component{
  render(){
    return (
      <div>
        <h1>本层不提供智能组件</h1>
        <h1>{this.props.store}</h1>
        <Counter></Counter>
      </div>
    );
  }
}

export default App;
