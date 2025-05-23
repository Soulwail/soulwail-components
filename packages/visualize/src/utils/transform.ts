import { ChartTypes, MaxCharNum } from '../utils';

/**
 * - 数值转换
 * @param num
 */
const transformNumber = (num) => {
    if (isNaN(Number(num))) {
        return num;
    } else {
        const value = Number(num);

        if (value < 10 ** 4) {
            return value; // 小于 10000，直接显示
        } else if (value >= 10 ** 4 && value < 10 ** 8) {
            return `${(value / 10 ** 4).toFixed(2)}万`; // 10000 - 100000000 之间，显示为万
        } else {
            return `${(value / 10 ** 8).toFixed(2)}亿`; // 大于等于 100000000，显示为亿
        }
    }
};

/**
 * - label 自动省略溢出
 * @param label
 */
const ellipsisLabel = (label: string) => {
    return label.length > MaxCharNum ? `${label.slice(0, MaxCharNum)}...` : label;
};

/**
 * - 图例数据转换
 * @param options
 * @param showLegend
 */
const transformLegend = (options: Record<string, any>, showLegend: boolean) => {
    // 图例
    if (showLegend) {
        // 图例位置在初始值和 onChange 时已经设置了
        // 这里设置图例 label 展示的最大宽度
        if (Reflect.has(options, 'legend')) {
            if (Reflect.has(options.legend, 'color')) {
                Reflect.set(options.legend.color, 'itemLabelText', (datum: string | Record<string, string>) => {
                    return typeof datum === 'string' ? ellipsisLabel(datum) : ellipsisLabel(datum?.label);
                });
            }
        }
    } else {
        // 未开启图例，删除对应的图例显示
        Reflect.set(options, 'legend', false);
    }
};

/**
 * - 数据标签转换
 * @param options
 * @param showLabel
 */
const transformLabel = (options: Record<string, any>, showLabel: boolean) => {
    if (showLabel) {
        Reflect.set(options, 'labels', [{ text: options.encode.y }]);
    } else {
        // 未开启数据标签，删除对应的数据标签显示
        Reflect.set(options, 'labels', []);
    }
};

/**
 * - 坐标轴转换
 * @param options
 * @param showAxis
 */
const transformAxis = (options: Record<string, any>, showAxis: boolean) => {
    if (showAxis) {
        Reflect.set(options.axis.x, 'labelFormatter', (val: string) => ellipsisLabel(val));
        Reflect.set(options.axis.y, 'labelFormatter', (val: number) => transformNumber(val));
    } else {
        // 未开启坐标轴，删除对应的坐标轴显示
        Reflect.set(options.axis.x, 'label', false);
        Reflect.set(options.axis.x, 'tick', false);
        Reflect.set(options.axis.y, 'label', false);
        Reflect.set(options.axis.y, 'tick', false);
    }
};

/**
 * - 网格数据转换
 * @param options
 * @param showGrid
 */
const transformGrid = (options: Record<string, any>, showGrid: boolean) => {
    if (showGrid) {
    } else {
        // 未开启坐标轴，删除对应的坐标轴显示
        Reflect.set(options, 'grid', false);
    }
};

/**
 * - 轴标题数据转换
 * @param options
 * @param axis
 */
const transformAxisTitle = (
    options: Record<string, any>,
    axis: {
        x: Record<string, any>;
        y: Record<string, any>;
    },
) => {
    // 如果标题未填写，设置为 null
    if (!axis.x.title) {
        Reflect.set(options.axis.x, 'title', null);
    }
    if (!axis.y.title) {
        Reflect.set(options.axis.y, 'title', null);
    }
};

/**
 * - 转换悬浮提示
 * @param options
 * @param type tooltip展示类型 count——总计、name——名称
 * @description 将悬浮提示更换为
 */
const transformTooltip = (options: Record<string, any>, type: 'count' | 'name') => {
    Reflect.set(options, 'tooltip', {
        items: [
            (
                d, // 每一个数据项
                _index: number, // 索引
                _data, // 完整数据
                column, // 通道
            ) => {
                const name = type === 'count' ? '总计' : d[column.color?.field];

                return { name, value: d[column.y.field] };
            },
        ],
    });
};

/**
 * - 处理轴排序
 * @param sortX
 * @param transform
 */
const transformSortX = (sortX: Record<string, any>, transform: Record<string, any>[]) => {
    const { by, reverse /* slice */ } = sortX;
    const transformItem: Record<string, any> = { type: 'sortX', by, reverse };

    // 如果有数量限制，则添加 slice
    // 数量限制不在图表进行限制，通过接口控制返回的数据量
    // if (slice) {
    //     transformItem.slice = slice;
    // }

    transform.push(transformItem);
};

/**
 * - 处理分组聚合
 * @param options 图标配置
 * @param encodeColor 是否开启分组聚合
 * @param chartTypeArr 图表类型
 * @param transform 图表转换
 */
const transformEncodeColor = (
    options: Record<string, any>,
    encodeColor: boolean,
    chartTypeArr: [string, string],
    transform?: Record<string, any>[],
) => {
    if (encodeColor) {
    } else {
        if (chartTypeArr[0] === ChartTypes.INTERVAL || chartTypeArr[0] === ChartTypes.HORIZONTAL_BAR) {
            // 单柱状图，开启视觉通道，需要将 transform type 设置为 stackY
            if (chartTypeArr[1] === 'base') {
                transform.forEach((e) => {
                    if (e.type === 'dodgeX') {
                        e.type = 'stackY';
                    }
                });
            }

            // 未开启分组聚合， 将对应的视觉通道参数设置为横轴
            Reflect.set(options.encode, 'color', options.encode.x);
        } else {
            // 未开启分组聚合，删除对应的视觉通道参数
            Reflect.deleteProperty(options.encode, 'color');
        }
    }
};

/**
 * - 删除多余的 key
 * @param options
 */
const deleteExtraKey = (options: Record<string, any>) => {
    // option 中没有 name、dataSource、chartType、keywordSearch、search 属性
    [
        'name',
        'dataSource',
        'chartType',
        'keywordSearch',
        'search',
        'searchColor',
        'keywordSearchColor',
        'encodeColor',
        'showLegend',
        'showLabel',
        'showAxis',
        'showGrid',
        'axisLine',
    ].forEach((key) => {
        Reflect.deleteProperty(options, key);
    });
};

export {
    deleteExtraKey,
    ellipsisLabel,
    transformAxis,
    transformAxisTitle,
    transformEncodeColor,
    transformGrid,
    transformLabel,
    transformLegend,
    transformNumber,
    transformSortX,
    transformTooltip,
};
