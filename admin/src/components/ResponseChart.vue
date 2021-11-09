<template>
  <div class="response-chart">
    回复图表
    <test-com></test-com>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import TestCom from '../components/TestCom.vue'
export default defineComponent({
  name: 'ResponseChart',
  components: {
    TestCom,
  },
})
</script>

<style lang="scss">
</style>
