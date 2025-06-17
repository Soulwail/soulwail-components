import { Col, Form, Row, Space } from 'antd';
import React, { useContext } from 'react';
import VisualizeContext from '../context';
import { ChartConfig, ChartName, ChartType, DataSource } from './';
import useStyles from './style';

const VisConfig: React.FC = () => {
    const { contentHeight, size, chartOptionsRender } = useContext(VisualizeContext);
    const form = Form.useFormInstance();
    const { styles } = useStyles({ height: contentHeight - 6 - (size === 'medium' ? 110 : 88) }); // medium：62 - tab 标题、6 - 内边距、48 - 底部按钮；small：44  - tab 标题、6 - 内边距、44 - 底部按钮

    return (
        <div style={{ padding: '6px 0 0 16px' }}>
            <div className={styles['config-box']}>
                <ChartName />

                <DataSource />

                <ChartType />

                <ChartConfig />
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
