import { Checkbox, Col, Form, Row, Select, Typography } from 'antd';
import React, { useContext } from 'react';
import VisualizeContext from '../../context';
import { KeywordSearch } from '../';

const { Text } = Typography;

const LineVis: React.FC = () => {
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

            {/* 表单中用 color 表示横轴，实际转换后为 x 轴 */}
            <Form.Item label="横轴（聚合字段）" name={['encode', 'color']}>
                <Select options={[{ label: '时间', value: 'time' }]} disabled />
            </Form.Item>

            <Form.Item label="纵轴（聚合方式）" name={['encode', 'y']}>
                <Select options={[{ label: '统计总数', value: 'count' }]} disabled />
            </Form.Item>

            {/* 表单中用 x 表示分组聚合，实际转换后为 color 轴 */}
            <Form.Item label="分组聚合" name={['encode', 'x']} rules={[{ required: true, message: '请选择聚合字段' }]}>
                <Select options={categoryList} />
            </Form.Item>

            <KeywordSearch />

            {/*<Form.Item label={<Text type="secondary">排序依据</Text>} name={['transform', 'sortX', 'by']}>*/}
            {/*    <Segmented*/}
            {/*        block*/}
            {/*        options={[*/}
            {/*            { label: '横轴值', value: 'x' },*/}
            {/*            { label: '纵轴值', value: 'y' },*/}
            {/*        ]}*/}
            {/*    />*/}
            {/*</Form.Item>*/}

            {/*<Form.Item label={<Text type="secondary">排序规则</Text>} name={['transform', 'sortX', 'reverse']}>*/}
            {/*    <Segmented*/}
            {/*        block*/}
            {/*        options={[*/}
            {/*            { label: '正序', value: false },*/}
            {/*            { label: '倒序', value: true },*/}
            {/*        ]}*/}
            {/*    />*/}
            {/*</Form.Item>*/}
        </>
    );
};

export { LineVis };
