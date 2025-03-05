import { Col, Form, Input, Row, Select, SelectProps, Space } from 'antd';
import React, { useContext, useMemo } from 'react';
import VisualizeContext from '../context';
import { ChartTypes, getChartTypes } from '../utils/collections';
import {
  AreaVis,
  HorizontalBarVis,
  IntervalVis,
  LineVis,
  PieVis,
} from './index';

import { ChartSelect } from './ChartSelect';
import './index.less';

/**
 * - VisConfig 组件配置
 */
export type VisConfigProps = {
  /** - 数据来源选择项 */
  dataSource: SelectProps['options'];
};

const VisConfig: React.FC<VisConfigProps> = (props) => {
  const { dataSource = [] } = props;
  const { contentHeight, chartOptionsRender } = useContext(VisualizeContext);
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
      <div className="config-box" style={{ height: contentHeight - 94 }}>
        <Form.Item
          label="图表名称"
          name="name"
          rules={[{ required: true, message: '请输入图表名称' }]}
        >
          <Input placeholder="请输入" />
        </Form.Item>

        <Form.Item
          label="数据来源"
          name="dataSource"
          rules={[{ required: true, message: '请选择数据来源' }]}
        >
          <Select options={dataSource} placeholder="请选择" />
        </Form.Item>

        <Form.Item label="图表类型" name="chartType">
          {/*<Select options={visTypeOptions} placeholder="请选择" />*/}
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
