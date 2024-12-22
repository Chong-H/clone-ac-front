# ac-front

此模板可帮助您开始使用 Vue 3 和 Vite 进行开发。

## 推荐的 IDE 设置

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar)（并禁用 Vetur）。

## TypeScript 对 `.vue` 导入的类型支持

TypeScript 默认无法处理 `.vue` 导入的类型信息，因此我们使用 `vue-tsc` 替代 `tsc` CLI 进行类型检查。在编辑器中，我们需要 [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) 来使 TypeScript 语言服务能够识别 `.vue` 类型。

## 自定义配置

参见 [Vite 配置参考](https://vite.dev/config/)。

## 项目设置

```sh
pnpm install
```

### 开发环境的编译和热重载

```sh
pnpm dev
```

### 生产环境的类型检查、编译和压缩

```sh
pnpm build
```

## 测试说明
我更改了一些本地配置