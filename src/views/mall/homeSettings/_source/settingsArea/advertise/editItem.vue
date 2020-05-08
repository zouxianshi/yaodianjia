<template>
  <m-el-card :is-add="isAdd" :index="index" :is-disabled="isDisabled" :title="`广告${index + 1}`">
    <el-form label-width="110px" size="mini">
      <el-form-item label="广告图片">
        <div class="snb-photo">
          <el-image v-if="searchParams.img" style="width: 140px;" :src="showImg(searchParams.img)" />
          <div v-else :class="prefixClsNoImg">
            <m-icons :size="50" :is-center="true" :text="`尺寸：${sizeObj[subType][index]}`" />
          </div>
          <div class="snb-oper">
            <m-el-upload @on-upload="_onUpload">
              <el-button icon="el-icon-position">本地上传</el-button>
            </m-el-upload>
            <div v-if="errorGather.isImg" class="sa-error">
              广告图不允许为空！
            </div>
          </div>
        </div>
      </el-form-item>
      <el-form-item label="图片链接">
        <el-input v-model="searchParams.url" readonly style="width: calc(100% - 200px)" />
        <el-button icon="el-icon-link" @click="dialogVisible = true">选择链接</el-button>
        <div v-if="errorGather.isUrl" class="sa-error">
          广告图链接不允许为空！
        </div>
      </el-form-item>
    </el-form>
    <el-drawer :wrapper-closable="false" destroy-on-close	append-to-body title="选择链接" size="600px" :visible.sync="dialogVisible" :with-header="false">
      <m-links-table v-if="dialogVisible" :url="searchParams.url" @on-link="_onLink" />
    </el-drawer>
  </m-el-card>
</template>
<script>
import mIcons from './../../_source/icons'
import mElCard from './../_source/elCard'
import mLinksTable from './../_source/linksTable'
import mElUpload from './../_source/elUpload'

const sizeObj = {
  first: {
    0: '1077*360',
    1: '1077*360',
    2: '1077*360',
    3: '1077*360',
    4: '1077*360',
    5: '1077*360'
  },
  second: {
    0: '480*540',
    1: '573*258',
    2: '573*258'
  },
  third: {
    0: '342*342',
    1: '342*342',
    2: '342*342'
  },
  four: {
    0: '528*240',
    1: '528*240',
    2: '528*240',
    3: '528*240'
  },
  five: {
    0: '1125*不限高'
  }
}

export default {
  name: 'VaFirstItem',
  data() {
    return {
      sizeObj,
      visible: false,
      dialogVisible: false,
      searchParams: {
        img: '',
        url: ''
      },
      errorGather: {
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
      default: true
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
    _onLink({ url }) {
      this.searchParams.url = url
      this.errorGather.isUrl = false
    },
    _onUpload({ img }) {
      const { index } = this
      this.searchParams.img = img
      this.$emit('on-item', { ...this.searchParams }, index)
      this.errorGather.isImg = false
    },
    $verification() {
      const { img } = this.searchParams
      this.reset()
      if (!img) {
        this.errorGather.isImg = true
        return false
      }
      // if (!url) {
      //   this.errorGather.isUrl = true
      //   return false
      // }
      return { ...this.searchParams }
    },
    reset() {
      this.errorGather.isImg = false
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
  computed: {
    prefixClsNoImg() {
      const prefixCls = 'no-img'
      const { subType, index } = this
      return [
        `${prefixCls}`,
        {
          [`${prefixCls}-second`]: (subType === 'second' && index === 0),
          [`${prefixCls}-third`]: subType === 'third',
          [`${prefixCls}-four`]: subType === 'four'
        }
      ]
    }
  },
  components: { mElCard, mLinksTable, mIcons, mElUpload }
}
</script>

<style lang="scss" rel="stylesheet/scss">
  .va-first-item-box-card {
    .no-img {
      width: 250px;
      height: 83px;
      background: #F0F2F5;
      margin-bottom: 12px;
      .v-hs-icons {
        .p-test {
          margin-top: -4px;
        }
      }
      &.no-img-second {
        width: 181px;
        height: 203px;
        .hs-icons-model {
          padding-top: 70px;
        }
      }
      &.no-img-third {
        width: 129px;
        height: 129px;
      }
      &.no-img-four {
        width: 199px;
        height: 91px;
      }
    }
  }
</style>
