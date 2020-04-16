<template>
  <m-el-card title="广告设置1">
    <el-form label-width="100px" size="mini">
      <el-form-item label="图标">
        <div class="snb-photo">
          <el-image style="width: 140px; height: 60px" src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg" />
          <div class="snb-oper">
            <!--<m-select-icon />-->
            <el-button icon="el-icon-position">本地上传</el-button>
          </div>
        </div>
      </el-form-item>
      <el-form-item label="图片链接">
        <el-input style="width: calc(100% - 200px)" />
        <el-button icon="el-icon-link" @click="dialogVisible = true">选择链接</el-button>
      </el-form-item>
    </el-form>
    <el-drawer :wrapper-closable="false" destroy-on-close	append-to-body title="选择链接" size="600px" :visible.sync="dialogVisible" :with-header="false">
      <m-links-table />
    </el-drawer>
  </m-el-card>
</template>
<script>
import mElCard from './../_source/elCard'
import mLinksTable from './../_source/linksTable'
export default {
  name: 'VaFirstItem',
  data() {
    return {
      visible: false,
      dialogVisible: false
    }
  },
  props: {},
  methods: {},
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
  components: { mElCard, mLinksTable }
}
</script>

<style lang="scss" rel="stylesheet/scss">
  .va-first-item-box-card {

  }
</style>
