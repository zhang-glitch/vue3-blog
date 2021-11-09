<template>
  <div class="test-com">
    <div>{{data}}</div>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
import { ref, watch } from 'vue'
export default {
  name: 'TestCom',
  setup() {
    const data = ref('发布')
    const router = useRouter()
    watch(
      () => data,
      (newVal, oldVal) => {
        console.log(newVal, oldVal)
      }
    )
    router.beforeEach((to, from, next) => {
      if (from.name === 'list') {
        data.value = '更新'
        // console.log('======', data.value)
      } else {
        // console.log('+++++', data.value)
        data.value = '发布'
      }
      next()
    })
    return {
      data,
    }
  },
}
</script>

<style>
</style>
