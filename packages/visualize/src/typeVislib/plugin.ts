import { createAreaVisTypeDefinition } from './area';
import { createHorizontalBarVisTypeDefinition } from './horizontalBar';
import { createIntervalVisTypeDefinition } from './interval';
import { createLineVisTypeDefinition } from './line';
import { createPieVisTypeDefinition } from './pie';
import { createStatisticCardVisTypeDefinition } from './statisticCard';

const vislibTypes = [
    createIntervalVisTypeDefinition,
    createLineVisTypeDefinition,
    createPieVisTypeDefinition,
    createAreaVisTypeDefinition,
    // createHeatmapVisTypeDefinition,
    createHorizontalBarVisTypeDefinition,
    // createGaugeVisTypeDefinition,
    // createGoalVisTypeDefinition,
    createStatisticCardVisTypeDefinition,
];

export const visualizations = vislibTypes.map((vis) => vis());
