<template>
  <div class="app-container turntable-add-model">
    <el-steps :active="stepActive" simple>
      <el-step title="活动规则" />
      <el-step title="奖项设置" />
      <el-step title="保存提交" />
    </el-steps>
    <ruleList v-show="showFirst" @handleNext="handleNext" />
    <awardSetting v-show="showSecond" @handleNext="handleNext" />
    <submitSave v-show="showThird" @handleNext="handleNext" />
  </div>
</template>
<script>
// import { searchActivities } from '@/api/coupon'
import ruleList from './_sourse/ruleList'
import awardSetting from './_sourse/awardSetting'
import submitSave from './_sourse/submitSave'
// import { mapGetters } from 'vuex'
export default {
  name: 'TurntableIndex',
  components: {
    ruleList,
    awardSetting,
    submitSave
  },
  props: {},
  data() {
    return {
      showFirst: true,
      showSecond: false,
      showThird: false,
      stepActive: 1
    }
  },
  computed: {
    // ...mapGetters(['merCode'])
  },
  watch: {},
  beforeCreate() {},
  created() {},
  beforeMount() {},
  mounted() {
  },
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  destroyed() {},
  methods: {
    handleNext(showFirst, showSecond, showThird) {
      this.showFirst = showFirst
      this.showSecond = showSecond
      this.showThird = showThird
      if (showFirst) {
        this.stepActive = 1
      } else if (showSecond) {
        this.stepActive = 2
      } else {
        this.stepActive = 3
      }
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss">
.turntable-add-model {
}
</style>
