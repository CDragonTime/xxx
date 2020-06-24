import React from 'react';

class Add extends React.Component{
    render() {
        return (
            <div>
                <button onClick={()=>this.props.add()}>加1</button>
            </div>
        );
    }
}

export default Add;