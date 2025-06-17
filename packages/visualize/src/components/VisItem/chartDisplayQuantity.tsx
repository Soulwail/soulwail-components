import { Form, Segmented, Select, Typography } from 'antd';
import React, { useContext } from 'react';
import VisualizeContext from '../../context';

const { Text } = Typography;

const ChartDisplayQuantity: React.FC = () => {
    const { layout } = useContext(VisualizeContext);

    return (
        <Form.Item
            label={<Text type={layout === 'feishu' ? 'secondary' : null}>展示数量</Text>}
            name={['transform', 'sortX', 'slice']}
        >
            {layout === 'feishu' ? (
                <Segmented
                    block
                    options={[
                        { label: 'TOP 10', value: 10 },
                        { label: 'TOP 20', value: 20 },
                        { label: '不限制', value: 0 },
                    ]}
                />
            ) : (
                <Select
                    options={[
                        { label: 'TOP 10', value: 10 },
                        { label: 'TOP 20', value: 20 },
                        { label: '不限制', value: 0 },
                    ]}
                />
            )}
        </Form.Item>
    );
};

export { ChartDisplayQuantity };
