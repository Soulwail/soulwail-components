import {
    AreaChartIcon,
    BasicBarChartIcon,
    BasicHorizontalBarChartIcon,
    BasicLineChartIcon,
    DonutChartIcon,
    PercentStackAreaChartIcon,
    PercentStackBarChartIcon,
    PercentStackHorizontalBarChartIcon,
    PieChartIcon,
    SmoothLineChartIcon,
    StackAreaChartIcon,
    StackBarChartIcon,
    StackHorizontalBarChartIcon,
    StepLineChartIcon,
} from '../icons';

// 最大字符数
export const MaxCharNum = 12;
// 最大字符长度
export const MaxCharLength = 60;

export const KeywordComparisonSymbols = Object.freeze({
    EQUAL: '==',
    LIKE: 'like',
});

const getKeywordComparisonSymbols = () => [
    { label: '等于', value: KeywordComparisonSymbols.EQUAL },
    { label: '包含', value: KeywordComparisonSymbols.LIKE },
];

export const Positions = Object.freeze({
    RIGHT: 'right',
    LEFT: 'left',
    TOP: 'top',
    BOTTOM: 'bottom',
    HIDDEN: 'hidden',
});

const getPositions = () => [
    {
        label: '顶部',
        value: Positions.TOP,
    },
    {
        label: '左侧',
        value: Positions.LEFT,
    },
    {
        label: '右侧',
        value: Positions.RIGHT,
    },
    {
        label: '底部',
        value: Positions.BOTTOM,
    },
    {
        label: '隐藏',
        value: Positions.HIDDEN,
    },
];

export const ChartTypes = Object.freeze({
    INTERVAL: 'interval',
    LINE: 'line',
    AREA: 'area',
    HORIZONTAL_BAR: 'horizontalBar',
    PIE: 'pie',
});

/** - 柱状图 */
export const IntervalChartTypes = Object.freeze({
    BASE: 'base',
    STACK: 'stack',
    PERCENT_STACK: 'percentStack',
});

/** - 折线图 */
export const LineChartTypes = Object.freeze({
    BASE: 'base',
    SMOOTH: 'smooth',
    STEP: 'step',
});

/** - 面积图 */
export const AreaChartTypes = Object.freeze({
    BASE: 'base',
    STACK: 'stack',
    PERCENT_STACK: 'percentStack',
});

/** - 条形图 */
export const HorizontalChartTypes = Object.freeze({
    BASE: 'base',
    STACK: 'stack',
    PERCENT_STACK: 'percentStack',
});

/** - 饼图 */
export const PieChartTypes = Object.freeze({
    BASE: 'base',
    RING: 'ring',
});

const getChartTypes = () => [
    {
        label: '柱状图',
        options: [
            {
                label: '基础柱状图',
                value: `${ChartTypes.INTERVAL}_${IntervalChartTypes.BASE}`,
                icon: BasicBarChartIcon,
            },
            {
                label: '堆积柱状图',
                value: `${ChartTypes.INTERVAL}_${IntervalChartTypes.STACK}`,
                icon: StackBarChartIcon,
            },
            {
                label: '百分比堆积柱状图',
                value: `${ChartTypes.INTERVAL}_${IntervalChartTypes.PERCENT_STACK}`,
                icon: PercentStackBarChartIcon,
            },
        ],
    },
    {
        label: '折线图',
        options: [
            {
                label: '基础折线图',
                value: `${ChartTypes.LINE}_${LineChartTypes.BASE}`,
                icon: BasicLineChartIcon,
            },
            {
                label: '平滑折线图',
                value: `${ChartTypes.LINE}_${LineChartTypes.SMOOTH}`,
                icon: SmoothLineChartIcon,
            },
            {
                label: '阶梯图',
                value: `${ChartTypes.LINE}_${LineChartTypes.STEP}`,
                icon: StepLineChartIcon,
            },
        ],
    },
    {
        label: '面积图',
        options: [
            {
                label: '面积图',
                value: `${ChartTypes.AREA}_${AreaChartTypes.BASE}`,
                icon: AreaChartIcon,
            },
            {
                label: '堆积面积图',
                value: `${ChartTypes.AREA}_${AreaChartTypes.STACK}`,
                icon: StackAreaChartIcon,
            },
            {
                label: '百分比堆积面积图',
                value: `${ChartTypes.AREA}_${AreaChartTypes.PERCENT_STACK}`,
                icon: PercentStackAreaChartIcon,
            },
        ],
    },
    {
        label: '条形图',
        options: [
            {
                label: '基础条形图',
                value: `${ChartTypes.HORIZONTAL_BAR}_${HorizontalChartTypes.BASE}`,
                icon: BasicHorizontalBarChartIcon,
            },
            {
                label: '堆积条形图',
                value: `${ChartTypes.HORIZONTAL_BAR}_${HorizontalChartTypes.STACK}`,
                icon: StackHorizontalBarChartIcon,
            },
            {
                label: '百分比堆积条形图',
                value: `${ChartTypes.HORIZONTAL_BAR}_${HorizontalChartTypes.PERCENT_STACK}`,
                icon: PercentStackHorizontalBarChartIcon,
            },
        ],
    },
    {
        label: '饼图',
        options: [
            {
                label: '饼图',
                value: `${ChartTypes.PIE}_${PieChartTypes.BASE}`,
                icon: PieChartIcon,
            },
            {
                label: '环形图',
                value: `${ChartTypes.PIE}_${PieChartTypes.RING}`,
                icon: DonutChartIcon,
            },
        ],
    },
];

const getConfigCollections = () => ({
    legendPositions: getPositions(),
    // positions: getPositions(),
    chartTypes: getChartTypes(),
    // axisModes: getAxisModes(),
    // scaleTypes: getScaleTypes(),
    // chartModes: getChartModes(),
    // interpolationModes: getInterpolationModes(),
    // thresholdLineStyles: getThresholdLineStyles(),
});

export { getChartTypes, getConfigCollections, getKeywordComparisonSymbols, getPositions };
