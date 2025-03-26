import { Chart, Data } from '@antv/g2';
import { cloneDeep, defaultsDeep } from 'lodash';
import { axisChange, encodeColorChange, legendChange } from '../utils/change';
import { ChartTypes, IntervalChartTypes, KeywordComparisonSymbols, MaxCharNum, Positions } from '../utils/collections';
import {
    deleteExtraKey,
    transformAxis,
    transformAxisTitle,
    transformGrid,
    transformLabel,
    transformLegend,
    transformTooltip,
} from '../utils/transform';
import { AxisOptions, ChartFormProps, VisTypeDefinitionProps } from './index';

/** - 柱状图表单配置项 */
export interface FormIntervalChartOptionProps extends ChartFormProps {
    /** - 是否显示坐标轴 */
    showAxis: boolean;
    /** - 选择的轴标题 */
    axisLine: string;
    /** - 轴标题相关设置 */
    axis: AxisOptions;
    /** - 是否显示网格 */
    showGrid: boolean;
    /** - 是否开启颜色视觉通道 */
    encodeColor: boolean;
    /** - 轴排序 */
    transform: {
        /** - x 轴排序 */
        sortX: { by: string; reverse: boolean };
    };
    /** - 是否开启检索 */
    keywordSearchColor: boolean;
    /** - 检索内容配置 */
    searchColor: { compare: '==' | 'like'; keyword: string };
}

export const createIntervalVisTypeDefinition = (): VisTypeDefinitionProps<FormIntervalChartOptionProps> => {
    const config: Record<string, any> = {
        base: {
            transform: [{ type: 'dodgeX' }],
        },
        stack: {
            transform: [{ type: 'stackY' }],
        },
        percentStack: {
            transform: [{ type: 'stackY' }, { type: 'normalizeY' }],
        },
    };

    return {
        name: 'interval',
        title: '柱状图',
        visConfig: {
            defaults: {
                chartType: `${ChartTypes.INTERVAL}_${IntervalChartTypes.BASE}`,
                showLegend: true, // 图例
                legend: {
                    color: {
                        position: Positions.TOP, // 图例位置
                    },
                },
                showAxis: true, // 坐标轴
                axisLine: 'x',
                axis: {
                    // x 轴
                    x: {
                        title: null, // 轴标题
                        label: true, // 标签
                        size: MaxCharNum,
                        labelAutoEllipsis: true,
                        tick: true,
                    },
                    // y 轴
                    y: {
                        title: null, // 轴标题
                        label: true, // 标签
                        tick: true,
                    },
                },
                showLabel: true,
                showGrid: true,
                keywordSearch: false,
                search: {
                    compare: KeywordComparisonSymbols.EQUAL,
                    keyword: '',
                },
                keywordSearchColor: false,
                searchColor: {
                    compare: KeywordComparisonSymbols.EQUAL,
                    keyword: '',
                },
                transform: { sortX: { by: 'y', reverse: true } },
                encode: { y: 'count' },
                encodeColor: false,
            },
            ...config,
        },
        editorConfig: {
            schemas: [
                { title: '轴标题设置', key: 'axisTitle' },
                { title: '图例', key: 'legend' },
                { title: '横轴', key: 'xAxis' },
                { title: '纵轴', key: 'yAxis' },
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

            const chartTypeArr: [string, string] = allValues.chartType.split('_');

            // 图表配置项 - transform
            // 设置图表子类型
            let transform = cloneDeep(config[chartTypeArr[1]].transform);

            Reflect.set(options, 'type', chartTypeArr[0]);

            // 图例
            transformLegend(options, allValues.showLegend);

            // 数据标签
            transformLabel(options, allValues.showLabel);

            // 坐标轴
            transformAxis(options, allValues.showAxis);

            // 坐标轴标题
            transformAxisTitle(options, allValues.axis);

            // 网格线
            transformGrid(options, allValues.showGrid);

            // 悬浮提示
            if (chartTypeArr[1] === IntervalChartTypes.BASE) {
                transformTooltip(options, 'count');
            } else {
                transformTooltip(options, 'name');
            }

            // 横轴排序
            if (allValues.transform.sortX) {
                // TODO:
                transform.push(Object.assign({ type: 'sortX' }, allValues.transform.sortX));
            }

            // 设置新的 transform
            Reflect.set(options, 'transform', transform);

            // 分组聚合
            if (allValues.encodeColor) {
            } else {
                // 单柱状图，开启视觉通道，需要将 transform type 设置为 stackY
                if (chartTypeArr[1] === IntervalChartTypes.BASE) {
                    transform.forEach((e) => {
                        if (e.type === 'dodgeX') {
                            e.type = 'stackY';
                        }
                    });
                }

                // 未开启分组聚合， 将对应的视觉通道参数设置为横轴
                Reflect.set(options.encode, 'color', options.encode.x);
            }

            // 限制柱形图的宽度
            defaultsDeep(options, { style: { maxWidth: 50 } });

            // 删除 option 中多余的 key
            deleteExtraKey(options);

            return { options: options as Chart['options'], data };
        },
        onChangeConfig: (value, allValues, form, extraOpts) => {
            const { categoryList = [], colorCategoryList = [] } = extraOpts;

            // 图例
            legendChange(value, form);

            // 坐标轴
            axisChange(value, allValues, form);

            // 分组聚合
            encodeColorChange(value, allValues, categoryList, colorCategoryList, form);
        },
    };
};
