# vue3 admin

## 项目搭建

### 安装 eslint

```
pnpm install prettier eslint-plugin-prettier eslint-config-prettier -D
```

eslint-config-prettier
插件作用 关闭所有不必要或可能与 Prettier 冲突的规则。

eslint-plugin-prettier
插件可以⽤来集成 prettier ，确保 ESLint 不会因为这些格式化规则⽽产⽣错误（避免冲突，需要放到数组的最后⼀项）。

官网 https://github.com/prettier/eslint-plugin-prettier

### vs code prettier 配置

```

```

### EditorConfig for VS Code

创建.editorconfig

```
root = true
[*]
charset = utf-8
indent_style = space
indent_size = 2
end_of_line = lf
```

eslint 负责校验代码，prettier 负责统⼀代码⻛格，editconfig 保证编辑器基本设置⼀致

### husky

在项目中，代码格式化一般是配合 git hook 使用；实现提交之前，先进行校验

```
git init # git仓库初始化
pnpm install husky lint-staged -D # 安装husky包
npx husky init # husky初始化
```

在 package.json 中配置 lint-staged 相关信息

```
  "lint-staged": {
    "src/**/*.{js,cjs,ts,vue}": [
      "npx eslint --fix"
    ],
    "src/**/*.{html,json,css,scss}": [
      "npx prettier --write"
    ]
  }
```

在pre-commit 中配置 npx lint-staged

### commitlint

规范代码提交信息

安装依赖库

```
pnpm install @commitlint/cli @commitlint/config-conventional -D
```

添加钩子commit-msg

```
pnpm add --save-dev husky

pnpm husky init

# Add commit message linting to commit-msg hook
echo "pnpm dlx commitlint --edit \$1" > .husky/commit-msg
```

或者，您可以在 package.json 中创建脚本

```
npm pkg set scripts.commitlint="commitlint --edit"
echo "pnpm commitlint \${1}" > .husky/commit-msg
```
