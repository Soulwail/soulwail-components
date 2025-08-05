import { Card, Col, Form, Row, Space, Typography } from 'antd';
import React, { PropsWithChildren, useContext } from 'react';
import VisualizeContext from '../context';
import { ChartConfig, ChartDetailConfig, ChartSubType } from './';
import { ChartName, ChartParentType, DataSource } from './VisItem';
import useStyles from './style';

const { Text } = Typography;

const VisDrawerConfig: React.FC<PropsWithChildren> = (props) => {
    const { children } = props;
    const { contentHeight, chartOptionsRender } = useContext(VisualizeContext);
    const form = Form.useFormInstance();
    const { styles } = useStyles();

    return (
        <div className={styles['drawer-config-box']}>
            <div className={styles['drawer-config-body']}>
                <Row wrap={false} gutter={16}>
                    <Col span={12}>
                        <ChartName />
                        <DataSource />
                        <ChartParentType />
                        <ChartConfig />
                    </Col>

                    <Col span={12}>
                        <ChartSubType />
                        <ChartDetailConfig />

                        <div className={styles['drawer-config-group-title']}>
                            <Text strong>预览</Text>
                        </div>

                        <Card variant="outlined" styles={{ body: { padding: 0 } }}>
                            <div style={{ height: contentHeight }}>{children}</div>
                        </Card>
                    </Col>
                </Row>
            </div>

            <div className={styles['drawer-config-footer']}>
                <Row justify="space-between">
                    <Col></Col>
                    <Col>
                        <Space>{chartOptionsRender(form)}</Space>
                    </Col>
                </Row>
            </div>
        </div>
    );
};

export { VisDrawerConfig };
