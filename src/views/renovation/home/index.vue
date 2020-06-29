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
    padding: 20px;
    height: calc(100vh - 100px);
    padding-top: 30px;
  }
</style>
