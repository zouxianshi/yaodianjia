<template>
  <div class="renovation-dm-model">
    <router-view />
  </div>
</template>
<script>
export default {
  name: 'RenovationDm'
}
</script>
<style lang="scss" rel="stylesheet/scss">
  .renovation-dm-model {
    background:#F5F8FB;
    height: calc(100vh - 201px);
    margin: -20px;
  }
</style>
