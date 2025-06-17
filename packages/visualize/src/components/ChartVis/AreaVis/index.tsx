import { Form, Select, Typography } from 'antd';
import React, { useContext } from 'react';
import VisualizeContext from '../../../context';
import { ChartAreaShape, ChartGroupAgg, ChartOption, KeywordSearch } from '../../index';

const { Text } = Typography;

const AreaVis: React.FC = () => {
    const {
        layout,
        formProps: { categoryList = [] },
    } = useContext(VisualizeContext);

    return (
        <>
            {layout === 'feishu' ? (
                <>
                    <ChartAreaShape />
                    <ChartOption />
                </>
            ) : null}

            <Form.Item label="横轴（聚合字段）" name={['encode', 'x']}>
                <Select options={[{ label: '时间', value: 'time' }]} disabled />
            </Form.Item>

            <Form.Item label="纵轴（聚合方式）" name={['encode', 'y']}>
                <Select options={[{ label: '统计总数', value: 'count' }]} disabled />
            </Form.Item>

            <ChartGroupAgg />

            <Form.Item noStyle dependencies={['encodeColor']}>
                {({ getFieldValue }) => {
                    const encodeColor = getFieldValue('encodeColor');

                    return encodeColor ? (
                        <>
                            <Form.Item
                                label={layout === 'feishu' ? null : '分组聚合字段'}
                                name={['encode', 'color']}
                                style={layout === 'feishu' ? { margin: '-8px 0 16px' } : {}}
                                rules={[{ required: true, message: '请选择聚合字段' }]}
                            >
                                <Select options={categoryList} placeholder="请选择" />
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

const AreaDetailVis: React.FC = () => {
    return (
        <>
            <ChartAreaShape />
            <ChartOption />
        </>
    );
};

export { AreaDetailVis, AreaVis };
