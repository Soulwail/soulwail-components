import { Form } from 'antd';
import { ChartSelect } from '../';
import { getChartTypes } from '../../utils';

const ChartType = () => {
    const visTypeOptions = getChartTypes();

    return (
        <Form.Item label="图表类型" name="chartType">
            <ChartSelect options={visTypeOptions} placeholder="请选择" />
        </Form.Item>
    );
};

export { ChartType };
