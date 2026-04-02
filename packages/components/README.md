# @soulwail/components

基于 Ant Design 5.x 实现的常用业务组件封装。

## 特性

- 🚀 **基于 Ant Design 5.x**: 深度契合 antd 5.x 设计规范及组件风格。
- 📦 **开箱即用**: 针对常用业务场景进行封装，提升开发效率。
- 🛡 **TypeScript**: 全面的类型定义支持。
- 🎨 **高度可复用**: 灵活的配置项，满足多样化的页面布局需求。

## 安装

```bash
# npm
npm install @soulwail/components

# yarn
yarn add @soulwail/components

# pnpm
pnpm add @soulwail/components
```

## 快速使用

```tsx
import { PageBox } from '@soulwail/components';
import { Button, Input } from 'antd';

const App = () => (
  <PageBox 
    title="用户管理" 
    pageHeader={<Button type="primary">新增用户</Button>}
    pageLeft={<div>分类导航</div>}
  >
    <div>这里是页面主体内容</div>
  </PageBox>
);
```

## 组件列表

### PageBox (页盒子)

`PageBox` 是一个高度封装的页面容器组件，它可以将页面拆分为 **头部 (Header)**、**左侧 (Left)** 和 **右侧 (Right/Content)** 三部分布局。

#### 特性
- 自动计算高度，支持 `100%` 全屏高度布局。
- 支持动态头部高度自适应。
- 内置侧边栏布局，带分割线。

#### API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| title | 页面标题，支持字符串或 ReactNode | `string \| ReactNode` | - |
| pageHeader | 页面头部额外的内容，展示在标题右侧 | `ReactNode` | - |
| pageLeft | 页面左侧内容 (侧边栏) | `ReactNode` | - |
| hasFooter | 是否包含底部 | `boolean` | `false` |
| marginHeight | 页面边距高度，用于计算主体内容高度 | `number` | `96` |
| footerHeight | 底部高度，仅在 `hasFooter` 为 `true` 时生效 | `number` | `65` |

## 开源协议

[MIT](./LICENSE)

