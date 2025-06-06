import RGL from 'react-grid-layout';
import type { Layout, Layouts, ResponsiveGridProps } from './components/ResponsiveGridLayout';
import { ResponsiveGridLayout } from './components/ResponsiveGridLayout';

const WidthProvider: typeof RGL.WidthProvider = RGL.WidthProvider;
const Responsive: typeof RGL.Responsive = RGL.Responsive;
const GridLayout: typeof RGL = RGL;

export { GridLayout, Responsive, ResponsiveGridLayout, WidthProvider };
export type { Layout, Layouts, ResponsiveGridProps };
