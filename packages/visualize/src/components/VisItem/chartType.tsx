import { Form } from 'antd';
import { getChartTypes } from '../../utils';
import { ChartSelect } from '../';

const ChartType = () => {
    const visTypeOptions = getChartTypes();

    return (
        <Form.Item label="图表类型" name="chartType">
            <ChartSelect options={visTypeOptions} placeholder="请选择" />
        </Form.Item>
    );
};

export { ChartType };
