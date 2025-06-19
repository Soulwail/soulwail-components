import { Checkbox, Col, Form, Row, Typography } from 'antd';
import React, { useContext } from 'react';
import VisualizeContext from '../context';

const { Text } = Typography;

const XAxis: React.FC = () => {
    const { layout } = useContext(VisualizeContext);

    return (
        <>
            {layout !== 'feishu' ? null : <Text>坐标轴选项</Text>}

            <Row style={{ margin: '12px 0 0' }}>
                <Col span={12}>
                    <Form.Item
                        hidden={layout !== 'feishu'}
                        name={['axis', 'x', 'label']}
                        noStyle
                        valuePropName="checked"
                    >
                        <Checkbox>显示标签</Checkbox>
                    </Form.Item>
                    <Form.Item name={['axis', 'x', 'tick']} hidden valuePropName="checked">
                        <Checkbox>显示刻度线</Checkbox>
                    </Form.Item>
                </Col>
            </Row>
        </>
    );
};

export { XAxis };
