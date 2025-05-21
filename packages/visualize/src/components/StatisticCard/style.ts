import { createStyles } from 'antd-style';

export default createStyles(() => {
    return {
        'chart-block-statistics-wrapper': {
            borderRadius: '16px',
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            height: '100%',
            justifyContent: 'center',
            whiteSpace: 'nowrap',

            '.site-pro-card': {
                backgroundColor: 'inherit',
            },
            '.site-statistic-content-value': {
                width: '100%',
            },
        },
    };
});
