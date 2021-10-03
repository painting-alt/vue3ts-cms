import { ref } from 'vue'
import PageModal from '@/components/page-modal'

type CallbackFn = (item?: any) => void

export function usePageModal(newCb?: CallbackFn, editCb?: CallbackFn) {
  const pageModalRef = ref<InstanceType<typeof PageModal>>()
  const defaultInfo = ref({})
  // 点击了新建按钮
  const handleNewData = () => {
    defaultInfo.value = {}
    if (pageModalRef.value) {
      pageModalRef.value.dialogVisible = true
    }

    // 有值的时候才去调用
    newCb && newCb()
  }

  // 点击了编辑按钮
  const handleEditData = (item: any) => {
    defaultInfo.value = { ...item }
    if (pageModalRef.value) {
      pageModalRef.value.dialogVisible = true
    }
    // 要把item传给role.vue
    console.log('点击了编辑按钮-------', item)
    // 把item传出去
    editCb && editCb(item)
  }

  return [defaultInfo, pageModalRef, handleNewData, handleEditData]
}
