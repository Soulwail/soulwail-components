import { Form, Select } from 'antd';
import { useContext } from 'react';
import VisualizeContext from '../../context';

const DataSource = () => {
    const {
        formProps: { dataSource = [], dataSourceMode },
    } = useContext(VisualizeContext);

    return (
        <Form.Item label="数据来源" name="dataSource" rules={[{ required: true, message: '请选择数据来源' }]}>
            <Select options={dataSource} mode={dataSourceMode} placeholder="请选择" />
        </Form.Item>
    );
};

export { DataSource };
