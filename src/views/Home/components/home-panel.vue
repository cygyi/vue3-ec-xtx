<template>
  <div class="home-panel">
    <div class="container">
      <!-- 头部 -->
      <div class="head">
        <!-- 左侧标题 -->
        <h3>
          <span>{{ title }}</span>
          <small>{{ subtitle }}</small>
        </h3>
        <!-- 允许右侧自定义模版 -->
        <slot name="right"></slot>
      </div>
      <!-- 主体内容 -->
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'XtxHomePanel',
  props: {
    title: {
      type: String,
      default: '主标题'
    },
    subtitle: {
      type: String,
      defautl: '副标题'
    }
  }
}
</script>

<style scoped lang='less'>
.home-panel {
  background-color: #fff;

  .head {
    padding: 40px 0;
    display: flex;
    align-items: flex-end;

    h3 {
      flex: 1;
      font-size: 32px;
      font-weight: normal;
      margin-left: 6px;
      height: 35px;
      line-height: 35px;

      small {
        font-size: 16px;
        color: #999;
        margin-left: 20px;
      }
    }
  }
}
</style>
