<template>
  <div class="tag-ads-model">
    <span>{{ text }}</span>
  </div>
</template>
<script>
export default {
  name: 'TagAds',
  data() {
    return {}
  },
  props: {
    text: {
      type: String,
      default: '-'
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss">
  .tag-ads-model {
    position: absolute;
    left: 0;
    top: 0;
    display: inline-block;
    padding: 0 8px;
    height: 24px;
    line-height: 24px;
    text-align: center;
    color: #fff;
    font-size: 13px;
    background: rgba(0, 0, 0, 0.4);
    border-radius: 0 0 6px 0;
  }
</style>
