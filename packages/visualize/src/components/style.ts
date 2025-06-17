import { createStyles } from 'antd-style';

export default createStyles(({ css }, props: { height?: number }) => ({
    'config-box': css`
        height: ${props?.height ? props.height + 'px' : 'inherit'};
        overflow-y: scroll;
        padding-right: 8px;

        &::-webkit-scrollbar {
            width: 8px;
        }

        &::-webkit-scrollbar-thumb {
            background: #ccc; // 滑块颜色
            border-radius: 4px; // 滑块圆角
        }

        &::-webkit-scrollbar-track {
            background: transparent; /* 隐藏滚动槽 */
        }
    `,
    'drawer-config-box': css`
        height: 100%;
        display: flex;
        flex-direction: column;
    `,
    'drawer-config-title': css`
        margin-block: 8px;
        padding-inline: 16px;
    `,
    'drawer-config-group-title': css`
        margin-bottom: 8px;
    `,
    'drawer-config-body': css`
        flex: 1;
        padding: 16px;
    `,
    'drawer-config-footer': css`
        padding: 8px 16px;
        border-top: 1px solid rgba(5, 5, 5, 0.06);
    `,
}));
