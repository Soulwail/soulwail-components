import { Form, Select } from 'antd';
import React from 'react';
import { getPositions } from '../utils/collections';

const Legend: React.FC = () => {
    return (
        <>
            <Form.Item label="图例位置" name={['legend', 'color', 'position']}>
                <Select options={getPositions()} />
            </Form.Item>
        </>
    );
};

export { Legend };
