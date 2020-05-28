<template>
  <div class="app-container exchange-modal">
    <div class="conditions">
      <el-button type="primary" size="small" @click="$router.push('/activity/exchangeMallAdd')">
        <i class="el-icon-circle-plus-outline" /> 新增商品
      </el-button>
      <div class="search">
        商品名称：
        <el-input v-model="searchName" size="mini" placeholder="商品名称" style="width:220px" />
        <el-button size="mini" type="primary" @click="searchList">查询</el-button>
      </div>
    </div>
    <el-table :data="tableData" border style="width: 100%" empty-text="未添加积分商品">
      <el-table-column prop="activitySpecDTO.erpCode" label="商品编码" />
      <el-table-column label="商品图片" width="120" align="center">
        <template slot-scope="scope">
          <el-image
            style="width: 70px;"
            fit="contain"
            :src="showImg(scope.row.picUrl)"
            :preview-src-list="[showImg(scope.row.picUrl)]"
          />
        </template>
      </el-table-column>
      <el-table-column prop="activitySpecDTO.name" label="商品名称" />
      <el-table-column prop="activitySpecDTO.mprice" label="参考价（元）" />
      <el-table-column label="兑换价格">
        <template slot-scope="scope">
          {{ scope.row.activityDetail.ruleList[0].exchangePrice }}元 + {{ scope.row.activityDetail.ruleList[0].exchangeHb }}海贝
        </template>
      </el-table-column>
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
          {{ scope.row.activityDetail ? scope.row.activityDetail.ruleList[0].totalAmount : '-' }}
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
        <template slot-scope="scope">
          {{ scope.row.activityDetail ? scope.row.activityDetail.ruleList[0].totalAmount - scope.row.activityDetail.ruleList[0].leftAmount : '-' }}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="160">
        <template slot-scope="scope">
          <div class="opca">
            <el-button size="mini" @click="edit(scope.row)">{{ scope.row.status ? '查看': '编辑' }}</el-button>
            <el-button size="mini" :disabled="scope.row.status" @click="onDeletes(scope.row)">删除</el-button>
            <el-button size="mini" @click="changeStatus(scope.row)">{{ scope.row.status ? '失效': '生效' }}</el-button>
          </div>
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
import { searchExchangeList, deleteExchange, failureExchange } from '@/api/exchangeMall'
export default {
  data() {
    return {
      searchName: '',
      tableData: [

      ],
      pageInfo: {
        currentPage: 1,
        pageSize: 10
      },
      totalCount: 0,
      searchParams: {
        hasSpec: true,
        hasRule: true,
        promotionType: 20
      }
    }
  },
  created() {
    this.getTabelData()
  },
  methods: {
    edit(data) {
      console.log(data)
      if (data.status) {
        this.$router.push(`/activity/exchangeMallAdd?id=${data.id}&type=ck`)
      } else {
        this.$router.push(`/activity/exchangeMallAdd?id=${data.id}&type=ed`)
      }
    },
    onDeletes(data) {
      console.log(data)
      const params = {
        id: data.id
      }
      deleteExchange(params).then(res => {
        console.log(res)
      })
    },
    changeStatus(data) {
      if (data.status) {
        const parmas = {
          id: data.id
        }
        failureExchange(parmas).then(res => {
          if (res.code === '10000') {
            this.$message({
              message: '操作成功！',
              type: 'success'
            })
            this.getTabelData()
          }
        })
      }
    },
    // 获取表格数据
    getTabelData() {
      var parmas = Object.assign({}, this.searchParams, this.pageInfo)
      if (this.searchName.trim()) {
        parmas.pmtName = this.searchName.trim()
      }
      searchExchangeList(parmas).then(res => {
        if (res.data) {
          const datas = res.data
          this.totalCount = datas.totalCount
          datas.data.map(item => {
            item.picUrl = item.activitySpecDTO.picUrl
          })
          this.tableData = datas.data
        }
      }).catch(err => {
        console.log(err)
      })
    },
    searchList() {
      this.getTabelData()
    },
    handleSizeChange(e) {
      this.pageInfo.pageSize = e
      this.getTabelData()
    },
    handleCurrentChange(e) {
      this.pageInfo.currentPage = e
      this.getTabelData()
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
  .opca{
    line-height: 40px;
    .el-button+.el-button{
      margin-left: 0;
    }
  }
}
</style>
