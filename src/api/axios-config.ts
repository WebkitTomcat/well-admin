import http from 'http'
import https from 'https'
import qs from 'qs'
import { AxiosResponse, AxiosRequestConfig } from 'axios'

const axiosConfig: AxiosRequestConfig = {
  baseURL: process.env.VUE_APP_BASE_API,
  // 请求后的数据处理
  transformResponse: [(data: AxiosResponse<AxiosRes>) => data],
  // 查询对象序列化函数
  paramsSerializer: (params: CommonDict) => qs.stringify(params),
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
