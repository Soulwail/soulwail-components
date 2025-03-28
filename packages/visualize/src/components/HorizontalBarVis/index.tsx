import { Checkbox, Col, Form, Row, Segmented, Select, Typography } from 'antd';
import React, { useContext } from 'react';
import { KeywordSearch } from '../';
import VisualizeContext from '../../context';

const { Text } = Typography;

const HorizontalBarVis: React.FC = () => {
    const { categoryList = [], colorCategoryList = [] } = useContext(VisualizeContext);

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

            <Form.Item
                label="纵轴（聚合字段）"
                name={['encode', 'x']}
                rules={[{ required: true, message: '请选择纵轴字段' }]}
            >
                <Select options={categoryList} placeholder="请选择" />
            </Form.Item>

            <KeywordSearch />

            <Form.Item label={<Text type="secondary">排序依据</Text>} name={['transform', 'sortX', 'by']}>
                <Segmented
                    block
                    options={[
                        { label: '纵轴值', value: 'x' },
                        { label: '横轴值', value: 'y' },
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

            <Form.Item label={<Text type="secondary">展示数量</Text>} name={['transform', 'sortX', 'slice']}>
                <Segmented
                    block
                    options={[
                        { label: 'TOP 10', value: 10 },
                        { label: 'TOP 20', value: 20 },
                        { label: '不限制', value: Infinity },
                    ]}
                />
            </Form.Item>

            <Form.Item name="encodeColor" valuePropName="checked" style={{ marginBottom: '16px' }}>
                <Checkbox>分组聚合</Checkbox>
            </Form.Item>

            <Form.Item noStyle dependencies={['encodeColor']}>
                {({ getFieldValue }) => {
                    const encodeColor = getFieldValue('encodeColor');

                    return encodeColor ? (
                        <>
                            <Form.Item
                                label={null}
                                name={['encode', 'color']}
                                style={{ margin: '-8px 0 16px' }}
                                rules={[{ required: true, message: '请选择聚合字段' }]}
                            >
                                <Select options={colorCategoryList} />
                            </Form.Item>

                            <KeywordSearch
                                searchName="keywordSearchColor"
                                k1={['searchColor', 'compare']}
                                k2={['searchColor', 'keyword']}
                            />
                        </>
                    ) : null;
                }}
            </Form.Item>

            <Form.Item label="横轴（聚合方式）" name={['encode', 'y']}>
                <Select options={[{ label: '统计总数', value: 'count' }]} disabled />
            </Form.Item>
        </>
    );
};

export { HorizontalBarVis };
