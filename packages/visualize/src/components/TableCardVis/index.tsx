import { Form, Select, SelectProps } from 'antd';
import React, { useContext, useMemo } from 'react';
import VisualizeContext from '../../context';
import { TableVisibleAllFieldsValue } from '../../utils';

const TableCardVis: React.FC = () => {
    const { categoryList = [] } = useContext(VisualizeContext);

    const visibleFieldsOptions: SelectProps['options'] = useMemo(() => {
        return [{ label: '全部字段', value: TableVisibleAllFieldsValue }, ...categoryList];
    }, [categoryList]);

    return (
        <>
            <Form.Item
                label="可见字段"
                name={['encode', 'x']}
                initialValue={{ encode: { x: [TableVisibleAllFieldsValue] } }}
            >
                <Select allowClear options={visibleFieldsOptions} mode="multiple" placeholder="请选择" />
            </Form.Item>
        </>
    );
};

export { TableCardVis };
