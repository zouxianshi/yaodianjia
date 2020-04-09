<template>
  <div class="mc-list-model">
    <div class="header-title">
      会员列表
    </div>
    <div class="body-content">
      <div v-show="conditions" class="conditions-content">
        <m-conditions ref="conditionsA" />
      </div>
      <div class="showBtn">
        <el-button type="text" size="mini" @click="toggelCoditions">
          <span v-if="conditions">收起 <i class="el-icon-arrow-up" /></span>
          <span v-else>展开 <i class="el-icon-arrow-down" /></span>
        </el-button>
      </div>
      <div class="_search">
        <el-form label-position="right" label-width="90px">
          <el-form-item label="会员搜索：">
            <el-input v-model="content" size="mini" style="width: 50%" placeholder="请输入会员姓名、手机号、卡号、身份证" />
          </el-form-item>
          <el-form-item label="">
            <el-button size="mini" type="primary" @click="getData()">查询</el-button>
            <el-button size="mini" @click="reSet()">重置</el-button>
            <el-button size="mini" type="primary">批量导出</el-button>
            <span class="tips">提示：批量导出功能最多一次导出5000条数据</span>
          </el-form-item>
        </el-form>
      </div>
      <m-tabel-list ref="listA" />
      <div class="pagination">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="pageInfo.totalCont"
          :page-size="pageInfo.pageSize"
          :current-page="pageInfo.currentPage"
          @current-change="pageChage"
        />
      </div>
    </div>
  </div>
</template>
<script>
import mTabelList from './_source/list' // 列表
import mConditions from './_source/conditions' // 条件
import { queryMembers } from '@/api/memberService'
import _ from 'lodash'
export default {
  name: 'McList',
  components: {
    mTabelList, mConditions
  },
  props: {},
  data() {
    return {
      conditions: true,
      content: '',
      pageInfo: {
        pageSize: 10,
        currentPage: 1,
        totalCont: 100
      }
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    toggelCoditions() { // 切换选项隐藏/显示
      this.conditions = !this.conditions
    },
    // 获取列表数据
    getData() {
      var params = _.cloneDeep(this.$refs.conditionsA.conditions)
      var choosedEmpCodesArr = this.$refs.conditionsA.choosedEmpCodesArr // 已选择顾问
      var choosedOrganizationsArr = this.$refs.conditionsA.choosedOrganizationsArr // 已选择门店
      params.currentPage = this.pageInfo.currentPage
      params.pageSize = this.pageInfo.pageSize
      params.content = this.content
      // 如果顾问为选择顾问
      if (params.empCodes === '1') {
        var arr = []
        choosedEmpCodesArr.map(items => {
          arr.push(items.empCode)
        })
        params.empCodes = arr
      }
      // 如果门店参数为选择门店
      if (params.organizations === '1') {
        var arr2 = []
        choosedOrganizationsArr.map(items => {
          arr2.push(items.storeId)
        })
        params.organizations = arr2
      }
      this.$refs.listA.loading = true
      queryMembers(params).then(res => {
        if (res.data && res.data.data) {
          this.pageInfo.totalCont = res.data.totalCount
          this.$refs.listA.dataFromIndex(res.data.data)
        } else {
          this.pageInfo.totalCont = 0
          this.$refs.listA.dataFromIndex([])
        }
      })
    },
    // 页面切换
    pageChage(e) {
      this.pageInfo.currentPage = e
      this.getData()
    },
    // 重置查询条件
    reSet() {
      this.$refs.conditionsA.resetParams() // 重置条件
      this.content = ''
      this.pageInfo = {
        pageSize: 10,
        currentPage: 1,
        totalCont: 0
      }
      this.getData() // 查询数据
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss">
  .mc-list-model {
    background-color: #F7F7F7;height: calc(100vh - 160px);
    .header-title{
      background-color: #fff;height: 60px;line-height: 60px;padding: 0 2%;
      font-size: 18px;font-weight: bold;
    }
    .body-content{
      background-color: #fff;height: calc(100vh - 260px);overflow-y: auto;
      width: 96%; margin: 20px auto;padding: 20px;
      .showBtn{
        border-bottom: 1px solid #eee;text-align: right;
        margin: 0 auto 20px;
      }
      ._search{
        .tips{
          font-size: 14px;color:rgba(0,0,0,0.45);margin-left: 20px;vertical-align: middle;
        }
      }
      // 分页
      .pagination{
        text-align: right;padding: 10px 0;margin-top: 10px;
      }
    }
  }
</style>
