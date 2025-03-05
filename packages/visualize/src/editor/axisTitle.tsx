import { Form, Input, Select, Typography } from 'antd';
import React from 'react';

const { Text } = Typography;

const AxisTitle: React.FC = () => {
    return (
        <>
            <Form.Item label={null} name="axisLine">
                <Select
                    options={[
                        { label: '横轴标题', value: 'x' },
                        { label: '纵轴标题', value: 'y' },
                    ]}
                />
            </Form.Item>

            <Form.Item noStyle dependencies={['axisLine']}>
                {({ getFieldValue }) => {
                    const axisLine = getFieldValue('axisLine');

                    return (
                        <Form.Item label={<Text type="secondary">标题内容</Text>} name={['axis', axisLine, 'title']}>
                            <Input />
                        </Form.Item>
                    );
                }}
            </Form.Item>
        </>
    );
};

export { AxisTitle };
