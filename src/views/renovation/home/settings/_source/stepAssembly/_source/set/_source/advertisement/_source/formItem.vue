<template>
  <div class="advertisement-form-item-model">
    <div class="afim-img-form">
      <span class="afim-img" :style="{height:height}">
        <img v-if="item.img" :src="item.img" alt="" :style="{height:height}">
        <m-item-no-data v-else :height="height" />
      </span>
      <span class="afim-upload">
        <m-el-upload @on-upload="onUpload">
          <div style="text-align: left;">
            <el-button icon="el-icon-position" size="mini">本地上传</el-button><span class="sa-mandatory-asterisk">*</span>
            <div class="sa-upload-size">建议上传{{ rtSizeText }}图片</div>
          </div>
          <div v-if="error.isImg" class="sa-assembly-error">
            {{ error.isImg }}
          </div>
        </m-el-upload>
      </span>
    </div>
    <div class="afim-form">
      <el-form label-width="90px" size="mini">
        <el-form-item label="链接地址">
          <el-input v-model="item.url" style="width: calc(100% - 101px)" readonly />
          <el-button icon="el-icon-link" @click="dialogVisible = true">选择链接 </el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-drawer :wrapper-closable="false" destroy-on-close	append-to-body size="600px" :visible.sync="dialogVisible">
      <div slot="title">
        选择链接
      </div>
      <m-links-table v-if="dialogVisible" :url="item.url" @on-link="onLink" />
    </el-drawer>
  </div>
</template>
<script>
import mItemNoData from './../../../../itemNoData'
import mElUpload from './../../../../../../elUpload'
import { defaultParams } from './../../../../../default'
import mLinksTable from '@/views/mall/homeSettings/_source/settingsArea/_source/linksTable'

export default {
  name: 'FormItem',
  data() {
    return {
      dialogVisible: false,
      item: {},
      error: {
        isImg: false
      }
    }
  },
  props: {
    height: {
      type: String,
      default: '87px'
    },
    el: {
      type: Object,
      default: () => {}
    },
    ips: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    $verification() {
      const { img } = this.item
      let flag = true

      this.reset()

      if (!img) {
        this.error.isImg = '请上传轮播图'
        flag = false
      }

      return flag
    },
    reset() {
      this.error = _.assign(this.error, {
        isImg: false
      })
    },
    onLink({ url }) {
      this.$set(this.item, 'url', url)
      this.onUploadItem()
    },
    onUpload({ img }) {
      this.$set(this.item, 'img', img)
      this.onUploadItem()
    },
    onUploadItem() {
      this.$emit('on-el-update', this.item)
      this.$verification()
    }
  },
  watch: {
    'el': {
      deep: true,
      immediate: true,
      handler(v) {
        this.item = _.cloneDeep(v)
      }
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
  computed: {
    rtSizeText() {
      const { type, subType, index } = this.ips
      return defaultParams[`${type}_${subType}`]['imgSize'][index]
    }
  },
  components: { mItemNoData, mElUpload, mLinksTable }
}
</script>

<style lang="scss" rel="stylesheet/scss">
  .advertisement-form-item-model {
    .afim-img-form {
      overflow: hidden;
      margin-bottom: 20px;
      .afim-img {
        width: 120px;
        float: left;
        >img {
          width: 120px;
        }
      }
      .afim-upload {
        float: left;
        margin-left: 24px;
        .sa-assembly-error {
          margin-top: 8px;
        }
      }
    }
  }
</style>
