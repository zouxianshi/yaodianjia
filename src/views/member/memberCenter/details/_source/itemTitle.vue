<template>
  <div class="item-title-model">
    <div class="title">{{ title }}</div>
  </div>
</template>
<script>
export default {
  name: 'ItemTitle',
  props: {
    title: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
.item-title-model {
  height: 50px;
  line-height: 50px;
  font-size: 18px;
  font-weight: 600;
  border-bottom: 1px solid #eee;width: 98%;margin:0 auto;
  .title{
    text-indent: 1rem;
  }
}
</style>
