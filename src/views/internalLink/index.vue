<template>
  <div class="container">
    <el-table :data="list">
      <el-table-column label="页面名称" property="pageName" />
      <el-table-column label="链接地址" property="linkAddress" />
      <el-table-column label="操作" width="100px">
        <template slot-scope="scope">
          <el-button type="text" class="copy-key" :data-clipboard-text="scope.row.linkAddress" @click="onCopyLink">复制链接</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import _ from 'lodash'
import Clipboard from 'clipboard'
import { mapGetters } from 'vuex'
import {
  getInternalLink
} from '../../api/chainSetting'
export default {
  name: 'InternalLink',
  data() {
    return {
      loading: false,
      list: []
    }
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      getInternalLink(this.merCode).then(res => {
        if (res.code === '10000') {
          this.list = _.cloneDeep(res.data)
        } else {
          this.loading = false
          this.$message({
            message: res.msg,
            type: 'error',
            duration: 5 * 1000
          })
        }
        console.log('res-2', this.list)
      })
    },
    onCopyLink() {
      const clipboard = new Clipboard(`.copy-key`)
      clipboard.on('success', () => {
        this.$message({ type: 'success', message: '复制成功！' })
        clipboard.destroy()
      })
      clipboard.on('error', e => {
        this.$message({ type: 'error', message: JSON.stringify(e) })
        clipboard.destroy()
      })
    }
  },
  computed: {
    ...mapGetters(['merCode'])
  }
}
</script>

<style scoped>
  .container{
    margin-left: 27px;
    margin-right: 27px;
    margin-top: 10px;
  }
</style>
