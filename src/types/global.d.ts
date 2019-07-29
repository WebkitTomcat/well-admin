declare interface DictType<T=any> { [key: string]: T }
declare interface AxiosRes { c: number; d: DictType; m: string; } // axios 请求返回
