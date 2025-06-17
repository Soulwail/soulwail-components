import { Checkbox, Col, Form, Row, Typography } from 'antd';
import { useContext } from 'react';
import VisualizeContext from '../../context';

const { Text } = Typography;

const ChartPieOption = () => {
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

                {/*<Form.Item dependencies={['chartType']} noStyle>*/}
                {/*    {({ getFieldValue }) => {*/}
                {/*        const [, subType] = getFieldValue('chartType').split('_');*/}

                {/*        return subType === PieChartTypes.RING ? (*/}
                {/*            <Col span={12}>*/}
                {/*                <Form.Item name="showTotal" noStyle valuePropName="checked">*/}
                {/*                    <Checkbox>总数</Checkbox>*/}
                {/*                </Form.Item>*/}
                {/*            </Col>*/}
                {/*        ) : null;*/}
                {/*    }}*/}
                {/*</Form.Item>*/}
            </Row>
        </>
    ) : (
        <>
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
                </Row>
            </Form.Item>
        </>
    );
};

export { ChartPieOption };
