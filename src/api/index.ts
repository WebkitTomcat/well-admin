import request, { get, post } from './request'
import API_CONFIG from './api-config'

export const userLogin = (params: CommonDict) => post(API_CONFIG.user_login, params)

export const userReg = (params: CommonDict) => post(API_CONFIG.user_reg, params)
