import { defineConfig } from 'dumi';
import { readdirSync } from 'fs';
import { join } from 'path';

const headPkgList: string[] = [];

// utils must build before core
// runtime must build before renderer-react
const pkgList = readdirSync(join(__dirname, 'packages')).filter(
    (pkg) => pkg.charAt(0) !== '.' && !headPkgList.includes(pkg),
);

const alias = pkgList.reduce((pre, pkg) => {
    pre[`@safety/${pkg}`] = join(__dirname, 'packages', pkg, 'src');
    return {
        ...pre,
    };
}, {} as Record<string, string>);

const tailPkgList = pkgList.map((path) => `packages/${path}/src/components`);

export default defineConfig({
    outputPath: 'docs-dist',
    alias,
    extraBabelPlugins: [require.resolve('babel-plugin-antd-style')],
    resolve: {
        docDirs: ['docs'],
        atomDirs: tailPkgList.map((dir) => ({ type: 'component', dir })),
    },
    styles: [`.markdown table{table-layout: fixed;}`],
    locales: [{ id: 'zh-CN', name: '中文' }],
    themeConfig: {
        name: 'SafetyComponents',
        hero: {
            title: 'SafetyComponents',
            description: '自定义开发组件',
            actions: {
                text: '🏮🏮 快速开始 →',
                link: '/docs/intro',
            },
        },
        siteToken: { demoInheritSiteTheme: true },
        nav: {
            'zh-CN': [
                { title: '文档', link: '/docs' },
                { title: '组件', link: '/components' },
            ],
        },
        sidebar: {
            '/components': [
                {
                    title: '架构设计',
                    children: [
                        {
                            title: 'Components - 组件设计',
                            link: '/components',
                        },
                    ],
                },
                {
                    title: '布局',
                    children: [
                        {
                            title: 'Components - 自定义组件',
                            link: '/components/components',
                        },
                        {
                            title: 'Visualize - 可视化组件',
                            link: '/components/visualize',
                        },
                    ],
                },
                {
                    title: '数据录入',
                    children: [
                        {
                            title: 'ReactGridLayout - 可编辑网格布局',
                            link: '/components/react-grid-layout',
                        },
                    ],
                },
            ],
        },
        footer: false,
        apiHeader: false,
    },
    hash: true,
});
