import { Form, Segmented, Select, Space, Typography } from 'antd';
import React, { useContext } from 'react';
import VisualizeContext from '../../context';
import { PolylineIcon, SmoothlineIcon, SteplineIcon } from '../../icons';

const { Text } = Typography;

const ChartAreaShape: React.FC = () => {
    const { layout } = useContext(VisualizeContext);

    return (
        <Form.Item
            label={<Text type={layout === 'feishu' ? 'secondary' : null}>折线类型</Text>}
            name={['style', 'shape']}
        >
            {layout === 'feishu' ? (
                <Segmented
                    block
                    options={[
                        { label: '折线', value: 'area', icon: <PolylineIcon /> },
                        { label: '平滑', value: 'smooth', icon: <SmoothlineIcon /> },
                        { label: '阶梯', value: 'hvh', icon: <SteplineIcon /> },
                    ]}
                />
            ) : (
                <Select
                    options={[
                        { label: '折线', value: 'area', icon: <PolylineIcon /> },
                        { label: '平滑', value: 'smooth', icon: <SmoothlineIcon /> },
                        { label: '阶梯', value: 'hvh', icon: <SteplineIcon /> },
                    ]}
                    optionRender={(option) => {
                        return (
                            <Space>
                                {option.data.icon}
                                {option.label}
                            </Space>
                        );
                    }}
                />
            )}
        </Form.Item>
    );
};

export { ChartAreaShape };
