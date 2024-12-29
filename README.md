# vue3 admin

功能清单

- [x] 将 unocss 行内样式提取到 style 中
- [x] 动态换肤
- [x] 全屏切换组件
- [x] 全局设置组件大小，可配置
- [x] RBAC 根据角色动态渲染菜单信息
- [x] 两种不同的按钮权限 （可见，或者禁用模式）
- [x] 可手动配置页面是否需要缓存
- [x] 菜单可动态调整，拖拽排序
- [x] 页面标签栏可手动选择是否展示
- [ ] 将前后端整合成monorepo的形式
- [ ] 实现 docker 部署 和 nginx 
- [ ] 

数据库设计

一共只有 5 张表，三张实体表 和两张中间表 来实现多对多的关系

access 菜单表

role 角色表

user 用户表

r_a 角色和菜单的中间表 

u_r 用户和角色的中间表



er图如下

![](D:\code\vue3-code\vue3-admin\public\r_a.png)







![u_r](D:\code\vue3-code\vue3-admin\public\u_r.png)





后期可能继续美化一下页面，暂时只有上面的这些常用的功能，如果还有什么好的需求可以一起实现 ^_^ ，文档完善中 ing....

## 一、项目搭建

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
  "lint": "eslint",
  "lint:fix": "eslint --fix --quiet",
```

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
npx --no-install commitlint --edit $1

```

commit-msg 文件

```
npx commitlint --edit $1
```

pre-commit

```
npx lint-staged
```

commitlint 配置
增添 commitlint.config.cjs 配置⽂件

```
module.exports = {
extends: ["@commitlint/config-conventional"],
};
```

测试⼀下：git commit -m"feat: 初始化项⽬"

### 集成 vue-router

```
pnpm install vue-router

```

### 集成 pinia

### 搭建 layout布局

### 配置路由

### sass 样式处理

### 使用 unocss

将行内的 unocss 提取到 scss 中去，使用

```
@apply flex;
```

### 清除默认样式

```
import "normalize.css/normalize.css"
```



### 完善 layout 样式

### 提取公共变量

创建 variables.module.scss 配置基础变量

```
//scss 里面声明好的变量在 js 里面也可以使用

$sideBarWidth: 210px;
$navBarHeight: 50px;
$tagsViewHeight: 34px;

// 菜单文字颜色
$menuText: #bfcbd9;
// 菜单激活颜色
$menuActiveText: #409eff;
// 菜单背景颜色
$menuBg: #304156;

$theme: #409eff;


// 在 js 中可以使用 sass 变量
:export {
  sideBarWidth: $sideBarWidth;
  navBarHeight: $navBarHeight;
  tagsViewHeight: $tagsViewHeight;
  menuText: $menuText;
  menuActiveText: $menuActiveText;
  menuBg: $menuBg;
  theme: $theme;
}

```

### 组件库配置

按需导入等等 参考饿了么官网

#### 组件API挂载到app上

```typescript
import { ElMessage, ElMessageBox, ElNotification } from "element-plus"
import type { App } from "vue"

const installElementPlus = (app: App) => {
  // 都放到组件的实例上
  app.config.globalProperties.$message = ElMessage
  app.config.globalProperties.$notify = ElNotification
  app.config.globalProperties.$confirm = ElMessageBox.confirm
  app.config.globalProperties.$alert = ElMessageBox.alert
  app.config.globalProperties.$prompt = ElMessageBox.prompt
}

export default installElementPlus

export type Size = "default" | "large" | "small"


app.use(installElementPlus)
```





### 图标组件





### sidebar 基本样式

给 sass 增添类型声明文件，便于代码提示。

### 菜单收缩按钮以及接入 pinia 

####  创建菜单收缩按钮组件

#### 接⼊ pinia



### pinia 持久化


### vue-router

```ts
// 给模块添加额外类型 ， ts中的接口合并
declare module "vue-router" {
  interface RouteMeta {
    icon?: string
    title?: string
    hidden?: boolean
    alwaysShow?: boolean
    breadcrumb?: boolean
    affix?: boolean
    noCache?: boolean
  }
}
```





### 动态换肤方案



换肤同时需要兼顾以下两个关键信息：

1. element-plus 主题
2. 非 element-plus 主题色

element-plus主题色替换的三个步骤  实现原理  （分为三步）

+ 获取当前 element-plus 的所有样式
+ 找到我们想要替换的样式部分，通过正则完成替换
+ 把替换后的样式写入到 style 标签中，利用样式优先级的特性，代替固有样式。

实现步骤 （分为四步）

+ 获取当前 element-plus 的所有样式
+ 定义我们要替换之后的样式
+ 在原样式中，利用正则替换新样式
+ 把替换后的样式写入到 style 标签中

## 可以借鉴之处
1. sidebar 递归路由拼接， 父子路由拼接
2. tagsview 实现右键刷新当前路由页面
3. 泛型函数的写法
  ```ts
    const settings = reactive({
      theme: varaibles.theme // theme 是用户选择的主题
    })
    type ISettings = typeof settings
    
    // 泛型函数
    const changeSetting = <T extends keyof ISettings>(
        {
      key,
      value
    }: {
    key: T
    value: ISettings[T]
    }) => {
    settings[key] = value
    }
  ```

4. 动态改变主题颜色
watch store 中的 theme 变量，变化之后用 js 修改 css root 中的 element 定义的样式变量

```javascript
var color = require('css-color-function');

color.convert('color(red tint(50%))');

// "rgb(255, 128, 128)"
将一个颜色
```



查询用户有那些角色，并返回角色对应的菜单信息，如果有多个角色，则进行菜单的合并
如果相同角色之间有等级之分，则取最大角色等级的权限信息进行返回


根据 token 信息获取当前用户的 角色信息、菜单信息、按钮权限信息，在路由拦截里面做，然后把数据存储在 store 里面




菜单规定：

如果只有父菜单下面没有子菜单：则父菜单也当做路由渲染出来
如果父菜单下满有儿子，则不管是多少个都当做路由渲染出来，此时并不把当前父菜单渲染为路由。





































































