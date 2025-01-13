import { get, post } from '@/utils/service'

// test GET请求
export const testGet = async (params?: Record<string, unknown>) => {
  return get('/testGet', params)
}
// test POST请求
export const testPost = async (data?: Record<string, unknown>) => {
  return {
    data:{
      name: 'Pinia',
      age: 18,
    }
  }
}

