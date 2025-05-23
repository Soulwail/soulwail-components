import { Form } from 'antd';
import React from 'react';
import { ChartColorPicker } from '../components/ChartColorPicker';

const Background: React.FC = () => {
    return (
        <>
            <Form.Item
                name={['style', 'fill']}
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

export { Background };
