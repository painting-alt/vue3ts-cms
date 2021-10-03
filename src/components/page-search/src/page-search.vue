<template>
  <div class="page-search">
    <div class="search">
      <hy-form v-bind="searchFormConfig" v-model="formData">
        <template #footer>
          <div class="handle-btns">
            <el-button icon="el-icon-refresh-right" @click="handleResetClick"
              >重置</el-button
            >
            <el-button
              type="primary"
              icon="el-icon-search"
              @click="handleQueryClick"
              >搜索</el-button
            >
          </div>
        </template>
      </hy-form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import HyForm from '@/base-ui/form'

export default defineComponent({
  props: {
    searchFormConfig: {
      type: Object,
      required: true
    }
  },
  components: { HyForm },
  emits: ['resetBtnClick', 'queryBtnClick'],
  setup(props, { emit }) {
    // 双向绑定的属性应该是由配置文件的field来决定
    // 1.优化一：formData中的属性应该动态来决定
    const formItems = props.searchFormConfig?.formItems ?? []
    const formOriginData: any = {}
    for (const item of formItems) {
      formOriginData[item.field] = ''
    }

    const formData = ref(formOriginData)

    // 2.优化二：当用户点击重置
    const handleResetClick = () => {
      // for (const key in formOriginData) {
      //   formData.value[`${key}`] = formOriginData[key]
      // }
      formData.value = formOriginData
      emit('resetBtnClick')
    }

    // 3.优化三：当用户点击搜索
    const handleQueryClick = () => {
      emit('queryBtnClick', formData.value)
    }

    // const formData = ref({
    //   id: '',
    //   name: '',
    //   password: '',
    //   sport: '',
    //   createTime: ''
    // })
    return {
      formData,
      handleResetClick,
      handleQueryClick
    }
  }
})
</script>

<style scoped>
.handle-btns {
  text-align: right;
  padding: 0 50px 20px 0;
  box-sizing: border-box;
}
</style>
