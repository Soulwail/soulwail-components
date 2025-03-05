import { Checkbox, Col, Form, Row, Segmented, Select, Typography } from 'antd';
import React, { useContext } from 'react';
import VisualizeContext from '../../context';
import { PieChartTypes } from '../../utils/collections';
import { KeywordSearch } from '../';

const { Text } = Typography;

const PieVis: React.FC = () => {
    const { categoryList = [] } = useContext(VisualizeContext);

    return (
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

                <Form.Item dependencies={['chartType']} noStyle>
                    {({ getFieldValue }) => {
                        const [, subType] = getFieldValue('chartType').split('_');

                        return subType === PieChartTypes.RING ? (
                            <Col span={12}>
                                <Form.Item name="showTotal" noStyle valuePropName="checked">
                                    <Checkbox>总数</Checkbox>
                                </Form.Item>
                            </Col>
                        ) : null;
                    }}
                </Form.Item>
            </Row>

            <Form.Item
                label="扇区分组（聚合字段）"
                name={['encode', 'x']}
                rules={[{ required: true, message: '请选择扇区分组' }]}
            >
                <Select options={categoryList} />
            </Form.Item>

            <KeywordSearch />

            <Form.Item label={<Text type="secondary">排序依据</Text>} name={['transform', 'sortX', 'by']}>
                <Segmented
                    block
                    options={[
                        { label: '扇区字段值', value: 'x' },
                        { label: '扇区数值', value: 'y' },
                    ]}
                />
            </Form.Item>

            <Form.Item label={<Text type="secondary">排序规则</Text>} name={['transform', 'sortX', 'reverse']}>
                <Segmented
                    block
                    options={[
                        { label: '正序', value: false },
                        { label: '倒序', value: true },
                    ]}
                />
            </Form.Item>

            <Form.Item label="扇区数值（聚合方式）" name={['encode', 'y']}>
                <Select options={[{ label: '统计总数', value: 'count' }]} disabled />
            </Form.Item>
        </>
    );
};

export { PieVis };
