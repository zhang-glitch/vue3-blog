
<template>
  <div class="lazy-img">
    <div class="item-background"
         :style="{backgroundImage: `url(${imgUrl})`}"
         v-if="imgUrl"></div>
    <div className="cp-preloader cp-preloader_type1"
         v-else>
      <span className="cp-preloader__letter"
            data-preloader="昊">昊</span>
      <span className="cp-preloader__letter"
            data-preloader="淼">淼</span>
      <span className="cp-preloader__letter"
            data-preloader="博">博</span>
      <span className="cp-preloader__letter"
            data-preloader="客">客</span>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'LazyImg',
  props: ['imgUrl'],
  // setup(props) {
  //   const bgUrl = ref(props)
  //   const done = ref(false)
  //   onMounted(() => {
  //     const img = new Image()
  //     img.src = bgUrl.value.imgUrl
  //     img.onload = () => {
  //       done.value = true
  //     }
  //   })

  //   return {
  //     done,
  //   }
  // },
})
</script>

<style lang="scss">
.lazy-img {
  width: 100%;
  height: 100%;

  .item-background {
    height: 100%;
    width: 100%;
    background-position: 50% 50%;
    background-size: cover;
    animation: fadein 1s linear;
  }

  .cp-preloader {
    position: absolute;
    top: 50%;
    left: 50%;
    z-index: 999;
    -webkit-transform: translate3d(-50%, -50%, 0);
    transform: translate3d(-50%, -50%, 0);
  }

  .cp-preloader {
    width: 100%;
    text-align: center;
  }

  .cp-preloader__letter {
    display: inline-block;
    position: relative;
    overflow: hidden;
    color: transparent;
    font-size: 20px;
    letter-spacing: 5px;
  }

  .cp-preloader__letter:before {
    color: #eb5858; // 文字的加载颜色
  }

  .cp-preloader_type10:before,
  .cp-preloader_type10:after {
    background-color: #fff;
  }

  .cp-preloader__letter:before {
    content: attr(data-preloader);
    position: absolute;
    top: 0;
    left: 0;

    -webkit-animation-duration: 3s;

    animation-duration: 3s;
    -webkit-animation-iteration-count: infinite;
    animation-iteration-count: infinite;
    -webkit-animation-fill-mode: backwards;
    animation-fill-mode: backwards;
  }

  .cp-preloader__letter:nth-child(2):before {
    -webkit-animation-delay: 0.3s;
    animation-delay: 0.3s;
  }

  .cp-preloader__letter:nth-child(3):before {
    -webkit-animation-delay: 0.45s;
    animation-delay: 0.45s;
  }

  .cp-preloader__letter:nth-child(4):before {
    -webkit-animation-delay: 0.6s;
    animation-delay: 0.6s;
  }

  .cp-preloader__letter:nth-child(5):before {
    -webkit-animation-delay: 0.75s;
    animation-delay: 0.75s;
  }

  .cp-preloader__letter:nth-child(6):before {
    -webkit-animation-delay: 0.9s;
    animation-delay: 0.9s;
  }

  .cp-preloader__letter:nth-child(7):before {
    -webkit-animation-delay: 1.05s;
    animation-delay: 1.05s;
  }

  /* type 1 */
  .cp-preloader_type1 .cp-preloader__letter:before {
    -webkit-animation-name: cp-preloader1;
    animation-name: cp-preloader1;
  }

  @-webkit-keyframes cp-preloader1 {
    0%,
    100% {
      -webkit-transform: rotateY(-90deg);
      transform: rotateY(-90deg);
      opacity: 0;
    }

    20%,
    50% {
      -webkit-transform: rotateY(0);
      transform: rotateY(0);
      opacity: 1;
    }

    65% {
      -webkit-transform: rotateY(0);
      transform: rotateY(0);
      opacity: 0.3;
    }

    80% {
      opacity: 0;
    }
  }

  @keyframes cp-preloader1 {
    0%,
    100% {
      -webkit-transform: rotateY(-90deg);
      transform: rotateY(-90deg);
      opacity: 0;
    }

    20%,
    50% {
      -webkit-transform: rotateY(0);
      transform: rotateY(0);
      opacity: 1;
    }

    65% {
      -webkit-transform: rotateY(0);
      transform: rotateY(0);
      opacity: 0.3;
    }

    80% {
      opacity: 0;
    }
  }
}
</style>
