<!-- 客服列表页面 -->

<template>
  <div class="customer-service-list-container">
    <div class="app-container">
      <div class="table-header">
        <!-- 筛选 -->
        <div class="filter">
          <span class="filter-desc">筛选：客服状态</span>
          <el-dropdown @command="handleCommand">
            <span class="el-dropdown-link">
              {{ selectedStatus }}
              <i class="el-icon-arrow-down el-icon--right" />
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item
                v-for="(item,index) in statusMap"
                :key="index"
                :command="item.symbol"
              >{{ item.text }}</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <!-- 添加客服 -->
        <el-button class="add" type="primary" size="mini" @click="dialogTableVisible = true">添加客服</el-button>
        <el-dialog title="添加客服" :visible.sync="dialogTableVisible" width="80%">
          <div class="search-filter">
            <div class="search-filter-item">
              <span class="search-filter-item-text">员工姓名</span>
              <el-input class="search-filter-item-input" type="text" placeholder="请输入员工姓名" />
            </div>
            <div class="search-filter-item">
              <span class="search-filter-item-text">所属机构</span>
              <el-input class="search-filter-item-input" type="text" placeholder="请输入员工机构部门" />
            </div>
            <el-button class="search-btn" type="primary">查询</el-button>
          </div>
          <el-table
            ref="multipleTable"
            :data="tableData"
            tooltip-effect="dark"
            style="width: 100%"
            @selection-change="handleSelectionChange"
          >
            <el-table-column type="selection" width="55" />
            <el-table-column label="日期" width="120">
              <template slot-scope="scope">{{ scope.row.date }}</template>
            </el-table-column>
            <el-table-column prop="name" label="员工编码" width="120" />
            <el-table-column prop="name" label="姓名" width="120" />
            <el-table-column prop="name" label="性别" width="120" />
            <el-table-column prop="name" label="手机号" width="120" />
            <el-table-column prop="name" label="职位" width="120" />
            <el-table-column prop="address" label="部门" show-overflow-tooltip />
          </el-table>
          <el-pagination
            :current-page="currentPage4"
            :page-sizes="[100, 200, 300, 400]"
            :page-size="100"
            layout="total, sizes, prev, pager, next, jumper"
            :total="400"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
          <div class="selected-staff">
            已选员工：
            <span>张三 0021，李四 0025</span>
          </div>
        </el-dialog>
      </div>

      <!-- 客服列表 -->
      <!-- <support-staff :total="total" @pageno-change="pageNoChange" @size-change="pageSizeChange" :table-data="tableData" /> -->
      <div class="support-staff-comp">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="id" label="序号" width="180" />
          <el-table-column prop="isOnline" label="在线状态" width="180">
            <template slot-scope="scope">{{ scope.row.isOnline ? '在线' : '不在线' }}</template>
          </el-table-column>
          <el-table-column prop="name" label="客服名称" />
          <el-table-column prop="actions" label="操作">
            <template slot-scope="scope">
              <el-button type="text" size="small" @click="viewHistoryMsg(scope.row)">查看消息记录</el-button>
              <el-button type="text" size="small" @click="delStaff(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          class="pagination"
          :current-page="currentPage"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="10"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
// import supportStaff from './components/support-staff'
// import Pagination from '@/components/Pagination'
import { queryStaffList } from '@/api/customer-service'
export default {
  components: {
    // supportStaff
    // Pagination
  },
  props: {},
  data() {
    return {
      total: 100,
      currentPage4: 4,
      dialogTableVisible: false,
      selectedStatus: '全部',
      statusMap: [
        {
          symbol: 'all',
          text: '全部'
        },
        {
          symbol: 'online',
          text: '在线'
        },
        {
          symbol: 'offline',
          text: '离线'
        }
      ],
      activeName: 'first',
      tableData: [],
      gridData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }
      ]
    }
  },
  computed: {
    ...mapGetters(['merCode'])
  },
  created() {
    this.queryStaffList({
      currentPage: 1,
      merCode: this.merCode,
      pageSize: 20,
      empName: '',
      subOrgName: ''
    })
  },
  methods: {
    // 进入页面获取客服列表
    queryStaffList(params) {
      console.log('this.merCode', this.merCode)
      queryStaffList(params).then(res => {
        console.log('res', res)
        const data = []
        for (let i = 0; i < 58; i++) {
          data.push({
            id: '01',
            isOnline: true,
            name: '客服名称01',
            address: '上海市普陀区金沙江路 1518 弄'
          })
        }
        this.tableData = data
      })
    },
    handleClick(tab, e) {
      console.log('tab', tab, 'e', e)
    },
    handleCommand(command) {
      // this.$message('click on item ' + command);
      this.selectedStatus = this.statusMap.find(
        item => item.symbol === command
      ).text
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
    },
    // 主列表页码切换
    pageNoChange(data) {
      console.log('emit data', data)
      this.queryStaffList({
        currentPage: data.curPageNo,
        merCode: this.merCode,
        pageSize: data.curPageSize,
        empName: '',
        subOrgName: ''
      })
    },
    // 主列表单页条数切换
    pageSizeChange(data) {
      console.log('emit data pagesize', data)
      this.queryStaffList({
        currentPage: data.curPageNo,
        merCode: this.merCode,
        pageSize: data.curPageSize,
        empName: '',
        subOrgName: ''
      })
    }
  }
}
</script>

<style scoped lang="scss">
	.el-dropdown-link {
		cursor: pointer;
		color: #409eff;
	}
	.el-icon-arrow-down {
		font-size: 12px;
	}
	.table-header {
		overflow: hidden;
		margin-bottom: 10px;
		.filter {
			float: left;

			.filter-desc {
				margin-right: 10px;
				font-size: 14px;
			}
		}
		.add {
			float: right;
		}
	}
	// .add-server-dialog {
	.search-filter {
		overflow: hidden;

		.search-filter-item {
			float: left;
			margin-right: 10px;

			.search-filter-item-text {
			}
			.search-filter-item-input {
				width: 180px;
			}
		}
	}
</style>
