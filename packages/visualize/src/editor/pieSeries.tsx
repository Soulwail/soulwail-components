import { Checkbox, Col, Form, Row, Select, Typography } from 'antd';
import React, { useContext } from 'react';
import VisualizeContext from '../context';

const { Text } = Typography;

const PieSeries: React.FC = () => {
    const { layout } = useContext(VisualizeContext);

    return (
        <>
            <Form.Item hidden={layout !== 'feishu'} name="showLabel" valuePropName="checked">
                <Checkbox>显示数据标签</Checkbox>
            </Form.Item>

            <Form.Item hidden={layout !== 'feishu'} dependencies={['showLabel']} noStyle>
                {({ getFieldValue }) => {
                    const showLabel = getFieldValue('showLabel');

                    return showLabel ? (
                        <Form.List
                            name="labels"
                            initialValue={[
                                {
                                    position: 'spider',
                                    text: ['category', 'value', 'percent'],
                                },
                            ]}
                        >
                            {(fields) => (
                                <>
                                    {fields.map(({ key, name, ...restField }) => (
                                        <div key={key}>
                                            <Form.Item
                                                {...restField}
                                                name={[name, 'position']}
                                                label={<Text type="secondary">标签位置</Text>}
                                            >
                                                <Select
                                                    options={[
                                                        { label: '外部', value: 'spider' },
                                                        { label: '内部', value: 'inside' },
                                                    ]}
                                                />
                                            </Form.Item>
                                            <Form.Item
                                                {...restField}
                                                name={[name, 'text']}
                                                label={<Text type="secondary">标签内容</Text>}
                                                style={{ marginBottom: 0 }}
                                            >
                                                <Checkbox.Group style={{ width: '100%' }}>
                                                    <Row>
                                                        <Col span={8}>
                                                            <Checkbox value="category">类别</Checkbox>
                                                        </Col>
                                                        <Col span={8}>
                                                            <Checkbox value="value">值</Checkbox>
                                                        </Col>
                                                        <Col span={8}>
                                                            <Checkbox value="percent">百分比</Checkbox>
                                                        </Col>
                                                    </Row>
                                                </Checkbox.Group>
                                            </Form.Item>
                                        </div>
                                    ))}
                                </>
                            )}
                        </Form.List>
                    ) : (
                        <></>
                    );
                }}
            </Form.Item>
        </>
    );
};

export { PieSeries };
