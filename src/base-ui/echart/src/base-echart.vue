<template>
  <div class="base-echart">
    <!-- 在template中使用props中的属性时 不需要props.什么 直接使用即可 -->
    <div ref="echartDivRef" :style="{ width: width, height: height }"></div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, defineProps, withDefaults, watchEffect } from 'vue'
import { EChartsOption } from 'echarts'
import useEchart from '../hooks/useEchart'

// 定义proos使用defineProps；定义默认值使用withDefaults，第二个参数是给默认值
const props = withDefaults(
  defineProps<{
    width?: string
    height?: string
    options: EChartsOption
  }>(),
  {
    width: '100%',
    height: '360px'
  }
)

const echartDivRef = ref<HTMLElement>()

onMounted(() => {
  const { setOptions } = useEchart(echartDivRef.value!)
  // 当options发生改变，重新设置
  watchEffect(() => {
    setOptions(props.options)
  })
})
</script>

<style scoped></style>
