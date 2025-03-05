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
                return (
                    <Space key={option.data.value}>
                        {option.data.icon ? (
                            <option.data.icon style={{ fontSize: '36px' }} />
                        ) : null}
                        {option.data.label}
                    </Space>
                );
            }}
        />
    );
};

export { ChartSelect };
