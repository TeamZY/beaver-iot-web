# MS 云生态管理后台

本应用是 MileSight 云生态管理平台项目。基础技术栈包括：

- 视图库：React
- 请求库：Axios
- 组件库：Ysd-iot
- 状态管理：Zustand
- 国际化：react-intl-universal
- 通用 Hook：Ahooks

## 目录结构

```
@iot/admin
├── public
├── src
│   ├── assets                  # 图片资源
│   ├── components              # 全局组件
│   ├── config                  # 全局配置
│   ├── hooks                   # 全局 Hooks
│   ├── layouts                 # 布局组件
│   ├── pages                   # 路由页面资源
│   │     ├── page-a
│   │     │     ├── components  # 页面组件
│   │     │     ├── index.ts    # 页面入口
│   │     │     ├── store.ts    # 页面共享状态
│   │     │     ├── style.ts
│   │     │     └── ...
│   │     │
│   │     └── page-b
│   │
│   ├── routes                  # 路由配置
│   ├── services                # 通用服务
│   ├── stores                  # 全局状态
│   ├── styles                  # 全局样式
│   ├── utils                   # 工具函数
│   └── typings.d.ts            # 类型约束
├── index.html                  # 入口 Html
├── package.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts              # 构建配置
```

## 开发维护

### 别名支持

- `'@': './src/*'` src 路径别名

