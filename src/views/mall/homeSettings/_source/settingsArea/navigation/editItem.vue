<template>
  <m-el-card class="nav-item-box-card" :index="index" :is-add="isAdd" :is-disabled="isDisabled" :title="`导航${index + 1}`">
    <el-form label-width="100px" size="mini">
      <el-form-item label="图标">
        <div class="snb-photo">
          <template v-if="searchParams.img">
            <el-image v-if="searchParams.img.startsWith('http')" style="width: 60px; height: 60px" :src="showImg(searchParams.img)" />
            <m-icons v-else :icon-clx="searchParams.img" :size="60" />
          </template>
          <m-icons v-else icon-clx="no-data" :size="60" />
          <div class="snb-ope">
            <m-select-icon :item="item" @on-upload="_onUpload" />
            <m-el-upload @on-upload="_onUpload">
              <el-button icon="el-icon-position">本地上传</el-button>
            </m-el-upload>
            <p class="p-size">尺寸：{{ subType === 'first' ? '128*128' : '96*96' }}</p>
          </div>
          <div v-if="errorGather.isImg" class="sa-error">
            图标不允许为默认图标！
          </div>
        </div>
      </el-form-item>
      <el-form-item label="导航名称">
        <el-input v-model="searchParams.name" style="width: calc(100% - 200px)" maxlength="4" @change="() => errorGather.isName = !searchParams.name" />
        <div v-if="errorGather.isName" class="sa-error">
          导航名称不允许为空！
        </div>
      </el-form-item>
      <el-form-item label="导航链接">
        <el-input v-model="searchParams.url" readonly style="width: calc(100% - 200px)" @change="() => errorGather.isUrl = !searchParams.url" />
        <el-button icon="el-icon-link" @click="dialogVisible = true">选择链接</el-button>
        <div v-if="errorGather.isUrl" class="sa-error">
          链接不允许为空！
        </div>
      </el-form-item>
    </el-form>
    <el-drawer :wrapper-closable="false" destroy-on-close	append-to-body size="600px" :visible.sync="dialogVisible">
      <div slot="title">
        选择链接
      </div>
      <m-links-table v-if="dialogVisible" :url="searchParams.url" @on-link="_onLink" />
    </el-drawer>
  </m-el-card>
</template>
<script>
import mElCard from './../_source/elCard'
import mElUpload from './../_source/elUpload'
import mSelectIcon from './selectIcon'
import mLinksTable from './../_source/linksTable'
import mIcons from './../../_source/icons'

export default {
  name: 'Item',
  data() {
    return {
      visible: false,
      dialogVisible: false,
      searchParams: {
        name: '',
        img: '',
        url: ''
      },
      errorGather: {
        isName: false,
        isUrl: false,
        isImg: false
      }
    }
  },
  props: {
    subType: {
      type: String,
      default: ''
    },
    isAdd: {
      type: Boolean,
      default: false
    },
    isDisabled: {
      type: Boolean,
      default: false
    },
    index: {
      type: Number,
      default: null
    },
    item: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    _onUpload({ img }) {
      const { item, index } = this
      this.$emit('on-item', { ...item, img }, index)
      this.searchParams.img = img
      this.errorGather.isImg = false
    },
    _onLink({ url }) {
      this.searchParams.url = url
    },
    $verification() {
      const { name, img, url } = this.searchParams
      this.reset()
      if (!img) {
        this.errorGather.isImg = true
        return false
      }
      if (!name) {
        this.errorGather.isName = true
        return false
      }
      if (!url) {
        this.errorGather.isUrl = true
        return false
      }
      return { ...this.searchParams }
    },
    reset() {
      this.errorGather.isImg = false
      this.errorGather.isName = false
      this.errorGather.isUrl = false
    }
  },
  watch: {
    'item': {
      deep: true,
      immediate: true,
      handler(item) {
        this.searchParams = _.cloneDeep(item)
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
  components: { mSelectIcon, mLinksTable, mElCard, mElUpload, mIcons }
}
</script>

<style lang="scss" rel="stylesheet/scss">
  .nav-item-box-card {
    .snb-photo {
      position: relative;
      .snb-ope {
        position: absolute;
        left: 80px;
        top: 8px;
        .p-size {
          font-size: 12px;
          color: #bbb;
        }
      }
    }
    .el-button--mini {
      padding: 7px 10px;
    }
  }
</style>
