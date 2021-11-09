<template>
  <div class="preview-photo"
       v-if="visible">
    <div id="pre-model"
         ref="modalRef">
      <div class="top-line">
        <i class="close"
           @click="closePre">X</i>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref, nextTick } from 'vue'
import emitter from '../util/emitter'

export default defineComponent({
  props: ['imagesArr', 'imgIndex'],
  setup(props) {
    const visible = ref(false)
    const modalRef = ref(null)
    nextTick(() => {
      emitter.on('clickImg', (params) => {
        visible.value = params.visible
        if (modalRef.value) {
          modalRef.value.style.display = 'block'
        }
        // 创建一个img标签
        const i = document.createElement('img')
        i.src = props.imagesArr[props.imgIndex]
        i.style.width = '90%'
        i.style.height = '90%'
        i.id = 'img'
        if (i.src) {
          modalRef.value && modalRef.value.appendChild(i)
        }
      })
    })

    const closePre = () => {
      visible.value = false
    }
    return {
      closePre,
      modalRef,
      visible,
    }
  },
})
</script>

<style lang="scss">
#pre-model {
  background: rgba($color: #000000, $alpha: 0.6);
  display: none;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 999;
  width: 100%;
  height: 100%;

  .top-line {
    transition: all 0.5s;
  }

  .top-line:hover {
    width: 100%;
    position: absolute;
    left: 0;
    top: 0;
    height: 46px;
    z-index: 999;
    background: rgba($color: #000000, $alpha: 0.9);
    .close {
      box-sizing: border-box;
      position: absolute;
      z-index: 1000;
      right: 30px;
      color: #fff;
      cursor: pointer;
      font-size: 20px;
      height: 46px;
      line-height: 46px;
    }
  }
}

#img {
  height: 100%;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
</style>
