import { cloneDeep } from 'lodash';
import React, { useMemo, useState } from 'react';
import RGL, { Responsive, WidthProvider } from 'react-grid-layout';
import BackgroundGrid from '../BackgroundGrid';
import LayoutItem, { ItemProps } from '../LayoutItem';
import useStyles from './style';

export type Layout = ItemProps & RGL.Layout;
export type Layouts = {
    [P: string]: (ItemProps & RGL.Layout)[];
};

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
    layouts: Layouts;
    /** 是否显示背景网格 */
    isBackGrid?: boolean;
    /** 是否能拖放 */
    isDraggable?: boolean;
    /** 是否能调整大小 */
    isResizable?: boolean;
    /** - layout item 取值属性 */
    titleKey?: string;
    /** - 右上角自定义区域 */
    extraRender?: (items: Layout) => React.ReactNode;
    /** - 内容区域 */
    childrenRender?: (items: Layout) => React.ReactNode;
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
        isBackGrid = true,
        isDraggable = true,
        isResizable = true,
        titleKey = 'title',
        onLayoutChange = () => void 0,
        onBreakpointChange = () => void 0,
        onResizeStop = () => void 0,
        extraRender,
        childrenRender,
    } = props;

    const { styles } = useStyles({ isDraggable });

    const [isShowBackgroundGrid, setIsShowBackgroundGrid] = useState(false); // 是否显示背景网格
    const [gridWidth, setGridWidth] = useState(0); // 网格宽度
    const [backgroundImage, setBackgroundImage] = useState(''); // 背景图片 base64

    /**
     * - 不可编辑
     * @description 当前处于不可编辑状态
     */
    const disabled = useMemo(() => breakpoint === 'xs', [breakpoint]);

    const ReactResponsiveGridLayout = useMemo(() => WidthProvider(Responsive), []);

    /** - 背景网格样式 */
    const backgroundGridStyles = useMemo(() => {
        return isBackGrid && isShowBackgroundGrid
            ? {
                  backgroundImage: `url(${backgroundImage})`,
                  backgroundPosition: `${containerPadding[0]}px ${containerPadding[1]}px`,
                  backgroundSize: `${gridWidth.toFixed(3)}px ${rowHeight + 11 + 0.667}px`,
              }
            : {};
    }, [isBackGrid, isShowBackgroundGrid, gridWidth, backgroundImage]);

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
        onResizeStop?.();
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

    const handleLayoutChange: RGL.ResponsiveProps['onLayoutChange'] = (currentLayout, allLayouts) => {
        const newAllLayouts = cloneDeep(allLayouts);

        for (let [key, value] of Object.entries(allLayouts)) {
            value.forEach((el, idx) => {
                // 只支持两种尺寸：xs、sm，xs 状态下不允许编辑（包括调节尺寸和调整位置）
                const extraValue = layouts?.['sm']?.find((item) => item.i === el.i);

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
        <div className={styles['dashboard-content']}>
            {isBackGrid ? (
                <BackgroundGrid
                    width={gridWidth}
                    height={rowHeight}
                    right={8}
                    bottom={11}
                    onGridChange={onGridChange}
                />
            ) : null}

            <ReactResponsiveGridLayout
                className={styles['grid-layout']}
                draggableHandle=".layout-item-head"
                measureBeforeMount={false}
                useCSSTransforms={false}
                cols={cols}
                breakpoints={breakpoints}
                layouts={layouts}
                rowHeight={rowHeight}
                margin={margin}
                isDraggable={disabled ? !disabled : isDraggable} // 不可编辑状态下，不可拖拽
                isResizable={disabled ? !disabled : isResizable} // 不可编辑状态下，不可调整尺寸
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
                }}
            >
                {breakpoint
                    ? layouts?.[breakpoint]?.map((el) => {
                          const { isDraggable: itemIsDraggable, isResizable: itemIsResizable, static: itemStatic } = el;

                          let tmpIsDraggable = true,
                              tmpIsResizable = true;

                          // item static 权重最大
                          if (itemStatic) {
                              tmpIsDraggable = false;
                              tmpIsResizable = false;
                          } else {
                              // 其次是 item 权重
                              if (itemIsDraggable) {
                                  tmpIsDraggable = itemIsDraggable;
                              } else {
                                  // 最后是组件权重
                                  tmpIsDraggable = isDraggable;
                              }

                              if (itemIsResizable) {
                                  tmpIsResizable = itemIsResizable;
                              } else {
                                  tmpIsResizable = isResizable;
                              }
                          }

                          return (
                              <div key={el.i}>
                                  <LayoutItem
                                      disabled={disabled}
                                      isDraggable={tmpIsDraggable}
                                      isResizable={tmpIsResizable}
                                      title={el[titleKey]}
                                      items={el}
                                      extraRender={extraRender}
                                      childrenRender={childrenRender}
                                  />
                              </div>
                          );
                      })
                    : null}
            </ReactResponsiveGridLayout>
        </div>
    );
};

export { ResponsiveGridLayout };
