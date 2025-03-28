import { Chart, Data } from '@antv/g2';
import { cloneDeep } from 'lodash';
import { legendChange } from '../utils/change';
import { ChartTypes, IntervalChartTypes, KeywordComparisonSymbols, Positions } from '../utils/collections';
import { deleteExtraKey, ellipsisLabel, transformLegend } from '../utils/transform';
import { ChartFormProps, VisTypeDefinitionProps } from './index';

export interface FormPieChartOptionProps extends ChartFormProps {
    /** - 轴排序 */
    transform: {
        /** - x 轴排序 */
        sortX: { by: string; reverse: boolean; slice: number };
    };
    /** - 饼图数据标签 */
    labels: { position: string; text: string[] }[];
}

export const createPieVisTypeDefinition = (): VisTypeDefinitionProps<FormPieChartOptionProps> => {
    const config: Record<string, any> = {
        base: {
            transform: [{ type: 'stackY' }],
            coordinate: { type: 'theta' },
        },
        ring: {
            transform: [{ type: 'stackY' }],
            coordinate: { type: 'theta', innerRadius: 0.5 },
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
                transform: { sortX: { by: 'y', reverse: true, slice: 0 } },
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

            // 数据配置项
            let data: Data = {
                type: 'inline', // 内联数据
            };

            // 将 encode 值解析出来
            const { y, x: color } = allValues.encode;
            // 获取图表类型
            const chartTypeArr = allValues.chartType.split('_');

            Reflect.set(options, 'type', 'interval');

            // 图表配置项 - transform
            // 设置图表类型
            let transform = [{ type: 'stackY' }];
            // 设置图表子类型 —— 饼图、环形图
            Reflect.set(options, 'coordinate', config[chartTypeArr[1]].coordinate);

            // 图例
            transformLegend(options, allValues.showLegend);

            // TODO: 展示百分比设置
            // 数据标签
            if (allValues.showLabel) {
                // 获取标签设置
                const { position, text } = allValues.labels[0];

                const labelText = (data: Record<string, any>, ...reset) => {
                    console.log(data, reset);

                    let label = '',
                        count = '',
                        percent = '',
                        colon = '';
                    // 类别
                    if (text.includes('category')) {
                        label = ellipsisLabel(data[color]);
                    }

                    // 总数
                    if (text.includes('value')) {
                        count = data.count;
                    }

                    // 百分比
                    if (text.includes('percent')) {
                        percent = data.percent ? `(${data.percent}%)` : '';
                    }

                    if (label && (count !== '' || percent !== '')) {
                        colon = ':';
                    }

                    return label + colon + count + percent;
                };

                Reflect.set(options, 'labels', [{ position, text: labelText }]);

                // 如果标签布局为显示在饼图外部，则外部需要留出空间
                if (position === 'spider') {
                    Reflect.set(options.coordinate, 'outerRadius', 0.6);

                    // 如果有标签，环形图内部也要相应缩小
                    if (chartTypeArr[1] === 'ring') {
                        Reflect.set(options.coordinate, 'innerRadius', 0.4);
                    }
                }
            } else {
                // 未开启数据标签，删除对应的数据标签显示
                Reflect.set(options, 'labels', []);
                // 如果没有标签，则不需要留出空间
                Reflect.set(options.coordinate, 'outerRadius', 1);

                // 如果没有标签，环形图内部也要相应扩大
                if (chartTypeArr[1] === 'ring') {
                    Reflect.set(options.coordinate, 'innerRadius', 0.6);
                }
            }
            Reflect.deleteProperty(options, 'showLabel');

            // 悬浮提示
            Reflect.set(options, 'tooltip', {
                items: [
                    (
                        d, // 每一个数据项
                        _index: number, // 索引
                        _data, // 完整数据
                        column, // 通道
                    ) => {
                        return { name: d[column.color?.field], value: d[column.y.field] };
                    },
                ],
            });

            // 扇区排序
            if (allValues.transform.sortX) {
                const { by, reverse, /* slice */ } = allValues.transform.sortX;

                // 按扇区数值排序
                if (by === 'y') {
                    data.transform = [
                        {
                            type: 'sort',
                            callback: (a: Record<string, any>, b: Record<string, any>) =>
                                reverse ? b[y] - a[y] : a[y] - b[y],
                        },
                    ];
                }

                if (by === 'color') {
                    data.transform = [
                        {
                            type: 'sort',
                            callback: (a: Record<string, any>, b: Record<string, any>) =>
                                reverse ? b[color].localeCompare(a[color]) : a[color].localeCompare(b[color]),
                        },
                    ];
                }

                // 筛选 TOP
                // 数量限制不在图表进行限制，通过接口控制返回的数据量
                // if (slice) {
                //     data.transform.push({ type: 'slice', end: slice });
                // }
            }

            // 饼图只有 color 轴和 y 轴
            Reflect.set(options, 'encode', { color, y });

            // 设置新的 transform
            Reflect.set(options, 'transform', transform);

            // 删除 option 中多余的 key
            deleteExtraKey(options);
            // 饼图没有轴标题
            Reflect.deleteProperty(options, 'axis');

            console.log('newOptions', options);

            return { options: options as Chart['options'], data };
        },
        onChangeConfig: (value, allValues, form) => {
            // 图例
            legendChange(value, form);
        },
    };
};
