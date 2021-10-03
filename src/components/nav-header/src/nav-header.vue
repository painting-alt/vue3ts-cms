<template>
  <div class="nav-header">
    <i
      class="fold-menu"
      :class="isFold ? 'el-icon-s-fold' : 'el-icon-s-unfold'"
      @click="handleFoldClick"
    ></i>
    <div class="content">
      <hy-breadcrumb :breadcrumbs="breadcrumbs" />
      <user-info />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import userInfo from './user-info.vue'
import HyBreadcrumb from '@/base-ui/breadcrumb'

import { pathMapBreadcrumbs } from '@/utils/map-menus'
import { useRoute } from 'vue-router'
import { useStore } from '@/store'

export default defineComponent({
  components: { userInfo, HyBreadcrumb },
  emits: ['foldChange'],
  setup(props, { emit }) {
    const isFold = ref(false)
    const handleFoldClick = () => {
      isFold.value = !isFold.value
      emit('foldChange', isFold.value)
    }

    // 面包屑的数据
    const store = useStore()
    const route = useRoute()
    // 使用computed是为了 当路径或者菜单发生变化时，重新获取
    const breadcrumbs = computed(() => {
      const useMenus = store.state.login.userMenus
      const currentPath = route.path
      return pathMapBreadcrumbs(useMenus, currentPath)
    })

    return {
      isFold,
      breadcrumbs,
      handleFoldClick
    }
  }
})
</script>

<style scoped lang="less">
.nav-header {
  display: flex;
  width: 100%;
  .fold-menu {
    font-size: 30px;
    cursor: pointer;
  }
  .content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1;
    padding: 0 20px;
  }
}
</style>
