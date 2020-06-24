import React from 'react';

class Show extends React.Component{
    render() {
        return (
            <div>
            <h3>展示数值：{this.props.num}</h3>
            </div>
        );
    }
}

export default Show;