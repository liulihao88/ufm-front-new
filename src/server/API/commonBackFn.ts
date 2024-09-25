import { message } from 'ant-design-vue'
import router from '@/router'
const succussCommonFn = (res, fn, errFn) => {
  const data: object = res.data
  if (res.status === 200) {
    if (data.status === 200) {
      if (fn) {
        fn(res)
      }
    } else {
      console.log(data, 'data1')
      if (errFn) {
        errFn()
      } else {
        message.error(data.message ? data.message : '未知错误！')
      }
    }
  } else {
    console.log(data, 'data2')
    if (errFn) {
      errFn()
    } else {
      message.error(data.message ? data.message : '未知错误！')
    }
  }
}
const errorCommonFn = (error: any, obj: object) => {
  message.error(obj.msg ? obj.msg : '未知错误！')
  console.log('error信息:', error)
  if (obj.fn) {
    obj.fn()
  } else {
    // router.push({ name: "login" });
  }
}
// 后面根据需求完善
const backLoginFn = () => {
  router.push({ name: 'Login' })
}

export { succussCommonFn, errorCommonFn, backLoginFn }
