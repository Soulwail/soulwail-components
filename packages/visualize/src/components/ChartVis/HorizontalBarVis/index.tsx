import { Form, Select } from 'antd';
import React, { useContext } from 'react';
import VisualizeContext from '../../../context';
import {
    ChartDisplayQuantity,
    ChartGroupAgg,
    ChartOption,
    ChartSortBy,
    ChartSortingRules,
    KeywordSearch,
} from '../../index';

const HorizontalBarVis: React.FC = () => {
    const {
        layout,
        formProps: { categoryList = [], colorCategoryList = [] },
    } = useContext(VisualizeContext);

    return (
        <>
            {layout === 'feishu' ? <ChartOption /> : null}

            <Form.Item
                label="纵轴（聚合字段）"
                name={['encode', 'x']}
                rules={[{ required: true, message: '请选择纵轴字段' }]}
            >
                <Select options={categoryList} placeholder="请选择" />
            </Form.Item>

            <KeywordSearch />

            {layout === 'feishu' ? (
                <>
                    <ChartSortBy />
                    <ChartSortingRules />
                    <ChartDisplayQuantity />
                </>
            ) : null}

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

const HorizontalDetailBarVis: React.FC = () => {
    return (
        <>
            <ChartOption />
            <ChartSortBy />
            <ChartSortingRules />
            <ChartDisplayQuantity />
        </>
    );
};

export { HorizontalBarVis, HorizontalDetailBarVis };
