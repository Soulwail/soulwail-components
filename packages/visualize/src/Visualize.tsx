import { Chart, Data } from '@antv/g2';
import {
    Button,
    Col,
    Empty,
    Form,
    FormInstance,
    FormProps,
    Row,
    Tabs,
} from 'antd';
import { cloneDeep, defaultsDeep } from 'lodash';
import {
    forwardRef,
    useEffect,
    useImperativeHandle,
    useLayoutEffect,
    useMemo,
    useRef,
    useState,
} from 'react';
import { EditConfig, VisConfig } from './components';
import VisualizeContext, { VisualizeContextProps } from './context';
import { VisTypeDefinitionProps, visualizations } from './typeVislib';
import { ChartTypes } from './utils/collections';

type Operate = (values: Record<string, any>, options: Chart['options']) => void;

export interface VisualizeProps {
    /** - 数据来源 */
    dataSource: any[];
    /** - 内容展示高度 */
    height?: number;
    /** - 初始值 */
    initialValues?: Record<string, any>;
    /** - 横轴选项 */
    categoryList: VisualizeContextProps['categoryList'];
    /** - 字段值更新时触发回调事件 */
    onValueChange?: FormProps['onValuesChange'];
    /** - 生成按钮回调 */
    onGenerate?: Operate;
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
    /** - 渲染图表 */
    renderChart: (options: Chart['options']) => void;
    /** - 获取图表配置 */
    transformConfig?: VisTypeDefinitionProps['transformConfig'];
}

