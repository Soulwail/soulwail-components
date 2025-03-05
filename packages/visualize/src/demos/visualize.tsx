import Visualize from '@safety/visualize';
import { useRef, useState } from 'react';

export default () => {
    const visRef = useRef(null);
    const [dataSource] = useState([]);
    const [categoryList, setCategoryList] = useState([]);
    const [initialValues] = useState({});

    const onValueChange = (value, allValues) => {
        console.log(value, allValues);

        // 切换日志类型时，修改选择的字段，并重置分组聚合
        if (Reflect.has(value, 'dataSource')) {
            const logItem = dataSource.find(
                (item) => item.value === value.dataSource,
            );
            const logItemFields = logItem.fields;
            setCategoryList(logItemFields);

            visRef.current.setFieldValue(
                ['encode', 'x'],
                logItemFields[0].value,
            );
            visRef.current.setFieldValue('encodeColor', false);
        }
    };

    /** - 生成图表 */
    const onGenerate = async (values, options) => {
        console.log(values, options);

        // const res = await getVis({
        //   startTime: 1734606590,
        //   endTime: 1737198590,
        //   id: values.dataSource,
        //   type: 2,
        //   fn1: values.encode.x,
        //   kt1: values.search.compare === '==' ? 1 : 2,
        //   k1: values.search.keyword.split(','),
        //   fn2: values.encode.color,
        // });

        // if (res.code === 1) {
        //   visRef.current.renderChart();
        // }
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
