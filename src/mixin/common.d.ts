// 定义 Item 接口
interface Item<T> {
  value: T
}

// 定义 CommonArray 接口
interface CommonArray<T> {
  items: Item<T>[]
}

// 导出这两个接口
export { Item, CommonArray }
