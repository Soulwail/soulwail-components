import { Form, Radio } from 'antd';
import React from 'react';
import { getDrawerChartTypes } from '../../utils';

const allOptions = getDrawerChartTypes();

const ChartSubType: React.FC = () => {
    return (
        <>
            <Form.Item noStyle dependencies={['chartParentType']}>
                {({ getFieldValue }) => {
                    const chartParentType = getFieldValue('chartParentType');
                    const parentConfig = allOptions.find((item) => item.value === chartParentType);

                    const options = parentConfig?.children || [];

                    return (
                        <Form.Item
                            label={parentConfig?.label + '类型'}
                            hidden={options.length === 0}
                            name="chartSubType"
                        >
                            <Radio.Group options={options} />
                        </Form.Item>
                    );
                }}
            </Form.Item>

            <Form.Item label="类型" name="chartType" hidden></Form.Item>
        </>
    );
};

export { ChartSubType };
