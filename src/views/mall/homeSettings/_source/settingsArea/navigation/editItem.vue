<template>
  <div>
    <m-el-card :is-add="isAdd" @on-delete="onDel" @on-add="onAdd">
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
    </m-el-card>
    <el-drawer :wrapper-closable="false" destroy-on-close	append-to-body title="选择链接" size="600px" :visible.sync="dialogVisible" :with-header="false">
      <m-links-table />
    </el-drawer>
  </div>
</template>
<script>
import mElCard from './../_source/elCard'
import mSelectIcon from './selectIcon'
import mLinksTable from './../_source/linksTable'
export default {
  name: 'Item',
  data() {
    return {
      visible: false,
      dialogVisible: false
    }
  },
  props: {
    isAdd: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    onAdd() {
      alert('新增')
    },
    onDel() {
      alert('删除')
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
  components: { mSelectIcon, mLinksTable, mElCard }
}
</script>

<style lang="scss" rel="stylesheet/scss">
  .nav-item-box-card {

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
