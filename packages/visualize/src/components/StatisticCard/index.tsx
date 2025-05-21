import { StatisticCard as AntdStatisticCard } from '@ant-design/pro-card';
import { Data } from '@antv/g2';
import { Typography } from 'antd';
import React, { CSSProperties, useImperativeHandle, useState } from 'react';
import { ChartOptions } from '../../typeVislib';
import { ChartRenderRef } from '../ChartRender';
import useStyles from './style';

interface StatisticCardProps {
    loading?: boolean;
    style?: React.CSSProperties;
    /** Ref for imperative methods */
    renderRef?: React.Ref<ChartRenderRef>;
}

const { Text } = Typography;

const StatisticCard: React.FC<StatisticCardProps> = (props) => {
    const { loading, style } = props;

    const { styles } = useStyles();

    const [statisticTitle, setStatisticTitle] = useState(''); // 标题
    const [cardBackgroundColor, setCardBackgroundColor] = useState<CSSProperties['backgroundColor']>(''); // 背景色
    const [statisticValue, setStatisticValue] = useState<string | number>(0); // 值
    const [statisticFontColor, setStatisticFontColor] = useState<CSSProperties['color']>(''); // 字体颜色
    const [statisticSeparator, setStatisticSeparator] = useState(''); // 千分位
    const [statisticSuffix, setStatisticSuffix] = useState(''); // 后缀

    /**
     * - 渲染图表
     * @param options 图表配置 包括扩展的 style
     * @param data 图表数据
     */
    const renderChart = async (options: ChartOptions, data: Data) => {
        try {
            let value: number | string = 0;
            let separator = '';
            let suffix = '';

            // 判断图表是否有数据
            if (data?.value && typeof data?.value === 'number') {
                value = data?.value;
            }

            if (options.formatter.format === 'percent') {
                // 设置百分比
                value = (value as number) * 100;
                suffix = '%';
            } else if (options.formatter.format === 'separator') {
                // 设置千分位
                separator = ',';
            }

            // 设置浮点数
            if (options.formatter.fix !== undefined) {
                value = (value as number).toFixed(options.formatter.fix);
            }

            setStatisticValue(value);
            setStatisticSeparator(separator);
            setStatisticSuffix(suffix);
            setCardBackgroundColor(options?.style?.fill || 'initial');
            setStatisticTitle(options.name);
            setStatisticFontColor(options?.style?.contentFill || 'initial');

            return Promise.resolve();
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

    return (
        <div
            className={styles['chart-block-statistics-wrapper']}
            style={{ ...style, backgroundColor: cardBackgroundColor }}
        >
            <AntdStatisticCard
                loading={loading}
                statistic={{
                    title: <Text style={{ color: statisticFontColor, fontSize: '24px' }}>{statisticTitle}</Text>,
                    value: statisticValue,
                    formatter: (value) => {
                        // 获取小数点后面的位数，用于 toLocaleString 时的保留
                        const fixed = String(value).split('.')[1]?.length || 0;
                        const newValue =
                            statisticSeparator === ','
                                ? Number(value).toLocaleString('en-US', {
                                      minimumFractionDigits: fixed,
                                      maximumFractionDigits: fixed,
                                  })
                                : value;

                        return (
                            <Text
                                ellipsis={{
                                    tooltip: (
                                        <Text style={{ color: '#FFF' }}>
                                            {newValue}
                                            {statisticSuffix}
                                        </Text>
                                    ),
                                }}
                                style={{ color: statisticFontColor, fontSize: '50px', fontWeight: 600 }}
                            >
                                {newValue}
                                {statisticSuffix}
                            </Text>
                        );
                    },
                }}
                bodyStyle={{ padding: 0 }}
            />
        </div>
    );
};

export { StatisticCard };
