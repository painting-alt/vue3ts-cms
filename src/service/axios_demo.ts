import axios from 'axios'

// 1.get和post请求
axios
  .get('http://httpbin.org/get', {
    params: {
      name: 'coderwhy',
      age: 18
    }
  })
  .then((res) => {
    console.log(res.data)
  })

axios
  .post('http://httpbin.org/post', {
    data: {
      name: 'why',
      age: 18
    }
  })
  .then((res) => {
    console.log(res.data)
  })

// 2.promise额外补充
// promise本身可以有类型
// new Promise<string>((resolve) => {
//   resolve('abc')
// }).then((res) => {
//   console.log(res.length);
// })

// 3.axios.all -> 多个请求一起返回
