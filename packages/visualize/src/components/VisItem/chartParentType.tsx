import { Form, Segmented, type SegmentedProps, Typography } from 'antd';
import React, { useContext, useMemo } from 'react';
import VisualizeContext from '../../context';
import { getDrawerChartTypes, getTranslateZh } from '../../utils';

const { Text } = Typography;
const visTypeOptions = getDrawerChartTypes();
const translate = getTranslateZh();

const ChartParentType: React.FC = React.memo(() => {
    const { layout } = useContext(VisualizeContext);

    const options = useMemo(() => {
        const tmpOptions: SegmentedProps['options'] = [];

        visTypeOptions.forEach((item) => {
            const Icon = item.icon;

            tmpOptions.push({
                label: (
                    <div style={{ padding: 0 }}>
                        <Icon style={{ fontSize: '36px' }} />
                        <div>
                            <Text style={{ fontSize: '12px' }}>{item.label}</Text>
                        </div>
                    </div>
                ),
                value: item.value,
            });
        });

        return tmpOptions;
    }, [visTypeOptions]);

    return (
        <Form.Item label={translate[layout].chartType} name="chartParentType">
            <Segmented block size="small" options={options} />
        </Form.Item>
    );
});

export { ChartParentType };
