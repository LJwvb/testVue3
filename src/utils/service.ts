// 导入axios HTTP请求库
import axios from 'axios'
// 导入清除空字段的工具函数
import { clearEmptyFields } from '@/utils'
// 导入MD5加密函数
import md5 from 'md5'
import { isEmpty } from 'lodash'

// 创建axios实例，配置基础参数
const axiosInstance = axios.create({
  // 设置基础URL，从环境变量中获取
  baseURL: import.meta.env.VITE_API_URL as string,
  // 设置请求超时时间为60秒
  timeout: 60000,
  // 设置请求头的内容类型为JSON
  headers: { 'Content-Type': 'application/json' },
})

// 添加请求拦截器
axiosInstance.interceptors.request.use(
  (config) => {
    console.log('请求拦截', config)
    // 清除请求参数中的空字段
    const _params = clearEmptyFields(config.params || config.data) || {}
    // 获取参数键名并排序
    const keys = Object.keys(_params)?.sort()
    // 创建新的参数对象
    const newParams: Record<string, unknown> = {}
    // 按照排序后的键名重新组织参数
    keys.forEach((key) => {
      newParams[key] = _params[key]
    })
    // 对参数进行MD5加密
    const md5Params = md5(JSON.stringify(newParams))

    // 根据请求方法类型处理参数
    if (config.method === 'get') {
      // GET请求将参数放在params中
      config.params = newParams
      if (!isEmpty(newParams)) {
        config.params.md5 = md5Params
      }
    } else {
      // 非GET请求将参数放在data中
      config.data = newParams
      if (!isEmpty(newParams)) {
        config.data.md5 = md5Params
      }
    }
    // 返回修改后的配置
    return config
  },
  // 请求错误处理
  (error) => {
    return Promise.reject(error)
  },
)

// 添加响应拦截器
axiosInstance.interceptors.response.use(
  // 响应成功处理
  (response) => {
    // todo 针对错误码做统一处理
    return response
  },
  // 响应错误处理
  (error) => {
    return Promise.reject(error)
  },
)

// 封装GET请求方法
export const get = async (url: string, params?: Record<string, unknown>) => {
  try {
    // 发起GET请求
    const res = await axiosInstance.get(url, { params })
    // 返回响应数据
    return res.data
  } catch (error) {
    console.error(error)
    // 错误处理
    return Promise.reject(error)
  }
}

// 封装POST请求方法
export const post = async (url: string, data?: Record<string, unknown>) => {
  try {
    // 发起POST请求
    const res = await axiosInstance.post(url, data)
    // 返回响应数据
    return res.data
  } catch (error) {
    console.error(error)
    // 错误处理
    return Promise.reject(error)
  }
}
