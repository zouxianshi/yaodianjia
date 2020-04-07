<template>
  <el-popover v-model="visible" placement="top-end" popper-class="plx-to-mp-model">
    <div class="to-mp-box">
      <el-radio-group v-model="type">
        <el-radio class="radio-item" label="miniprogram">商户小程序</el-radio>
      </el-radio-group>

    </div>
    <div style="text-align: right; margin: 0">
      <el-button size="mini" type="text" @click="visible = false">取消</el-button>
      <el-button type="primary" size="mini" @click="onSubmit">确定</el-button>
    </div>
    <el-button slot="reference" size="mini" plain>跳转小程序</el-button>
  </el-popover>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'ToMp',
  components: {},
  props: {
    level1Index: {
      type: Number,
      default: 0
    },
    level2Index: {
      type: Number,
      default: -1
    }
  },
  data() {
    return {
      type: '',
      url: '',
      visible: false
    }
  },
  computed: {
    ...mapState('channel', ['menuData'])
  },
  watch: {},
  beforeCreate() {
  },
  created() {
    const { level1Index, level2Index } = this
    const { type, sub_button, url } = this.menuData[level1Index]
    this.type = level2Index === -1 ? type : sub_button[level2Index].type
    this.url = level2Index === -1 ? url : sub_button[level2Index].url
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
  methods: {
    ...mapMutations('channel', ['editMenu']),
    async onSubmit() {
      const { level1Index, level2Index, type, url } = this
      await this.editMenu({
        item: {
          type,
          url: type === 'miniprogram' ? '' : url
        },
        level1Index,
        level2Index
      })

      this.visible = false
    }
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
