import { Form } from 'antd';
import React, { useMemo } from 'react';
import { ChartTypes, OtherTypes, ViewTypes } from '../utils';
import {
    AreaDetailVis,
    AreaVis,
    HorizontalBarVis,
    HorizontalDetailBarVis,
    IntervalDetailVis,
    IntervalVis,
    LineDetailVis,
    LineVis,
    PieDetailVis,
    PieVis,
    StatisticCardVis,
    TableCardVis,
} from './ChartVis';
import { EditDrawerConfig } from './EditDrawerConfig';

const ChartConfig = () => {
    const chartType = Form.useWatch('chartType');

    const type: string = useMemo(() => {
        if (chartType) {
            const chartTypeArr = chartType.split('_');

            return chartTypeArr[0];
        } else {
            return '';
        }
    }, [chartType]);

    const getVisConfig = (t: string) => {
        switch (t) {
            case ChartTypes.INTERVAL:
                return <IntervalVis />;
            case ChartTypes.LINE:
                return <LineVis />;
            case ChartTypes.PIE:
                return <PieVis />;
            case ChartTypes.HORIZONTAL_BAR:
                return <HorizontalBarVis />;
            case ChartTypes.AREA:
                return <AreaVis />;
            case ViewTypes.TABLE:
                return <TableCardVis />;
            case OtherTypes.STATISTIC_CARD:
                return <StatisticCardVis />;
            default:
                return <></>;
        }
    };

    return getVisConfig(type);
};

const ChartDetailConfig: React.FC = () => {
    const chartType = Form.useWatch('chartType');

    const type: string = useMemo(() => {
        if (chartType) {
            const chartTypeArr = chartType.split('_');

            return chartTypeArr[0];
        } else {
            return '';
        }
    }, [chartType]);

    const getVisDetailConfig = (t: string) => {
        switch (t) {
            case ChartTypes.INTERVAL:
                return <IntervalDetailVis />;
            case ChartTypes.LINE:
                return <LineDetailVis />;
            case ChartTypes.PIE:
                return <PieDetailVis />;
            case ChartTypes.HORIZONTAL_BAR:
                return <HorizontalDetailBarVis />;
            case ChartTypes.AREA:
                return <AreaDetailVis />;
            case ViewTypes.TABLE:
                return <></>;
            case OtherTypes.STATISTIC_CARD:
                return <EditDrawerConfig />;
            default:
                return <></>;
        }
    };

    return getVisDetailConfig(type);
};

export { ChartConfig, ChartDetailConfig };
