<template>
  <div class="login-panel">
    <h1 class="title">后台管理系统</h1>
    <!-- 有stretch这个属性就是true 没有默认就是false -->
    <el-tabs type="border-card" stretch v-model="currentTab">
      <el-tab-pane name="account">
        <!-- 这是插槽的使用 #label就是插槽 -->
        <template #label>
          <span><i class="el-icon-user-solid"></i> 账号登录</span>
        </template>
        <!-- 通过ref绑定组件 -->
        <login-account ref="accountRef" />
      </el-tab-pane>
      <el-tab-pane name="phone">
        <template #label>
          <span><i class="el-icon-mobile-phone"></i> 手机登录</span>
        </template>
        <login-phone ref="phoneRef" />
      </el-tab-pane>
    </el-tabs>

    <div class="account-control">
      <el-checkbox v-model="isKeepPassword">记住密码</el-checkbox>
      <el-link type="primary">忘记密码</el-link>
    </div>

    <el-button type="primary" class="login-btn" @click="handleLoginClick"
      >立即登录</el-button
    >
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import LoginAccount from './login-account.vue'
import LoginPhone from './login-phone.vue'

export default defineComponent({
  components: {
    LoginAccount,
    LoginPhone
  },
  setup() {
    const isKeepPassword = ref(true)
    // 拿到LoginAccount导出的对象的类型
    // 定义一个ref对象，绑定到元素或者组件的ref属性上，即可拿到元素或组件上的方法和属性
    // accountRef用来绑定自定义的LoginAccount组件对象
    const accountRef = ref<InstanceType<typeof LoginAccount>>()
    const phoneRef = ref<InstanceType<typeof LoginPhone>>()
    // currentTab用来判断切换到的是哪一个卡片
    const currentTab = ref('account')
    const handleLoginClick = () => {
      // 如果是使用的账号密码登录 那么就做account相关的验证 否则就做phone相关的验证
      if (currentTab.value === 'account') {
        // ?: value有值是才调用
        // 通过.value拿到组件对象
        accountRef.value?.loginAction(isKeepPassword.value)
      } else {
        console.log('phoneRef调用loginAction')
      }
    }
    return {
      isKeepPassword,
      accountRef,
      phoneRef,
      currentTab,
      handleLoginClick
    }
  }
})
</script>

<style scoped lang="less">
.login-panel {
  width: 320px;
  margin-bottom: 150px;
}
.title {
  text-align: center;
}
.account-control {
  display: flex;
  justify-content: space-between;
}
.login-btn {
  width: 100%;
}
</style>
