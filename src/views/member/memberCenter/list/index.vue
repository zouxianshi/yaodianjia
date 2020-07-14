<template>
  <div class="mc-list-model app-container">
    <div class="header-title">会员列表</div>
    <div class="body-content">
      <div v-show="conditions" class="conditions-content">
        <m-conditions ref="conditionsA" />
      </div>
      <div class="showBtn">
        <el-button type="text" size="mini" @click="toggelCoditions">
          <span v-if="conditions">
            收起
            <i class="el-icon-arrow-up" />
          </span>
          <span v-else>
            展开
            <i class="el-icon-arrow-down" />
          </span>
        </el-button>
      </div>
      <div class="_search">
        <el-form label-position="right" label-width="90px">
          <el-form-item label="会员搜索：">
            <el-input
              v-model="content"
              size="mini"
              style="width: 50%"
              placeholder="请输入会员姓名、手机号、卡号、身份证"
            />
          </el-form-item>
          <el-form-item label>
            <el-button size="mini" type="primary" :loading="loading" @click="getDatasss('查询')">查询</el-button>
            <el-button size="mini" @click="reSet()">重置</el-button>
            <el-button
              size="mini"
              type="primary"
              style="margin-right:10px"
              :disabled="isNodatas"
              @click="exportTabel()"
            >
              批量导出
              <i class="el-icon-download el-icon--right" />
            </el-button>
            <exportTable />
            <span class="tips">提示：批量导出功能最多一次导出50000条数据</span>
          </el-form-item>
        </el-form>
      </div>
      <m-tabel-list ref="listA" @getData="getData" />
      <div class="pagination">
        <el-pagination
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
import { queryMembers, exportMembers } from '@/api/memberService'
import exportTable from './_source/export-table' // 导出
import _ from 'lodash'
export default {
  name: 'McList',
  components: {
    mTabelList,
    mConditions,
    exportTable
  },
  props: {},
  data() {
    return {
      conditions: true,
      content: '',
      loading: false,
      isNoData: false,
      paramsBac: {

      },
      pageInfo: {
        pageSize: 10,
        currentPage: 1,
        totalCont: 100
      }
    }
  },
  computed: {
    isNodatas() {
      return this.isNoData
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    toggelCoditions() {
      // 切换选项隐藏/显示
      this.conditions = !this.conditions
    },
    getDatasss(val) {
      this.pageInfo.currentPage = 1
      this.getData(val)
    },
    // 获取列表数据
    getData(val) {
      if ( val === '查询' && Number(this.$refs.conditionsA.conditions.organizations) === 1 && this.$refs.conditionsA.choosedOrganizationsArr.length === 0) {
        this.$message({ type: 'warning', message: '请选择门店' })
      } else {
        var params = _.cloneDeep(this.$refs.conditionsA.conditions)
        // console.log(params)
        let choosedOrganizationsArr = this.$refs.conditionsA.choosedOrganizationsArr // 已选择门店
        let choosedEmployee = this.$refs.conditionsA.choosedEmployee // 已选择推荐员工
        let choosedEmpSto = this.$refs.conditionsA.choosedEmpSto // 已选择推荐门店
        params.currentPage = this.pageInfo.currentPage
        params.pageSize = this.pageInfo.pageSize
        params.content = this.content
        // 如果推荐来源为推荐门店或推荐员工
        if (params.regLy === '1') { // 推荐门店
          var arr = []
          choosedEmpSto.map(items => {
            arr.push(items.stCode)
          })
          params.regMedium = arr
        } else if (params.regLy === '2') {
          let arr = []
          choosedEmployee.map(items => {
            arr.push(items.empCode)
          })
          params.regMedium = arr
        }
        // 如果门店参数为选择门店
        if (params.organizations === '1') {
          var arr2 = []
          choosedOrganizationsArr.map(items => {
            arr2.push(items.stCode)
          })
          params.organizations = arr2
        }
        this.$refs.listA.loading = true // 列表加载中
        this.loading = true // 按钮加载
        queryMembers(params).then(res => {
          this.isNoData = true
          this.loading = false
          this.paramsBac = params
          if (res.data && res.data.data) {
            if (res.data.data.length > 0) {
              this.isNoData = false
            }
            this.pageInfo.totalCont = res.data.totalCount
            this.$refs.listA.dataFromIndex(res.data.data)
          } else {
            this.pageInfo.totalCont = 0
            this.$refs.listA.dataFromIndex([])
          }
        })
      }
    },
    // 页面切换
    pageChage(e) {
      this.pageInfo.currentPage = e
      this.getData()
    },
    // 导出会员
    exportTabel() {
      var params = _.cloneDeep(this.paramsBac)
      params.pageSize = 50000
      params.currentPage = 1
      exportMembers(params).then(res => {
        if (res.code === '10000') {
          this.$alert(
            '会员列表正在导出中，稍后请点击【查看并导出记录】下载导出文件',
            '会员导出',
            {
              confirmButtonText: '好的',
              center: true,
              roundButton: true,
              confirmButtonClass: 'hydee_alert_btn'
            }
          )
        }
      })
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
  .header-title {
    background-color: #fff;
    font-size: 18px;
    font-weight: bold;
  }
  .body-content {
    background-color: #fff;
    .showBtn {
      border-bottom: 1px solid #eee;
      text-align: right;
      margin: 0 auto 20px;
    }
    ._search {
      .tips {
        font-size: 14px;
        color: rgba(0, 0, 0, 0.45);
        margin-left: 20px;
        vertical-align: middle;
      }
    }
    // 分页
    .pagination {
      text-align: right;
      position: relative;
      top: 20px;
    }
  }
}
</style>
