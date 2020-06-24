import React from 'react';

class Sub extends React.Component {
    render() {
        return (
            <div>
            {/* onClick需要传入一个函数，无论是箭头函数还是其他的 */}
                <button onClick={()=>this.props.sub()}>减1</button>
            </div>
        );
    }
}

export default Sub;