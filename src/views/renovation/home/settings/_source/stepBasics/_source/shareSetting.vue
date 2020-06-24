<template>
  <div class="share-setting-model">
    <div class="custom-model">
      <el-form ref="formModle" :model="formModle" label-width="142px">
        <el-form-item label="分享描述">
          <el-input v-model="formModle.name" style="width: 320px;" placeholder="请填写最多不超过16个汉字" />
          <span class="cm-text">设置当前页面微信分享的描述</span>
        </el-form-item>
        <el-form-item label="分享图片">
          <m-el-upload @on-upload="_onUpload" />
          <span class="cm-text">设置当前页面微信分享的展示图片，请上传jpg、png格式图片，建议尺寸5:4</span>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import mElUpload from './../../elUpload'
export default {
  name: 'ShareSetting',
  data() {
    return {
      formModle: {
        name: '',
        name1: '选项1'
      },
      option: [{ value: '选项1', label: '黄金糕' }, { value: '选项1', label: '黄金糕' }]
    }
  },
  props: {},
  methods: {
    _onUpload() {}
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
  computed: {},
  components: { mElUpload }
}
</script>

<style lang="scss" rel="stylesheet/scss">
  .share-setting-model {

  }
</style>
