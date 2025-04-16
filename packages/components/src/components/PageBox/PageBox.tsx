import { Divider, Typography } from 'antd';
import ResizeObserver from 'rc-resize-observer';
import { PropsWithChildren, useState } from 'react';
import useStyles from './style';
import type { PageBoxProps } from './typing';

const { Title } = Typography;

const PageBox: React.FC<PropsWithChildren<PageBoxProps>> = (props) => {
    const { title, pageHeader, pageLeft, marginHeight = 96, hasFooter, footerHeight = 65 } = props;
    const { styles, cx } = useStyles({ marginHeight, footerHeight });

    const [headerHeight, setHeaderHeight] = useState(0); // 动态获取顶部高度

    return (
        <div className={styles['page-box']}>
            <div
                className={cx(
                    styles['page-container'],
                    hasFooter ? styles['page-full-footer-height'] : styles['page-full-height'],
                )}
            >
                <ResizeObserver
                    onResize={({ height }) => {
                        setHeaderHeight(height);
                    }}
                >
                    <div className={styles['page-header']}>
                        {title ? typeof title === 'string' ? <Title level={4}>{title}</Title> : title : <></>}
                        {/* 页面头部 */}
                        {pageHeader ? pageHeader : <></>}
                    </div>
                </ResizeObserver>

                {/* 页面左侧 */}
                {pageLeft ? (
                    <>
                        <div className={styles['page-left']} style={{ height: `calc(100% - ${headerHeight}px)` }}>
                            {pageLeft}
                        </div>

                        {/* 分割线 */}
                        <Divider
                            className={styles['page-divider']}
                            type="vertical"
                            style={{ height: `calc(100% - ${headerHeight}px)` }}
                        />
                    </>
                ) : (
                    <></>
                )}

                {/* 页面右侧 */}
                <div className={pageLeft ? styles['page-right'] : ''}>{props.children}</div>
            </div>
        </div>
    );
};

export { PageBox };
