<template>
  <div class="top-image wrap">
    <div class="advert-background"
         :style="{backgroundImage: 'url('+imgUrl+')'}">
      <a href="javascript:;"></a>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'TopImage',
  props: {
    imgUrl: {
      type: String,
      default: '/detail-bg.jpg',
    },
  },
})
</script>

<style lang="scss">
@import 'assets/config.scss';

.top-image {
  margin: 70px 0;
  height: 150px;
  overflow: hidden;
  div.advert-background {
    border-radius: 5px;
    height: 100%;
    width: 100%;
    background-position: 50% 50%;
    background-size: cover;
    animation: fadein 1s;
  }
}

// // 响应top-image

@media screen and (max-width: 1199px) {
  .top-image {
    margin: 70px auto 30px !important;
    padding: 0 15px !important;
  }
}

@media screen and (max-width: 991px) {
  .top-image {
    margin: 70px auto 24px !important;
    padding: 0 20px !important;
  }
}

@media screen and (max-width: 767px) {
  .top-image {
    margin: 70px auto 15px !important;
    padding: 0 15px !important;
  }
}
</style>
