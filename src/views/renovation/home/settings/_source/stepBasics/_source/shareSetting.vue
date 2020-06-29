<template>
  <div class="share-setting-model">
    <div class="custom-model">
      <el-form label-width="142px">
        <el-form-item label="分享描述">
          <el-input v-model="basics.shareDesc" style="width: 320px;" placeholder="请填写最多不超过16个汉字" />
          <span class="cm-text">设置当前页面微信分享的描述</span>
          <div v-if="error.isShareDesc" class="bm-basics-error">
            {{ error.isShareDesc }}
          </div>
        </el-form-item>
        <el-form-item label="分享图片">
          <m-el-upload :img-url="basics.shareImg" @on-upload="_onUpload" />
          <span class="cm-text">设置当前页面微信分享的展示图片，请上传jpg、png格式图片，建议尺寸5:4</span>
          <div v-if="error.isShareImg" class="bm-basics-error">
            {{ error.isShareImg }}
          </div>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex'
import mElUpload from './../../elUpload'
export default {
  name: 'ShareSetting',
  data() {
    return {
      error: {
        isShareDesc: false,
        isShareImg: false
      }
    }
  },
  props: {},
  methods: {
    ...mapMutations('renovation', ['setBasics']),
    $verification() {
      const { shareDesc, shareImg } = this.basics
      let flag = true

      this.reset()

      if (!shareDesc) {
        this.error.isShareDesc = '请输入分享描述信息'
        flag = false
      }

      if (!shareImg) {
        this.error.isShareImg = '请上传分享图片'
        flag = false
      }

      return flag
    },
    reset() {
      this.error = _.assign(this.error, {
        isShareDesc: false,
        isShareImg: false
      })
    },
    _onUpload({ img }) {
      this.setBasics({
        shareImg: img
      })
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
  components: { mElUpload }
}
</script>

<style lang="scss" rel="stylesheet/scss">
  .share-setting-model {

  }
</style>
