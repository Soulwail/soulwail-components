import { Form, Segmented, Select, Typography } from 'antd';
import { useContext } from 'react';
import VisualizeContext from '../../context';

const { Text } = Typography;

const ChartPieSortingRules = () => {
    const { layout } = useContext(VisualizeContext);

    return (
        <Form.Item
            label={<Text type={layout === 'feishu' ? 'secondary' : null}>排序依据</Text>}
            name={['transform', 'sortX', 'by']}
            hidden={layout !== 'feishu'}
        >
            {layout === 'feishu' ? (
                <Segmented
                    block
                    options={[
                        { label: '扇区字段值', value: 'x' },
                        { label: '扇区数值', value: 'y' },
                    ]}
                />
            ) : (
                <Select
                    options={[
                        { label: '扇区字段值', value: 'x' },
                        { label: '扇区数值', value: 'y' },
                    ]}
                />
            )}
        </Form.Item>
    );
};

export { ChartPieSortingRules };
