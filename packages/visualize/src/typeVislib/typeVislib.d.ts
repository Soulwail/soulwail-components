import { Chart, Data } from '@antv/g2';
import { FormInstance, SelectProps } from 'antd';

/** - 轴配置 */
export interface AxisOptions {
    x?: Record<string, any>;
    y?: Record<string, any>;
    color?: Record<string, any>;
}

/** - 通道配置 */
interface EncodeOptions {
    x?: string;
    y?: string;
    color?: string;
    shape?: string;
}

export interface ChartFormProps {
    /** - 数据来源 */
    dataSource?: SelectProps['options'];
    /** - 图表类型 */
    chartType: string;
    /** - 是否显示图例 */
    showLegend: boolean;
    /** - 图例相关设置 */
    legend: {
        color: Record<string, any>;
    };
    /** - 是否显示标签 */
    showLabel: boolean;
    /** - 通道配置 */
    encode: EncodeOptions;
    /** - 是否开启检索 */
    keywordSearch: boolean;
    /** - 检索内容配置 */
    search: { compare: '==' | 'like'; keyword: string };
}

interface SchemaItem {
    title: string;
    key: string;
}

/**
 * - 配置转换返回值
 */
type TransformReturn = {
    options: Chart['options'];
    data: Data;
};

/**
 * - 配置转换
 * @param values 所有表单值
 * @returns Chart 配置项
 */
type TransformConfig = (values: Record<string, any>) => TransformReturn;

/**
 * - 额外参数
 */
interface ExtraOptProps {
    /** - 类别 */
    categoryList?: SelectProps['options'];
    /** - 分组聚合 */
    colorCategoryList?: SelectProps['options'];
}

/**
 * - 参数改变
 * @param values 修改的值
 * @param allValues 所有的值
 * @param form form 实体
 * @param extraOpts 额外参数
 */
type ChangeConfig = (
    values: Record<string, any>,
    allValues: Record<string, any>,
    form: FormInstance,
    extraOpts: ExtraOptProps /** - 额外参数 */,
) => void;

/**
 * - 可视化
 */
export interface VisTypeDefinitionProps<T = Record<string, any>> {
    name: string;
    title: string;
    visConfig: {
        defaults: T;
        [key: string]: any;
    };
    editorConfig: {
        schemas: SchemaItem[];
        [key: string]: any;
    };
    transformConfig: TransformConfig;
    onChangeConfig: ChangeConfig;
}
