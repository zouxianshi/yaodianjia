<template>
  <div class="sa-first-advertise">
    <el-card class="box-card" shadow="always">
      <div class="sfd-exhibition">
        <m-va-banner source="sa" />
      </div>
    </el-card>
    <div class="sfa-list-box">
      <m-edit-item />
    </div>
    <div class="sfa-submit">
      <el-button type="primary" style="width: 100%" size="mini">保存广告设置</el-button>
    </div>
  </div>
</template>
<script>
import mVaBanner from '../../_source/banner'
import mEditItem from './editItem'

export default {
  name: 'SaFirstAdvertise',
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
  components: { mVaBanner, mEditItem }
}
</script>

<style lang="scss" rel="stylesheet/scss">
  .sa-first-advertise {
    .sfd-exhibition {
      width: 420px;
      margin: 0 auto;
    }
    .sfa-list-box {
      margin-top: 10px;
    }
  }
</style>
