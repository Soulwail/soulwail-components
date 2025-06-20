import { Chart, Data } from '@antv/g2';
import { Empty, Spin } from 'antd';
import { debounce } from 'lodash';
import ResizeObserver from 'rc-resize-observer';
import React, { useEffect, useImperativeHandle, useLayoutEffect, useRef, useState } from 'react';

import { VisualizeContextProps } from '../../../context';
import useStyles from './style';

interface ChartRenderProps {
    /** - 延迟渲染时间 */
    debounceTime?: number;
    /** 容器高度 */
    contentHeight: number;
    /** - 加载状体啊 */
    loading?: boolean;
    /** 尺寸 */
    size?: VisualizeContextProps['size'];
    /** - 图表绘制后 */
    onAfterPaint?: () => void;
    /** Ref for imperative methods */
    renderRef?: React.Ref<ChartRenderRef>;
}

interface ChartRenderRef {
    /** - 渲染图表 */
    renderChart: (options: Chart['options'], data: Data) => Promise<void>;
}

// 自定义图表主题色
const CUSTOM_CATEGORY_10 = [
    '#0db7f0',
    '#fa9f1b',
    '#71cf11',
    '#0280f5',
    '#e45240',
    '#ffe405',
    '#ab47bc',
    '#26a69a',
    '#24447f',
    '#b6bbc2',
];

const ChartRender: React.FC<ChartRenderProps> = (props) => {
    const { contentHeight, debounceTime = 500, loading, size = 'medium', onAfterPaint } = props;

    const chartRef = useRef<HTMLDivElement>(null);
    const chart = useRef<Chart>();

    const [isEmpty, setIsEmpty] = useState<boolean>(true); // chart data 是否为空

    const { styles } = useStyles({ contentHeight, isEmpty, size });

    /**
     * - 渲染图表
     * @param options 图表配置
     * @param data 图表数据
     */
    const renderChart = async (options: Chart['options'], data: Data) => {
        try {
            // 判断图表是否有数据
            if (data?.value && Array.isArray(data.value) && data.value.length > 0) {
                setIsEmpty(false);
            } else {
                setIsEmpty(true);
            }

            if (chart) {
                // 清楚旧配置
                chart.current.clear();
                // 设置新的配置
                chart.current.options(options);
                // 设置主题配色
                chart.current.options({ theme: { category10: CUSTOM_CATEGORY_10 } });
                // 更新数据
                chart.current.data(data);
                // 图表绘制后执行该事件
                chart.current.on('afterpaint', () => {
                    onAfterPaint?.();
                });

                // 重新渲染
                await chart.current.render();

                return Promise.resolve();
            }

            return Promise.reject('图表类不存在');
        } catch (err) {
            return Promise.reject(err);
        }
    };

    // 抛出到父组件的调用函数
    useImperativeHandle(props.renderRef, () => {
        return {
            renderChart,
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
    }, []);

    const handleResize = () => {
        console.log('✅ 最终触发 resize，处理逻辑执行');
        // 改变尺寸时，进行刷新
        if (chart.current) {
            chart.current?.render();
        }
    };

    // 缓存 debounce
    const debounceResizeHandlerRef = useRef(
        debounce(() => {
            handleResize();
        }, debounceTime),
    );

    // 清除 debounce
    useEffect(() => {
        return () => {
            debounceResizeHandlerRef.current.cancel?.();
        };
    }, []);

    return (
        <ResizeObserver
            onResize={() => {
                // 改变尺寸时，图表重新渲染
                debounceResizeHandlerRef.current?.();
            }}
        >
            <div style={{ height: '100%', width: '100%' }}>
                {/*该 div 用于 ResizeObserver 获得 width 和 height*/}
                <Spin spinning={loading} className={styles['spin-box']}>
                    {/* 空数据展示 */}
                    {isEmpty ? <Empty className={styles['empty-box']} image={Empty.PRESENTED_IMAGE_SIMPLE} /> : null}

                    {/* - 图表渲染 */}
                    <div ref={chartRef} className={styles['chart-box']} />
                </Spin>
            </div>
        </ResizeObserver>
    );
};

export { ChartRender };
export type { ChartRenderProps, ChartRenderRef };
