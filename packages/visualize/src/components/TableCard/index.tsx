import { Data } from '@antv/g2';
import { Table, TableProps } from 'antd';
import { ConfigContext } from 'antd/es/config-provider';
import React, { useContext, useImperativeHandle, useState } from 'react';
import { VisualizeProps } from '../../Visualize';
import VisualizeContext from '../../context';
import { ChartOptions } from '../../typeVislib';
import { TableVisibleAllFieldsValue } from '../../utils';
import { ChartRenderRef } from '../ChartRender';
import useStyle from './style';

interface TableCardProps {
    loading?: boolean;
    /** 尺寸 */
    size: VisualizeProps['size'];
    /** Ref for imperative methods */
    renderRef?: React.Ref<ChartRenderRef>;
}

const TableCard: React.FC<TableCardProps> = (props) => {
    const { loading, size } = props;
    const { contentHeight, categoryList = [] } = useContext(VisualizeContext);

    // 获取 ant class 前缀
    const prefixCls = useContext(ConfigContext).getPrefixCls() || 'ant';
    const antCls = `.${prefixCls}`;
    const { styles } = useStyle({ antCls });

    const [columns, setColumns] = useState<TableProps['columns']>([]);
    const [data, setData] = useState<TableProps['dataSource']>([]);

    /**
     * - 渲染图表
     * @param options 图表配置 包括扩展的 style
     * @param data 图表数据
     */
    const renderChart = async (options: ChartOptions, data: Data) => {
        try {
            let value: TableProps['dataSource'] = [];
            let tmpColumns: TableProps['columns'] = [];

            // 判断图表是否有数据
            if (data?.value && Array.isArray(data.value)) {
                value = data?.value.map((_, idx: number) => ({ ..._, idx })) || []; // 添加表格 Unique Keys
            }

            console.log(options);

            //
            if (options.encode.x && Array.isArray(options.encode.x)) {
                // 设置 columns
                if (options.encode.x.includes(TableVisibleAllFieldsValue)) {
                    categoryList.forEach((el, idx) => {
                        tmpColumns.push({
                            title: el.label,
                            dataIndex: el.value,
                            ...(idx !== categoryList.length - 1 ? { width: 150 } : {}), // 列宽度
                        });
                    });
                } else {
                    options.encode.x.forEach((el, idx) => {
                        tmpColumns.push({
                            title: categoryList.find((item) => item.value === el)?.label,
                            dataIndex: el,
                            ...(idx !== categoryList.length - 1 ? { width: 150 } : {}), // 列宽度
                        });
                    });
                }
            }

            setData(value);
            setColumns(tmpColumns);

            return Promise.resolve();
        } catch (err) {
            return Promise.reject(err);
        }
    };

    // 抛出到父组件的调用函数
    useImperativeHandle(props.renderRef, () => {
        return {
            renderChart,
        };
    });

    return (
        <div style={{ padding: '8px' }}>
            <Table
                className={styles.customTable}
                rowKey="idx"
                loading={loading}
                columns={columns}
                dataSource={data}
                pagination={{ defaultPageSize: 10 }}
                scroll={{ y: contentHeight - 16 - (size === 'medium' ? 55 + 64 : 37 + 29) }} // 16 为盒子边距，剩下的为表格头和换页
            />
        </div>
    );
};

export { TableCard };
