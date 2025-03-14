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
 * - 图例数据转换
 * @param options
 * @param showLegend
 */
const transformLegend = (options: Record<string, any>, showLegend: boolean) => {
    // 图例
    if (showLegend) {
        // 初始值和 onChange 时已经设置了
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
        Reflect.set(options, 'labels', [false]);
    }
};

/**
 * - 坐标轴转换
 * @param options
 * @param showAxis
 */
const transformAxis = (options: Record<string, any>, showAxis: boolean) => {
    if (showAxis) {
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
    transformAxis,
    transformAxisTitle,
    transformGrid,
    transformLabel,
    transformLegend,
    transformNumber,
};
