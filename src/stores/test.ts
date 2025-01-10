import { defineStore } from 'pinia'
export const useUserStore = defineStore('user', {
  state: () => ({
    token: '',
  }),
  getters: {
    isLogin: (state) => !!state.token,
  },
  actions: {
    async login(data: Record<string, unknown>) {
      console.log(data)
    },
    async logout() {},
  },
})
