import { Form, Segmented, Select, Typography } from 'antd';
import React, { useContext } from 'react';
import VisualizeContext from '../../context';

const { Text } = Typography;

const ChartSortBy: React.FC = () => {
    const { layout } = useContext(VisualizeContext);

    return (
        <Form.Item
            label={<Text type={layout === 'feishu' ? 'secondary' : null}>排序依据</Text>}
            name={['transform', 'sortX', 'by']}
        >
            {layout === 'feishu' ? (
                <Segmented
                    block
                    options={[
                        { label: '纵轴值', value: 'y' },
                        { label: '横轴值', value: 'x' },
                        // { label: '记录顺序', value: '' }, // TODO:
                    ]}
                />
            ) : (
                <Select
                    options={[
                        { label: '纵轴值', value: 'y' },
                        { label: '横轴值', value: 'x' },
                        // { label: '记录顺序', value: '' }, // TODO:
                    ]}
                />
            )}
        </Form.Item>
    );
};

export { ChartSortBy };
