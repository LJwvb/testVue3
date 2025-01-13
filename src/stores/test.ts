import { defineStore } from 'pinia'
import { testGet, testPost } from '@/api/test'

export const useTestStore = defineStore('test', {
  state: () => ({
    count: 0,
    name: 'Pinia',
    apiData: {},
  }),
  getters: {
    doubleCount: (state) => state.count * 2,
    upperCaseName: (state) => state.name.toUpperCase(),
  },
  actions: {
    increment() {
      this.count++
    },
    setName(newName: string) {
      this.name = newName
    },
    async fetchApiData(params?: Record<string, unknown>) {
      try {
        const response = await testGet(params)
        this.apiData = response.data
      } catch (error: any) {
        ElMessage.error(error.message)
      }
    },
    async sendApiData(data?: Record<string, unknown>) {
      try {
        const response = await testPost(data)
        this.apiData = response.data
      } catch (error: any) {
        ElMessage.error(error.message)
      }
    },
  },
})
