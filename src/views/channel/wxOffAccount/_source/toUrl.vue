<template>
  <el-popover v-model="visible" placement="top-end" popper-class="plx-to-url-model">
    <div class="to-url-box">
      <el-radio-group v-model="type">
        <el-radio class="radio-item" :label="'memberCard'">会员领卡链接</el-radio>
        <el-radio class="radio-item" :label="'view'">
          <span>
            自定义链接 <el-input v-model="url" style="width: 260px;margin-left: 10px" placeholder="请输入自定义链接地址" size="mini" />
          </span>
          <p v-if="errorText" class="p-error">{{ errorText }}</p>
        </el-radio>
      </el-radio-group>
    </div>
    <div style="text-align: right; margin: 0">
      <el-button size="mini" type="text" @click="visible = false">取消</el-button>
      <el-button type="primary" size="mini" :loading="loading" @click="onSave">保存</el-button>
    </div>
    <el-button slot="reference" size="mini" plain :disabled="isDisabled">跳转网页</el-button>
  </el-popover>
</template>
<script>
import { mapState, mapMutations, mapActions } from 'vuex'
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
      type: '',
      url: '',
      visible: false,
      errorText: '',
      loading: false
    }
  },
  computed: {
    ...mapState('channel', ['menuData', 'VUE_APP_MEMBER_CENTER']),
    isDisabled() {
      const { level1Index, level2Index } = this
      return level2Index === -1 && !!this.menuData[level1Index].sub_button.length
    }
  },
  watch: {
    type(v) {
      if (v === 'memberCard') {
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
      const { type, url, level1Index, level2Index } = this
      this.errorText = ''
      if (type === 'view' && !url) {
        this.errorText = '自定义链接地址不能为空'
        return
      }

      this.loading = true

      await this.editMenu({
        item: {
          type,
          url: this.url || this.VUE_APP_MEMBER_CENTER
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
</style>
