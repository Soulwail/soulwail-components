/**
 * iframe: false
 * compact: true
 */
import { DeleteOutlined, MoreOutlined, SettingOutlined } from '@ant-design/icons';
import { ResponsiveGridLayout } from '@safety/react-grid-layout';
import { Button, Dropdown, Space, Switch, Typography } from 'antd';
import { cloneDeep } from 'lodash';
import { useState } from 'react';
import type { Layouts } from 'react-grid-layout';

const { Text } = Typography;
const rowHeight = 112;

const Extra = (props) => {
    const { id, onSetting, onDelete } = props;

    return (
        <Dropdown
            placement="bottomRight"
            trigger={['click']}
            menu={{
                items: [
                    {
                        label: '配置',
                        key: 'setting',
                        icon: <SettingOutlined />,
                    },
                    { label: '删除', key: 'delete', icon: <DeleteOutlined /> },
                ],
                onClick: ({ key }) => {
                    console.log(id, key);

                    if (key === 'setting') {
                        onSetting?.(id);
                    }

                    if (key === 'delete') {
                        onDelete?.(id);
                    }
                },
            }}
        >
            <Button size="small" icon={<MoreOutlined />} onClick={(e) => e.preventDefault()} />
        </Dropdown>
    );
};

export default () => {
    const [counter, setCounter] = useState(0);
    const [breakpoint, setBreakpoint] = useState('sm'); // 当前断点
    const [layouts, setLayouts] = useState<Layouts>({});
    const [editable, setEditable] = useState(true);

    const onSettingItem = (id) => {
        console.log(id);
    };

    /**
     * - 删除 item
     */
    const onDeleteItem = (id) => {
        const tmpLayouts = cloneDeep(layouts);
        const currentLayout = tmpLayouts[breakpoint] || [];
        tmpLayouts[breakpoint] = currentLayout.filter((item) => item.i !== id);

        setLayouts(tmpLayouts);
    };

    /**
     * - 新增 Item
     */
    const onAddItem = () => {
        const tmpLayouts = cloneDeep(layouts);
        const currentLayout = tmpLayouts[breakpoint] || [];
        const currentCol = 12; // cols[breakpoint]
        const gridWidth = 2;

        let line = 1;
        /** - item 的 x 轴位置 */
        let x = 0;

        // 第 1 行，即 item.y + item.h >= 1
        // 找到第一个 item，即 x 值最小的
        // 如果 x > gridWidth，则 x = 0，即新的 item 放在当前 item 前面
        // 否则找到下一个 item
        // 如果 item.x - (上一个 item.x + item.w) > gridWith, 则 x = (上一个 item.x + item.w)，即新的 item 放在上一个 item 的后面
        // 否则计算 currentCol % (item.x + item.w)
        // 如果结果 >= gridWidth，则 x = item.x + item.w，即新的 item 放在上一个 item 的后面
        // 否则从第一步重新开始
        top: while (true) {
            // 过滤出占据当前 line 的 item
            // eslint-disable-next-line @typescript-eslint/no-loop-func
            const currentLineItems = currentLayout.filter((item) => item.y < line && item.y + item.h >= line);
            // 按照 x 轴排列顺序进行排序
            currentLineItems.sort((a, b) => a.x - b.x);

            // 判断当前是否有 item
            if (currentLineItems.length > 0) {
                for (let i = 0; i < currentLineItems.length; i++) {
                    if (i === 0) {
                        if (currentLineItems[i].x >= gridWidth) {
                            x = 0;
                            break top;
                        } else {
                            // 判断当前 item 后面有没有 item 了
                            if (currentLineItems[i + 1]) {
                                // 如果有，则开始下一次循环
                                // continue;
                            } else {
                                x = currentLineItems[i].x + currentLineItems[i].w;
                                break top;
                            }
                        }
                    } else {
                        // 判断当前 item 和上一个 item 之间是否有位置放置新的 item
                        if (
                            currentLineItems[i].x - (currentLineItems[i - 1].x + currentLineItems[i - 1].w) >=
                            gridWidth
                        ) {
                            // 如果有，新的 item 放在上一个 item 后面
                            x = currentLineItems[i - 1].x + currentLineItems[i - 1].w;
                            break top;
                        } else {
                            // 判断当前 item 后面有没有 item 了
                            if (currentLineItems[i + 1]) {
                                // 如果有，则开始下一次循环
                                // continue;
                            } else {
                                // 如果没有，则判断当前 item 后面是否有空间放置新的 item
                                if (currentCol - (currentLineItems[i].x + currentLineItems[i].w) >= gridWidth) {
                                    // 有，则放在当前 item 后面
                                    x = currentLineItems[i].x + currentLineItems[i].w;
                                    break top;
                                } else {
                                    // 没有，结束循环，在新的一行寻找位置
                                    line = line + 1;
                                }
                            }
                        }
                    }
                }
            } else {
                break;
            }
        }

        const item = {
            i: 'n' + counter,
            x: x, // 当前 cols 列数
            y: Infinity, // puts it at the bottom
            w: gridWidth,
            h: 2,
            minH: 2,
            minW: 2,
            title: '2222',
        };

        tmpLayouts[breakpoint] = [...currentLayout, item];

        console.log('tmpLayouts', tmpLayouts);
        console.log('currentLayout', currentLayout);

        setLayouts(tmpLayouts);
        setCounter((prev) => prev + 1);
    };

    const onBreakpointChange = (newBreakpoint) => {
        // console.log(333, newBreakpoint);
        setBreakpoint(newBreakpoint);
    };

    const onLayoutChange = (_currentLayout, allLayouts) => {
        // console.log('allLayouts', allLayouts);
        setLayouts(allLayouts);
    };

    return (
        <div>
            <Space>
                <Button type="primary" onClick={() => onAddItem()}>
                    Add Item
                </Button>

                <Switch checked={editable} onChange={setEditable} />
            </Space>

            <div style={{ height: '600px', marginTop: '16px' }}>
                <div
                    style={{
                        height: '100%',
                        overflow: 'scroll',
                        width: '100%',
                    }}
                >
                    <ResponsiveGridLayout
                        breakpoint={breakpoint}
                        layouts={layouts}
                        rowHeight={rowHeight}
                        isDraggable={editable}
                        isResizable={editable}
                        onBreakpointChange={onBreakpointChange}
                        onLayoutChange={onLayoutChange}
                        extraRender={(items) => {
                            return <Extra id={items.i} onSetting={onSettingItem} onDelete={onDeleteItem} />;
                        }}
                        childrenRender={(items) => {
                            return <Text>{JSON.stringify(items)}</Text>;
                        }}
                    />
                </div>
            </div>
        </div>
    );
};
