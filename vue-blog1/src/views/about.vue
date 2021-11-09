<template>
  <div class="about">
    <lay-out>
      <div class="about-main wrap">
        <el-row type="flex" :gutter="20">
          <el-col :span="18">
            <el-card>
              <h4 style="margin-bottom: 20px; font-size: 16px; font-weight: 600;">个人经历:</h4>
              <p class="resume-content">今天下午2点钟我的大一生涯就此结束......

## 记忆

今天回想起自己刚进大学的懵懂无知，那时的自己每天都很无助，总是患得患失，现在看来原来自己真的很弱小，内心脆弱，经历一段时间的调整，不断的获得意想不到的成就感，不断地弥补自己内心的弱小。还记得自己每天下完夜自习后奔向操场的身影，顶着寒风，来缓解一天学习带来的疲惫。在现在看来真的很感谢当时坚持的自己，就这样寒假到来......

## 学习

说起来挺好笑，当时刚进大学，前半个月由于很清闲，那是自己就感到很焦急，每天都想找一点事情做，因为那是高中比较努力吧！就把学习养成了一个习惯，感觉不学习就好像要被人甩下一大截。说实话面对自己从来没有接触过的专业，他的到来还是很棘手的。又让自己焦虑了起来（哈哈哈）就这样在学校的一个大一上期学习还凑活吧！由于今年疫情的影响，我们就在网上进行了教学，这时感觉机会来了。做出了一个大胆的决定，完全不学学校分配的课程，全力攻前端（因为在寒假的时候自己已经开始学习了），到现在想想我也不知道这个决定是不是对的，其实按照自己现在的“技术”感觉还很小白。但我觉得我会死磕前端，汇入前端的大军。一起努力吧！

## 生活

对于生活方面，每天一日三餐，感觉时间挺紧张的。在这里询问一下? 你们见过大学中午`12:10`放学的吗？我个人就感觉很离谱吧！虽然每天很忙碌，但是对乒乓球的热爱依旧，每个星期会抽空打一会，感觉这是我大学生活中最大的乐趣了。（在这里感谢那些陪我打球的朋友们）。我个人感觉游戏在我的世界中可有可无，没有什么精神寄托在那上面......

## 人际关系

由于我是在省外上的大学，又加上自己的性格问题，感觉人际关系不是很好，你要是问有没有交到特别好的朋友，其实还真有一个，每天都会和她聊聊天，互帮互助。对我也比较照顾，在这里非常感谢她。

## 寄语

希望自己可以改变自身的一些臭毛病，踏实学习，不要求快，要脚踏实地，期待自己有能力可以进入公司实习......

## 学习上

 + 9月份的四级争取拿下吧！
 + 重新开始学习前端的基础知识，查缺补漏吧
   + css3, html5（由于以前刚接触，学的比较急，好多都忘了）
   + js (感觉自己学的还可以吧！但是还需加深学习)
 + 争取深入了解react及相关知识
 + 不要遗忘vue,跟上vue3的脚步，争取自己可以简单的调用api做出一些简单的页面
 + 学校的专业课随缘吧！（哈哈）
 + 争取在学习专业知识的同时加强自己的`课外阅读`，提升自己。(这个很重要)

## 生活上

- 还要向以前一样，坚持每天夜里，跑1~1.30h的步。（这个真的很重要）
- 每个星期争取都去打一会乒乓球。
- 星期天多出去走一走，面朝大海，春暖花开。毕竟海就在学校旁边吗！（很多人羡慕呢？）
- 多多拍一些图片，充实自己的素材库。

## 寄语

看见自己设的计划，感觉自己已经疯了，不怕，坚持走下去就对了。加油，奥利给！！！

目标写出来，就要去用实际行动完成，并不是放哪里打动别人.....</p>
            </el-card>
          </el-col>
          <el-col :span="6">
            <el-card class="history">
              <p class="title">历史: </p>
              <el-timeline>
                <el-timeline-item
                  v-for="(activity, index) in activities"
                  :key="index"
                  :timestamp="activity.timestamp"
                  :color="activity.color"
                  :icon="activity.icon"
                >
                  {{activity.content}}
                </el-timeline-item>
              </el-timeline>
            </el-card>
          </el-col>
        </el-row>
      </div>
    </lay-out>
  </div>
</template>

<script>
import { defineComponent, reactive } from "vue";
import LayOut from 'components/LayOut.vue'

export default defineComponent({
  name: 'about',
  components: {
    LayOut
  },
  setup() {
    const activities = reactive([
      {
        content: '开始构建项目',
        timestamp: '2021-1-27',
        color:"#1890ff"
      },
      {
        content: '项目完成',
        timestamp: '2021-2-3',
        color:"#1890ff"
      },
      {
        content: '持续更新中...',
        icon: 'el-icon-loading'
      }
    ])
    return {
      activities
    }
  }
})
</script>

<style lang="scss">
  @import 'assets/config.scss';
  .el-timeline-item__icon {
    color: $primary-color;
  }
  .about {
    margin-top: 60px;

    .about-main {
     margin-bottom: 80px;
      .resume-content {
        font-size: 16px;
      }
      .history {
        p.title {
          margin-bottom: 20px;
          font-size: 16px;
          font-weight: 600;
          color: $primary-color;
        }
      }
    }
  }
</style>