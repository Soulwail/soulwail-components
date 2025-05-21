import { VisTypeDefinitionProps } from '@safety/visualize';
import { FormInstance } from 'antd';
import { cloneDeep } from 'lodash';
import { ChartTypes } from '../utils';

/**
 * - 构建图表数据和配置
 * @param formInstance  form 实例
 * @param visTypeDefinition 可视化图表配置
 */
const buildChartDataAndOptions = async (formInstance: FormInstance, visTypeDefinition: VisTypeDefinitionProps) => {
    try {
        await formInstance.validateFields();

        const values = formInstance.getFieldsValue(true);
        const newValues = cloneDeep(values);
        const [chartType] = values.chartType.split('_');

        if (visTypeDefinition) {
            const { options, data } = visTypeDefinition.transformConfig(values);

            // 取值转换
            if (chartType === ChartTypes.LINE || chartType === ChartTypes.AREA) {
                // TODO:
            } else if (chartType === ChartTypes.PIE) {
                Reflect.set(newValues.encode, 'color', null);
            } else {
                // 如果没有开启分组聚合，则 value 中的 color 需要设置为 null
                if (!values.encodeColor) {
                    Reflect.set(newValues.encode, 'color', null);
                }
            }

            console.log('chart options', options);
            console.log('chart values', newValues);
            console.log('chart data', data);

            return Promise.resolve({ values: newValues, options, data });
        } else {
            return Promise.reject('No options and data!');
        }
    } catch (err) {
        return Promise.reject(err);
    }
};

export { buildChartDataAndOptions };
