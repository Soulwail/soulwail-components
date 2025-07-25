import { createStyles } from 'antd-style';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

export default createStyles(({ css }, props: { isDraggable: boolean; lineType: 'dashed' | 'none' }) => {
    const { isDraggable, lineType } = props;

    return {
        'dashboard-content': css`
            height: 100%;
            min-height: 100%;

            .react-grid-layout {
                box-sizing: content-box;
                overflow: hidden;
            }
        `,
        'grid-layout': css`
            min-height: 100%;
            opacity: 1;
            padding-bottom: 56px;

            .react-grid-item {
                border: 1px ${lineType} ${isDraggable || lineType !== 'none' ? '#98a2b3' : 'rgba(0, 0, 0, 0)'};
            }

            .react-grid-item.cssTransforms {
                transition-property: transform;
            }

            .react-grid-item:not(.react-grid-placeholder) {
                border-radius: 8px;
                background: #fff;
            }

            .react-grid-item.resizing {
                opacity: 0.9;
            }

            .react-grid-item.react-grid-placeholder {
                background: #91d5ff;
                border-radius: 8px;
                z-index: 0;
            }
        `,
    };
});
