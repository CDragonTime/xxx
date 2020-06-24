import { Card, WhiteSpace } from 'antd-mobile';
import 'antd-mobile/lib/tab-bar/style';

import React from 'react';

export default class Test extends React.Component {
    render() {
        return (
            <div>
                <WhiteSpace size="lg" />
                <Card full>
                    <Card.Header
                        title="This is title"
                        thumb="https://gw.alipayobjects.com/zos/rmsportal/MRhHctKOineMbKAZslML.jpg"
                        extra={<span>this is extra</span>}
                    />
                    <Card.Body>
                        <div>This is content of `Card`</div>
                    </Card.Body>
                    <Card.Footer content="footer content" extra={<div>extra footer content</div>} />
                </Card>
            </div>
        );
    }
}