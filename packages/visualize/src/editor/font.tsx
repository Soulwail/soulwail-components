import { Form } from 'antd';
import React, { useContext } from 'react';
import { ChartColorPicker } from '../components';
import VisualizeContext from '../context';

const Font: React.FC = () => {
    const { layout } = useContext(VisualizeContext);
    
    return (
        <>
            <Form.Item
                label="字体颜色"
                name={['style', 'contentFill']}
                normalize={(value) => {
                    return typeof value === 'string' ? value : value?.toHexString();
                }}
                style={layout === 'feishu' ? { marginBottom: 0 } : {}}
            >
                <ChartColorPicker />
            </Form.Item>
        </>
    );
};

export { Font };
