<template>
  <div class="rs-index-model">
    <!-- <div class="rs-header-model">
      ��Աע������
    </div> -->
    <div class="app-container">
      <AppleRs />
      <AemberCard />
    </div>
  </div>
</template>
<script>
// 微信小程序注册
import AppleRs from './_source/appletRegister'
// 微信会员卡
import AemberCard from './_source/memberCard'
import { mapGetters } from 'vuex'
import { getMemberInfo } from '@/api/member'
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
  computed: {
    ...mapGetters(['merCode'])
  },
  watch: {},
  beforeCreate() {
  },
  created() {
  },
  beforeMount() {
  },
  mounted() {
    getMemberInfo(this.merCode)
      .then(res => {
        console.log(res)
      })
      .catch(() => {

      })
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
