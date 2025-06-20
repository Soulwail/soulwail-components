import { Checkbox, Col, Form, Row, Typography } from 'antd';
import React, { useContext } from 'react';
import VisualizeContext from '../../context';
import { getTranslateZh } from '../../utils';

const { Text } = Typography;

const translate = getTranslateZh();

const ChartOption: React.FC = () => {
    const { layout } = useContext(VisualizeContext);

    return layout === 'feishu' ? (
        <>
            <Text>{translate[layout].chartOption}</Text>

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
        <Form.Item label={translate[layout].chartOption}>
            <Row gutter={[0, 8]}>
                {/* 暂时隐藏 */}
                <Form.Item name="showLegend" noStyle hidden valuePropName="checked">
                    <Checkbox>图例</Checkbox>
                </Form.Item>
                {/*<Col span={5}></Col>*/}
                <Col span={7}>
                    <Form.Item name="showLabel" noStyle valuePropName="checked">
                        <Checkbox>数据标签</Checkbox>
                    </Form.Item>
                </Col>
                {/* 暂时隐藏 */}
                <Form.Item name="showAxis" noStyle hidden valuePropName="checked">
                    <Checkbox>坐标轴</Checkbox>
                </Form.Item>
                {/*<Col span={6}></Col>*/}
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
