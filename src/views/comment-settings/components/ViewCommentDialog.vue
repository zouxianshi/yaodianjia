<template>
  <el-dialog title="管理评论" :visible.sync="visible" append-to-body @closed="$emit('closed')">
    <div class="search-form" style="margin-top:20px;margin-bottom:10px">
      <form-label label="评论用户">
        <el-input
          v-model.trim="listQuery.nickName"
          size="small"
          style="width:200px"
          placeholder="请输入评论用户名"
        />
      </form-label>
      <el-button type="primary" size="mini" @click="handlQuery">查询</el-button>
    </div>

    <el-table v-loading="loadingList" :data="tableData" height="300">
      <el-table-column prop="createTime" label="序号" width="50">
        <template slot-scope="scope">{{ scope.$index }}</template>
      </el-table-column>
      <el-table-column prop="nickName" label="评论用户" width="100" />
      <el-table-column prop="origin" label="评论来源" width="80">
        <template slot-scope="scope">
          <span>{{ scope.row.origin === 1 ? '用户评论' : '商户导入' }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="comment" label="评论内容" width="200" />
      <el-table-column prop="time" label="评论时间" />
      <el-table-column prop="action" label="操作" width="100">
        <template slot-scope="scope">
          <el-button type="text" size="mini" @click="handlTop(scope.row)">置顶</el-button>
          <el-button type="text" size="mini" @click="handlDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      :total="total"
      :page.sync="listQuery.currentPage"
      :limit.sync="listQuery.pageSize"
      @pagination="_loadList"
    />
  </el-dialog>
</template>

<script>
// 查看评论弹框
import Pagination from '@/components/Pagination'
import mixins from '@/utils/mixin'
import { mapGetters } from 'vuex'
import FormLabel from '@/components/FormLabel'
import { queryCommentList, putComment, delComment } from '@/api/commentService'

export default {
  name: 'ViewCommentDialog',
  components: { Pagination, FormLabel },
  mixins: [mixins],
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    commodityId: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      tableData: [],
      total: 0,
      listQuery: {
        currentPage: 1
      },
      loadingList: false
    }
  },
  computed: {
    ...mapGetters(['merCode'])
  },
  watch: {
    visible(val) {
      if (val) {
        this._loadList()
      }
    }
  },
  methods: {
    _loadList() {
      console.log('查询列表----------', this.listQuery)
      this.loadingList = true
      queryCommentList({
        merCode: this.merCode,
        ...this.listQuery,
        commodityId: this.commodityId
      })
        .then(res => {
          this.loadingList = false
          const { data, totalCount } = res.data
          if (data) {
            this.$set(this, 'tableData', data)
          } else {
            this.tableData = []
          }
          this.total = totalCount
        })
        .catch(() => {
          this.loadingList = false
        })
    },
    async handlTop(row) {
      this.loadingList = true
      await putComment({ id: row.id, top: 1 })
      this._loadList()
    },
    async handlDelete(row) {
      this.loadingList = true
      await delComment({ id: row.id })
      this._loadList()
    },
    handlQuery() {
      this._loadList()
    }
  }
}
</script>

<style lang="scss">
.custom-tree-node {
  display: -webkit-box;
  display: flex;
  display: -ms-flexbox;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
  width: 100%;
  &.active {
    color: #2d8cf0;
  }
  i {
    display: inline-block;
    margin-left: 10px;
  }
  .ellipsis {
    display: inline-block;
    overflow: hidden;
    text-overflow: ellipsis;
    padding-right: 9px;
  }
}
</style>
<style lang="scss">
.el-tree-node__content {
  margin-top: 5px;
}
</style>
<style lang="scss" scoped>
.search-form {
  margin: 0 0 10px 0;
}
</style>
