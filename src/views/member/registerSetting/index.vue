<template>
  <div class="rs-index-model">
    <!-- <div class="rs-header-model">
      会员注册设置
    </div> -->
    <div class="app-container">
      <AppleRs />
      <AemberCard />
    </div>
  </div>
</template>
<script>
// 微信小程序注册组件导入
import AppleRs from './list/appletRegister'
// 微信会员卡
import AemberCard from './list/memberCard'
export default {
  name: 'RsIndex',
  components: {
    AppleRs,
    AemberCard
  },
  props: {},
  data() {
    return {}
  },
  computed: {},
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
  methods: {}
}
</script>

<style lang="scss" rel="stylesheet/scss">
  .rs-index-model {
    padding: 5px;
    background: #F5F7FA;
    .rs-header-model{
      margin:5px;
    }
  }
</style>
