<template>
  <div class="exchange-modal">
    <div class="conditions">
      <el-button type="primary" size="small">
        <i class="el-icon-circle-plus-outline" /> 新增商品
      </el-button>
      <div class="search">
        商品名称：
        <el-input size="mini" placeholder="商品名称" style="width:220px" />
        <el-button size="mini" type="primary">查询</el-button>
      </div>
    </div>
    <el-table :data="tableData" border style="width: 100%" empty-text="未添加积分商品">
      <el-table-column prop="activitySpecDTO.erpCode" label="商品编码" />
      <el-table-column label="商品图片" width="120" align="center">
        <template slot-scope="scope">
          <img :src="showImgHandler(scope.row.activitySpecDTO.picUrl)" style="height:70px;margin:0">
        </template>
      </el-table-column>
      <el-table-column prop="activitySpecDTO.name" label="商品名称" />
      <el-table-column prop="activitySpecDTO.mprice" label="参考价（元）" />
      <el-table-column prop="activitySpecDTO.addPrice" label="兑换价格" />
      <el-table-column>
        <template slot="header">
          <div>
            库存
            <el-tooltip effect="dark" content="每个门店的可兑换库存总量" placement="top-start">
              <i class="el-icon-question" />
            </el-tooltip>
          </div>
        </template>
        <template slot-scope="scope">
          {{ scope.row.activityDetail ? scope.row.activityDetail.ruleList[0].leftAmount : '-' }}
        </template>
      </el-table-column>
      <el-table-column prop="name">
        <template slot="header">
          <div>
            已兑换总数
            <el-tooltip effect="dark" content="每个门店的已兑换的总量" placement="top-start">
              <i class="el-icon-question" />
            </el-tooltip>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="validStatus" label="状态" />
      <el-table-column prop="name" label="操作" width="150">
        <template slot-scope="scope">
          <el-button size="mini" @click="edit(scope.row)">编辑</el-button>
          <el-button size="mini" @click="edit(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <el-pagination
        :current-page="pageInfo.currentPage"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="pageInfo.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalCount"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>
<script>
import { searchExchangeList } from '@/api/exchangeMall'
export default {
  data() {
    return {
      tableData: [
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }
      ],
      pageInfo: {
        currentPage: 1,
        pageSize: 10
      },
      totalCount: 0,
      searchParams: {
        hasSpec: true
      }
    }
  },
  created() {
    this.getTabelData()
  },
  methods: {
    edit(data) {
      console.log(data)
    },
    // 获取表格数据
    getTabelData() {
      var parmas = Object.assign({}, this.searchParams, this.pageInfo)
      searchExchangeList(parmas).then(res => {
        console.log(res)
        if (res.data) {
          const datas = res.data
          this.totalCount = datas.totalCount
          this.tableData = datas.data
        }
      }).catch(err => {
        console.log(err)
      })
    },
    handleSizeChange(e) {

    },
    handleCurrentChange(e) {

    }
  }
}
</script>
<style scoped lang="scss">
.exchange-modal {
  .conditions {
    .search {
      margin: 20px 0;
    }
  }
  .pagination{
    margin-top: 20px;
    text-align: right;
  }
}
</style>
