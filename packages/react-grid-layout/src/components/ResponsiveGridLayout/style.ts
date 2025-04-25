import { createStyles } from 'antd-style';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

export default createStyles(({ css }, props: { isDraggable: boolean }) => {
    const { isDraggable } = props;

    return {
        'grid-layout': css`
            .react-grid-layout {
                box-sizing: content-box;
                overflow: hidden;
                min-height: 100%;
                position: relative;
            }

            .react-grid-item {
                border: 1px dashed ${isDraggable ? '#98a2b3' : 'rgba(0, 0, 0, 0)'};
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
