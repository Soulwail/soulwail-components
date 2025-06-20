import { Form, Select } from 'antd';
import { useContext } from 'react';
import VisualizeContext from '../../context';

const DataSource = () => {
    const {
        formProps: { dataSourceLabel, dataSource = [], dataSourceMode },
    } = useContext(VisualizeContext);

    return (
        <Form.Item
            label={dataSourceLabel}
            name="dataSource"
            rules={[{ required: true, message: '请选择' + dataSourceLabel }]}
        >
            <Select options={dataSource} mode={dataSourceMode} placeholder="请选择" />
        </Form.Item>
    );
};

export { DataSource };
