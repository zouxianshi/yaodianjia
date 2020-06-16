<template>
  <div class="form-label-model">
    <span class="label">{{ label }}</span>
    <slot />
  </div>
</template>
<script>
export default {
  name: 'FormLabel',
  data() {
    return {}
  },
  props: {
    label: {
      type: String,
      default: ''
    }
  }
}
</script>
<style lang="scss" rel="stylesheet/scss">
.form-label-model {
  display: inline-block;
  margin-right: 12px;
  margin-bottom: 12px;
  .label {
    display: inline-block;
    margin-right: 10px;
    text-align: center;
    color: #999999;
    font-size: 14px;
  }
}
</style>
