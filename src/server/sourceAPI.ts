import $http from './axios'
interface AxiosFnData<T> {
  errFn: (res: any) => void
  data: T
}
const stysemAPI = <T>(data: AxiosFnData<T>) => {
  return $http({
    url: '/api/mockGetList',
    methods: 'post',
    data: data.data,
    errFn: data.errFn,
  })
}
export { stysemAPI }
