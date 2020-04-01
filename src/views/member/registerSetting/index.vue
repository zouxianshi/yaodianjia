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
// ΢��С����ע���������
import AppleRs from './list/appletRegister'
// ΢�Ż�Ա��
import AemberCard from './list/memberCard'

import { checkMemberCard } from '@/api/memberService'

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
    // TODO test api
    checkMemberCard({ merCode: 666666 }).then(res => {
      console.log(res)
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
