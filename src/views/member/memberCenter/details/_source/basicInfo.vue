<template>
  <div class="basic-info-model">
    <el-card class="box-card" :body-style="{padding:'0px'}">
      <div class="content-items">
        <div class="content-header">
          <mItemTitle title="基础信息" />
        </div>
        <div class="content-body">
          <div class="content-body-items">
            <el-form label-position="right" label-width="100px" :model="basicInfo">
              <el-form-item label="微信头像：">
                <img v-if="basicInfo.headUrl" :src="basicInfo.headUrl">
                <span v-else>未上传</span>
              </el-form-item>
              <el-form-item label="会员名称：">
                <span>{{ basicInfo.memberName || '-' }}</span>
              </el-form-item>
              <el-form-item label="昵称：">
                <span>{{ basicInfo.nickName || '-' }}</span>
              </el-form-item>
              <el-form-item label="性别：">
                <span v-if="basicInfo.memberSex === 0">其他</span>
                <span v-if="basicInfo.memberSex === 1">男</span>
                <span v-if="basicInfo.memberSex === 2">女</span>
              </el-form-item>
              <el-form-item label="生日：">
                <span>{{ basicInfo.memberBirthday || '-' }}</span>
              </el-form-item>
              <el-form-item label="身份证号：">
                <span>{{ basicInfo.memberIdcard || '-' }}</span>
              </el-form-item>
              <el-form-item label="手机号：">
                <span>{{ basicInfo.memberPhone || '-' }}</span>
              </el-form-item>
              <el-form-item label="收货地址：">
                <span>{{ basicInfo.memberAddress || '-' }}</span>
              </el-form-item>
            </el-form>
          </div>
          <div class="content-body-items">
            <el-form label-position="right" label-width="120px" :model="basicInfo">
              <el-form-item label="">
                <div v-if="basicInfo.headUrl" style="height:60px" />
                <div v-else style="height:36px" />
              </el-form-item>
              <el-form-item label="会员卡号：">
                <span>{{ basicInfo.memberCard || '-' }}</span>
              </el-form-item>
              <el-form-item label="健康豆：">
                <span>{{ basicInfo.onlineIntegral }}</span>
                <span class="more-info">
                  <el-button type="primary" plain size="mini" @click="tailsBeans">查看明细</el-button>
                </span>
              </el-form-item>
              <el-form-item label="会员等级：">
                <span v-if="basicInfo.memberActive === 1">普通会员</span>
                <span v-if="basicInfo.memberActive === 2">新增会员</span>
                <span v-if="basicInfo.memberActive === 3">优质会员</span>
                <span v-if="basicInfo.memberActive === 4">活跃会员</span>
                <span v-if="basicInfo.memberActive === 9">沉寂会员</span>
              </el-form-item>
              <el-form-item label="所属门店：">
                <span>{{ basicInfo.organization || '-' }}</span>
              </el-form-item>
              <el-form-item label="注册来源：">
                <span v-if="basicInfo.registerSource === 1">门店推荐注册</span>
                <span v-if="basicInfo.registerSource === 2">员工推荐注册</span>
                <span v-if="basicInfo.registerSource === 3">商户渠道注册</span>
                <span v-if="basicInfo.registerSource === 4">平台渠道注册</span>
                <span v-if="basicInfo.registerSource === 5">支付即会员</span>
              </el-form-item>
              <el-form-item label="注册时间：">
                <span>{{ basicInfo.createTime }}</span>
              </el-form-item>
              <el-form-item label="默认发卡机构：">
                <span>{{ basicInfo.organization || '-' }}</span>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>
    </el-card>
    <el-card class="box-card" :body-style="{padding:'0px'}">
      <div class="content-items">
        <div class="content-header">
          <mItemTitle title="健康顾问" />
        </div>
        <div class="content-body">
          <el-table v-loading="loading" :data="tableData" border style="width: 100%">
            <el-table-column label="姓名" width="180">
              <template slot-scope="scope">
                {{ scope.row.emName || '-' }}
              </template>
            </el-table-column>
            <el-table-column label="所属门店">
              <template slot-scope="scope">
                {{ scope.row.storeName || '-' }}
              </template>
            </el-table-column>
            <el-table-column prop="createDate" label="添加时间" />
          </el-table>
        </div>
        <div class="pagination">
          <el-pagination
            background
            layout="prev, pager, next"
            :page-size="searchParams.pageSize"
            :current-page="searchParams.currentPage"
            :total="totalCount"
            @current-change="onChange"
          />
        </div>
      </div>
    </el-card>
    <m-popBeans-details ref="A" />
  </div>
</template>
<script>
import mItemTitle from './itemTitle.vue'
import mPopBeansDetails from '../../../_source/popBeansDetails'
import { queryOnlineIntegra, queryHealthConsultants, menberBaseInfo } from '@/api/memberService'
export default {
  name: 'BasicInfo',
  components: { mItemTitle, mPopBeansDetails },
  props: {},
  data() {
    return {
      loading: false, // 表格加载中
      searchParams: {
        currentPage: 1,
        pageSize: 8,
        userId: this.$route.query.userId
      },
      beanTotalNum: 0,
      totalCount: 0,
      basicInfo: {
      },
      tableData: []
    }
  },
  created() {
    this.searchParams.userId = this.$route.query.userId || '1'
    this.queryBaseInfo()
    this.queryHealthData()
  },
  methods: {
    onChange(v) {
      this.searchParams.currentPage = v
      this.queryHealthData()
    },
    // 查看健康豆详情
    tailsBeans() {
      var params = {
        'currentPage': 1,
        'pageSize': 10,
        'userId': this.$route.query.userId
      }
      queryOnlineIntegra(params).then(res => {
        this.$refs.A.changeDia(res.data, this.$route.query.userId, this.beanTotalNum)
      })
    },
    // 查询会员基本信息
    queryBaseInfo() {
      var params = {
        userId: this.searchParams.userId,
        merCode: this.$store.state.user.merCode
      }
      menberBaseInfo(params).then(res => {
        this.basicInfo = res.data
        this.beanTotalNum = res.data.onlineIntegral || 10
        sessionStorage.setItem('mem_username', res.data.memberName)
      })
    },
    // 查询会员的健康顾问
    queryHealthData() {
      var params = {
        currentPage: this.searchParams.currentPage,
        pageSize: this.searchParams.pageSize,
        userId: this.searchParams.userId
      }
      this.loading = true
      queryHealthConsultants(params).then(res => {
        this.loading = false
        if (res.data && res.data.data) {
          this.totalCount = res.data.totalCount
          this.tableData = res.data.data
        }
      })
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss">
.basic-info-model{
  padding: 20px 20px 0 20px;
  .box-card {
    margin-bottom: 20px;
  }
  .content-items{
    border-radius: 4px;
    img{
      width: 60px;height: 60px;margin: 0;vertical-align: middle;
    }
    .content-body{
      display: flex;padding: 20px;justify-content: space-between;min-height: 200px;
      .content-body-items{
        flex: 0 0 45%;
        .more-info{
          color: #1890FF;cursor: pointer;font-size: 12px;
        }
      }
    }
    .pagination{
      text-align: right;
      padding:0 20px 20px 20px;
    }
  }
  .el-form-item{
    margin-bottom: 5px;
  }
  .el-table__header tr,
  .el-table__header th {
    padding: 0;
    height: 40px;
  }
}
</style>
