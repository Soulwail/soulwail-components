import { Form, Select } from 'antd';
import React, { useContext } from 'react';
import { KeywordSearch } from '../../';
import VisualizeContext from '../../../context';

const StatisticCardVis: React.FC = () => {
    const {
        formProps: { categoryList = [] },
    } = useContext(VisualizeContext);

    return (
        <>
            <Form.Item label="聚合字段" name={['encode', 'x']}>
                <Select allowClear options={categoryList} placeholder="请选择" />
            </Form.Item>

            <Form.Item noStyle dependencies={['encode', 'x']}>
                {({ getFieldValue }) => {
                    const encodeX = getFieldValue(['encode', 'x']);

                    return encodeX ? <KeywordSearch /> : null;
                }}
            </Form.Item>

            <Form.Item label="统计方式" name={['encode', 'y']}>
                <Select options={[{ label: '统计总数', value: 'count' }]} disabled />
            </Form.Item>
        </>
    );
};

export { StatisticCardVis };
