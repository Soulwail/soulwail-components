import { createStyles } from 'antd-style';
import { PageBoxStyleProps } from './typing';

export default createStyles((utils, props: PageBoxStyleProps) => ({
    'page-box': {
        display: 'flex',
    },
    'page-container': {
        width: '100%',
        backgroundColor: '#fff',
        borderRadius: '6px',
        paddingInline: '16px',
        paddingBlock: '16px',
    },
    'page-header': {
        overflow: 'hidden',
    },
    'page-left': {
        width: '200px',
        float: 'left',
    },

    'page-divider': {
        float: 'left',
        marginInline: '16px',
    },
    'page-right': {
        marginLeft: '233px',
    },
    'page-full-height': {
        minHeight: `calc(100vh - ${props.marginHeight}px - 32px)`,
    },
    'page-full-footer-height': {
        minHeight: `calc(100vh - ${props.marginHeight}px - ${props.footerHeight}px - 32px)`,
    },
}));
