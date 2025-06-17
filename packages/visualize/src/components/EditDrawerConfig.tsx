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
                    configItem = <AxisTitle />;
                } else if (item.key === 'pieSeries') {
                    configItem = <PieSeries />;
                } else if (item.key === 'series') {
                    configItem = <Series />;
                } else if (item.key === 'legend') {
                    configItem = <Legend />;
                } else if (item.key === 'xAxis') {
                    configItem = <XAxis />;
                } else if (item.key === 'yAxis') {
                    configItem = <YAxis />;
                } else if (item.key === 'background') {
                    configItem = <Background />;
                } else if (item.key === 'font') {
                    configItem = <Font />;
                } else if (item.key === 'numberFormat') {
                    configItem = <NumberFormat />;
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
