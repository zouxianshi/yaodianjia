<template>
  <el-card class="nav-item-box-card" shadow="hover">
    <div slot="header" class="snb-bc-header">
      <span class="snb-text">导航一</span>
      <div class="snb-del">
        <el-popover v-model="visible" placement="top" width="160">
          <p style="font-size: 12px;padding-bottom: 8px;">确定删除当前导航吗？</p>
          <div style="text-align: right; margin: 0">
            <el-button size="mini" type="text" @click="visible = false">取消</el-button>
            <el-button type="primary" size="mini" @click="visible = false">确定</el-button>
          </div>
          <el-button slot="reference" type="danger" icon="el-icon-delete" circle size="mini" />
        </el-popover>
      </div>
    </div>
    <el-form label-width="100px" size="mini">
      <el-form-item label="图标">
        <div class="snb-photo">
          <el-image style="width: 60px; height: 60px" src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg" />
          <div class="snb-oper">
            <m-select-icon />
            <el-button icon="el-icon-position">本地上传</el-button>
          </div>
        </div>
      </el-form-item>
      <el-form-item label="导航名称">
        <el-input style="width: calc(100% - 200px)" />
      </el-form-item>
      <el-form-item label="导航链接">
        <el-input style="width: calc(100% - 200px)" />
        <el-button icon="el-icon-link" @click="dialogVisible = true">选择链接</el-button>
      </el-form-item>
    </el-form>
    <el-drawer :wrapper-closable="false" destroy-on-close	append-to-body title="选择链接" size="600px" :visible.sync="dialogVisible" :with-header="false">
      <m-links-table />
    </el-drawer>
  </el-card>
</template>
<script>
import mSelectIcon from './selectIcon'
import mLinksTable from './linksTable'
export default {
  name: 'Item',
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
  components: { mSelectIcon, mLinksTable }
}
</script>

<style lang="scss" rel="stylesheet/scss">
  .nav-item-box-card {
    margin-bottom: 10px;
    .snb-bc-header {
      position: relative;
      height: 14px;
      .snb-text {
        font-size: 14px;
      }
      .snb-del {
        position: absolute;
        right: 0;
        top: -3px;
        .el-button--mini.is-circle {
          padding: 3px;
        }
      }
    }
    .el-card__header {
      padding: 10px 20px;
    }
    .el-card__body {
      padding: 14px;
      .el-form-item--mini.el-form-item {
        margin-bottom: 8px;
      }
    }
    .snb-photo {
      position: relative;
      .snb-oper {
        position: absolute;
        left: 80px;
        top: 14px;
      }
    }
    .el-button--mini {
      padding: 7px 10px;
    }
  }
</style>
