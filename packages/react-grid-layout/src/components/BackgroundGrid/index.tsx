import html2canvas from 'html2canvas';
import React, { useEffect, useRef } from 'react';

interface BackgroundGridProps {
    width: number;
    height: number;
    right: number;
    bottom: number;
    onGridChange?: (dataURL: string) => void;
}

const BackgroundGrid: React.FC<BackgroundGridProps> = (props) => {
    const { width = 0, height = 0, right = 0, bottom = 0, onGridChange } = props;
    const elementRef = useRef(null);

    useEffect(() => {
        const element = elementRef.current;

        if (element) {
            // 使用html2canvas捕获目标元素
            // 并设置背景为透明色
            html2canvas(element, { backgroundColor: null }).then((canvas) => {
                const dataURL = canvas.toDataURL('image/png');

                onGridChange?.(dataURL);
            });
        }
    }, [width, height]);

    return (
        <div
            ref={elementRef}
            style={{
                width: `${width}px`,
                height: `${height + bottom}px`,
                position: 'absolute',
                top: '-10000px', // 将目标元素移出可视区域
            }}
        >
            <div
                style={{
                    width: width - right - 4,
                    height: height - 4,
                    border: '2px dashed #98a2b3',
                    opacity: 0.1,
                }}
            />
        </div>
    );
};

export default BackgroundGrid;
