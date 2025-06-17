import { Checkbox, Col, Form, Input, Row, Select, Typography } from 'antd';
import { NamePath } from 'antd/es/form/interface';
import React, { useContext } from 'react';
import VisualizeContext from '../../../context';
import { getKeywordComparisonSymbols } from '../../../utils';

const { Text } = Typography;

interface KeywordSearchProps {
    searchName?: NamePath;
    k1?: NamePath;
    k2?: NamePath;
}

const KeywordSearch: React.FC<KeywordSearchProps> = (props) => {
    const { searchName = 'keywordSearch', k1 = ['search', 'compare'], k2 = ['search', 'keyword'] } = props;
    const { layout } = useContext(VisualizeContext);
    const comparisonOptions = getKeywordComparisonSymbols();

    return (
        <>
            <Form.Item
                label={layout === 'feishu' ? null : <Text>关键字过滤</Text>}
                name={searchName}
                valuePropName="checked"
                style={{ marginBottom: '16px' }}
            >
                <Checkbox>{layout === 'feishu' ? <Text type="secondary">关键字过滤</Text> : null}</Checkbox>
            </Form.Item>

            <Form.Item dependencies={[searchName]} noStyle>
                {({ getFieldValue }) => {
                    const keywordSearch = getFieldValue(searchName);

                    return keywordSearch ? (
                        <Form.Item
                            label={layout === 'feishu' ? null : <Text>过滤条件</Text>}
                            style={{ marginBottom: '0px' }}
                        >
                            <Row gutter={[4, 0]}>
                                <Col span={6}>
                                    <Form.Item
                                        label={null}
                                        name={k1}
                                        style={layout === 'feishu' ? { margin: '-8px 0 24px' } : {}}
                                        rules={[{ required: true, message: '请选择比较符号' }]}
                                    >
                                        <Select options={comparisonOptions} placeholder="请选择" />
                                    </Form.Item>
                                </Col>
                                <Col span={18}>
                                    <Form.Item
                                        label={null}
                                        name={k2}
                                        style={layout === 'feishu' ? { margin: '-8px 0 24px' } : {}}
                                        rules={[{ required: true, message: '请输入关键字' }]}
                                    >
                                        <Input placeholder="多个关键字用 , 隔开" />
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Form.Item>
                    ) : null;
                }}
            </Form.Item>
        </>
    );
};

export { KeywordSearch };
