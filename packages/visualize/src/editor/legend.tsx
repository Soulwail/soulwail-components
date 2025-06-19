import { Form, Select } from 'antd';
import React, { useContext } from 'react';
import VisualizeContext from '../context';
import { getPositions } from '../utils/collections';

const Legend: React.FC = () => {
    const { layout } = useContext(VisualizeContext);

    return (
        <>
            <Form.Item hidden={layout !== 'feishu'} label="图例位置" name={['legend', 'color', 'position']}>
                <Select options={getPositions()} />
            </Form.Item>
        </>
    );
};

export { Legend };
