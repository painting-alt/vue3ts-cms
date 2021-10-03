// 编写规则
export const rules = {
  name: [
    {
      // required：是否必传 message：不符合要求时的提示内容 trigger：在什么时候开始校验
      // blur：在失去焦点时校验
      // 且 required为true时 前面自动加*
      required: true,
      message: '必须输入用户名',
      trigger: 'blur'
    },
    {
      // pattern：满足某种正则要求
      pattern: /^[a-z0-9]{5,10}$/,
      message: '用户名必须是5-10个字母或者数字',
      trigger: 'blur'
    }
  ],
  password: [
    {
      required: true,
      message: '必须输入密码',
      trigger: 'blur'
    },
    {
      pattern: /^[a-z0-9]{3,}$/,
      message: '密码必须是3位以上的字母或者数字',
      trigger: 'blur'
    }
  ]
}
