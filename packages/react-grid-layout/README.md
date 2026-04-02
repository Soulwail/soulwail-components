# @soulwail/react-grid-layout

基于 `react-grid-layout` 和 `react-resizable` 实现的响应式可拖拽网格。

## 特性

- 📐 **响应式支持**: 支持多断点（sm, xs）配置，根据容器宽度自动切换布局。
- 🖱 **自由拖拽与缩放**: 简单易用的交互控制，支持网格项的自由移动和尺寸调整。
- 🏁 **辅助背景网格**: 内置可选的背景辅助线，帮助对齐组件。
- 🧩 **高度自定义**: 提供 `extraRender` 和 `childrenRender` 插槽，轻松自定义组件样式。
- 🛡 **TypeScript**: 完整的类型定义。

## 安装

```bash
# npm
npm install @soulwail/react-grid-layout

# yarn
yarn add @soulwail/react-grid-layout

# pnpm
pnpm add @soulwail/react-grid-layout
```

## 快速使用

```tsx
import { ResponsiveGridLayout } from '@soulwail/react-grid-layout';

const App = () => {
  const layouts = {
    sm: [
      { i: 'a', x: 0, y: 0, w: 1, h: 2, title: '组件 A' },
      { i: 'b', x: 1, y: 0, w: 3, h: 2, title: '组件 B' },
    ]
  };

  return (
    <ResponsiveGridLayout
      breakpoint="sm"
      layouts={layouts}
      rowHeight={100}
      onLayoutChange={(currentLayout, allLayouts) => {
        console.log('布局已改变', allLayouts);
      }}
      childrenRender={(item) => (
        <div>这是组件 {item.i} 的内容</div>
      )}
    />
  );
};
```

## 核心组件

### ResponsiveGridLayout

响应式网格布局容器。

#### API

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| layouts | 布局配置对象，Key 为断点名称 | `Layouts` | - |
| rowHeight | 单个网格行的高度 (px) | `number` | - |
| breakpoint | 当前活动断点 (`sm` \| `xs`) | `string` | - |
| margin | 网格项之间的间距 `[x, y]` | `[number, number]` | `[8, 11]` |
| containerPadding | 容器内边距 `[x, y]` | `[number, number]` | `[8, 0]` |
| isBackGrid | 是否显示背景网格辅助线 | `boolean` | `true` |
| isDraggable | 是否允许拖拽 | `boolean` | `true` |
| isResizable | 是否允许调整大小 | `boolean` | `true` |
| extraRender | 自定义网格项头部区域渲染 | `(item) => ReactNode` | - |
| childrenRender | 自定义网格项内容区域渲染 | `(item) => ReactNode` | - |
| onLayoutChange | 布局改变时的回调 | `(current, all) => void` | - |

## 开源协议

[MIT](./LICENSE)

