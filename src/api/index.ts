import request, { get, post } from './request'
import API_CONFIG from './api-config'

// 用户登陆
export const userLogin = (params: Dictionary) => post(API_CONFIG.user_login, params)

// 用户注册
export const userReg = (params: Dictionary) => post(API_CONFIG.user_reg, params)
