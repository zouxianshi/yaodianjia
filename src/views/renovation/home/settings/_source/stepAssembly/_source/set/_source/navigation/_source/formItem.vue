<template>
  <div class="navigation-form-item-model">
    <div class="nfim-icon">
      <div class="nfim-icon-img">
        <m-item-no-data border-radius="100%" height="58px" />
      </div>
      <div class="nfim-icon-ht">
        <m-select-icon :item="item" btn-size="mini" @on-upload="_onUpload" />
        <m-el-upload>
          <el-button icon="el-icon-position" size="mini">本地上传</el-button>
        </m-el-upload>
      </div>
    </div>
    <div class="nfim-form">
      <el-form label-width="80px" size="mini">
        <el-form-item label="导航名称">
          <el-input v-model="name" />
        </el-form-item>
        <el-form-item label="导航链接">
          <el-input v-model="name" style="width: calc(100% - 101px)" />
          <el-button icon="el-icon-link">选择链接</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import mItemNoData from './../../../../itemNoData'
import mSelectIcon from '@/views/mall/homeSettings/_source/settingsArea/navigation/selectIcon'
import mElUpload from './../../../../../../elUpload'

export default {
  name: 'NavigationFormItem',
  data() {
    return {
      name: ''
    }
  },
  props: {
    item: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    _onUpload(v) {
      console.log(v)
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
  computed: {},
  components: { mItemNoData, mSelectIcon, mElUpload }
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
      }
    }
  }
</style>
