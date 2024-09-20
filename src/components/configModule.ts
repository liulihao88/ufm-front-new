import SelectItem from './selectItem.vue'
import InputItem from './inputItem.vue'
import ButtonSIP from './buttonSIP.vue'
import AModalNew from './aModalNew.vue'
import AButton from './AButton.vue'
import ASpinner from './spinner.vue'
export default {
  install(Vue: any) {
    Vue.component('SelectItem', SelectItem)
    Vue.component('InputItem', InputItem)
    Vue.component('ButtonSIP', ButtonSIP)
    Vue.component('AModalNew', AModalNew)
    Vue.component('UButton', AButton)
    Vue.component('ASpinner', ASpinner)
  },
}
