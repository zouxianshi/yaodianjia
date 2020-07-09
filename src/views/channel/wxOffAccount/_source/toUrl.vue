<template>
  <el-popover v-model="visible" placement="top-end" popper-class="plx-to-url-model">
    <div class="to-url-box">
      <el-form style="margin-top: 10px">
        <el-form-item>
          <div class="link-items">
            自定义链接
            <el-input v-model="url" style="width: 360px;margin-left: 24px" placeholder="请输入自定义链接地址" size="mini" />
          </div>
          <div class="link-items">
            选择内部链接
            <el-select v-model="urlSelect" size="mini" style="width: 200px;margin-left: 10px" @change="changeUrlType">
              <el-option v-for="(item, index) in options" :key="index" :value="item.linkAddress" :label="item.pageName" />
            </el-select>
            <el-tooltip class="item" effect="light" content="可快捷选择内部链接。" placement="right-start">
              <i class="el-icon-question" />
            </el-tooltip>
          </div>
        </el-form-item>
      </el-form>
    </div>
    <div style="text-align: right; margin: 0">
      <el-button size="mini" type="text" @click="visible = false">取消</el-button>
      <el-button type="primary" size="mini" :loading="!visible" @click="onSave">保存</el-button>
    </div>
    <el-button slot="reference" size="mini" plain :disabled="isDisabled">跳转网页</el-button>
  </el-popover>
</template>
<script>
import { getSelfUrl } from '@/api/channelService'
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'ToUrl',
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
      type: 'view',
      visible: false,
      errorText: '',
      // 链接时自定义还是选择
      url: '',
      // 选择内部链接
      options: [],
      urlSelect: ''
    }
  },
  created() {
    getSelfUrl(this.$store.state.user.merCode).then(res => {
      if (res.data) {
        this.options = res.data
      }
    })
  },
  computed: {
    ...mapState('channel', ['menuData']),
    isDisabled() {
      const { level1Index, level2Index } = this
      return level2Index === -1 && !!this.menuData[level1Index].sub_button.length
    }
  },
  watch: {
    type(v) {
      if (v !== 'view') {
        this.errorText = ''
        this.url = ''
      }
    },
    level2Index() {
      this.handlerParams()
    },
    visible() {
      this.handlerParams()
    }
  },
  methods: {
    ...mapMutations('channel', ['editMenu']),
    handlerParams() {
      const { level1Index, level2Index } = this
      const { type, sub_button, url } = this.menuData[level1Index]
      this.type = level2Index === -1
        ? type
        : sub_button[level2Index].type
      this.url = level2Index === -1
        ? url
        : type === 'memberCard'
          ? ''
          : sub_button[level2Index].url
    },
    async onSave() {
      const { level1Index, level2Index, url } = this
      this.loading = true
      if (!url.startsWith('http://') && !url.startsWith('https://')) {
        this.$message({ message: '跳转地址必须http或https开头', type: 'error' })
        return
      }
      await this.editMenu({
        item: {
          type: 'view',
          url: this.url
        },
        level1Index,
        level2Index
      })
      this.visible = false
    },
    // 改变设置url类型时
    changeUrlType() {
      this.url = this.urlSelect
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss">
  .plx-to-url-model {
    .to-url-box {
      padding-top: 8px;
      .radio-item {
        display: block;
        margin-bottom: 10px;
        .p-error {
          font-size: 12px;
          padding:10px 0 0 111px;
          color: #ff0000;
        }
      }
    }
  }
  .link-items{
    height: 60px;
    line-height: 60px;
  }
</style>
