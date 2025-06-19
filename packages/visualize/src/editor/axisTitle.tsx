import { Form, Input, Select, Typography } from 'antd';
import React, { useContext } from 'react';
import VisualizeContext from '../context';

const { Text } = Typography;

const AxisTitle: React.FC = () => {
    const { layout } = useContext(VisualizeContext);

    return (
        <>
            <Form.Item hidden={layout !== 'feishu'} label={null} name="axisLine">
                <Select
                    options={[
                        { label: '横轴标题', value: 'x' },
                        { label: '纵轴标题', value: 'y' },
                    ]}
                />
            </Form.Item>

            <Form.Item hidden={layout !== 'feishu'} noStyle dependencies={['axisLine']}>
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
