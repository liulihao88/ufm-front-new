import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useGlobalStore = defineStore(
  'global',
  () => {
    const taskSearch = ref('')
    const taskStrSelect = ref([])
    const taskSelect = ref('')
    function changeTaskValue(selectVal, selectStrVal, searchVal) {
      taskSelect.value = selectVal
      taskSearch.value = searchVal
      taskStrSelect.value = selectStrVal
    }
    return {
      taskSearch,
      taskSelect,
      taskStrSelect,
      changeTaskValue,
    }
  },
  {
    persist: {
      storage: sessionStorage,
      paths: ['taskSearch', 'taskSelect', 'taskStrSelect'],
    },
  },
)
