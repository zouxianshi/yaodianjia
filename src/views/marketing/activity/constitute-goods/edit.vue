<template>
  <div class="exchange-model">
    <el-row>
      <el-col :span="3">
        <div style="height: 200px;margin:30px 0px 0px 20px">
          <el-steps direction="vertical" :active="active">
            <el-step title="活动规则" />
            <el-step title="提交保存" />
          </el-steps>
        </div>
      </el-col>
      <el-col :span="21" style="background:#fff">
        <el-card class="box-card">
          <activityRules v-if="active.toString()==='1'" @submitactivit="submitActivit" />
          <successSubmit
            v-if="active.toString()==='2'"
            back
            success-text="新增成功"
          />
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import activityRules from './_source/activityRules'
import successSubmit from '@/components/ActivityStatus/successSubmit'
import { mapGetters } from 'vuex'
export default {
  name: 'Exchange',
  components: { activityRules, successSubmit },
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
// .exchange-model {
  // padding: 20px;
  // background: #f5f7fa;
  // .box-card {
  //   .el-card__body {
  //     padding: 0 20px;
  //   }
  // }
// }
</style>
