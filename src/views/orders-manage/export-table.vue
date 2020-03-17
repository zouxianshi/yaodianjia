<template>
  <span>
    <el-button
      type="text"
      @click="dialogExportVisible = true;listQuery.currentPage=1;_loadList()"
    >查看导出记录</el-button>
    <el-dialog title="导出记录" :visible.sync="dialogExportVisible" append-to-body>
      <el-table v-loading="loadingList" :data="tableData" style="width: 100%" height="400">
        <el-table-column prop="createTime" label="申请时间" width="180" />
        <el-table-column prop="name" label="文件名称" width="180">
          <template slot-scope="scope">
            <el-tooltip
              class="item"
              effect="dark"
              :content="fileName(scope.row.filePath).name"
              placement="top-start"
            >
              <span>{{ fileName(scope.row.filePath).sortName }}</span>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column prop="createName" label="申请人" />
        <el-table-column prop="status" label="文件导出状态">
          <!-- 任务状态(1.待执行 2.执行中 3.执行完成 4.执行失败 5.取消 -->
          <template slot-scope="scope">
            <el-tooltip
              v-if="!!scope.row.message"
              class="item"
              effect="dark"
              :content="scope.row.message"
              placement="top-start"
            >
              <el-tag
                :type="currentStatus(scope.row.status) && currentStatus(scope.row.status).type"
              >
                {{ currentStatus(scope.row.status) && currentStatus(scope.row.status).value }}
                <i
                  class="el-icon-question"
                />
              </el-tag>
            </el-tooltip>
            <el-tag v-else :type="currentStatus(scope.row.status) && currentStatus(scope.row.status).type">{{ currentStatus(scope.row.status) && currentStatus(scope.row.status).value }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="action" label="操作" width="100">
          <template slot-scope="scope">
            <a
              v-if="!!scope.row.filePath && scope.row.status === 3"
              style="padding: 9px 15px;font-size: 12px;border-radius: 3px;background-color: #147de8;color: #fff"
              :href="configOrderOss(scope.row.filePath)"
              download
            >下载</a>
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
  </span>
</template>
<script>
import Pagination from '@/components/Pagination'
import { getExportRecord } from '@/api/task'
// import { getOrderList } from '@/api/order'
import mixins from '@/utils/mixin'
import { mapGetters } from 'vuex'

export default {
  name: 'ExportTable',
  components: { Pagination },
  mixins: [mixins],
  data() {
    return {
      dialogExportVisible: false,
      tableData: [],
      total: 0,
      listQuery: {
        currentPage: 1
      },
      loadingList: false,
      exportStatus: [
        {
          status: '1',
          type: 'info',
          value: '等待数据打包'
        },
        {
          status: '2',
          type: '',
          value: '数据打包中'
        },
        {
          status: '3',
          type: 'success',
          value: '数据打包完成'
        },
        {
          status: '4',
          type: 'danger',
          value: '数据打包失败'
        },
        {
          status: '5',
          type: 'info',
          value: '数据打包已取消'
        }
      ]
    }
  },
  computed: {
    ...mapGetters(['merCode'])
  },
  methods: {
    _loadList() {
      console.log('查询列表----------', this.listQuery)
      this.loadingList = true
      getExportRecord({
        merCode: this.merCode,
        ...this.listQuery
      })
        .then(res => {
          this.loadingList = false
          const { data, totalCount } = res.data
          if (data) {
            this.tableData = data
          } else {
            this.tableData = []
          }
          this.total = totalCount
        })
        .catch(() => {
          this.loadingList = false
        })
    },
    // 返回文件名
    fileName(path) {
      const filePathObj = {}
      if (path) {
        const nameArr = path.split('/')
        const sortnameArr = nameArr[nameArr.length - 1].split('-')
        filePathObj.name =
          Array.isArray(nameArr) && nameArr.length
            ? nameArr[nameArr.length - 1]
            : ''
        filePathObj.sortName =
          Array.isArray(sortnameArr) && sortnameArr.length > 1
            ? `订单列表-${sortnameArr[1]}.zip`
            : ''
      }
      return filePathObj
    },
    // 计算当前打包状态
    currentStatus(statu) {
      return this.exportStatus.find(item => item.status === statu.toString())
    }
  }
}
</script>
