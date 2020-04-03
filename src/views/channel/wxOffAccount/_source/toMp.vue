<template>
  <el-popover v-model="visible" placement="top-end" popper-class="plx-to-mp-model">
    <div class="to-mp-box">
      <el-radio-group v-model="radio">
        <el-radio class="radio-item" :label="3">会员领卡链接</el-radio>
      </el-radio-group>
    </div>
    <div style="text-align: right; margin: 0">
      <el-button size="mini" type="text" @click="visible = false">取消</el-button>
      <el-button type="primary" size="mini" @click="visible = false">确定</el-button>
    </div>
    <el-button slot="reference" size="mini" plain>跳转小程序</el-button>
  </el-popover>
</template>
<script>
export default {
  name: 'ToMp',
  components: {},
  props: {},
  data() {
    return {
      radio: null,
      visible: false
    }
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
  methods: {},
  beforeDestroy() {
  },
  destroyed() {
  }
}
</script>

<style lang="scss" rel="stylesheet/scss">
  .plx-to-mp-model {
    .to-mp-box {
      padding-top: 8px;
      .radio-item {
        display: block;
        margin-bottom: 10px;
      }
    }
  }
</style>
