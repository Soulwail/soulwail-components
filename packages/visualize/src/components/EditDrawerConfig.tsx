import React, { ReactNode, useContext, useMemo } from 'react';
import VisualizeContext from '../context';
import { AxisTitle, Background, Font, Legend, NumberFormat, PieSeries, Series, XAxis, YAxis } from '../editor';

const EditDrawerConfig: React.FC = () => {
    const { visTypeDefinition } = useContext(VisualizeContext);

    const items = useMemo(() => {
        if (visTypeDefinition) {
            const schemas = visTypeDefinition?.editorConfig?.schemas || [];

            return schemas.map((item) => {
                let configItem: ReactNode = <></>;

                if (item.key === 'axisTitle') {
                    configItem = <AxisTitle key="axisTitle" />;
                } else if (item.key === 'pieSeries') {
                    configItem = <PieSeries key="pieSeries" />;
                } else if (item.key === 'series') {
                    configItem = <Series key="series" />;
                } else if (item.key === 'legend') {
                    configItem = <Legend key="legend" />;
                } else if (item.key === 'xAxis') {
                    configItem = <XAxis key="xAxis" />;
                } else if (item.key === 'yAxis') {
                    configItem = <YAxis key="yAxis" />;
                } else if (item.key === 'background') {
                    configItem = <Background key="background" />;
                } else if (item.key === 'font') {
                    configItem = <Font key="font" />;
                } else if (item.key === 'numberFormat') {
                    configItem = <NumberFormat key="numberFormat" />;
                }

                return configItem;
            });
        } else {
            return [];
        }
    }, [visTypeDefinition]);

    return <>{items}</>;
};

export { EditDrawerConfig };
