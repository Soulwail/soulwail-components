import { ViewTypes } from '@safety/visualize';
import { Col, Row, Tabs } from 'antd';
import React, { PropsWithChildren, useContext } from 'react';
import VisualizeContext from '../context';
import { EditConfig, VisConfig, VisDrawerConfig } from './';

interface VisualizeLayoutProps {
    visType: string;
}

const VisualizeLayout: React.FC<PropsWithChildren<VisualizeLayoutProps>> = (props) => {
    const { visType, children } = props;
    const { layout } = useContext(VisualizeContext);

    return (
        <>
            {layout === 'feishu' ? (
                <Row wrap={false}>
                    <Col flex="auto">{children}</Col>

                    <Col flex="340px">
                        <Tabs
                            centered
                            items={[
                                {
                                    key: 'vis',
                                    label: '类型与数据',
                                    forceRender: true,
                                    children: <VisConfig />,
                                },
                                // 表格组件没有自定义样式
                                ...(visType !== ViewTypes.TABLE
                                    ? [
                                          {
                                              key: 'editor',
                                              label: '自定义样式',
                                              forceRender: true,
                                              children: <EditConfig />,
                                          },
                                      ]
                                    : []),
                            ]}
                            style={{ borderLeft: '1px solid #e4e9ec' }}
                        />
                    </Col>
                </Row>
            ) : (
                <VisDrawerConfig>{children}</VisDrawerConfig>
            )}
        </>
    );
};

export { VisualizeLayout };
