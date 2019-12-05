<template>
  <div class="user-info-item-comp">
    <div class="user-info-item-name">
      {{ name }}
    </div>
    <div class="user-info-item-value">
      {{ value }}
    </div>
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

<style>
</style>
