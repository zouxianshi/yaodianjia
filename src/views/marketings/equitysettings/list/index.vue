<template>
  <div class="exchange-model">
    <el-row>
      <el-col :span="4">
        <div style="height: 200px;margin:30px 0px 0px 20px">
          <el-steps direction="vertical" :active="1">
            <el-step title="活动规则" />
            <el-step title="提交保存" />
          </el-steps>
        </div>
      </el-col>
      <el-col :span="20" style="background:#fff">
        <el-card class="box-card">
          <activityRules />
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import activityRules from './_sourse/activityRules'
import { mapGetters } from 'vuex'
export default {
  name: 'Exchange',
  components: { activityRules },
  props: {},
  data() {
    return {}
  },
  computed: {
    ...mapGetters(['merCode'])
  },
  watch: {},
  beforeCreate() {},
  created() {},
  beforeMount() {},
  mounted() {},
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  destroyed() {},
  methods: {}
}
</script>

<style lang="scss" rel="stylesheet/scss">
.exchange-model {
  padding: 20px;
  background: #f5f7fa;
}
</style>
