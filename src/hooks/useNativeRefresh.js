import { defineStore } from 'pinia'
import { nextTick } from 'vue'

const useNativeRefresh = defineStore('useNativeRefresh', {
  state: () => ({
    refresh: true,
  }),

  actions: {
    refreshHandler() {
      console.clear()
      this.refresh = false
      nextTick(() => {
        this.refresh = true
      })
    },
  },
})

export default useNativeRefresh
