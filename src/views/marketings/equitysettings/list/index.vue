<template>
  <div class="exchange-model">
    <el-row>
      <el-col :span="4">
        <div style="height: 200px;margin:30px 0px 0px 20px">
          <el-steps direction="vertical" :active="active">
            <el-step title="活动规则" />
            <el-step title="提交保存" />
          </el-steps>
        </div>
      </el-col>
      <el-col :span="20" style="background:#fff">
        <el-card class="box-card">
          <activityRules v-if="active.toString()==='1'" @submitactivit="submitActivit" />
          <equitySubmit v-if="active.toString()==='2'" />
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import activityRules from './_sourse/activityRules'
import equitySubmit from './_sourse/equitySubmit'
import { mapGetters } from 'vuex'
export default {
  name: 'Exchange',
  components: { activityRules, equitySubmit },
  props: {},
  data() {
    return {
      active: 1
    }
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
  methods: {
    submitActivit() {
      this.active = 2
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss">
.exchange-model {
  padding: 20px;
  background: #f5f7fa;
}
</style>
