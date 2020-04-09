<template>
  <div class="health-info-model">
    <el-card class="box-card" :body-style="{padding:'0px'}">
      <div class="content-items">
        <div class="content-header">
          <mItemTitle title="基础档案" />
        </div>
        <div class="content-body">
          <div class="content-body-items">
            <el-form label-position="top" label-width="100px" :model="basicInfo">
              <el-form-item label="会员名称：">
                <span>{{ basicInfo.name }}</span>
              </el-form-item>
              <el-form-item label="用药禁忌：">
                <span>{{ basicInfo.contrainDications }}</span>
              </el-form-item>
              <el-form-item label="过敏史：">
                <m-border-items v-for="(items, index) in basicInfo.allergyHistory" :key="index" :value="items" />
              </el-form-item>
              <el-form-item label="易感病症：">
                <m-border-items v-for="(items, index) in basicInfo.ygbz" :key="index" :value="items" />
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
    </el-card>
    <el-card class="box-card" :body-style="{padding:'0px'}">
      <div class="content-items">
        <div class="content-header">
          <mItemTitle title="健康状态" />
        </div>
        <div class="content-body">
          <el-table
            :data="tableData"
            border
            style="width: 100%"
          >
            <el-table-column
              prop="emName"
              label="事件名称"
            />
            <el-table-column
              prop="createDate"
              label="创建时间"
            />
            <el-table-column
              prop="desc"
              label="病症描述"
            />
            <el-table-column
              label="操作"
              align="center"
              width="100"
            >
              <template slot-scope="scope">
                <el-button type="text" size="small" @click="popHealth(scope.row)">查看</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="pagination">
          <el-pagination
            background
            layout="prev, pager, next"
            :total="1000"
            :page-size="pageInfo.pageSize"
            :current-page="pageInfo.currentPage"
            @current-change="pageChange"
          />
        </div>
      </div>
    </el-card>
    <m-pop-health-detail ref="popHealth" />
  </div>
</template>
<script>
import mItemTitle from './itemTitle' // 标题
import mBorderItems from './borderItems' // tag标签
import { queryHealthConsultants } from '@/api/memberService'
import mPopHealthDetail from './popHealthDetail' // 健康状态详情
export default {
  name: 'BasicInfo',
  components: { mItemTitle, mBorderItems, mPopHealthDetail },
  props: {},
  data() {
    return {
      basicInfo: {
        name: '张三',
        contrainDications: '慎用阿奇霉素；禁用青霉素',
        allergyHistory: ['花生', '青霉素'],
        ygbz: ['过敏性鼻炎']
      },
      totalCont: '0',
      pageInfo: {
        'currentPage': 1,
        'pageSize': 10,
        'userId': this.$route.query.userId
      },
      tableData: []
    }
  },
  created() {
    this.queryHealthData(this.pageInfo.currentPage, this.pageInfo.pageSize, this.pageInfo.userId)
  },
  methods: {
    queryHealthData(currentPage, pageSize, userId) {
      var params = {
        currentPage: currentPage,
        pageSize: pageSize,
        userId: userId
      }
      queryHealthConsultants(params).then(res => {
        if (res.data) {
          this.tableData = res.data.data
          this.totalCont = this.tableData.length | 0
        }
      })
    },
    pageChange(e) {
      console.log(e)
    },
    // 查看健康豆详情
    popHealth(ids) {
      console.log(ids)
      this.$refs.popHealth.openDetail(ids)
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss">
.health-info-model{
  width: 96%;margin: 20px auto;
  .box-card {
    margin-bottom: 20px;
  }
  .content-items{
    border-radius: 2px;background-color: #fff;
    img{
      width: 60px;height: 60px;margin: 0;vertical-align: middle;
    }
    .content-body{
      display: flex;padding: 20px 8% 10px;justify-content: space-between;min-height: 200px;
      .content-body-items{
        flex: 0 0 45%;
        .more-info{
          color: #1890FF;margin-left: 30px;cursor: pointer;font-size: 12px;
        }
      }
    }
    .pagination{
      text-align: right;padding: 10px 7%;
    }
  }
  .el-form-item{
    margin-bottom: 5px;
  }
  .el-form--label-top .el-form-item__label{
    padding: 0;
  }
  .el-table__header tr,
  .el-table__header th {
    padding: 0;
    height: 40px;
  }
}
</style>
