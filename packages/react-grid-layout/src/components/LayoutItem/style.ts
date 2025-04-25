import { createStyles } from 'antd-style';

export default createStyles(({}, props: { disabled: boolean }) => {
    const { disabled } = props;

    return {
        'layout-item': {
            padding: '1px',
            background: '#fff',
            borderRadius: '16px',
            height: 'calc(100% - 2px)',
        },
        'layout-item-head': {
            boxSizing: 'border-box',
            height: '40px',
            maxHeight: '40px',
            minHeight: '14px',
            padding: '14px 6px 4px 16px',
        },
        'head-inner': {
            justifyContent: 'space-between',
            maxWidth: '100%',
            minWidth: '5px',
            width: '100%',
            alignItems: 'center',
            display: 'flex',
            height: '100%',
        },
        title: {
            boxSizing: 'content-box',
            color: '#1f2329',
            flex: 1,
            fontSize: '14px',
            fontWeight: 500,
            lineHeight: '16px',
            minWidth: '40px',
            alignItems: 'center',
            display: 'flex',
            height: '100%',
        },
        drag: {
            alignItems: 'flex-end',
            display: 'flex',
            flexShrink: 0,
            height: '16px',
            justifyContent: 'center',
            left: '0',
            pointerEvents: 'auto',
            position: 'absolute',
            right: '0',
            top: '0',
        },
        isCanDrag: {
            cursor: disabled ? 'not-allowed' : 'grab',
            opacity: 1,
        },
        'menu-slot': {
            borderRadius: '6px',
            position: 'relative',
            top: '-8px',
            alignItems: 'center',
            background: '#fff',
            justifySelf: 'right',
            marginLeft: '12px',
            pointerEvents: 'auto',
        },
        charts: {
            height: 'calc(100% - 40px)',
        },
        'dashboard-grid-container': { height: '100%' },
        'dashboard-grid-menu-button': {
            WebkitBoxAlign: 'center',
            msFlexAlign: 'center',
            alignItems: 'center',
            backgroundColor: 'transparent',
            border: '1px solid rgba(31, 35, 41, 15%)',
            borderRadius: '6px',
            color: '#646a73',
            display: 'inline-flex',
            fontSize: '16px',
            height: '22px',
            WebkitBoxPack: 'center',
            msFlexPack: 'center',
            justifyContent: 'center',
            width: '22px',
        },
        'dashboard-grid-menu-button:hover': {
            backgroundColor: 'rgba(31, 35, 41, 8%)',
            cursor: 'pointer',
        },
        'dashboard-grid-menu-button:active': {
            backgroundColor: 'rgba(20, 86, 240, 15%)',
        },
        'dashboard-grid-menu-button.disabled': { color: 'rgb(187, 191, 196)' },
        'dashboard-grid-menu-button.disabled:hover': {
            backgroundColor: 'transparent',
            cursor: 'not-allowed',
        },
    };
});
