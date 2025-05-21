import { Form, InputNumber, Select } from 'antd';
import React from 'react';

const NumberFormat: React.FC = () => {
    const selectAfter = (
        <Form.Item name={['formatter', 'format']} noStyle>
            <Select
                options={[
                    { label: '数字（千分位）', value: 'separator' },
                    { label: '数字', value: 'num' },
                    { label: '百分比', value: 'percent' },
                ]}
                style={{ width: '134px', textAlign: 'left' }}
            />
        </Form.Item>
    );

    return (
        <>
            <Form.Item name={['formatter', 'fix']}>
                <InputNumber controls min={0} addonAfter={selectAfter} precision={0} style={{ width: '100%' }} />
            </Form.Item>
        </>
    );
};

export { NumberFormat };
