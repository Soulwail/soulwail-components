import { Checkbox, Col, Form, Row, Typography } from 'antd';
import React from 'react';

const { Text } = Typography;

const YAxis: React.FC = () => {
    return (
        <>
            <Text>坐标轴选项</Text>

            <Row style={{ margin: '12px 0 0' }}>
                <Col span={12}>
                    <Form.Item name={['axis', 'y', 'label']} noStyle valuePropName="checked">
                        <Checkbox>显示标签</Checkbox>
                    </Form.Item>
                    <Form.Item name={['axis', 'y', 'tick']} hidden valuePropName="checked">
                        <Checkbox>显示刻度线</Checkbox>
                    </Form.Item>
                </Col>
            </Row>
        </>
    );
};

export { YAxis };
