import React from 'react';
import RGL from 'react-grid-layout';
import dragDot from '../../icons/drag-dot.svg';
import { ResponsiveGridProps } from '../ResponsiveGridLayout';
import './index.less';

/** - item 信息 */
export interface ItemProps {
    /** - 卡片标题 */
    title?: string;
    /** - 是否可编辑 */
    editable?: boolean;
    /** - 拖拽图标 */
    dragIcon?: React.ReactNode;
    /** - 额外显示按钮图标 */
    moreIcon?: React.ReactNode;

    /** 其他额外变量 */
    [P: string]: any;
}

/** - layout 扩展 */
type LayoutItemProps = ItemProps &
    Pick<ResponsiveGridProps, 'childrenRender' | 'extraRender'> & {
        items: ItemProps & RGL.Layout;
    };

const LayoutItem: React.FC<LayoutItemProps> = (props) => {
    const {
        title = '',
        editable = false,
        items,
        dragIcon,
        extraRender,
        childrenRender,
    } = props;

    return (
        <div className="layout-item">
            <div
                className={`layout-item-head showHeader ${
                    editable ? 'isCanDrag' : ''
                }`}
            >
                <div className="head-inner">
                    <span className="title">{title}</span>

                    {editable ? (
                        <div
                            className="menu-slot"
                            onMouseDown={(e) => e.stopPropagation()}
                        >
                            {extraRender ? extraRender(items) : <></>}
                        </div>
                    ) : (
                        <></>
                    )}
                </div>
                {editable ? (
                    <div className="drag isCanDrag">
                        {dragIcon ? (
                            dragIcon
                        ) : (
                            <img
                                alt="drag icon"
                                src={dragDot}
                                width={16}
                                height={16}
                            />
                        )}
                    </div>
                ) : (
                    <></>
                )}
            </div>

            <div className="charts">
                <div className="dashboard-grid-container">
                    {childrenRender?.(items)}
                </div>
            </div>
        </div>
    );
};

export default LayoutItem;
