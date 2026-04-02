# @soulwail/visualize

基于 Ant Design 5.x 和 AntV G2 实现的可视化组件库。

## 特性

- 📊 **丰富的图表支持**: 深度集成 AntV G2，支持折线图、面积图、饼图、柱状图、条形图、指标卡及表格等。
- 🛠 **集成编辑器**: 提供开箱即用的图表配置面板，支持实时预览和交互调整。
- 🍱 **多分布布局**: 预置多种交互布局模式（如 `feishu` 侧边栏模式和 `drawer` 抽屉模式）。
- 🛡 **TypeScript**: 全面的类型定义，提供极佳的开发体验。

## 安装

```bash
# npm
npm install @soulwail/visualize

# yarn
yarn add @soulwail/visualize

# pnpm
pnpm add @soulwail/visualize
```

## 快速使用

```tsx
import { Visualize } from '@soulwail/visualize';
import { useState } from 'react';

const App = () => {
  const [dataSource] = useState([]);
  const [categoryList] = useState([{ label: '月份', value: 'month' }]);

  const handleGenerate = async (values, options, data) => {
    // 处理图表生成逻辑
    return { options, data };
  };

  return (
    <Visualize
      height={600}
      formProps={{
        layout: 'vertical',
        dataSource,
        categoryList,
      }}
      onGenerate={handleGenerate}
    />
  );
};
```

## 核心组件

### Visualize (可视化编辑器)

`Visualize` 是该库的核心组件，它集成了数据表单配置和图表渲染，适用于需要用户自定义配置图表的业务场景。

#### API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| height | 容器展示高度 | `number` | `680` |
| layout | 整体交互布局模式 | `'feishu' \| 'drawer'` | `'feishu'` |
| size | 容器间距尺寸 | `'small' \| 'medium' \| 'large'` | `'medium'` |
| formProps | 表单配置项，详见 [VisualizeFormProps](#visualizeformprops) | `object` | - |
| onGenerate | 点击“预览”按钮时的回调，用于处理数据转换 | `(values, options, data) => Promise<Result>` | - |
| onSave | 点击“保存”按钮时的回调 | `(values, options, data) => Promise<void>` | - |

#### VisualizeFormProps

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| dataSource | 数据源列表 | `any[]` | `[]` |
| categoryList | 可选的分类字段列表 | `{ label: string, value: string }[]` | `[]` |
| initialValues | 表单初始值 | `Record<string, any>` | `{}` |

## 支持的图表类型

- **基础图表**: 折线图 (Line)、面积图 (Area)、柱状图/条形图 (Interval/Bar)、饼图 (Pie)。
- **特殊组件**: 指标卡 (Statistic Card)、数据表格 (Table Card)。

## 开源协议

[MIT](./LICENSE)

