import { Form, Select, SelectProps } from 'antd';
import React, { useContext, useMemo } from 'react';
import VisualizeContext from '../../../context';
import { TableVisibleAllFieldsValue } from '../../../utils';

const TableCardVis: React.FC = () => {
    const {
        formProps: { categoryList = [] },
    } = useContext(VisualizeContext);

    const visibleFieldsOptions: SelectProps['options'] = useMemo(() => {
        return [{ label: '全部字段', value: TableVisibleAllFieldsValue }, ...categoryList];
    }, [categoryList]);

    return (
        <>
            <Form.Item
                label="可见字段"
                name={['encode', 'x']}
                initialValue={{ encode: { x: [TableVisibleAllFieldsValue] } }}
                normalize={(value) => {
                    // 如果最新选择的字段是所有字段
                    // 那么移除其他字段，只保留所有字段
                    // 如果已选择的字段中包含所有字段
                    // 那么需要移除所有字段
                    if (Array.isArray(value)) {
                        return value[value.length - 1] === TableVisibleAllFieldsValue
                            ? [TableVisibleAllFieldsValue]
                            : value.filter((item) => item !== TableVisibleAllFieldsValue);
                    } else {
                        return [];
                    }
                }}
            >
                <Select allowClear options={visibleFieldsOptions} mode="multiple" placeholder="请选择" />
            </Form.Item>
        </>
    );
};

export { TableCardVis };
