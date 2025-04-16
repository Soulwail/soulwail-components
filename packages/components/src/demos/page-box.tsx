import { PageBox } from '@safety/components';
import { Button, Col, Input, Row } from 'antd';

export default () => {
    const PageHeader = () => {
        return (
            <Row gutter={16} justify="space-between" style={{ marginBottom: '16px' }}>
                <Col span={6}>
                    <Input />
                </Col>
                <Col flex="none">
                    <Button type="primary">查询</Button>
                </Col>
            </Row>
        );
    };

    return (
        <div style={{ padding: '16px' }}>
            <PageBox title="页面标题" pageHeader={<PageHeader />} pageLeft={<div>左侧组菜单</div>} marginHeight={32}>
                页面主体
            </PageBox>
        </div>
    );
};
