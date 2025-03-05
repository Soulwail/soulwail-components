import { cloneDeep } from 'lodash';
import React, { useMemo, useState } from 'react';
import RGL, { Responsive, WidthProvider } from 'react-grid-layout';
import BackgroundGrid from '../BackgroundGrid';
import LayoutItem, { ItemProps } from '../LayoutItem';

export interface ResponsiveGridProps {
  /**
   * Number of margin. This is a breakpoint -> margin map
   * e.g. { lg: [5, 5], md: [10, 10], sm: [15, 15] }
   * Margin between items [x, y] in px
   * e.g. [10, 10]
   */
  margin?: RGL.ResponsiveProps['margin'];
  /**
   * Number of containerPadding. This is a breakpoint -> containerPadding map
   * e.g. { lg: [5, 5], md: [10, 10], sm: [15, 15] }
   * Padding inside the container [x, y] in px
   * e.g. [10, 10]
   */
  containerPadding?: RGL.ResponsiveProps['containerPadding'];
  /** 单个 grid 高度 */
  rowHeight: number;
  /** 当前断点 */
  breakpoint: string;
  /** 不同断点对应的 layout */
  layouts: {
    [P: string]: (ItemProps & RGL.Layout)[];
  };
  /** - layout item 取值属性 */
  titleKey?: string;
  /** - 右上角自定义区域 */
  extraRender?: (items: ItemProps & RGL.Layout) => React.ReactNode;
  /** - 内容区域 */
  childrenRender?: (items: ItemProps & RGL.Layout) => React.ReactNode;
  /** - 布局改变回调 */
  onLayoutChange?: RGL.ResponsiveProps['onLayoutChange'];
  /** - 断点改变回调 */
  onBreakpointChange?: RGL.ResponsiveProps['onBreakpointChange'];
  /** - item 尺寸调整 */
  onResizeStop?: () => void;
}

/** 不同断点对应的列数 */
const cols: { [P: string]: number } = { /* lg: 12, md: 12,  */ sm: 12, xs: 2 };
/** 断点配置 */
const breakpoints: { [P: string]: number } = {
  /* lg: 1200, md: 996, */ sm: 768,
  xs: 599,
};

const ResponsiveGridLayout: React.FC<ResponsiveGridProps> = (props) => {
  const {
    margin = [8, 11],
    containerPadding = [8, 0],
    rowHeight,
    breakpoint,
    layouts,
    titleKey = 'title',
    onLayoutChange = () => void 0,
    onBreakpointChange = () => void 0,
    onResizeStop = () => void 0,
    extraRender,
    childrenRender,
  } = props;

  const [isShowBackgroundGrid, setIsShowBackgroundGrid] = useState(false); // 是否显示背景网格
  const [gridWidth, setGridWidth] = useState(0); // 网格宽度
  const [backgroundImage, setBackgroundImage] = useState(''); // 背景图片 base64

  const ReactResponsiveGridLayout = useMemo(
    () => WidthProvider(Responsive),
    [],
  );

  /** - 背景网格样式 */
  const backgroundGridStyles = useMemo(() => {
    return isShowBackgroundGrid
      ? {
        backgroundImage: `url(${backgroundImage})`,
        backgroundPosition: `${containerPadding[0]}px ${containerPadding[1]}px`,
        backgroundSize: `${gridWidth.toFixed(3)}px ${rowHeight + 11 + 0.667
          }px`,
      }
      : {};
  }, [isShowBackgroundGrid, gridWidth, backgroundImage]);

  const handleDragStart: RGL.CoreProps['onDragStart'] = () => {
    setIsShowBackgroundGrid(true);
  };

  const handleDragStop: RGL.CoreProps['onDragStop'] = () => {
    setIsShowBackgroundGrid(false);
  };

  const handleResizeStart = () => {
    setIsShowBackgroundGrid(true);
  };

  const handleResizeStop = () => {
    setIsShowBackgroundGrid(false);
    onResizeStop?.()
  };

  /**
   * - 监听宽度变化
   * @param containerWidth
   * @param _margin
   * @param cols
   * @param containerPadding
   * @description 计算单个 grid 的宽度
   */
  const handleWidthChange: RGL.ResponsiveProps['onWidthChange'] = (
    containerWidth,
    _margin,
    cols,
    containerPadding,
  ) => {
    const gridWidthVal = (containerWidth - containerPadding[0]) / cols;

    setGridWidth(gridWidthVal);
  };

  const handleLayoutChange: RGL.ResponsiveProps['onLayoutChange'] = (
    currentLayout,
    allLayouts,
  ) => {
    const newAllLayouts = cloneDeep(allLayouts);

    console.log('allLayouts', allLayouts);

    for (let [key, value] of Object.entries(allLayouts)) {
      value.forEach((el, idx) => {
        // TODO: 目前只支持两种尺寸：xs、sm，xs 状态下不允许编辑
        const extraValue = layouts['sm'].find((item) => item.i === el.i) || {};

        if (extraValue) {
          newAllLayouts[key][idx] = Object.assign({}, extraValue, el); // 使用新的 layout 数据，替换原有的数据
        }
      });
    }

    onLayoutChange(currentLayout, newAllLayouts);
  };

  /**
   * - 获取网格背景图
   * @param dataURL
   */
  const onGridChange = (dataURL: string) => {
    setBackgroundImage(dataURL);
  };

  return (
    <div style={{ height: '100%', minHeight: '100%' }}>
      <BackgroundGrid
        width={gridWidth}
        height={rowHeight}
        right={8}
        bottom={11}
        onGridChange={onGridChange}
      />

      <ReactResponsiveGridLayout
        className="grid-layout"
        draggableHandle=".layout-item-head"
        measureBeforeMount={false}
        cols={cols}
        breakpoints={breakpoints}
        layouts={layouts}
        rowHeight={rowHeight}
        margin={margin}
        containerPadding={containerPadding}
        onBreakpointChange={onBreakpointChange}
        onLayoutChange={handleLayoutChange}
        onDragStart={handleDragStart}
        onDragStop={handleDragStop}
        onResizeStart={handleResizeStart}
        onResizeStop={handleResizeStop}
        onWidthChange={handleWidthChange}
        style={{
          ...backgroundGridStyles,
          minHeight: '100%',
          opacity: 1,
          paddingBottom: '55.625px',
        }}
      >
        {breakpoint
          ? layouts?.[breakpoint]?.map((el) => {
            return (
              <div key={el.i}>
                <LayoutItem editable={!el.static} title={el[titleKey]} items={el} extraRender={extraRender} childrenRender={childrenRender} />
              </div>
            );
          })
          : null}
      </ReactResponsiveGridLayout>
    </div>
  );
};

export { ResponsiveGridLayout };
