import { Chart, Data } from '@antv/g2';
import { Empty, Spin } from 'antd';
import React, { useImperativeHandle, useLayoutEffect, useRef, useState } from 'react';
import { VisualizeContextProps } from '../../../context';

interface ChartRenderProps {
    /** 容器高度 */
    contentHeight: number;
    /** - 加载状体啊 */
    loading?: boolean;
    /** 尺寸 */
    size: VisualizeContextProps['size'];
    /** - 图表绘制后 */
    onAfterPaint?: () => void;
    /** Ref for imperative methods */
    renderRef?: React.Ref<ChartRenderRef>;
}

interface ChartRenderRef {
    /** - 渲染图表 */
    renderChart: (options: Chart['options'], data: Data) => Promise<void>;
}

const ChartRender: React.FC<ChartRenderProps> = (props) => {
    const { contentHeight, loading, size, onAfterPaint } = props;

    const chartRef = useRef<HTMLDivElement>(null);
    const chart = useRef<Chart>();

    const [isEmpty, setIsEmpty] = useState<boolean>(true); // chart data 是否为空

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

    return (
        <Spin
            wrapperClassName="spin-container"
            spinning={loading}
            style={{
                // Spin 垂直居中
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
            }}
        >
            {/* 空数据展示 */}
            {isEmpty ? (
                <Empty
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                    style={{
                        top: `calc(${contentHeight / 2}px - ${size === 'medium' ? 60 : 53}px)`,
                        width: 'calc(100% - 16px)',
                        position: 'absolute',
                    }}
                />
            ) : null}

            {/* - 图表渲染 */}
            <div ref={chartRef} style={{ height: contentHeight, display: isEmpty ? 'none' : 'block' }} />
        </Spin>
    );
};

export { ChartRender };
export type { ChartRenderProps, ChartRenderRef };
