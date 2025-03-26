import { Col, Form, Input, Row, Select, SelectProps, Space } from 'antd';
import React, { useContext, useMemo } from 'react';
import VisualizeContext from '../context';
import { ChartTypes, getChartTypes } from '../utils/collections';
import { AreaVis, HorizontalBarVis, IntervalVis, LineVis, PieVis } from './index';

import { ChartSelect } from './ChartSelect';
import './index.less';

/**
 * - VisConfig 组件配置
 */
export type VisConfigProps = {
    /** - 数据来源选择项 */
    dataSource: SelectProps['options'];
    /** - 数据来源是否多选 */
    dataSourceMode?: SelectProps['mode'];
};

const VisConfig: React.FC<VisConfigProps> = (props) => {
    const { dataSource = [], dataSourceMode } = props;
    const { contentHeight, size, chartOptionsRender } = useContext(VisualizeContext);
    const visTypeOptions = getChartTypes();

    const form = Form.useFormInstance();
    const chartType = Form.useWatch('chartType');

    const type: string = useMemo(() => {
        if (chartType) {
            const chartTypeArr = chartType.split('_');

            return chartTypeArr[0];
        } else {
            return '';
        }
    }, [chartType]);

    const getVisConfig = (t: string) => {
        switch (t) {
            case ChartTypes.INTERVAL:
                return <IntervalVis />;
            case ChartTypes.LINE:
                return <LineVis />;
            case ChartTypes.PIE:
                return <PieVis />;
            case ChartTypes.HORIZONTAL_BAR:
                return <HorizontalBarVis />;
            case ChartTypes.AREA:
                return <AreaVis />;
            default:
                return <></>;
        }
    };

    return (
        <div style={{ padding: '6px 0 0 16px' }}>
            {/*  medium：62 - tab 标题、6 - 内边距、48 - 底部按钮；small：44  - tab 标题、6 - 内边距、44 - 底部按钮 */}
            <div className="config-box" style={{ height: contentHeight - 6 - (size === 'medium' ? 110 : 88) }}>
                <Form.Item label="图表名称" name="name" rules={[{ required: true, message: '请输入图表名称' }]}>
                    <Input placeholder="请输入" />
                </Form.Item>

                <Form.Item label="数据来源" name="dataSource" rules={[{ required: false, message: '请选择数据来源' }]}>
                    <Select options={dataSource} mode={dataSourceMode} placeholder="请选择" />
                </Form.Item>

                <Form.Item label="图表类型" name="chartType">
                    <ChartSelect options={visTypeOptions} placeholder="请选择" />
                </Form.Item>

                {getVisConfig(type)}
            </div>

            <Row justify="space-between" style={{ marginTop: '16px' }}>
                <Col></Col>
                <Col>
                    <Space>{chartOptionsRender(form)}</Space>
                </Col>
            </Row>
        </div>
    );
};

export { VisConfig };
