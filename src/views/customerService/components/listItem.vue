<template>
  <div class="user-info-item-comp">
    <span class="user-info-item-name">
      {{ name }}
    </span>
    :
    <span class="user-info-item-value">
      {{ value }}
    </span>
  </div>
</template>

<script>
export default {
  name: 'ListItem',
  props: {
    name: {
      type: String,
      default: 'name-test'
    },
    value: {
      type: String,
      default: 'value-test'
    }
  },
  data() {
    return {}
  }
}
</script>

<style scoped lang="scss">
.user-info-item-comp {
  height: 36px;
  border-bottom: 1px solid #eff0f5;
  padding: 0 10px;
  line-height: 36px;
  font-size: 12px;
}
</style>
