export interface PageBoxProps {
    title?: string | React.ReactNode;
    pageHeader?: React.ReactNode;
    pageLeft?: React.ReactNode;
    hasFooter?: boolean;
    marginHeight?: number;
    footerHeight?: number;
}

export type PageBoxStyleProps = Pick<PageBoxProps, 'marginHeight' | 'footerHeight'>
