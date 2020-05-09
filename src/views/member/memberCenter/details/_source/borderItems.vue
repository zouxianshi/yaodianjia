<template>
  <div class="border-items-modal">
    <el-tag :type="types">{{ value }}</el-tag>
  </div>
</template>
<script>
export default {
  props: {
    types: { // 标签背景颜色，默认灰色 (可选： '' success info warning danger)
      type: String,
      default: 'info'
    },
    size: { // 标签大小 （medium / small / mini）
      type: String,
      default: 'mini'
    },
    value: {
      type: String,
      default: ''
    }
  }
}
</script>
<style scoped lang="scss">
.border-items-modal{
    display: inline-block;margin-right: 20px;color: #000000;
}
</style>
