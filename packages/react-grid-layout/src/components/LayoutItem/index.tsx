import React from 'react';
import RGL from 'react-grid-layout';
import dragDot from '../../icons/drag-dot.svg';
import { ResponsiveGridProps } from '../ResponsiveGridLayout';
import useStyles from './style';

/** - item 信息 */
export interface ItemProps {
    /** - 卡片标题 */
    title?: string;
    /** 是否能拖放 */
    isDraggable?: boolean;
    /** 是否能调整大小 */
    isResizable?: boolean;
    /** - 是否禁用 */
    disabled?: boolean;
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
    const { title = '', isDraggable = true, disabled = false, items, dragIcon, extraRender, childrenRender } = props;

    const { styles, cx } = useStyles({ disabled });

    return (
        <div className={styles['layout-item']}>
            <div
                className={cx(
                    'layout-item-head',
                    styles['layout-item-head'],
                    styles['showHeader'],
                    isDraggable ? styles.isCanDrag : '',
                )}
            >
                <div className={styles['head-inner']}>
                    <span className={styles.title}>{title}</span>

                    {isDraggable ? (
                        <div className={styles['menu-slot']} onMouseDown={(e) => e.stopPropagation()}>
                            {extraRender ? extraRender(items) : <></>}
                        </div>
                    ) : (
                        <></>
                    )}
                </div>
                {isDraggable ? (
                    <div className={cx(styles.drag, isDraggable ? styles.isCanDrag : '')}>
                        {dragIcon ? dragIcon : <img alt="drag icon" src={dragDot} width={16} height={16} />}
                    </div>
                ) : (
                    <></>
                )}
            </div>

            <div className={styles['charts']}>
                <div className={styles['dashboard-grid-container']}>{childrenRender?.(items)}</div>
            </div>
        </div>
    );
};

export default LayoutItem;
