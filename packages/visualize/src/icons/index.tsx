// @ts-nocheck
import Icon from '@ant-design/icons';
import type { GetProps } from 'antd';
import { ReactComponent as AreaChartSvg } from './area-chart.svg';
import { ReactComponent as BasicBarChartSvg } from './basic-bar-chart.svg';
import { ReactComponent as BasicHorizontalBarChartSvg } from './basic-horizontal-bar-chart.svg';
import { ReactComponent as BasicLineChartSvg } from './basic-line-chart.svg';
import { ReactComponent as DonutChartSvg } from './donut-chart.svg';
import { ReactComponent as StatisticCardSvg } from './statistic-card.svg';
import { ReactComponent as PercentStackAreaChartSvg } from './percent-stack-area-chart.svg';
import { ReactComponent as PercentStackBarChartSvg } from './percent-stack-bar-chart.svg';
import { ReactComponent as PercentStackHorizontalBarChartSvg } from './percent-stack-horizontal-bar-chart.svg';
import { ReactComponent as PieChartSvg } from './pie-chart.svg';
import { ReactComponent as PolylineSvg } from './poly-line.svg';
import { ReactComponent as SmoothLineChartSvg } from './smooth-line-chart.svg';
import { ReactComponent as SmoothlineSvg } from './smooth-line.svg';
import { ReactComponent as StackAreaChartSvg } from './stack-area-chart.svg';
import { ReactComponent as StackBarChartSvg } from './stack-bar-chart.svg';
import { ReactComponent as StackHorizontalBarChartSvg } from './stack-horizontal-bar-chart.svg';
import { ReactComponent as StepLineChartSvg } from './step-line-chart.svg';
import { ReactComponent as SteplineSvg } from './step-line.svg';
import { ReactComponent as TableViewSvg } from './table-view.svg';

type CustomIconComponentProps = GetProps<typeof Icon>;

const AreaChartIcon = (props: Partial<CustomIconComponentProps>) => (
    <Icon component={() => <AreaChartSvg />} {...props} />
);

const BasicBarChartIcon = (props: Partial<CustomIconComponentProps>) => (
    <Icon component={() => <BasicBarChartSvg />} {...props} />
);

const BasicHorizontalBarChartIcon = (props: Partial<CustomIconComponentProps>) => (
    <Icon component={() => <BasicHorizontalBarChartSvg />} {...props} />
);

const BasicLineChartIcon = (props: Partial<CustomIconComponentProps>) => (
    <Icon component={() => <BasicLineChartSvg />} {...props} />
);
const DonutChartIcon = (props: Partial<CustomIconComponentProps>) => (
    <Icon component={() => <DonutChartSvg />} {...props} />
);

const StatisticCardIcon = (props: Partial<CustomIconComponentProps>) => (
    <Icon component={() => <StatisticCardSvg />} {...props} />
);

const PercentStackAreaChartIcon = (props: Partial<CustomIconComponentProps>) => (
    <Icon component={() => <PercentStackAreaChartSvg />} {...props} />
);

const PercentStackBarChartIcon = (props: Partial<CustomIconComponentProps>) => (
    <Icon component={() => <PercentStackBarChartSvg />} {...props} />
);

const PercentStackHorizontalBarChartIcon = (props: Partial<CustomIconComponentProps>) => (
    <Icon component={() => <PercentStackHorizontalBarChartSvg />} {...props} />
);

const PieChartIcon = (props: Partial<CustomIconComponentProps>) => (
    <Icon component={() => <PieChartSvg />} {...props} />
);

const SmoothLineChartIcon = (props: Partial<CustomIconComponentProps>) => (
    <Icon component={() => <SmoothLineChartSvg />} {...props} />
);

const StackAreaChartIcon = (props: Partial<CustomIconComponentProps>) => (
    <Icon component={() => <StackAreaChartSvg />} {...props} />
);

const StackBarChartIcon = (props: Partial<CustomIconComponentProps>) => (
    <Icon component={() => <StackBarChartSvg />} {...props} />
);

const StackHorizontalBarChartIcon = (props: Partial<CustomIconComponentProps>) => (
    <Icon component={() => <StackHorizontalBarChartSvg />} {...props} />
);

const StepLineChartIcon = (props: Partial<CustomIconComponentProps>) => (
    <Icon component={() => <StepLineChartSvg />} {...props} />
);

const TableViewIcon = (props: Partial<CustomIconComponentProps>) => (
    <Icon component={() => <TableViewSvg />} {...props} />
);

const PolylineIcon = (props: Partial<CustomIconComponentProps>) => <Icon component={PolylineSvg} {...props} />;

const SmoothlineIcon = (props: Partial<CustomIconComponentProps>) => <Icon component={SmoothlineSvg} {...props} />;

const SteplineIcon = (props: Partial<CustomIconComponentProps>) => <Icon component={SteplineSvg} {...props} />;

export {
    AreaChartIcon,
    BasicBarChartIcon,
    BasicHorizontalBarChartIcon,
    BasicLineChartIcon,
    DonutChartIcon,
    PercentStackAreaChartIcon,
    PercentStackBarChartIcon,
    PercentStackHorizontalBarChartIcon,
    PieChartIcon,
    PolylineIcon,
    SmoothLineChartIcon,
    SmoothlineIcon,
    StackAreaChartIcon,
    StackBarChartIcon,
    StackHorizontalBarChartIcon,
    StatisticCardIcon,
    StepLineChartIcon,
    SteplineIcon,
    TableViewIcon,
};
