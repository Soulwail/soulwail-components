import { Select, SelectProps, Space } from 'antd';
import React from 'react';

const ChartSelect: React.FC<SelectProps> = (props) => {
    const { value, onChange, ...reset } = props;
    return (
        <Select
            {...reset}
            value={value}
            onChange={onChange}
            optionRender={(option) => {
                const Icon = option.data.icon;

                return (
                    <Space key={option.data.value}>
                        {Icon ? <Icon style={{ fontSize: '52px' }} /> : null}
                        {option.data.label}
                    </Space>
                );
            }}
        />
    );
};

export { ChartSelect };
