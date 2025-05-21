import { Data } from '@antv/g2';
import { cloneDeep } from 'lodash';
import { KeywordComparisonSymbols, OtherTypes } from '../utils';
import { ChartFormProps, ChartOptions, VisTypeDefinitionProps } from './index';

/** - 指标卡配置项 */
export interface FormStatisticCardOptionProps extends ChartFormProps {
    /** - 是否开启检索 */
    keywordSearchColor: boolean;
    /** - 检索内容配置 */
    searchColor: { compare: '==' | 'like'; keyword: string };
    formatter: {
        fix: number;
        format: string;
    };
}

export const createStatisticCardVisTypeDefinition = (): VisTypeDefinitionProps<FormStatisticCardOptionProps> => {
    return {
        name: 'statisticCard',
        title: '指标卡',
        visConfig: {
            defaults: {
                chartType: OtherTypes.STATISTIC_CARD,
                keywordSearchColor: false,
                searchColor: {
                    compare: KeywordComparisonSymbols.EQUAL,
                    keyword: '',
                },
                encode: { y: 'count' },
                formatter: {
                    fix: 0,
                    format: 'separator',
                },
            },
        },
        editorConfig: {
            schemas: [
                { title: '背景', key: 'background' },
                { title: '字体', key: 'font' },
                { title: '数字格式', key: 'numberFormat' },
            ],
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
