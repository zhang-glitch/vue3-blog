<template>
  <div class="footer">
    <el-row>
      <el-col :xs="0" :sm="24" :md="24" :lg="24" :xl="24">
        <div class="footer-content">
          <div class="footer-logo">
            <a href="/">
              <h1 class="hao">昊</h1>
              <h1 class="miao">淼</h1>
            </a>
          </div>
          <div class="content">
            <p class="about-mark">@ 2021  <a href="/about">昊淼博客</a></p>
            <p>记录美好的生活经历，欢迎交流 </p>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: 'Footer',
})
</script>

<style lang="scss">
  @import 'assets/config.scss';

  .footer {
    background: #000000;
    position: relative;
    
    .footer-content {
      display: flex;
      .footer-logo {
        margin: 50px 100px;
        h1 {
          font-family: cursive;
          font-size: 50px;
          color: $primary-color;
        }
        .miao {
          position: absolute;
          top: 75px;
          left: 160px;
          color: $secondary-color;
        }
      }

      .content {
        color: #777;
        font-size: 16px;
        align-self: center;
        margin-left: 50px;
        letter-spacing: 2px;
        p {
          a {
            color: $primary-color;
          }
        }
        .about-mark {
          margin-bottom: 20px;
        }
      }
    }
    
  }
</style>