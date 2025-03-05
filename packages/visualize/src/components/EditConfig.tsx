import { Col, Collapse, type CollapseProps, Form, Row, Space } from 'antd';
import React, { useContext, useMemo } from 'react';
import VisualizeContext from '../context';
import { AxisTitle, Legend, PieSeries, Series, XAxis, YAxis } from '../editor';

import './index.less';

const EditConfig: React.FC = () => {
  const { contentHeight, visTypeDefinition, chartOptionsRender } =
    useContext(VisualizeContext);

  const form = Form.useFormInstance();

  const items = useMemo(() => {
    if (visTypeDefinition) {
      const schemas = visTypeDefinition?.editorConfig?.schemas || [];

      return schemas.map((item) => {
        const config: Required<CollapseProps>['items'][number] = {
          forceRender: true,
          styles: {
            header: { padding: '9px 16px' },
            body: { padding: '6px 16px' },
          },
          label: item.title,
          key: item.key,
        };

        if (item.key === 'axisTitle') {
          config.children = <AxisTitle />;
        } else if (item.key === 'pieSeries') {
          config.children = <PieSeries />;
        } else if (item.key === 'series') {
          config.children = <Series />;
        } else if (item.key === 'legend') {
          config.children = <Legend />;
        } else if (item.key === 'xAxis') {
          config.children = <XAxis />;
        } else if (item.key === 'yAxis') {
          config.children = <YAxis />;
        }

        return config;
      });
    } else {
      return [];
    }
  }, [visTypeDefinition]);

  return (
    <div>
      <div className="config-box" style={{ height: contentHeight - 88 }}>
        <Collapse ghost accordion items={items} />
      </div>

      <Row justify="space-between" style={{ marginTop: '16px' }}>
        <Col></Col>
        <Col>
          <Col>
            <Space>{chartOptionsRender(form)}</Space>
          </Col>
        </Col>
      </Row>
    </div>
  );
};

export { EditConfig };
