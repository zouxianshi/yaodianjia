<template>
  <div class="rs-index-model">
    <div class="app-container">
      <el-card class="box-card">
        <AppleRs />
      </el-card>
      <el-card v-if="showCode==='1'" class="box-card">
        <NoactiveCard />
      </el-card>
      <el-card v-if="showCode==='0'" class="box-card">
        <nobindingCard />
      </el-card>
      <el-card v-if="showCode==='2'" class="box-card">
        <AemberCard :geturl="geturl" />
      </el-card>
    </div>
  </div>
</template>
<script>
// 微信小程序注册
import AppleRs from './_source/appletRegister'
// 微信会员卡
import AemberCard from './_source/memberCard'
// 未激活微信会员卡
import NoactiveCard from './_source/noActiveCard'
// 未绑定
import NobindingCard from './_source/nobindingCard'
import { mapGetters } from 'vuex'
import { checkMemberCard } from '@/api/memberService'

export default {
  name: 'RsIndex',
  components: {
    AppleRs,
    AemberCard,
    NoactiveCard,
    NobindingCard
  },
  props: {},
  data() {
    return {
      checkMemberList: '',
      showCode: 1,
      geturl: ''
    }
  },
  computed: {
    ...mapGetters(['merCode'])
  },
  watch: {},
  beforeCreate() {
  },
  created() {
    // TODO test api
    checkMemberCard({ merCode: this.merCode }).then(res => {
      // this.checkMemberList = res.data
      this.showCode = res.data[0]
      this.geturl = res.data[1]
    })
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
