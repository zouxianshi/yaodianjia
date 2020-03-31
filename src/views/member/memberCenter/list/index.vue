<template>
  <div class="mc-list-model">
    <div class="header-title">
      会员列表
    </div>
    <div class="body-content">
      <m-conditions />
      <m-tabel-list />
    </div>
  </div>
</template>
<script>
import mTabelList from './_source/list'
import mConditions from './_source/conditions'
export default {
  name: 'McList',
  components: {
    mTabelList, mConditions
  },
  props: {},
  data() {
    return {}
  },
  computed: {

  }
}
</script>

<style lang="scss" rel="stylesheet/scss">
  .mc-list-model {
    background-color: #F7F7F7;height: calc(100vh - 160px);
    .header-title{
      background-color: #fff;height: 60px;line-height: 60px;padding: 0 2%;
      font-size: 18px;font-weight: bold;
    }
    .body-content{
      background-color: #fff;height: calc(100vh - 260px);overflow-y: auto;
      width: 96%; margin: 20px auto;padding: 20px;
    }
  }
</style>
