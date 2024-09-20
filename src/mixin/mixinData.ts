import { ref } from 'vue'
const enterFileCommonData = {
  setup() {
    const valueKey = ref('111111')
    return {
      valueKey,
    }
  },
}

export default enterFileCommonData
