import {
    AreaChartIcon,
    AreaChartNavyIcon,
    BasicBarChartIcon,
    BasicBarChartNavyIcon,
    BasicHorizontalBarChartIcon,
    BasicHorizontalBarChartNavyIcon,
    BasicLineChartIcon,
    BasicLineChartNavyIcon,
    DonutChartIcon,
    PercentStackAreaChartIcon,
    PercentStackBarChartIcon,
    PercentStackHorizontalBarChartIcon,
    PieChartIcon,
    PieChartNavyIcon,
    SmoothLineChartIcon,
    StackAreaChartIcon,
    StackBarChartIcon,
    StackHorizontalBarChartIcon,
    StatisticCardIcon,
    StepLineChartIcon,
    TableViewIcon,
} from '../icons'; // 最大字符数

// 最大字符数
export const MaxCharNum = 12;
// 最大字符长度
export const MaxCharLength = 60;
// 表格组件展示所有字段的值
export const TableVisibleAllFieldsValue = '0';

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

export const ViewTypes = Object.freeze({
    TABLE: 'table',
});

export const OtherTypes = Object.freeze({
    STATISTIC_CARD: 'statisticCard',
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
        key: ChartTypes.INTERVAL,
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
        key: ChartTypes.LINE,
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
        key: ChartTypes.AREA,
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
        key: ChartTypes.HORIZONTAL_BAR,
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
        key: ChartTypes.PIE,
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
    {
        label: '视图',
        key: 'view',
        options: [
            {
                label: '表格',
                value: ViewTypes.TABLE,
                icon: TableViewIcon,
            },
        ],
    },
    {
        label: '其他',
        key: 'other',
        options: [
            {
                label: '指标卡',
                value: OtherTypes.STATISTIC_CARD,
                icon: StatisticCardIcon,
            },
        ],
    },
];

const getDrawerChartTypes = () => [
    {
        label: '柱状图',
        value: ChartTypes.INTERVAL,
        icon: BasicBarChartNavyIcon,
        children: [
            {
                label: '基础柱状图',
                value: IntervalChartTypes.BASE,
            },
            {
                label: '堆积柱状图',
                value: IntervalChartTypes.STACK,
            },
            {
                label: '百分比堆积柱状图',
                value: IntervalChartTypes.PERCENT_STACK,
            },
        ],
    },
    {
        label: '折线图',
        value: ChartTypes.LINE,
        icon: BasicLineChartNavyIcon,
        children: [
            {
                label: '基础折线图',
                value: LineChartTypes.BASE,
            },
            {
                label: '平滑折线图',
                value: LineChartTypes.SMOOTH,
            },
            {
                label: '阶梯图',
                value: LineChartTypes.STEP,
            },
        ],
    },
    {
        label: '面积图',
        value: ChartTypes.AREA,
        icon: AreaChartNavyIcon,
        children: [
            {
                label: '面积图',
                value: AreaChartTypes.BASE,
            },
            {
                label: '堆积面积图',
                value: AreaChartTypes.STACK,
            },
            {
                label: '百分比堆积面积图',
                value: AreaChartTypes.PERCENT_STACK,
            },
        ],
    },
    {
        label: '条形图',
        value: ChartTypes.HORIZONTAL_BAR,
        icon: BasicHorizontalBarChartNavyIcon,
        children: [
            {
                label: '基础条形图',
                value: HorizontalChartTypes.BASE,
            },
            {
                label: '堆积条形图',
                value: HorizontalChartTypes.STACK,
            },
            {
                label: '百分比堆积条形图',
                value: HorizontalChartTypes.PERCENT_STACK,
            },
        ],
    },
    {
        label: '饼图',
        value: ChartTypes.PIE,
        icon: PieChartNavyIcon,
        children: [
            {
                label: '饼图',
                value: PieChartTypes.BASE,
            },
            {
                label: '环形图',
                value: PieChartTypes.RING,
            },
        ],
    },
    // {
    //     label: '表格',
    //     value: ViewTypes.TABLE,
    //     icon: TableViewNavyIcon,
    // },
    // {
    //     label: '指标卡',
    //     value: OtherTypes.STATISTIC_CARD,
    //     icon: StatisticCardNavyIcon,
    // },
];

const getConfigCollections = () => ({
    legendPositions: getPositions(),
    // positions: getPositions(),
    chartTypes: getChartTypes(),
    drawerChartTypes: getDrawerChartTypes(),
    // axisModes: getAxisModes(),
    // scaleTypes: getScaleTypes(),
    // chartModes: getChartModes(),
    // interpolationModes: getInterpolationModes(),
    // thresholdLineStyles: getThresholdLineStyles(),
});

export { getChartTypes, getConfigCollections, getDrawerChartTypes, getKeywordComparisonSymbols, getPositions };
