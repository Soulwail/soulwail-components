import { Form, Select, Typography } from 'antd';
import React, { useContext } from 'react';
import VisualizeContext from '../../../context';
// import { PieChartTypes } from '../../utils/collections';
import {
    ChartDisplayQuantity,
    ChartPieOption,
    ChartPieSortingRules,
    ChartSortingRules,
    KeywordSearch,
} from '../../index';

const { Text } = Typography;

const PieVis: React.FC = () => {
    const {
        layout,
        formProps: { categoryList = [] },
    } = useContext(VisualizeContext);

    return (
        <>
            {layout === 'feishu' ? <ChartPieOption /> : null}

            <Form.Item
                label="扇区分组（聚合字段）"
                name={['encode', 'x']}
                rules={[{ required: true, message: '请选择扇区分组' }]}
            >
                <Select options={categoryList} />
            </Form.Item>

            <KeywordSearch />

            {layout === 'feishu' ? (
                <>
                    <ChartPieSortingRules />
                    <ChartSortingRules />
                    <ChartDisplayQuantity />
                </>
            ) : null}

            <Form.Item label="扇区数值（聚合方式）" name={['encode', 'y']}>
                <Select options={[{ label: '统计总数', value: 'count' }]} disabled />
            </Form.Item>
        </>
    );
};

const PieDetailVis: React.FC = () => {
    return (
        <>
            <ChartPieOption />
            <ChartPieSortingRules />
            <ChartSortingRules />
            <ChartDisplayQuantity />
        </>
    );
};

export { PieDetailVis, PieVis };
