import { Checkbox, Form } from 'antd';
import React, { useContext } from 'react';
import VisualizeContext from '../../context';

const ChartGroupAgg: React.FC = () => {
    const { layout } = useContext(VisualizeContext);

    return layout === 'feishu' ? (
        <Form.Item name="encodeColor" valuePropName="checked" style={{ marginBottom: '16px' }}>
            <Checkbox>分组聚合</Checkbox>
        </Form.Item>
    ) : (
        <Form.Item label="分组聚合" name="encodeColor" valuePropName="checked" style={{ marginBottom: '16px' }}>
            <Checkbox></Checkbox>
        </Form.Item>
    );
};

export { ChartGroupAgg };
