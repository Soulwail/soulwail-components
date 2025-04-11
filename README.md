# safety-components

自定义封装组件库

## Development

```bash
# install dependencies
$ pnpm install

# develop library by docs demo
$ pnpm start

# build library source code
$ pnpm run build

# build docs
$ pnpm run docs:build

# Locally preview the production build.
$ pnpm run docs:preview

# check your project for potential problems
$ pnpm run doctor

# 格式化所有代码
$ pnpm run prettier

# 获取所有包版本号
$ pnpm run version
```

### 发布远程仓库

```bash
pnpm run publish
```

#### 🛠️ 支持的 CLI 参数

| 参数名                        | 说明                                               |
|:---------------------------|:-------------------------------------------------|
| `--skipGitStatusCheck`     | 跳过 Git 状态检查                                      |
| `--publishOnly`            | 跳过版本升级，只进行发布                                     |
| `--skipBuild`              | 跳过 build 构建步骤                                    |
| `--conventionalGraduate`   | 指定要从 prerelease 升为正式的包                           |
| `--conventionalPrerelease` | 指定要发布为 prerelease 包                              |
| `--major/minor`            | 手动置顶版本升级类型，有破坏性变更 (**X**.y.z) / 增加功能 (x.**Y**.z) |
| `--tag`                    | 设置发布的 tag（如 latest、next）                         |

#### ✳️ 自动版本升级

通过 Git 提交历史 + semver 策略，自动更新所有相关包的版本号

| 类型              | 含义     | 影响的版本级别（semver）      |
|:----------------|:-------|:---------------------|
| fix             | 修复BUG  | patch 版本 (x.y.**Z**) |
| feat            | 新增功能   | minor 版本 (x.**Y**.z) |
| BREAKING CHANGE | 有破坏性变更 | major 版本 (**X**.y.z) |

## LICENSE

MIT
