import { Form } from 'antd';
import React, { useContext } from 'react';
import { ChartColorPicker } from '../components';
import VisualizeContext from '../context';

const Background: React.FC = () => {
    const { layout } = useContext(VisualizeContext);

    return (
        <>
            <Form.Item
                label={layout === 'drawer' ? '背景' : null}
                name={['style', 'fill']}
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

export { Background };