const Visualize = forwardRef<VisualizeRef, VisualizeProps>((props, ref) => {
    const {
        height = 680,
        initialValues = {},
        dataSource = [],
        categoryList = [],
        onValueChange,
        onGenerate,
        onSave,
        optionsRender,
    } = props;
    const chartRef = useRef<HTMLDivElement>(null);
    const chart = useRef<Chart>();

    const [form] = Form.useForm();
    const chartType = Form.useWatch('chartType', form);
    const x = Form.useWatch(['encode', 'x'], form);

    const [visTypeDefinition, setVisTypeDefinition] =
        useState<VisTypeDefinitionProps>(); // 不同图形的可视化配置
    const [prevChartVisType, setPrevChartVisType] = useState<string>('');
    const [chartVisType, setChartVisType] = useState<string>('');
    const [isEmpty, setIsEmpty] = useState<boolean>(true); // chart data 是否为空

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

    const colorCategoryList = useMemo(() => {
        return categoryList.filter((item) => item.value !== x);
    }, [x]);

    /**
     * - 渲染图表
     */
    const renderChart = (options: Chart['options'] & Data) => {
        if (
            (options?.data &&
                Array.isArray(options.data) &&
                options.data.length > 0) ||
            (options.data?.value &&
                Array.isArray(options.data.value) &&
                options.data.value.length > 0)
        ) {
            setIsEmpty(false);
        } else {
            setIsEmpty(true);
        }

        if (chart.current) {
            // 清楚旧配置
            chart.current.clear();
            // 设置新的配置
            chart.current.options(options);
            // 重新渲染
            chart.current.render();
        }
    };

    /**
     * - 转换图表配置
     */

    useImperativeHandle(ref, () => {
        return {
            setFieldsValue: (values) => {
                // if ([ChartTypes.AREA, ChartTypes.LINE].includes(visType)) {
                // } else {
                //   form.setFieldsValue(values);
                // }

                form.setFieldsValue(values);
            },
            setFieldValue: (name, value) => {
                if (name[0] === 'encode') {
                    if (name[1] === 'y') return; // 所有图表的 y 都固定为总数

                    if (
                        name[1] === 'x' &&
                        // @ts-ignore
                        [ChartTypes.AREA, ChartTypes.LINE].includes(visType)
                    )
                        return; // 面积图、趋势图的 x 轴固定为时间
                }

                form.setFieldValue(name, value);
            },
            renderChart,
            transformConfig: visTypeDefinition?.transformConfig,
        };
    });

    useLayoutEffect(() => {
        console.log(111);
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
            const values = defaultsDeep(
                initialValues,
                definition.visConfig.defaults,
            );

            // 设置表单初始值
            form.setFieldsValue(values);
        }
    }, []);

    useEffect(() => {
        if (chartVisType) {
            console.log('图表类型切换', chartVisType);

            const allValues = form.getFieldsValue(true);

            console.log('allValues', allValues);

            // 切换到柱状图或条形图
            if (
                chartVisType === ChartTypes.INTERVAL ||
                chartVisType === ChartTypes.HORIZONTAL_BAR
            ) {
                // 如果上一次是折线图或面积图
                if (
                    prevChartVisType === ChartTypes.LINE ||
                    prevChartVisType === ChartTypes.AREA
                ) {
                    // 判断是否开启分组聚合，如果开启了，则设置值，否则不设置
                    form.setFieldValue(
                        ['encode', 'color'],
                        allValues.encodeColor
                            ? colorCategoryList[0]?.value
                            : null,
                    );
                }

                // 设置排序默认值
                if (prevChartVisType === ChartTypes.PIE) {
                    if (allValues.transform.sortX.by === 'color') {
                        form.setFieldValue(['transform', 'sortX', 'by'], 'x');
                    }
                }
            } else if (
                chartVisType === ChartTypes.LINE ||
                chartVisType === ChartTypes.AREA
            ) {
                // 如果切换到折线图或面积图
                if (
                    prevChartVisType === ChartTypes.INTERVAL ||
                    prevChartVisType === ChartTypes.AREA
                ) {
                    // form.setFieldValue(['encode', 'x'], allValues.encode.x);
                }

                // 设置横轴固定为时间
                form.setFieldValue(['encode', 'color'], 'time');

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
    const onValuesChange = (
        value: Record<string, any>,
        allValues: Record<string, any>,
    ) => {
        console.log(444, value);

        if (Reflect.has(value, 'chartType')) {
            const chartTypeArr = value.chartType.split('_');
            const definition = visualizations.find(
                (item) => item.name === chartTypeArr[0],
            );

            // console.log('definition', definition);
            // 获取图表的配置
            setVisTypeDefinition(definition);
            // 存储图表类型
            setChartVisType(chartTypeArr[0]);
        } else {
            if (visTypeDefinition) {
                visTypeDefinition.onChangeConfig(value, allValues, form, {
                    categoryList,
                    colorCategoryList,
                });
            }
        }

        onValueChange?.(value, allValues);
    };

    /**
     * - 构建图表数据和配置
     * @param formInstance
     */
    const buildChartDataAndOptions = async (formInstance: FormInstance) => {
        try {
            await formInstance.validateFields();

            const values = formInstance.getFieldsValue(true);
            const newValues = cloneDeep(values);
            const [chartType] = values.chartType.split('_');
            let options = null;

            if (visTypeDefinition) {
                options = visTypeDefinition.transformConfig(values);

                console.log('chart options', options);

                // 取值转换
                if (
                    chartType === ChartTypes.LINE ||
                    chartType === ChartTypes.AREA
                ) {
                    // TODO:
                } else if (chartType === ChartTypes.PIE) {
                    Reflect.set(newValues.encode, 'color', null);
                } else {
                    // 如果没有开启分组聚合，则 color 需要设置为 null
                    if (!values.encodeColor) {
                        Reflect.set(newValues.encode, 'color', null);
                    }
                }
            }

            return Promise.resolve({ values: newValues, options });
        } catch (err) {
            return Promise.reject(err);
        }
    };

    /**
     * - 生成按钮
     */
    const handleGenerate = async (formInstance: FormInstance) => {
        try {
            const { values, options } = await buildChartDataAndOptions(
                formInstance,
            );

            onGenerate?.(values, options);
        } catch (err) {}
    };

    /**
     * - 保存按钮
     * @param formInstance
     */
    const handleSave = async (formInstance: FormInstance) => {
        try {
            const { values, options } = await buildChartDataAndOptions(
                formInstance,
            );

            onSave?.(values, options);
        } catch (err) {}
    };

    /**
     * - 操作按钮配置
     * @param formInstance
     */
    const chartOptionsRender: VisualizeContextProps['chartOptionsRender'] = (
        formInstance,
    ) => {
        return optionsRender
            ? optionsRender(formInstance)
            : [
                  <Button
                      key="gene"
                      onClick={() => {
                          handleGenerate(formInstance);
                      }}
                  >
                      生成
                  </Button>,
                  <Button
                      key="save"
                      type="primary"
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
                visTypeDefinition,
                categoryList,
                colorCategoryList,
                chartOptionsRender,
            }}
        >
            <Row wrap={false}>
                <Col flex="auto">
                    {isEmpty ? (
                        <Empty
                            image={Empty.PRESENTED_IMAGE_SIMPLE}
                            style={{
                                marginTop: 'calc(50% - 35px)',
                                position: 'absolute',
                                width: 'calc(100% - 16px)',
                            }}
                        />
                    ) : null}

                    <div ref={chartRef} style={{ height: contentHeight }} />
                </Col>
                <Col flex="340px">
                    <Form
                        form={form}
                        layout="vertical"
                        onValuesChange={onValuesChange}
                    >
                        <Tabs
                            centered
                            items={[
                                {
                                    key: 'vis',
                                    label: '类型与数据',
                                    forceRender: true,
                                    children: (
                                        <VisConfig dataSource={dataSource} />
                                    ),
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
