import type { VisualizeProps } from '@safety/visualize';
import Visualize from '@safety/visualize';
import { cloneDeep } from 'lodash';
import { useEffect, useRef, useState } from 'react';

export default () => {
    const visRef = useRef(null);
    const [dataSource] = useState([]);
    const [categoryList, setCategoryList] = useState([]);
    const [initialValues] = useState({});

    useEffect(() => {
        visRef.current.setFieldValue(['encode', 'x'], 'Channel');
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
            visRef.current.setFieldValue('encodeColor', false);
        }
    };

    /** - 生成图表 */
    const onGenerate: VisualizeProps['onGenerate'] = async (values, options, data) => {
        // console.log(values, options);

        let newOptions = cloneDeep(options);
        let newData = cloneDeep(data);

        newData.value = [
            {
                Channel: 'Security',
                count: 36031,
            },
            {
                Channel: 'System',
                count: 4988,
            },
            {
                Channel: 'Setup',
                count: 751,
            },
            {
                Channel: 'Application',
                count: 746,
            },
            {
                Channel: 'Windows PowerShell',
                count: 616,
            },
        ];

        await wait(2000);

        return { options: newOptions, data: newData };
    };

    return (
        <Visualize
            ref={visRef}
            dataSource={dataSource}
            categoryList={categoryList}
            initialValues={initialValues}
            onValueChange={onValueChange}
            onGenerate={onGenerate}
        />
    );
};
