import { Checkbox, Col, Form, Row, Typography } from 'antd';
import React, { useContext } from 'react';
import VisualizeContext from '../../context';

const { Text } = Typography;

const ChartOption: React.FC = () => {
    const { layout } = useContext(VisualizeContext);

    return layout === 'feishu' ? (
        <>
            <Text>图表选项</Text>

            <Row gutter={[0, 8]} style={{ margin: '12px 0 24px' }}>
                <Col span={12}>
                    <Form.Item name="showLegend" noStyle valuePropName="checked">
                        <Checkbox>图例</Checkbox>
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item name="showLabel" noStyle valuePropName="checked">
                        <Checkbox>数据标签</Checkbox>
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item name="showAxis" noStyle valuePropName="checked">
                        <Checkbox>坐标轴</Checkbox>
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item name="showGrid" noStyle valuePropName="checked">
                        <Checkbox>网格线</Checkbox>
                    </Form.Item>
                </Col>
            </Row>
        </>
    ) : (
        <Form.Item label="图表选项">
            <Row gutter={[0, 8]}>
                <Col span={5}>
                    <Form.Item name="showLegend" noStyle valuePropName="checked">
                        <Checkbox>图例</Checkbox>
                    </Form.Item>
                </Col>
                <Col span={7}>
                    <Form.Item name="showLabel" noStyle valuePropName="checked">
                        <Checkbox>数据标签</Checkbox>
                    </Form.Item>
                </Col>
                <Col span={6}>
                    <Form.Item name="showAxis" noStyle valuePropName="checked">
                        <Checkbox>坐标轴</Checkbox>
                    </Form.Item>
                </Col>
                <Col span={6}>
                    <Form.Item name="showGrid" noStyle valuePropName="checked">
                        <Checkbox>网格线</Checkbox>
                    </Form.Item>
                </Col>
            </Row>
        </Form.Item>
    );
};

export { ChartOption };
