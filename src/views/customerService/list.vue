<template>
  <div class="customer-service-list-container">
    <div class="app-container">
      <div class="table-header">
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
              <!-- <el-dropdown-item command="online">在线</el-dropdown-item>
							<el-dropdown-item command="offline">离线</el-dropdown-item>-->
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <el-button class="add" type="primary" size="small" @click="dialogTableVisible = true">添加客服</el-button>
        <el-dialog title="添加客服" :visible.sync="dialogTableVisible" width="80%">
          <!-- <div class="add-server-dialog"> -->
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
          <!-- </div> -->
        </el-dialog>
      </div>
      <charactor-table :table-data="tableData" />
    </div>
  </div>
</template>

<script>
import charactorTable from './components/charactorTable'
import { queryStaffList } from '@/api/customer-service'
export default {
  components: {
    charactorTable
  },
  props: {},
  data() {
    return {
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
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }
      ],
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
  created() {
    this.queryStaffList()
  },
  methods: {
    queryStaffList() {
      queryStaffList().then(res => {
        console.log('res', res)
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
