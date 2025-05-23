import { Data } from '@antv/g2';
import { cloneDeep } from 'lodash';
import { TableVisibleAllFieldsValue, ViewTypes } from '../utils';
import { ChartFormProps, ChartOptions, VisTypeDefinitionProps } from './index';

export const createTableCardVisTypeDefinition = (): VisTypeDefinitionProps<ChartFormProps> => {
    return {
        name: 'table',
        title: '表格',
        visConfig: {
            defaults: {
                chartType: ViewTypes.TABLE,
                encode: { x: TableVisibleAllFieldsValue },
            },
        },
        editorConfig: {
            schemas: [],
        },
        transformConfig: (allValues) => {
            console.log('allValues', allValues);

            // 图表配置项
            let options = cloneDeep(allValues);

            // 数据配置项
            let data: Data = {
                type: 'inline', // 内联数据
            };

            return { options: options as ChartOptions, data };
        },
    };
};
