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
