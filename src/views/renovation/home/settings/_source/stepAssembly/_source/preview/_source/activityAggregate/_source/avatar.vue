<template>
  <div class="avatar-model">
    <span class="am-default-box">
      <span class="am-default" style="z-index: 3" />
      <span class="am-default" style="z-index: 2" />
      <span class="am-default" style="z-index: 1" />
      <span class="am-more"><i class="el-icon-more" /></span>
    </span>
  </div>
</template>
<script>
export default {
  name: 'Avatar',
  data() {
    return {}
  },
  props: {},
  methods: {},
  watch: {},
  beforeCreate() {
  },
  created() {
  },
  beforeMount() {
  },
  mounted() {
  },
  beforeUpdate() {
  },
  updated() {
  },
  beforeDestroy() {
  },
  destroyed() {
  },
  computed: {},
  components: {}
}
</script>

<style lang="scss" rel="stylesheet/scss">
  .avatar-model {
    .am-default-box {
      padding-left: 9px;
      .am-default {
        width: 28px;
        height: 28px;
        background: url('./../img/avatar_default.png') no-repeat;
        display: inline-block;
        margin-left: -13px;
        position: relative;
        vertical-align: middle;
      }
    }
    .am-more {
      font-size: 12px;
      color: #999;
      display: inline-block;
      vertical-align: -1px;
    }
  }
</style>
