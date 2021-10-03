// 做缓存相关的工作
class LocalCache {
  setCache(key: string, value: any) {
    // 因为setItem()中的value要求传的是字符串 所以这里通过JSON序列化的方式转换
    window.localStorage.setItem(key, JSON.stringify(value))
  }
  getCache(key: string) {
    const value = window.localStorage.getItem(key)
    if (value) {
      // JSON.parse() 方法将数据转换为 JavaScript 对象
      // obj => string => obj
      // 如果原来就是一个字符串，那转换之后也还是字符串
      return JSON.parse(value)
    }
  }
  deleteCache(key: string) {
    window.localStorage.removeItem(key)
  }
  // 清空缓存
  clearCache() {
    window.localStorage.clear()
  }
}

export default new LocalCache()
