import { Chart, Data } from '@antv/g2';
import { Button, Form, FormInstance, FormProps } from 'antd';
import { NamePath } from 'antd/es/form/interface';
import { defaultsDeep } from 'lodash';
import { forwardRef, useEffect, useImperativeHandle, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { ChartRender, ChartRenderRef, StatisticCard, TableCard, VisualizeLayout } from './components';
import VisualizeContext, { VisualizeContextProps } from './context';
import useStyles from './style';
import { TransformReturn, VisTypeDefinitionProps, visualizations } from './typeVislib';
import { FormStatisticCardOptionProps } from './typeVislib/statisticCard';
import {
    buildChartDataAndOptions,
    ChartTypes,
    getDrawerChartTypes,
    IntervalChartTypes,
    OtherTypes,
    PieChartTypes,
    TableVisibleAllFieldsValue,
    ViewTypes,
} from './utils';

const chartTypeOptions = getDrawerChartTypes();

/** 操作回调 */
type Operate<T = void> = (values: Record<string, any>, options: Chart['options'], data: Data) => Promise<T>;

type VisualizeFormProps = Pick<FormProps, 'layout' | 'labelCol' | 'labelAlign' | 'labelWrap'> &
    Pick<VisualizeContextProps['formProps'], 'categoryList' | 'dataSourceLabel' | 'dataSource' | 'dataSourceMode'> & {
        /** - 初始值 */
        initialValues?: Record<string, any>;
    };

export interface VisualizeProps {
    /** - 内容展示高度 */
    height?: number;
    /** - 容器间距尺寸 */
    size?: VisualizeContextProps['size'];
    /** - 整体布局 */
    layout?: VisualizeContextProps['layout'];
    /** - 操作按钮渲染 */
    optionsRender?: VisualizeContextProps['chartOptionsRender'];
    /** - form 配置 */
    formProps: VisualizeFormProps;
    /** - 字段值更新时触发回调事件 */
    onValueChange?: FormProps['onValuesChange'];
    /** - 生成按钮回调 */
    onGenerate?: Operate<TransformReturn>;
    /** - 保存按钮回调 */
    onSave?: Operate;
}

export interface VisualizeRef {
    /** - 设置单个字段值 */
    setFieldValue: FormInstance['setFieldValue'];
    /** - 设置多个字段值 */
    setFieldsValue?: FormInstance['setFieldsValue'];
    /** - 获取图表配置 */
    transformConfig?: VisTypeDefinitionProps['transformConfig'];
}

const Visualize = forwardRef<VisualizeRef, VisualizeProps>((props, ref) => {
    const { height = 680, size = 'medium', layout = 'feishu', formProps, onValueChange, onGenerate, onSave } = props;
    const {
        initialValues = {},
        dataSourceLabel = '数据来源',
        dataSource = [],
        dataSourceMode,
        categoryList = [],
        ...resetProps
    } = formProps;
    const { styles } = useStyles();

    const renderRef = useRef<ChartRenderRef>();
    const statisticRef = useRef<ChartRenderRef>(null);
    const tableRef = useRef<ChartRenderRef>(null);

    const [form] = Form.useForm();
    const chartType = Form.useWatch('chartType', form);
    const x = Form.useWatch(['encode', 'x'], form);

    const [visTypeDefinition, setVisTypeDefinition] = useState<VisTypeDefinitionProps>(); // 不同图形的可视化配置
    const [prevChartVisType, setPrevChartVisType] = useState<string>('');
    const [chartVisType, setChartVisType] = useState<string>('');
    const [generateLoading, setGenerateLoading] = useState<boolean>(false); // 预览加载
    const [saveLoading, setSaveLoading] = useState<boolean>(false); // 保存加载

    /** - 图表类型 */
    const visType: string = useMemo(() => {
        console.log(333, chartType);

        if (chartType) {
            const chartTypeArr = chartType.split('_');

            return chartTypeArr[0];
        } else {
            return '';
        }
    }, [chartType]);

    /** - 容器高度 */
    const contentHeight = useMemo(() => {
        return typeof height === 'number' ? height : 500;
    }, [height]);

    /** - 分组聚合可选字段 */
    const colorCategoryList = useMemo(() => {
        return categoryList.filter((item) => item.value !== x);
    }, [x]);

    // 抛出到父组件的调用函数
    useImperativeHandle(ref, () => {
        return {
            setFieldValue: (name: NamePath, value) => {
                if (Array.isArray(name)) {
                    if (name[0] === 'encode') {
                        // 所有图表的 y 轴固定为总数，不可修改
                        if (name[1] === 'y') return;

                        // 如果图表是折线图或面积图，x 轴固定为时间，不可修改
                        if (visType === ChartTypes.LINE || visType === ChartTypes.AREA) {
                            if (name[1] === 'x') return;
                        }
                    }
                }

                // TODO: 只允许单独修改数据来源、横轴字段、分组聚合开关、分组聚合字段
                form.setFieldValue(name, value);
            },
            transformConfig: visTypeDefinition?.transformConfig,
        };
    });

    useLayoutEffect(() => {
        // 设置初始图表类型
        let type = layout === 'feishu' ? ChartTypes.INTERVAL : ChartTypes.PIE;
        let subType = layout === 'feishu' ? IntervalChartTypes.BASE : PieChartTypes.BASE;

        // 如果组件传入了图表类型，则使用传入的
        if (initialValues.chartType) {
            const chartTypeArr = initialValues.chartType.split('_');

            type = chartTypeArr[0];
            subType = chartTypeArr[1];
        }

        // 获取图表类型的默认配置
        const definition = visualizations.find((item) => item.name === type);

        if (definition) {
            setVisTypeDefinition(definition);
            setPrevChartVisType(type);

            // drawer 布局下，设置初始值
            const chartDrawerConfig: { chartParentType?: string; chartSubType?: string } = {};

            if (layout === 'drawer') {
                chartDrawerConfig.chartParentType = type;
                chartDrawerConfig.chartSubType = subType;
            }

            // 将默认配置与传入的初始配置进行覆盖合并，得到新的配置值
            const values = defaultsDeep(initialValues, definition.visConfig.defaults, chartDrawerConfig);

            // 设置表单初始值
            form.setFieldsValue(values);
        }
    }, [JSON.stringify(initialValues)]);

    useEffect(() => {
        if (chartVisType) {
            console.log('图表类型切换', chartVisType);

            const allValues = form.getFieldsValue(true);
            // 获取图表类型的默认配置
            const definition = visualizations.find((item) => item.name === chartVisType);

            // console.log('allValues', allValues);

            // 初始化 newFormValue 对象，确保嵌套属性结构存在
            const newFormValue: Record<string, any> = {
                encode: {},
                transform: {
                    sortX: {},
                },
                style: {},
            };

            // 切换到柱状图或条形图
            if (
                chartVisType === ChartTypes.INTERVAL ||
                chartVisType === ChartTypes.HORIZONTAL_BAR ||
                chartVisType === OtherTypes.STATISTIC_CARD
            ) {
                // 如果上一次是折线图或面积图，或者是表格
                if (
                    prevChartVisType === ChartTypes.LINE ||
                    prevChartVisType === ChartTypes.AREA ||
                    prevChartVisType === ViewTypes.TABLE
                ) {
                    // 将横轴的时间转为字段选项
                    newFormValue.encode.x = categoryList[0]?.value;
                }

                // 设置排序默认值
                if (prevChartVisType === ChartTypes.PIE) {
                    if (allValues.transform.sortX.by === 'color') {
                        newFormValue.transform.sortX.by = 'x';
                    }
                }
            } else if (chartVisType === ChartTypes.LINE || chartVisType === ChartTypes.AREA) {
                // 如果切换到折线图或面积图
                // 设置横轴固定为时间
                newFormValue.encode.x = 'time';

                // 设置面积图的折线类型
                if (chartVisType === ChartTypes.AREA) {
                    newFormValue.style.shape = 'area';
                }

                // 设置排序默认值
                if (prevChartVisType === ChartTypes.PIE) {
                    if (allValues.transform.sortX.by === 'color') {
                        newFormValue.transform.sortX.by = 'x';
                    }
                }
            } else if (chartVisType === ChartTypes.PIE) {
                // 如果上一次是折线图或面积图，或者是表格
                if (
                    prevChartVisType === ChartTypes.LINE ||
                    prevChartVisType === ChartTypes.AREA ||
                    prevChartVisType === ViewTypes.TABLE
                ) {
                    console.log('prevChartVisType', prevChartVisType, categoryList[0]?.value);
                    newFormValue.encode.x = categoryList[0]?.value;
                } else {
                    newFormValue.encode.x = allValues.encode.x;
                }

                // 设置排序默认值
                if (allValues.transform.sortX.by === 'x') {
                    newFormValue.transform.sortX.by = 'color';
                }
            } else if (chartVisType === ViewTypes.TABLE) {
                // 如果切换到表格
                // 设置可见字段为全部字段
                newFormValue.encode.x = [TableVisibleAllFieldsValue];
            }

            // 如果上一次是面积图，需要移除 style: { shape: 'area' } 属性，否则会影响其它图表的渲染
            if (prevChartVisType === ChartTypes.AREA && Reflect.has(allValues, 'style')) {
                Reflect.deleteProperty(allValues.style, 'shape');
            }

            // 使用默认值，将图表缺失的默认属性补齐
            const newValues = defaultsDeep(newFormValue, allValues, definition.visConfig.defaults);

            console.log(newValues);

            form.setFieldsValue(newValues);
            setPrevChartVisType(chartVisType);
        }
    }, [chartVisType]);

    /**
     * - 更新 definition
     * @param chartType
     */
    const updateDefinition = (chartType: string) => {
        const definition = visualizations.find((item) => item.name === chartType);

        // console.log('definition', definition);
        // 获取图表的配置
        setVisTypeDefinition(definition);
        // 存储图表类型
        setChartVisType(chartType);

        // 设置 default value
        // 设置其它初始值，转到 useEffect<chartVisType>
        if (chartType === OtherTypes.STATISTIC_CARD) {
            // 如果切换到指标卡
            form.setFieldValue(
                'formatter',
                (definition as VisTypeDefinitionProps<FormStatisticCardOptionProps>).visConfig.defaults.formatter,
            );
        }
    };

    /**
     * - 监听值变化
     */
    const onValuesChange = (value: Record<string, any>, allValues: Record<string, any>) => {
        console.log(444, value);

        if (layout === 'feishu') {
            if (Reflect.has(value, 'chartType')) {
                const chartTypeArr = value.chartType.split('_');
                updateDefinition(chartTypeArr[0]);
            }
        } else if (layout === 'drawer') {
            if (Reflect.has(value, 'chartParentType')) {
                const subTypeList =
                    chartTypeOptions.find((item) => item.value === value.chartParentType)?.children || [];
                const subType = subTypeList[0]?.value;
                const chartType = subType ? `${value.chartParentType}_${subTypeList[0]?.value}` : value.chartParentType;

                updateDefinition(value.chartParentType);

                form.setFieldValue('chartSubType', subType);
                form.setFieldValue('chartType', chartType);
            } else if (Reflect.has(value, 'chartSubType')) {
                const parentType = allValues.chartParentType;
                const chartType = value.chartSubType ? `${parentType}_${value.chartSubType}` : parentType;

                updateDefinition(parentType);

                form.setFieldValue('chartType', chartType);
            }
        }

        if (visTypeDefinition) {
            visTypeDefinition?.onChangeConfig?.(value, allValues, form, {
                categoryList,
                colorCategoryList,
            });
        }

        onValueChange?.(value, allValues);
    };

    /**
     * - 预览按钮
     */
    const handleGenerate = async (formInstance: FormInstance) => {
        try {
            setGenerateLoading(true);

            const { values, options, data } = await buildChartDataAndOptions(formInstance, visTypeDefinition);
            console.log(options, data);
            // 触发预览函数
            const { options: newOptions, data: newData } = await onGenerate?.(values, options, data);

            // 获取新的 options 和 data 并渲染
            const ref =
                visType === OtherTypes.STATISTIC_CARD
                    ? statisticRef
                    : visType === ViewTypes.TABLE
                    ? tableRef
                    : renderRef;
            await ref.current?.renderChart(newOptions, newData);
        } catch (err) {
            console.error(err);
        }

        setGenerateLoading(false);
    };

    /**
     * - 保存按钮
     * @param formInstance
     */
    const handleSave = async (formInstance: FormInstance) => {
        try {
            setSaveLoading(true);

            const { values, options, data } = await buildChartDataAndOptions(formInstance, visTypeDefinition);

            // 触发保存函数
            await onSave?.(values, options, data);
        } catch (err) {
            console.error(err);
        }

        setSaveLoading(false);
    };

    /**
     * - 操作按钮配置
     * @param formInstance
     */
    const chartOptionsRender: VisualizeContextProps['chartOptionsRender'] = (formInstance) => [
        <Button
            key="gene"
            disabled={saveLoading}
            loading={generateLoading}
            onClick={() => {
                handleGenerate(formInstance);
            }}
        >
            预览
        </Button>,
        <Button
            key="save"
            type="primary"
            disabled={generateLoading}
            loading={saveLoading}
            onClick={() => {
                handleSave(formInstance);
            }}
        >
            保存
        </Button>,
    ];

    return (
        <VisualizeContext.Provider
            value={{
                contentHeight,
                size,
                layout,
                visTypeDefinition,
                formProps: {
                    dataSourceLabel,
                    dataSource,
                    dataSourceMode,
                    categoryList,
                    colorCategoryList,
                },
                chartOptionsRender,
            }}
        >
            <Form form={form} {...resetProps} onValuesChange={onValuesChange} style={{ height: '100%' }}>
                <VisualizeLayout visType={visType}>
                    {visType === OtherTypes.STATISTIC_CARD ? (
                        <div className={styles['statistic-card-preview-box']}>
                            <StatisticCard
                                className={styles['statistic-card-preview-content']}
                                renderRef={statisticRef}
                                loading={generateLoading}
                            />
                        </div>
                    ) : null}

                    {visType === ViewTypes.TABLE ? <TableCard size={size} renderRef={tableRef} /> : null}

                    {visType !== OtherTypes.STATISTIC_CARD && visType !== ViewTypes.TABLE ? (
                        <ChartRender
                            renderRef={renderRef}
                            size={size}
                            contentHeight={contentHeight}
                            loading={generateLoading}
                            onAfterPaint={() => {
                                setGenerateLoading(false);
                            }}
                        />
                    ) : null}
                </VisualizeLayout>
            </Form>
        </VisualizeContext.Provider>
    );
});

export { Visualize };
