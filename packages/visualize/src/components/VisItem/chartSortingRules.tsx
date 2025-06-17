import { Form, Segmented, Select, Typography } from 'antd';
import React, { useContext } from 'react';
import VisualizeContext from '../../context';

const { Text } = Typography;

const ChartSortingRules: React.FC = () => {
    const { layout } = useContext(VisualizeContext);

    return (
        <Form.Item
            label={<Text type={layout === 'feishu' ? 'secondary' : null}>排序规则</Text>}
            name={['transform', 'sortX', 'reverse']}
        >
            {layout === 'feishu' ? (
                <Segmented
                    block
                    options={[
                        { label: '正序', value: false },
                        { label: '倒序', value: true },
                    ]}
                />
            ) : (
                <Select
                    options={[
                        { label: '正序', value: false },
                        { label: '倒序', value: true },
                    ]}
                />
            )}
        </Form.Item>
    );
};

export { ChartSortingRules };
