<template>
  <div class="navigation-form-item-model">
    <div class="nfim-icon">
      <div class="nfim-icon-img">
        <img v-if="item.img" :src="rtImg()" style="width: 58px;height: 58px;">
        <m-item-no-data v-else border-radius="100%" height="58px" />
      </div>
      <div class="nfim-icon-ht">
        <m-select-icon :item="item" btn-size="mini" @on-upload="_onUpload" />
        <m-el-upload @on-upload="_onUpload">
          <el-button icon="el-icon-position" size="mini">本地上传</el-button>
        </m-el-upload>
        <div v-if="error.isImg" class="sa-assembly-error">{{ error.isImg }}</div>
      </div>
    </div>
    <div class="nfim-form">
      <el-form label-width="90px" size="mini">
        <el-form-item label="导航名称">
          <el-input v-model="item.name" placeholder="导航名称" maxlength="4" @change="onUploadItem" />
          <div v-if="error.isName" class="sa-assembly-error">{{ error.isName }}</div>
        </el-form-item>
        <el-form-item label="导航链接">
          <el-input v-model="item.url" style="width: calc(100% - 101px)" readonly placeholder="导航链接" @change="onUploadItem" />
          <el-button icon="el-icon-link" @click="dialogVisible = true">选择链接</el-button>
          <div v-if="error.isUrl" class="sa-assembly-error">{{ error.isUrl }}</div>
        </el-form-item>
      </el-form>
    </div>
    <el-drawer :wrapper-closable="false" destroy-on-close	append-to-body size="600px" :visible.sync="dialogVisible">
      <div slot="title">
        选择链接
      </div>
      <m-links-table v-if="dialogVisible" :url="el.url" @on-link="onLink" />
    </el-drawer>
  </div>
</template>
<script>
import mItemNoData from './../../../../itemNoData'
import mSelectIcon from '@/views/mall/homeSettings/_source/settingsArea/navigation/selectIcon'
import mElUpload from './../../../../../../elUpload'
import mLinksTable from '@/views/mall/homeSettings/_source/settingsArea/_source/linksTable'

export default {
  name: 'NavigationFormItem',
  data() {
    return {
      item: {},
      dialogVisible: false,
      error: {
        isImg: false,
        isName: false,
        isUrl: false
      }
    }
  },
  props: {
    el: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    $verification() {
      const { img, url, name } = this.item
      let flag = true

      this.reset()

      if (!img) {
        this.error.isImg = '请上传导航图标'
        flag = false
      }

      if (!name) {
        this.error.isName = '请输入导航名称'
        flag = false
      }

      if (!url) {
        this.error.isUrl = '请选择导航链接'
        flag = false
      }

      return flag
    },
    reset() {
      this.error = _.assign(this.error, {
        isImg: false,
        isName: false,
        isUrl: false
      })
    },
    onLink({ url }) {
      this.$set(this.item, 'url', url)
      this.onUploadItem()
    },
    _onUpload({ img }) {
      this.item.img = img
      this.onUploadItem()
    },
    onUploadItem() {
      this.$emit('on-el-update', this.item)
      this.$verification()
    },
    rtImg() {
      const { img } = this.item
      return img.startsWith('http')
        ? img
        : require(`@/views/mall/homeSettings/_source/_source/img/${img}.png`)
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
  computed: {},
  components: { mItemNoData, mSelectIcon, mElUpload, mLinksTable }
}
</script>

<style lang="scss" rel="stylesheet/scss">
  .navigation-form-item-model {
    .nfim-icon {
      margin-bottom: 16px;
      position: relative;
      .nfim-icon-img {
        width: 58px;
        margin-left: 16px;
      }
      .nfim-icon-ht {
        position: absolute;
        left: 100px;
        top: 14px;
        .sa-assembly-error {
          margin-top: 8px;
        }
      }
    }
  }
</style>
