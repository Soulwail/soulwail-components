import { DownOutlined } from '@ant-design/icons';
import type { ColorPickerProps } from 'antd';
import { ColorPicker } from 'antd';
import React from 'react';
import useStyles from './style';

const ChartColorPicker: React.FC<ColorPickerProps> = (props) => {
    const { styles } = useStyles();
    const PickerColors = [
        '#3370EB',
        '#4752E6',
        '#7A35F0',
        '#008280',
        '#298FCB',
        '#FFC60A',
        '#ED6D0C',
        '#E22E28',
        '#51565D',
        '#E0E9FF',
        '#F2F3FD',
        '#EFE6FE',
        '#EAFAF8',
        '#ECF9FE',
        '#FAEDC2',
        '#FFF3E5',
        '#FEE3E2',
        '#FFFFFF',
    ];

    return (
        <ColorPicker
            {...props}
            format="hex"
            arrow={false}
            allowClear
            placement="bottom"
            presets={[{ label: '推荐颜色', colors: PickerColors, defaultOpen: true }]}
            style={{ width: '100%', justifyContent: 'space-between' }}
            styles={{ popupOverlayInner: { width: 267 } }}
            showText={() => (
                <DownOutlined
                    style={{
                        color: 'rgba(0, 0, 0, 0.25)',
                    }}
                />
            )}
            panelRender={(_, { components: { Picker, Presets } }) => (
                <div className={styles['custom-panel']}>
                    <Presets />
                    <Picker />
                </div>
            )}
        />
    );
};

export { ChartColorPicker };
