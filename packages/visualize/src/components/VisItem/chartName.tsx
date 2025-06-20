import { Form, Input } from 'antd';
import React, { useContext } from 'react';
import VisualizeContext from '../../context';
import { getTranslateZh } from '../../utils';

const translate = getTranslateZh();

const ChartName: React.FC = () => {
    const { layout } = useContext(VisualizeContext);

    return (
        <Form.Item
            label={translate[layout].chartName}
            name="name"
            rules={[{ required: true, message: '请输入' + translate[layout].chartName }]}
        >
            <Input placeholder="请输入" />
        </Form.Item>
    );
};

export { ChartName };
