import type { VisualizeProps } from '@safety/visualize';
import Visualize from '@safety/visualize';
import { Button, Drawer } from 'antd';
import { cloneDeep } from 'lodash';
import { useLayoutEffect, useRef, useState } from 'react';

export default () => {
    const visRef = useRef(null);

    const [open, setOpen] = useState(false);

    const [dataSource] = useState([]);
    const [categoryList, setCategoryList] = useState([
        { label: 'month', value: 'month' },
        { label: 'name', value: 'name' },
    ]);
    const [initialValues] = useState({});

    useLayoutEffect(() => {
        visRef.current.setFieldValue('name', 'Test');
        visRef.current.setFieldValue('dataSource', '1');
        visRef.current.setFieldValue(['encode', 'x'], 'month');
    }, []);

    const wait = async (milliseconds) =>
        new Promise((resolve) => {
            setTimeout(resolve, milliseconds);
        });

    const onValueChange = (value, allValues) => {
        console.log(value, allValues);

        // 切换日志类型时，修改选择的字段，并重置分组聚合
        if (Reflect.has(value, 'dataSource')) {
            const logItem = dataSource.find((item) => item.value === value.dataSource);
            const logItemFields = logItem.fields;
            setCategoryList(logItemFields);

            visRef.current.setFieldValue(['encode', 'x'], logItemFields[0].value);
            visRef.current.setFieldValue('encodeColor', true);
        }
    };

    /** - 生成图表 */
    const onGenerate: VisualizeProps['onGenerate'] = async (values, options, data) => {
        // console.log(values, options);

        let newOptions = cloneDeep(options);
        let newData = cloneDeep(data);

        newData.value = [
            { name: 'London', month: 'Jan.Jan.Jan.Jan.Jan.Jan.Jan.Jan.', count: 18.9 },
            { name: 'London', month: 'Feb.', count: 28.8 },
            { name: 'London', month: 'Mar.', count: 39.3 },
            { name: 'London', month: 'Apr.', count: 81.4 },
            { name: 'London', month: 'May', count: 47 },
            { name: 'London', month: 'Jun.', count: 20.3 },
            { name: 'London', month: 'Jul.', count: 24 },
            { name: 'London', month: 'Aug.', count: 35.6 },
            { name: 'Berlin', month: 'Jan.Jan.Jan.Jan.Jan.Jan.Jan.Jan.', count: 12.4 },
            { name: 'Berlin', month: 'Feb.', count: 23.2 },
            { name: 'Berlin', month: 'Mar.', count: 34.5 },
            { name: 'Berlin', month: 'Apr.', count: 99.7 },
            { name: 'Berlin', month: 'May', count: 52.6 },
            { name: 'Berlin', month: 'Jun.', count: 35.5 },
            { name: 'Berlin', month: 'Jul.', count: 37.4 },
            { name: 'Berlin', month: 'Aug.', count: 42.4 },
        ];

        await wait(2000);

        return { options: newOptions, data: newData };
    };

    return (
        <div style={{ margin: '0 auto' }}>
            <Button
                type="primary"
                onClick={() => {
                    setOpen(true);
                }}
            >
                添加可视化
            </Button>

            <Drawer
                open={open}
                width={1100}
                forceRender
                styles={{ body: { padding: 0 } }}
                onClose={() => setOpen(false)}
            >
                <Visualize
                    height={500}
                    ref={visRef}
                    layout="drawer"
                    formProps={{
                        layout: 'horizontal',
                        labelCol: { flex: '150px' },
                        initialValues,
                        dataSource,
                        categoryList,
                    }}
                    onValueChange={onValueChange}
                    onGenerate={onGenerate}
                />
            </Drawer>
        </div>
    );
};
