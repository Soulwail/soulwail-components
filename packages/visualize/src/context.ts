import { type FormInstance, SelectProps } from 'antd';
import React, { createContext } from 'react';
import { VisTypeDefinitionProps } from './typeVislib';

export interface VisualizeContextProps {
  contentHeight: number;
  visTypeDefinition?: VisTypeDefinitionProps;
  /** - 横轴选择项 */
  categoryList?: SelectProps['options'];
  /** - 聚合字段选择项 */
  colorCategoryList?: SelectProps['options'];
  chartOptionsRender?: (form: FormInstance) => React.ReactNode[];
}

export default createContext<VisualizeContextProps>({ contentHeight: 500 });
