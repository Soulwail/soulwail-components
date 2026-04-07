# Change Log

All notable changes to this project will be documented in this file. See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [1.7.1](https://github.com/Soulwail/soulwail-components/compare/@soulwail/visualize@1.7.0...@soulwail/visualize@1.7.1) (2026-04-07)

**Note:** Version bump only for package @soulwail/visualize

# 1.7.0 (2026-04-02)

### Bug Fixes

-   visualize 优化 label 显示 ([626b0ee](https://github.com/Soulwail/soulwail-components/commit/626b0ee1f6fef0493a8ebec99b0039c3f383826a))
-   visualize 更新至 1.0.6 ([72fa4b9](https://github.com/Soulwail/soulwail-components/commit/72fa4b9c6988195c353c3899478ce2ab02b8e840))
-   **visualize:** Set default loading state to false in ChartRender component ([ab3e4bf](https://github.com/Soulwail/soulwail-components/commit/ab3e4bfe94b395b39f2fc208c8cd6fd93629e5ed))
-   **visualize:** 修复 initialValue 修改后无法回显问题 ([704403b](https://github.com/Soulwail/soulwail-components/commit/704403bc7605509c39d89bb13f8297d8de8fc148))
-   **visualize:** 修复可视化 key 问题 ([2dc5551](https://github.com/Soulwail/soulwail-components/commit/2dc55516c447cbbba037d56d8d6ad1afd34c50ea))
-   **visualize:** 修复可视化缺少属性导致的报错 ([6cb2c63](https://github.com/Soulwail/soulwail-components/commit/6cb2c6380a74cf4e5d07474677c7f43243915053))
-   **visualize:** 修复图表加载不居中问题 ([ee05ec4](https://github.com/Soulwail/soulwail-components/commit/ee05ec44200ddf5f547f3ebf955ecf2b44d5def4))
-   **visualize:** 修复图表展示位置错误问题，修复图表因缺失表单导致无法展示问题 ([6379871](https://github.com/Soulwail/soulwail-components/commit/6379871c1b5d4e3bac4da939798038603a179dbc))
-   **visualize:** 修复图表改变尺寸时多次渲染问题 ([de8dbb2](https://github.com/Soulwail/soulwail-components/commit/de8dbb2e00d36edb56b8b6e569dec43bdd8dfdff))
-   **visualize:** 修正初始值不是饼图 ([697d221](https://github.com/Soulwail/soulwail-components/commit/697d22112c7c5a8500913c8b3919c81abde34567))
-   **visualize:** 修正图表排列顺序 ([b3fe575](https://github.com/Soulwail/soulwail-components/commit/b3fe575f268c6d972a9742d925fe9c50289b9a71))
-   **visualize:** 删除不必要的 console ([0752776](https://github.com/Soulwail/soulwail-components/commit/0752776b8a666eb77010388b84a4de0162f180f1))
-   修复 options.labels 为非数组解析报错问题 ([2c64606](https://github.com/Soulwail/soulwail-components/commit/2c64606e9aedae51b774ec4c2924e8de7cbad0c6))

### Features

-   **visualize:** 可视化新增 Drawer 布局 ([9a5fa3a](https://github.com/Soulwail/soulwail-components/commit/9a5fa3af707631879542278e28ac001d3260a821))
-   **visualize:** 增加 chart 渲染导出 ([f1a2f26](https://github.com/Soulwail/soulwail-components/commit/f1a2f2660f5ddcf2e7dcc48b2a0bf42633cda927))
-   **visualize:** 新增指标卡可视化，优化渲染逻辑 ([83d6dde](https://github.com/Soulwail/soulwail-components/commit/83d6ddea470226ce9c7a7b7f115051950749a2ed))
-   **visualize:** 新增表格可视化 ([cb69226](https://github.com/Soulwail/soulwail-components/commit/cb692267c3221f936a9fdcf2db111d662a96fe97))
-   **visualize:** 更新图表的展示图标 ([424ef1f](https://github.com/Soulwail/soulwail-components/commit/424ef1f16fdf353a6a8e7d2125a18442dc584818))
-   增加可视化尺寸选择 ([3951a19](https://github.com/Soulwail/soulwail-components/commit/3951a190a1d4300898fe30b7c7ea7e077719ccf1))
-   数据来源增加多选功能 ([66a9163](https://github.com/Soulwail/soulwail-components/commit/66a9163b71fdc8851e4cff454c4fc6a36e813bd7))
-   柱状图、条形图、饼图增加展示数量选择 ([92f81e6](https://github.com/Soulwail/soulwail-components/commit/92f81e6fd793616014fd409bc0e6cd5231c06e8a))
-   趋势图分组聚合字段改为可选 ([23455ae](https://github.com/Soulwail/soulwail-components/commit/23455ae1a2eb5ef072c81092f060253ac777f15f))
-   进行开源设置 ([322b84b](https://github.com/Soulwail/soulwail-components/commit/322b84b64d691c69f6940dd1047dbe7b12fd567a))
-   项目初次提交 ([77881dd](https://github.com/Soulwail/soulwail-components/commit/77881dd33c0c08ec34bb4b9c8e28a31bdecde252))

### Performance Improvements

-   **visualize:** 代码格式化 ([5c0aa4a](https://github.com/Soulwail/soulwail-components/commit/5c0aa4a06c2f83992776f0cf362c96835213c363))
-   **visualize:** 区分不同布局表单的 label 显示 ([003ba53](https://github.com/Soulwail/soulwail-components/commit/003ba53357af1e556adb1d44938f07251ae2ce69))
-   优化函数回调 ([8849bc4](https://github.com/Soulwail/soulwail-components/commit/8849bc4bc0337d2e103adf997b46652c40894be2))
-   优化图表数据更新 ([cd74c75](https://github.com/Soulwail/soulwail-components/commit/cd74c751a134eceb992cb23ccf6f0a4000546573))
-   优化图表数据更新 ([2122931](https://github.com/Soulwail/soulwail-components/commit/2122931674fa534d5ba18cea1cbf5bce707e759c))
-   优化图表预览以及渲染 ([0716dff](https://github.com/Soulwail/soulwail-components/commit/0716dffe61082737eadf0022e761fd5889e5117c))
-   优化趋势图 encode 数据返回 ([43fd0e5](https://github.com/Soulwail/soulwail-components/commit/43fd0e5348b9567a00747784ebeba9c53d8f7641))
-   优化饼图展示、优化数据轴展示 ([e005c6c](https://github.com/Soulwail/soulwail-components/commit/e005c6cb77de44d6051162d478d7d7b38341e7e3))

## [1.6.4](http://192.168.1.221:180/wangweiwei/safety-components/tree/main/packages/visualize/compare/@safety/visualize@1.6.3...@safety/visualize@1.6.4) (2025-08-05)

### Bug Fixes

-   **visualize:** 修复可视化缺少属性导致的报错 ([6cb2c63](http://192.168.1.221:180/wangweiwei/safety-components/tree/main/packages/visualize/commits/6cb2c6380a74cf4e5d07474677c7f43243915053))

## [1.6.3](http://192.168.1.221:180/wangweiwei/safety-components/tree/main/packages/visualize/compare/@safety/visualize@1.6.2...@safety/visualize@1.6.3) (2025-08-05)

### Bug Fixes

-   **visualize:** 修复可视化 key 问题 ([2dc5551](http://192.168.1.221:180/wangweiwei/safety-components/tree/main/packages/visualize/commits/2dc55516c447cbbba037d56d8d6ad1afd34c50ea))

## [1.6.2](http://192.168.1.221:180/wangweiwei/safety-components/tree/main/packages/visualize/compare/@safety/visualize@1.6.1...@safety/visualize@1.6.2) (2025-07-07)

### Bug Fixes

-   **visualize:** 修正初始值不是饼图 ([697d221](http://192.168.1.221:180/wangweiwei/safety-components/tree/main/packages/visualize/commits/697d22112c7c5a8500913c8b3919c81abde34567))

## [1.6.1](http://192.168.1.221:180/wangweiwei/safety-components/tree/main/packages/visualize/compare/@safety/visualize@1.6.0...@safety/visualize@1.6.1) (2025-07-07)

### Bug Fixes

-   **visualize:** 修正图表排列顺序 ([b3fe575](http://192.168.1.221:180/wangweiwei/safety-components/tree/main/packages/visualize/commits/b3fe575f268c6d972a9742d925fe9c50289b9a71))

# [1.6.0](http://192.168.1.221:180/wangweiwei/safety-components/tree/main/packages/visualize/compare/@safety/visualize@1.5.6...@safety/visualize@1.6.0) (2025-07-07)

### Features

-   **visualize:** 更新图表的展示图标 ([424ef1f](http://192.168.1.221:180/wangweiwei/safety-components/tree/main/packages/visualize/commits/424ef1f16fdf353a6a8e7d2125a18442dc584818))

## [1.5.6](http://192.168.1.221:180/wangweiwei/safety-components/tree/main/packages/visualize/compare/@safety/visualize@1.5.5...@safety/visualize@1.5.6) (2025-06-20)

### Performance Improvements

-   **visualize:** 区分不同布局表单的 label 显示 ([003ba53](http://192.168.1.221:180/wangweiwei/safety-components/tree/main/packages/visualize/commits/003ba53357af1e556adb1d44938f07251ae2ce69))

## [1.5.5](http://192.168.1.221:180/wangweiwei/safety-components/tree/main/packages/visualize/compare/@safety/visualize@1.5.4...@safety/visualize@1.5.5) (2025-06-20)

### Bug Fixes

-   **visualize:** 修复 initialValue 修改后无法回显问题 ([704403b](http://192.168.1.221:180/wangweiwei/safety-components/tree/main/packages/visualize/commits/704403bc7605509c39d89bb13f8297d8de8fc148))

## [1.5.4](http://192.168.1.221:180/wangweiwei/safety-components/tree/main/packages/visualize/compare/@safety/visualize@1.5.3...@safety/visualize@1.5.4) (2025-06-20)

### Bug Fixes

-   **visualize:** 修复图表加载不居中问题 ([ee05ec4](http://192.168.1.221:180/wangweiwei/safety-components/tree/main/packages/visualize/commits/ee05ec44200ddf5f547f3ebf955ecf2b44d5def4))

## [1.5.3](http://192.168.1.221:180/wangweiwei/safety-components/tree/main/packages/visualize/compare/@safety/visualize@1.5.2...@safety/visualize@1.5.3) (2025-06-20)

### Bug Fixes

-   **visualize:** 修复图表改变尺寸时多次渲染问题 ([de8dbb2](http://192.168.1.221:180/wangweiwei/safety-components/tree/main/packages/visualize/commits/de8dbb2e00d36edb56b8b6e569dec43bdd8dfdff))

## [1.5.2](http://192.168.1.221:180/wangweiwei/safety-components/tree/main/packages/visualize/compare/@safety/visualize@1.5.1...@safety/visualize@1.5.2) (2025-06-19)

**Note:** Version bump only for package @safety/visualize

## [1.5.1](http://192.168.1.221:180/wangweiwei/safety-components/tree/main/packages/visualize/compare/@safety/visualize@1.5.0...@safety/visualize@1.5.1) (2025-06-19)

**Note:** Version bump only for package @safety/visualize

# [1.5.0](http://192.168.1.221:180/wangweiwei/safety-components/tree/main/packages/visualize/compare/@safety/visualize@1.4.1...@safety/visualize@1.5.0) (2025-06-19)

### Features

-   **visualize:** 增加 chart 渲染导出 ([f1a2f26](http://192.168.1.221:180/wangweiwei/safety-components/tree/main/packages/visualize/commits/f1a2f2660f5ddcf2e7dcc48b2a0bf42633cda927))

## [1.4.1](http://192.168.1.221:180/wangweiwei/safety-components/tree/main/packages/visualize/compare/@safety/visualize@1.4.0...@safety/visualize@1.4.1) (2025-06-19)

### Bug Fixes

-   **visualize:** 修复图表展示位置错误问题，修复图表因缺失表单导致无法展示问题 ([6379871](http://192.168.1.221:180/wangweiwei/safety-components/tree/main/packages/visualize/commits/6379871c1b5d4e3bac4da939798038603a179dbc))

# [1.4.0](http://192.168.1.221:180/wangweiwei/safety-components/tree/main/packages/visualize/compare/@safety/visualize@1.3.0...@safety/visualize@1.4.0) (2025-06-17)

### Features

-   **visualize:** 可视化新增 Drawer 布局 ([9a5fa3a](http://192.168.1.221:180/wangweiwei/safety-components/tree/main/packages/visualize/commits/9a5fa3af707631879542278e28ac001d3260a821))

### Performance Improvements

-   **visualize:** 代码格式化 ([5c0aa4a](http://192.168.1.221:180/wangweiwei/safety-components/tree/main/packages/visualize/commits/5c0aa4a06c2f83992776f0cf362c96835213c363))

# [1.3.0](http://192.168.1.221:180/wangweiwei/safety-components/tree/main/packages/visualize/compare/@safety/visualize@1.2.0...@safety/visualize@1.3.0) (2025-05-23)

### Features

-   **visualize:** 新增表格可视化 ([cb69226](http://192.168.1.221:180/wangweiwei/safety-components/tree/main/packages/visualize/commits/cb692267c3221f936a9fdcf2db111d662a96fe97))

# [1.2.0](http://192.168.1.221:180/wangweiwei/safety-components/tree/main/packages/visualize/compare/@safety/visualize@1.1.3...@safety/visualize@1.2.0) (2025-05-21)

### Features

-   **visualize:** 新增指标卡可视化，优化渲染逻辑 ([83d6dde](http://192.168.1.221:180/wangweiwei/safety-components/tree/main/packages/visualize/commits/83d6ddea470226ce9c7a7b7f115051950749a2ed))

## [1.1.3](http://192.168.1.221:180/wangweiwei/safety-components/tree/main/packages/visualize/compare/@safety/visualize@1.1.2...@safety/visualize@1.1.3) (2025-04-16)

**Note:** Version bump only for package @safety/visualize

## [1.1.2](http://192.168.1.221:180/wangweiwei/safety-components/tree/main/packages/visualize/compare/@safety/visualize@1.1.1...@safety/visualize@1.1.2) (2025-04-16)

**Note:** Version bump only for package @safety/visualize

## [1.1.1](https://192.168.1.221/wangweiwei/safety-components/compare/@safety/visualize@1.1.0...@safety/visualize@1.1.1) (2025-04-11)

### Bug Fixes

-   **visualize:** 删除不必要的 console ([0752776](https://192.168.1.221/wangweiwei/safety-components/commits/0752776b8a666eb77010388b84a4de0162f180f1))

# 1.1.0 (2025-04-11)

### Bug Fixes

-   visualize 优化 label 显示 ([626b0ee](https://192.168.1.221/wangweiwei/safety-components/commits/626b0ee1f6fef0493a8ebec99b0039c3f383826a))
-   visualize 更新至 1.0.6 ([72fa4b9](https://192.168.1.221/wangweiwei/safety-components/commits/72fa4b9c6988195c353c3899478ce2ab02b8e840))
-   修复 options.labels 为非数组解析报错问题 ([2c64606](https://192.168.1.221/wangweiwei/safety-components/commits/2c64606e9aedae51b774ec4c2924e8de7cbad0c6))

### Features

-   增加可视化尺寸选择 ([3951a19](https://192.168.1.221/wangweiwei/safety-components/commits/3951a190a1d4300898fe30b7c7ea7e077719ccf1))
-   数据来源增加多选功能 ([66a9163](https://192.168.1.221/wangweiwei/safety-components/commits/66a9163b71fdc8851e4cff454c4fc6a36e813bd7))
-   柱状图、条形图、饼图增加展示数量选择 ([92f81e6](https://192.168.1.221/wangweiwei/safety-components/commits/92f81e6fd793616014fd409bc0e6cd5231c06e8a))
-   趋势图分组聚合字段改为可选 ([23455ae](https://192.168.1.221/wangweiwei/safety-components/commits/23455ae1a2eb5ef072c81092f060253ac777f15f))
-   项目初次提交 ([77881dd](https://192.168.1.221/wangweiwei/safety-components/commits/77881dd33c0c08ec34bb4b9c8e28a31bdecde252))

### Performance Improvements

-   优化函数回调 ([8849bc4](https://192.168.1.221/wangweiwei/safety-components/commits/8849bc4bc0337d2e103adf997b46652c40894be2))
-   优化图表数据更新 ([cd74c75](https://192.168.1.221/wangweiwei/safety-components/commits/cd74c751a134eceb992cb23ccf6f0a4000546573))
-   优化图表数据更新 ([2122931](https://192.168.1.221/wangweiwei/safety-components/commits/2122931674fa534d5ba18cea1cbf5bce707e759c))
-   优化图表预览以及渲染 ([0716dff](https://192.168.1.221/wangweiwei/safety-components/commits/0716dffe61082737eadf0022e761fd5889e5117c))
-   优化趋势图 encode 数据返回 ([43fd0e5](https://192.168.1.221/wangweiwei/safety-components/commits/43fd0e5348b9567a00747784ebeba9c53d8f7641))
-   优化饼图展示、优化数据轴展示 ([e005c6c](https://192.168.1.221/wangweiwei/safety-components/commits/e005c6cb77de44d6051162d478d7d7b38341e7e3))
