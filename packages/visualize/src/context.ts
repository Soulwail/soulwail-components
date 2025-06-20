import { type FormInstance, SelectProps } from 'antd';
import React, { createContext } from 'react';
import { VisTypeDefinitionProps } from './typeVislib';

export interface VisualizeContextProps {
    contentHeight: number;
    /** - 尺寸 */
    size?: 'small' | 'medium';
    /** - 布局 */
    layout?: 'feishu' | 'drawer'; // feishu 参照飞书的布局、drawer 自定义抽屉布局
    formProps?: {
        /** - 数据来源 label */
        dataSourceLabel?: string;
        /** - 数据来源 */
        dataSource: any[];
        /** - 数据来源是否多选 */
        dataSourceMode?: SelectProps['mode'];
        /** - 横轴选项 */
        categoryList: SelectProps['options'];
        /** - 聚合字段选择项 */
        colorCategoryList: SelectProps['options'];
    };
    visTypeDefinition?: VisTypeDefinitionProps;
    chartOptionsRender?: (form: FormInstance) => React.ReactNode[];
}

export default createContext<VisualizeContextProps>({ contentHeight: 500 });
