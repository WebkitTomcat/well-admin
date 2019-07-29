# Vue + TypeScript 项目实践


### 前言:  Vue-cli 升级到3.x 版本以来，对TypeScript的支持做了较大的提升，初始化项目也添加了直接对TypeScript的支持，故借空余时间对做一个关于Vue + TypeScript 的实践项目

### 选择TypeScript的原因分析
 + JavaScript 是一门弱类型语言，变量的数据类型具有动态性，只有执行时才能确定变量的类型，这种后知后觉的认错方法会让开发者成为调试大师，但无益于编程能力的提升，还会降低开发效率。TypeScript 的类型机制可以有效杜绝由变量类型引起的误用问题
 + TypeScript 作为javascript 的一个超集，支持所有javascript 的原生语法, 对于原本javascript使用者来说，低学习成本可以得到较大提升
 + TypeScript 作为一门微软官方推出语言，本身强大的基础上还在不断的做出改进
 + Vue 对 TypeScript 的良好支持改进
 + Vscode 对 TypeScript 良好，开发者体验良好
 + 对于还不太了解 TypeScript 的同学可以通过这里学习[TypeScript](https://www.tslang.cn/docs/handbook/typescript-in-5-minutes.html) 

### 初始化项目并改造
+ 直接利用官方vue-cli初始化项目这里就不做演示了,不会的同学点这里 [Vue官方文档](https://cn.vuejs.org/)

### 改造后目录结构如下

```TOC
├── public                          // 静态页面
├── scripts                         // 相关脚本配置
├── src                             // 主目录(开发者写的代码基本都在这里)
    ├── api                         // axios请求封装 
    ├── assets                      // 静态资源, svg-icon 图标等
    ├── filters                     // 全局过滤器
    ├── lib                         // 全局插件
    ├── router                      // 路由配置
    ├── store                       // vuex 配置
    ├── scss                        // 样式scss文件
    ├── types                       // .d.ts 文件全局注入
    ├── utils                       // 工具方法封装，全局方法等
    ├── views                       // 页面问价目录
    ├── App.vue                     // 页面主入口
    ├── main.ts                     // 项目主入口
    ├── registerServiceWorker.ts    // PWA 配置
├── tests                           // 测试用例
├── .editorconfig                   // 编辑相关配置
├── .env.development                // 开发环境环境变量 
├── .env.production                 // 生产环境环境变量 
├── .npmrc                          // npm 源配置
├── .postcssrc.js                   // postcss 配置
├── babel.config.js                 // preset 记录
├── cypress.json                    // e2e plugins
├── deploy.sh                       // 快速部署shell脚本命令
├── f2eci.json                      // 部署相关配置
├── package.json                    // 依赖
├── README.md                       // 项目 readme
├── tsconfig.json                   // ts 配置
├── tslint.json                     // tslint 配置
└── vue.config.js                   // webpack 配置
```

### tslint 配置
+ [typescript-tslint-plugin](https://github.com/Microsoft/typescript-tslint-plugin) 插件下载
```javascript
npm install typescript-tslint-plugin --save-dev
```
+ 我这里的tslint直接引用一份官方标准[tslint-config-standard](https://standardjs.com/rules.html), 下载标准
```javascript
npm install tslint-config-standard --save-dev
```
+ tslint.json 配置文件, 只需配置继承tslint-config-standard的配置即可，当然也可以在下面的配置中自定义修改
```json
{
  "defaultSeverity": "warning",
  "extends": [
    "tslint-config-standard"
  ],
  "linterOptions": {
    "exclude": [
      "node_modules/**"
    ]
  },
  "rules": {
  }
}
```
+ 在tscconfig.json中注入tslint插件
```json
{
  "compilerOptions": {
    "plugins": [
      {
        "name": "typescript-tslint-plugin",
        "configFile": "./tslint.json",
      }
    ]
  }
}
```
### axios 请求

+ api 目录结构

```TOC
├── api                               
  ├── api-config.ts              //  所有api接url配置
  ├── axios-config.ts            //  ajax请求配置
  ├── index.ts                   //  导出接口函数
  ├── request.ts                 //  添加拦截器 以及常用请求方式封装

```

#### axios-config.ts文件

```typescript
import http from 'http'
import https from 'https'
import qs from 'qs'
import { AxiosResponse, AxiosRequestConfig } from 'axios'

const axiosConfig: AxiosRequestConfig = {
  baseURL: process.env.VUE_APP_BASE_API,
  // 请求后的数据处理
  transformResponse: [(data: AxiosResponse<AxiosRes>) => data],
  // 查询对象序列化函数
  paramsSerializer: (params: DictType) => qs.stringify(params),
  // 超时设置s
  timeout: 30000,
  // 跨域是否带Token
  withCredentials: true,
  responseType: 'json',
  // xsrf 设置
  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',
  // 最多转发数，用于node.js
  maxRedirects: 5,
  // 最大响应数据大小
  maxContentLength: 2000,
  // 自定义错误状态码范围
  validateStatus: (status) => status >= 200 && status < 300,
  // 用于node.js
  httpAgent: new http.Agent({ keepAlive: true }),
  httpsAgent: new https.Agent({ keepAlive: true })
}

export default axiosConfig
```

#### request文件

```typescript
import axios, { AxiosPromise, AxiosRequestConfig } from 'axios' // 引入axios
import axiosConfig from '@/api/axios-config'

// 取消重复请求
const pending: Array<{url: string; cancel: () => void}> = []
const CancelToken = axios.CancelToken
const removePending = (config: AxiosRequestConfig) => {
  pending.forEach((item, i) => {
    if (item.url === config.url + '&request_type=' + config.method) {
      // 执行取消操作
      item.cancel()
      // 从数组中移除记录
      pending.splice(i, 1)
    }
  })
}

// 创建axios 实例
const instance = axios.create(axiosConfig)

instance.interceptors.request.use(
  (config) => {
    removePending(config)
    config.cancelToken = new CancelToken((c) => {
      pending.push({ url: config.url + '&request_type=' + config.method, cancel: c })
    })
    return config
  },
  (error) => Promise.reject(error)
)

instance.interceptors.response.use(
  (response) => {
    removePending(response.config)
    return Promise.resolve(response)
  },
  (error) => {
    return Promise.reject(error)
  }
)

function get (url: string, params?: DictType) {
  return request({
    url, params, method: 'GET'
  })
}

function post (url: string, data?: DictType) {
  return request({
    url, data, method: 'POST'
  })
}

function blob (url: string, params: DictType) {
  return request({
    url, params, method: 'GET', responseType: 'blob'
  })
}

function request (config: AxiosRequestConfig): AxiosPromise<AxiosRes> {
  console.log(config)
  return new Promise((resolve, reject) => {
    instance(config)
      .then((response) => {
        resolve(response) // 把请求到的数据发到引用请求的地方
      })
      .catch((error) => {
        reject(error)
      })
  })
}

export default request
export { get, post, blob }
```

#### api-config.ts 文件

```typescript
const API_CONFIG: DictType = {
  user_login: '/api/user/login',          // 用户登陆
  user_reg: '/api/user/reg'               // 用户注册
}
export default API_CONFIG
```

#### index.ts 文件

```typescript
import request, { get, post } from './request'
import API_CONFIG from './api-config'

export const userLogin = (params: DictType) => post(API_CONFIG.user_login, params)

export const userReg = (params: DictType) => post(API_CONFIG.user_reg, params)
```

### 更多详细内容再进行完善
### 项目运行

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Run your end-to-end tests
```
npm run test:e2e
```

### Run your unit tests
```
npm run test:unit
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
