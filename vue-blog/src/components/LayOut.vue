<template>
  <Header></Header>
  <slot></slot>
  <back-top></back-top>
  <Footer></Footer>
</template>

<script>
import { defineComponent } from "vue";
import Header from './Header.vue';
import Footer from './Footer.vue';
import BackTop from './BackTop.vue'

export default defineComponent({
  name: 'LayOut',
  components: {
    Header,
    BackTop,
    Footer
  } 
})
</script>

<style>

</style>