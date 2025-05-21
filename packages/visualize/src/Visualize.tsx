import { Chart, Data } from '@antv/g2';
import { Button, Col, Form, FormInstance, FormProps, Row, SelectProps, Tabs } from 'antd';
import { NamePath } from 'antd/es/form/interface';
import { defaultsDeep } from 'lodash';
import { forwardRef, useEffect, useImperativeHandle, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { ChartRender, ChartRenderRef, EditConfig, StatisticCard, VisConfig } from './components';
import VisualizeContext, { VisualizeContextProps } from './context';
import { TransformReturn, VisTypeDefinitionProps, visualizations } from './typeVislib';
import { FormStatisticCardOptionProps } from './typeVislib/statisticCard';
import { buildChartDataAndOptions, ChartTypes, OtherTypes } from './utils';

/** 操作回调 */
type Operate<T = void> = (values: Record<string, any>, options: Chart['options'], data: Data) => Promise<T>;

export interface VisualizeProps {
    /** - 数据来源 */
    dataSource: any[];
    /** - 数据来源是否多选 */
    dataSourceMode?: SelectProps['mode'];
    /** - 内容展示高度 */
    height?: number;
    /** - 容器间距尺寸 */
    size?: 'small' | 'medium';
    /** - 初始值 */
    initialValues?: Record<string, any>;
    /** - 横轴选项 */
    categoryList: VisualizeContextProps['categoryList'];
    /** - 字段值更新时触发回调事件 */
    onValueChange?: FormProps['onValuesChange'];
    /** - 生成按钮回调 */
    onGenerate?: Operate<TransformReturn>;
    /** - 保存按钮回调 */
    onSave?: Operate;
    /** - 操作按钮渲染 */
    optionsRender?: VisualizeContextProps['chartOptionsRender'];
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
    const {
        height = 680,
        size = 'medium',
        initialValues = {},
        dataSource = [],
        dataSourceMode,
        categoryList = [],
        onValueChange,
        onGenerate,
        onSave,
        optionsRender,
    } = props;
    const chartRef = useRef<HTMLDivElement>(null);
    const chart = useRef<Chart>();
    const renderRef = useRef<ChartRenderRef>();
    const statisticRef = useRef<ChartRenderRef>(null);

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
        // 初始化 chart 类
        if (chartRef.current) {
            console.log('初始化图表类--成功');
            chart.current = new Chart({
                container: chartRef.current,
                autoFit: true,
            });
        }

        // 设置初始图表类型
        let type = ChartTypes.INTERVAL;

        // 如果组件传入了图表类型，则使用传入的
        if (initialValues.chartType) {
            const chartTypeArr = initialValues.chartType.split('_');

            type = chartTypeArr[0];
        }

        // 获取图表类型的默认配置
        const definition = visualizations.find((item) => item.name === type);

        if (definition) {
            setVisTypeDefinition(definition);
            setPrevChartVisType(type);

            // 将默认配置与传入的初始配置进行覆盖合并，得到新的配置值
            const values = defaultsDeep(initialValues, definition.visConfig.defaults);

            // 设置表单初始值
            form.setFieldsValue(values);
        }
    }, []);

    useEffect(() => {
        if (chartVisType) {
            console.log('图表类型切换', chartVisType);

            const allValues = form.getFieldsValue(true);

            // console.log('allValues', allValues);

            // 切换到柱状图或条形图
            if (chartVisType === ChartTypes.INTERVAL || chartVisType === ChartTypes.HORIZONTAL_BAR) {
                // 如果上一次是折线图或面积图
                if (prevChartVisType === ChartTypes.LINE || prevChartVisType === ChartTypes.AREA) {
                    // 将横轴的时间转为字段选项
                    form.setFieldValue(['encode', 'x'], categoryList[0]?.value);
                }

                // 设置排序默认值
                if (prevChartVisType === ChartTypes.PIE) {
                    if (allValues.transform.sortX.by === 'color') {
                        form.setFieldValue(['transform', 'sortX', 'by'], 'x');
                    }
                }
            } else if (chartVisType === ChartTypes.LINE || chartVisType === ChartTypes.AREA) {
                // 如果切换到折线图或面积图
                // 设置横轴固定为时间
                form.setFieldValue(['encode', 'x'], 'time');

                // 设置面积图的折线类型
                if (chartVisType === ChartTypes.AREA) {
                    form.setFieldValue(['style', 'shape'], 'area');
                }

                // 设置排序默认值
                if (prevChartVisType === ChartTypes.PIE) {
                    if (allValues.transform.sortX.by === 'color') {
                        form.setFieldValue(['transform', 'sortX', 'by'], 'x');
                    }
                }
            } else if (chartVisType === ChartTypes.PIE) {
                // 如果切换到饼图
                form.setFieldValue(['encode', 'color'], allValues.encode.x);

                // 设置排序默认值
                if (allValues.transform.sortX.by === 'x') {
                    form.setFieldValue(['transform', 'sortX', 'by'], 'color');
                }
            }

            setPrevChartVisType(chartVisType);
        }
    }, [chartVisType]);

    /**
     * - 监听值变化
     */
    const onValuesChange = (value: Record<string, any>, allValues: Record<string, any>) => {
        // console.log(444, value);

        if (Reflect.has(value, 'chartType')) {
            const chartTypeArr = value.chartType.split('_');
            const definition = visualizations.find((item) => item.name === chartTypeArr[0]);

            // console.log('definition', definition);
            // 获取图表的配置
            setVisTypeDefinition(definition);
            // 存储图表类型
            setChartVisType(chartTypeArr[0]);

            // 设置 default value
            // 设置其它初始值，转到 useEffect<chartVisType>
            if (chartTypeArr[0] === OtherTypes.STATISTIC_CARD) {
                // 如果切换到指标卡
                form.setFieldValue(
                    'formatter',
                    (definition as VisTypeDefinitionProps<FormStatisticCardOptionProps>).visConfig.defaults.formatter,
                );
            }
        } else {
            if (visTypeDefinition) {
                visTypeDefinition?.onChangeConfig?.(value, allValues, form, {
                    categoryList,
                    colorCategoryList,
                });
            }
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
            // 触发预览函数
            const { options: newOptions, data: newData } = await onGenerate?.(values, options, data);

            // 获取新的 options 和 data 并渲染
            const ref = visType === OtherTypes.STATISTIC_CARD ? statisticRef : renderRef;
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
        } catch (err) {}

        setSaveLoading(false);
    };

    /**
     * - 操作按钮配置
     * @param formInstance
     */
    const chartOptionsRender: VisualizeContextProps['chartOptionsRender'] = (formInstance) => {
        return optionsRender
            ? optionsRender(formInstance)
            : [
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
    };

    return (
        <VisualizeContext.Provider
            value={{
                contentHeight,
                size,
                visTypeDefinition,
                categoryList,
                colorCategoryList,
                chartOptionsRender,
            }}
        >
            <Row wrap={false}>
                <Col flex="auto">
                    {visType === OtherTypes.STATISTIC_CARD ? (
                        <div
                            style={{
                                height: '100%',
                                width: '100%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                padding: 0,
                            }}
                        >
                            <StatisticCard
                                renderRef={statisticRef}
                                loading={generateLoading}
                                style={{
                                    padding: '6px 48px',
                                    maxWidth: '223.766px',
                                    minWidth: '330px',
                                    height: '278px',
                                }}
                            />
                        </div>
                    ) : (
                        <ChartRender
                            renderRef={renderRef}
                            size={size}
                            contentHeight={contentHeight}
                            loading={generateLoading}
                            onAfterPaint={() => {
                                setGenerateLoading(false);
                            }}
                        />
                    )}
                </Col>

                <Col flex="340px">
                    <Form form={form} layout="vertical" onValuesChange={onValuesChange}>
                        <Tabs
                            centered
                            items={[
                                {
                                    key: 'vis',
                                    label: '类型与数据',
                                    forceRender: true,
                                    children: <VisConfig dataSource={dataSource} dataSourceMode={dataSourceMode} />,
                                },
                                {
                                    key: 'editor',
                                    label: '自定义样式',
                                    forceRender: true,
                                    children: <EditConfig />,
                                },
                            ]}
                            style={{ borderLeft: '1px solid #e4e9ec' }}
                        />
                    </Form>
                </Col>
            </Row>
        </VisualizeContext.Provider>
    );
});

export default Visualize;
