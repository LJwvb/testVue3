import { get, post } from '../base'

export const testGet = async (params?: Record<string, unknown>) => {
  return get('/testGet', params)
}
export const testPost = async (data?: Record<string, unknown>) => {
  return post('/testPost', data)
}
