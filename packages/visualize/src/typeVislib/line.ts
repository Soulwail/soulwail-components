import { Data } from '@antv/g2';
import { cloneDeep } from 'lodash';
import {
    axisChange,
    ChartTypes,
    deleteExtraKey,
    IntervalChartTypes,
    KeywordComparisonSymbols,
    legendChange,
    LineChartTypes,
    Positions,
    transformAxis,
    transformAxisTitle,
    transformEncodeColor,
    transformGrid,
    transformLabel,
    transformLegend,
    transformTooltip,
} from '../utils';
import { AxisOptions, ChartFormProps, ChartOptions, VisTypeDefinitionProps } from './index';

export interface FormLineChartOptionProps extends ChartFormProps {
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
    /** - 是否开启检索 */
    keywordSearchColor: boolean;
    /** - 检索内容配置 */
    searchColor: { compare: '==' | 'like'; keyword: string };
}

export const createLineVisTypeDefinition = (): VisTypeDefinitionProps<FormLineChartOptionProps> => {
    const config: Record<string, any> = {
        base: {
            style: { shape: 'line' },
        },
        smooth: {
            style: { shape: 'smooth' },
        },
        step: {
            style: { shape: 'hvh' },
        },
    };

    return {
        name: 'line',
        title: '折现图',
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
                keywordSearchColor: false,
                searchColor: {
                    compare: KeywordComparisonSymbols.EQUAL,
                    keyword: '',
                },
                encode: { x: 'time', y: 'count' },
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
            // 设置图表类型
            Reflect.set(options, 'type', chartTypeArr[0]);

            const { style } = config[chartTypeArr[1]];
            // 设置折线样式
            Reflect.set(options, 'style', style);

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
            if (chartTypeArr[1] === LineChartTypes.BASE) {
                transformTooltip(options, 'count');
            } else {
                transformTooltip(options, 'name');
            }

            // 分组聚合
            transformEncodeColor(options, allValues.encodeColor, chartTypeArr);

            // 删除 option 中多余的 key
            deleteExtraKey(options);
            // TODO: 趋势图暂时没有排序
            Reflect.deleteProperty(options, 'transform');

            return { options: options as ChartOptions, data };
        },
        onChangeConfig: (value, allValues, form) => {
            // 图例
            legendChange(value, form);

            // 坐标轴
            axisChange(value, allValues, form);
        },
    };
};
