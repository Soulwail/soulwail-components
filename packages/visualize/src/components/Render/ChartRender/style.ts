import { createStyles } from 'antd-style';
import { VisualizeContextProps } from '../../../context';

export default createStyles(
    (
        {},
        props: {
            contentHeight: number;
            size: VisualizeContextProps['size'];
            isEmpty: boolean;
        },
    ) => {
        const { contentHeight, size, isEmpty } = props;

        return {
            'spin-box': {
                maxHeight: 'unset',
            },
            'empty-box': {
                top: `calc(${contentHeight / 2}px - ${size === 'medium' ? 60 : 53}px)`,
                width: 'calc(100% - 16px)',
                position: 'absolute',
            },
            'chart-box': {
                height: contentHeight,
                visibility: isEmpty ? 'hidden' : 'visible',
            },
        };
    },
);
