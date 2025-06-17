import { Form, Input } from 'antd';
import React from 'react';

const ChartName: React.FC = () => {
    return (
        <Form.Item label="图表名称" name="name" rules={[{ required: true, message: '请输入图表名称' }]}>
            <Input placeholder="请输入" />
        </Form.Item>
    );
};

export { ChartName };
