<template>
  <div class="basics-model">
    <div class="bm-basics-setting" style="margin-bottom: 50px;">
      <div class="bm-title"><strong>页面基础设置</strong></div>
      <el-form label-width="142px">
        <el-form-item label="页面标题" :rules="[{ required: true}]">
          <el-input v-model="basics.title" style="width: 320px;" maxlength="16" placeholder="请填写最多不超过16个汉字" />
          <span class="cm-text" style="position: relative;top:-6px;">当前页面标题用于页面展示及页面微信分享标题</span>
          <div v-if="error.isTitle" class="bm-basics-error">
            {{ error.isTitle }}
          </div>
        </el-form-item>
      </el-form>
    </div>
    <div class="bm-style-setting" style="margin-bottom: 50px;">
      <div class="bm-title"><strong>页面风格设置</strong></div>
      <el-form label-width="142px">
        <el-form-item label="背景颜色" :rules="[{ required: true}]">
          <span class="cm-color">
            <el-color-picker v-model="basics.backgroundColor" />
            <span class="cm-color-text">{{ basics.backgroundColor }}</span>
          </span>
          <span class="cm-text" style="position: relative;top:-6px;">设置当前页面整体背景色，默认#FFFFFF</span>
        </el-form-item>
      </el-form>
    </div>
    <div class="bm-style-setting">
      <div class="bm-title"><strong>首页分享设置</strong></div>
      <m-share-setting ref="shareSetting" />
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import mShareSetting from './_source/shareSetting'
export default {
  name: 'StepDmBasics',
  data() {
    return {
      basicsModel: {},
      error: {
        isTitle: false
      }
    }
  },
  props: {},
  methods: {
    $verification() {
      const { title } = this.basics

      this.error.isTitle = false

      if (!title) {
        this.error.isTitle = '请输入页面标题'
        return
      }

      if (!this.$refs.shareSetting.$verification()) {
        return
      }

      return true
    }
  },
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
  computed: {
    ...mapState('renovation', ['basics'])
  },
  components: { mShareSetting }
}
</script>

<style lang="scss" rel="stylesheet/scss">
  .basics-model {
    padding: 20px;
    .bm-title {
      padding-left: 46px;
      padding-bottom: 20px;
      strong {
        font-size: 16px;
      }
    }
    .bm-style-setting {
      margin-top: 20px;
    }
    .cm-color {
      height: 36px;
      line-height: 36px;
      border: 1px solid #DCDFE6;
      display: inline-block;
      border-radius:4px;
      padding: 0 8px;
      .cm-color-text {
        font-size: 16px;
        color: #303030;
        margin-left: 8px;
        position: relative;
        top: -12px;
      }
      .el-color-picker__trigger {
        border: none;
        margin-top: -1px;
      }
    }
    .cm-text {
      font-size: 14px;
      color: #9B9B9B;
      margin-left: 16px;
    }
    .bm-basics-error {
      font-size: 12px;
      color: #ff0000;
    }
  }
</style>
