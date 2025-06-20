import { Form, Select } from 'antd';
import React, { useContext } from 'react';
import VisualizeContext from '../../../context';
// import { PieChartTypes } from '../../utils/collections';
import { getTranslateZh } from '../../../utils';
import {
    ChartDisplayQuantity,
    ChartPieOption,
    ChartPieSortingRules,
    ChartSortingRules,
    KeywordSearch,
} from '../../index';

const translate = getTranslateZh();

const PieVis: React.FC = () => {
    const {
        layout,
        formProps: { categoryList = [] },
    } = useContext(VisualizeContext);

    return (
        <>
            {layout === 'feishu' ? <ChartPieOption /> : null}

            <Form.Item
                label={translate[layout].pieXAxis}
                name={['encode', 'x']}
                rules={[{ required: true, message: '请选择' + translate[layout].pieXAxis }]}
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

            <Form.Item label={translate[layout].pieYAxis} name={['encode', 'y']}>
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
