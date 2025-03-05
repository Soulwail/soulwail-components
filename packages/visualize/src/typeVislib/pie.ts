import { Chart, Data } from '@antv/g2';
import { cloneDeep } from 'lodash';
import { legendChange } from '../utils/change';
import {
    ChartTypes,
    IntervalChartTypes,
    KeywordComparisonSymbols,
    Positions,
} from '../utils/collections';
import { deleteExtraKey, transformLegend } from '../utils/transform';
import { ChartFormProps, VisTypeDefinitionProps } from './index';

export interface FormPieChartOptionProps extends ChartFormProps {
    /** - 轴排序 */
    transform: {
        /** - x 轴排序 */
        sortX: { by: string; reverse: boolean };
    };
    /** - 饼图数据标签 */
    labels: { position: string; text: string[] }[];
}

export const createPieVisTypeDefinition =
    (): VisTypeDefinitionProps<FormPieChartOptionProps> => {
        const config: Record<string, any> = {
            base: {
                transform: [{ type: 'stackY' }],
                coordinate: { type: 'theta' },
            },
            ring: {
                transform: [{ type: 'stackY' }],
                coordinate: {
                    type: 'theta',
                    outerRadius: 0.8,
                    innerRadius: 0.5,
                },
            },
        };

        return {
            name: 'pie',
            title: '饼图',
            visConfig: {
                defaults: {
                    chartType: `${ChartTypes.PIE}_${IntervalChartTypes.BASE}`,
                    showLegend: true, // 图例
                    legend: {
                        color: {
                            position: Positions.TOP, // 图例位置
                        },
                    },
                    showLabel: true,
                    labels: [
                        {
                            position: 'spider',
                            text: ['category', 'value', 'percent'],
                        },
                    ],
                    keywordSearch: false,
                    search: {
                        compare: KeywordComparisonSymbols.EQUAL,
                        keyword: '',
                    },
                    transform: { sortX: { by: 'y', reverse: true } },
                    encode: { y: 'count' },
                },
                ...config,
            },
            editorConfig: {
                schemas: [
                    { title: '饼图', key: 'pieSeries' },
                    { title: '图例', key: 'legend' },
                ],
            },
            transformConfig: (allValues) => {
                console.log('allValues', allValues);
                // 图表配置项
                let options = cloneDeep(allValues);
                // 图表配置项 - transform
                let transform = [];
                // 数据配置项
                let data: Data = {};

                // 将 encode 值解析出来
                const { y, x: color } = allValues.encode;
                // 获取图表类型
                const chartTypeArr = allValues.chartType.split('_');

                Reflect.set(options, 'type', 'interval');

                // 设置图表类型
                transform = [{ type: 'stackY' }];
                // 设置图表子类型 —— 饼图、环形图
                Reflect.set(
                    options,
                    'coordinate',
                    config[chartTypeArr[1]].coordinate,
                );

                // 图例
                transformLegend(options, allValues.showLegend);

                // 数据标签
                if (allValues.showLabel) {
                    const { position, text } = allValues.labels[0];

                    const labelText = (data: Record<string, any>) =>
                        (text.includes('category') ? `${data[color]}: ` : '') +
                        (text.includes('value') ? `${data.count}` : '');
                    // TODO: 后期增加百分比展示
                    // + (text.includes('percent') ? `(${data.percent}%)` : '');

                    Reflect.set(options, 'labels', [
                        { position, text: labelText },
                    ]);
                } else {
                    // 未开启数据标签，删除对应的数据标签显示
                    Reflect.set(options, 'labels', false);
                }
                Reflect.deleteProperty(options, 'showLabel');

                // 扇区排序
                if (allValues.transform.sortX) {
                    const { by, reverse } = allValues.transform.sortX;

                    // 按扇区数值排序
                    if (by === 'y') {
                        data.transform = [
                            {
                                type: 'sort',
                                callback: (
                                    a: Record<string, any>,
                                    b: Record<string, any>,
                                ) => (reverse ? b[y] - a[y] : a[y] - b[y]),
                            },
                        ];
                    }

                    if (by === 'color') {
                        data.transform = [
                            {
                                type: 'sort',
                                callback: (
                                    a: Record<string, any>,
                                    b: Record<string, any>,
                                ) =>
                                    reverse
                                        ? b[color].localeCompare(a[color])
                                        : a[color].localeCompare(b[color]),
                            },
                        ];
                    }
                }

                // 饼图只有 color 轴和 y 轴
                Reflect.set(options, 'encode', { color, y });

                // 设置新的 data
                Reflect.set(options, 'data', data);

                // 设置新的 transform
                Reflect.set(options, 'transform', transform);

                // 删除 option 中多余的 key
                deleteExtraKey(options);
                // 饼图没有轴标题
                Reflect.deleteProperty(options, 'axis');

                return options as Chart['options'];
            },
            onChangeConfig: (value, allValues, form) => {
                // 图例
                legendChange(value, form);
            },
        };
    };
