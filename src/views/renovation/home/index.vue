<template>
  <div class="renovation-home-model">
    <router-view />
  </div>
</template>
<script>
export default {
  name: 'RenovationHome'
}
</script>
<style lang="scss" rel="stylesheet/scss">
  .renovation-home-model {
    background:#F5F8FB;
    height: calc(100vh - 201px);
    margin: -20px;
  }
</style>
