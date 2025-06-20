import { Form, Select } from 'antd';
import React, { useContext } from 'react';
import VisualizeContext from '../../../context';
import { getTranslateZh } from '../../../utils';
import { ChartGroupAgg, ChartOption, KeywordSearch } from '../../index';

const translate = getTranslateZh();

const LineVis: React.FC = () => {
    const {
        layout,
        formProps: { categoryList = [] },
    } = useContext(VisualizeContext);

    return (
        <>
            {layout === 'feishu' ? <ChartOption /> : null}

            <Form.Item label={translate[layout].xAxis} name={['encode', 'x']}>
                <Select options={[{ label: '时间', value: 'time' }]} disabled />
            </Form.Item>

            <Form.Item label={translate[layout].yAxis} name={['encode', 'y']}>
                <Select options={[{ label: '统计总数', value: 'count' }]} disabled />
            </Form.Item>

            <ChartGroupAgg />

            <Form.Item noStyle dependencies={['encodeColor']}>
                {({ getFieldValue }) => {
                    const encodeColor = getFieldValue('encodeColor');

                    return encodeColor ? (
                        <>
                            <Form.Item
                                label={layout === 'feishu' ? null : '聚合字段'}
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

const LineDetailVis: React.FC = () => {
    return <ChartOption />;
};

export { LineDetailVis, LineVis };
