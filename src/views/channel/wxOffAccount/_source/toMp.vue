<template>
  <el-popover v-model="visible" placement="top-end" popper-class="plx-to-mp-model">
    <div class="to-mp-box">
      <el-radio-group v-model="type">
        <el-radio class="radio-item" label="miniprogram">商户小程序</el-radio>
      </el-radio-group>
    </div>
    <div style="text-align: right; margin: 0">
      <el-button size="mini" type="text" @click="visible = false">取消</el-button>
      <el-button type="primary" size="mini" :loading="loading" @click="onSave">确定</el-button>
    </div>
    <el-button slot="reference" size="mini" plain :disabled="isDisabled">跳转小程序</el-button>
  </el-popover>
</template>
<script>
import { mapState, mapMutations, mapActions } from 'vuex'
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
      visible: false,
      loading: false
    }
  },
  computed: {
    ...mapState('channel', ['menuData']),
    isDisabled() {
      const { level1Index, level2Index } = this
      return level2Index === -1 && !!this.menuData[level1Index].sub_button.length
    }
  },
  watch: {
    level2Index() {
      this.handlerParams()
    },
    visible() {
      this.handlerParams()
    }
  },
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
  methods: {
    ...mapActions('channel', ['saveCustomMenu']),
    ...mapMutations('channel', ['editMenu']),
    /**
     * handler params
     */
    handlerParams() {
      const { level1Index, level2Index } = this
      const { type, sub_button, url } = this.menuData[level1Index]
      this.type = level2Index === -1
        ? type
        : sub_button[level2Index].type
      this.url = level2Index === -1
        ? url
        : sub_button[level2Index].url
    },
    /**
     * save async params
     */
    async onSave() {
      const { level1Index, level2Index, type } = this
      this.loading = true
      await this.editMenu({
        item: {
          type
        },
        level1Index,
        level2Index
      })

      this.visible = false
      this.saveCustomMenu().then(() => {
        this.loading = false
        this.nName = ''
      })
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
