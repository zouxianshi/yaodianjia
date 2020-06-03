<template>
  <div>
    <el-table :data="tableData" size="small" style="width: 100%">
      <template v-for="col in cols">
        <el-table-column
          v-if="!col.render"
          :key="col.prop"
          :label="col.label"
          :show-overflow-tooltip="true"
          :prop="col.prop"
          :min-width="col.width"
        />
        <el-table-column
          v-else-if="col.prop==='schedule'"
          :key="col.prop"
          :label="col.label"
          :prop="col.prop"
        >
          <template slot-scope="scope">
            <el-tag v-if="scope.row.schedule===0" size="small" type="info">未开始</el-tag>
            <el-tag v-else-if="scope.row.schedule===1" size="small" type="success">进行中</el-tag>
            <el-tag v-else size="small" type="danger">已结束</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          v-else-if="col.prop==='status'"
          :key="col.prop"
          :label="col.label"
          :prop="col.prop"
        >
          <template slot="header" slot-scope="scope">
            <el-tooltip placement="top">
              <div slot="content">
                时间状态为进行中或未开始的，状态为生效的活动;
                <br>时间状态为已结束的，状态为已失效的活动;
              </div>
              <span>
                {{ scope.column.label }}
                <i class="el-icon-question" />
              </span>
            </el-tooltip>
          </template>
          <template slot-scope="scope">
            <el-tag v-if="scope.row.schedule===0" size="small" type="info">生效</el-tag>
            <el-tag v-else-if="scope.row.schedule===1" size="small" type="success">生效</el-tag>
            <el-tag v-else size="small" type="danger">已失效</el-tag>
          </template>
        </el-table-column>
      </template>
      <el-table-column label="操作" width="130">
        <template slot-scope="scope">
          <el-button type="text">查看</el-button>
          <el-divider direction="vertical" />
          <el-dropdown trigger="hover">
            <span class="el-dropdown-link">
              更多
              <i class="el-icon-arrow-down el-icon--right" />
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>
                <el-button type="text" @click="endActivity(scope.row)">失效</el-button>
              </el-dropdown-item>
              <el-dropdown-item>
                <el-button type="text" @click="toEdit(scope.row)">编辑</el-button>
              </el-dropdown-item>
              <el-dropdown-item>
                <el-button type="text" @click="handleDel(scope.row)">删除</el-button>
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
      </el-table-column>
      <div slot="empty">
        <no-data />
      </div>
    </el-table>
  </div>
</template>
<script>
import noData from '@/components/NoData'
import { mapGetters } from 'vuex'
export default {
  components: { noData },
  data() {
    return {
      cols: [
        {
          prop: 'id',
          label: '活动编号',
          width: '150'
        },
        {
          prop: 'activityType',
          label: '活动类型',
          width: '80'
        },
        {
          prop: 'name',
          label: '活动名称',
          width: '150'
        },
        {
          prop: 'storeNum',
          label: '参与门店'
        },
        {
          prop: 'startTime',
          label: '活动开始时间',
          width: '120',
          align: 'center'
        },
        {
          prop: 'endTime',
          label: '活动结束时间',
          width: '120',
          align: 'center'
        },
        {
          prop: 'schedule',
          label: '时间状态',
          width: '80',
          align: 'center',
          render: true
        },
        {
          prop: 'status',
          label: '状态',
          width: '80',
          align: 'center',
          render: true
        }
      ]
    }
  },
  computed: {
    ...mapGetters(['roles', 'merCode', 'activity']),
    tableData() {
      return this.activity.tablist
    }
  },
  methods: {
    // 编辑
    toEdit(row) {
      this.$router.push('/marketing/activity/assemble-edit?id=' + row.id)
    },
    // 删除
    handleDel(row) {
      this.$confirm('确认删除吗, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this._delData(row.id)
      })
    },
    // 失效操作
    endActivity() {
      this.$confirm('确认将此活动设置为失效状态吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // this._delData(row.id)
        console.log('此活动已失效')
        this._getTableData()
      })
    }
  }
}
</script>

<style scoped>
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.el-icon-arrow-down {
  font-size: 12px;
}
</style>
