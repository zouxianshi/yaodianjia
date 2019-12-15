<template>
  <div class="view-more" @click="handleClick">查看更多消息</div>
</template>

<script>
export default {
  methods: {
    // 点击事件
    handleClick() {
      this.$emit('handleClick')
    }
  }
}
</script>

<style>
  .view-more {
    padding: 10px 0;
    text-align: center;
    font-size: 14px;
    color: #45aafa;
    cursor: pointer;
  }
</style>
