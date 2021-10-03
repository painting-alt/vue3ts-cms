<template>
  <div class="login-account">
    <!-- 因为要让表单实时拿到最新数据 所以把account的值 通过model传入 -->
    <!--label-width 是给label具体的宽度  -->
    <el-form label-width="60px" :rules="rules" :model="account" ref="formRef">
      <!-- 写上prop规则 就会自动找对应的rules里面的规则 -->
      <el-form-item label="账号" prop="name">
        <!-- 这里的v-model是为了将输入的数据保存起来 和:model不同 -->
        <el-input v-model="account.name" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="account.password" show-password />
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import { ElForm } from 'element-plus'
import { defineComponent, reactive, ref } from 'vue'
import { useStore } from 'vuex'
import { rules } from '../config/account-config'
import localCache from '@/utils/cache'

// 上面能用的东西必须是在data computed props 或者setup return的对象里面
export default defineComponent({
  setup() {
    const store = useStore()
    const account = reactive({
      name: localCache.getCache('name') ?? '',
      password: localCache.getCache('password') ?? ''
    })
    // 如果没有给ref默认值的情况下，尽量给ref一个泛型 确定类型
    const formRef = ref<InstanceType<typeof ElForm>>()
    const loginAction = (isKeepPassword: boolean) => {
      // validate 是element-plus组件中ElForm自带的 可以验证是否通过
      formRef.value?.validate((valid) => {
        //如果验证通过 valid为true
        if (valid) {
          // 1.判断是否需要记住密码
          if (isKeepPassword) {
            // 本地缓存
            localCache.setCache('name', account.name)
            localCache.setCache('password', account.password)
          } else {
            localCache.deleteCache('name')
            localCache.deleteCache('password')
          }
          // 2.开始进行登录验证
          // dispatch的第一个参数是 vuex中actoins里面方法的名字
          store.dispatch('login/accountLoginAction', { ...account })
        }
      })
    }

    return {
      account,
      // 编写规则：rules虽然没有在setup中定义了 但是也要在这里return出去
      rules,
      loginAction,
      formRef
    }
  }
})
</script>

<style scoped></style>
