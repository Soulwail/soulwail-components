import { Form } from 'antd';
import React from 'react';
import { ChartColorPicker } from '../components/ChartColorPicker';

const Font: React.FC = () => {
    return (
        <>
            <Form.Item
                label="字体颜色"
                name={['style', 'contentFill']}
                normalize={(value) => {
                    return typeof value === 'string' ? value : value?.toHexString();
                }}
                style={{ marginBottom: 0 }}
            >
                <ChartColorPicker />
            </Form.Item>
        </>
    );
};

export { Font };
