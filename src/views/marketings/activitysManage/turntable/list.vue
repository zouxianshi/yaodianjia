<template>
  <div class="app-container turntable-index-model">
    <el-button
      type="primary"
      size="mini"
      @click="() => $router.push({path:'/marketings/activity-manage/turntable/add'})"
    >新建活动</el-button>
    <div class="explain">
      <!-- <el-alert
        title="领券中心可自由上架及下架优惠券，领券中心的优惠上架后用户可手工领取，您可根据活动营销方案定期上架以保持用户活跃"
        type="warning"
        :closable="false"
      />-->
    </div>
    <div class="search-form">
      <div class="search-item">
        <div class="search-item">
          <span class="label-name" style="width:100px">状态：</span>
          <el-select v-model="region" placeholder="活动区域">
            <el-option label="全部" value />
            <el-option label="进行中" value="1" />
            <el-option label="未开始" value="2" />
            <el-option label="已结束" value="3" />
          </el-select>
        </div>
        <div class="search-item">
          <span class="label-name" style="width:100px">参与门店</span>
          <el-select v-model="storeCode" placeholder="参与门店">
            <el-option
              v-for="item in storeData"
              :key="item.id"
              :label="item.stName"
              :value="item.stCode"
            />
          </el-select>
        </div>
        <span class="label-name" style="width:100px">活动名称：</span>
        <el-input v-model.trim="keyword" size="small" placeholder="请输入关键字" />
      </div>
      <div class="search-item">
        <el-button type="primary" size="small" @click="getData">查询</el-button>
      </div>
      <div class="search-item">
        <!-- <el-button type="primary" size="small" @click="exportFun">
          导出
          <i class="el-icon-download el-icon--right" />
        </el-button>-->
      </div>
    </div>
    <el-table v-loading="show" :data="tableData" style="width: 100%" empty-text="大转盘暂未上架任何活动">
      <el-table-column prop="date" label="活动类型" width="120">
        <template slot-scope="scope">
          <div>{{ scope.row.activityDetailName }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="activityDetailName" label="活动名称" />
      <el-table-column label="活动方式">
        <template slot-scope="scope">
          <div>{{ scope.row.joinRule.toString()==='0'?'渠道':'' || scope.row.joinRule.toString()==='1'?'免费参与':'' || scope.row.joinRule.toString()==='2'?'积分参与':'' || scope.row.joinRule.toString()==='3'?'活动参与':'' }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="beginTime" label="活动开始时间" />
      <el-table-column prop="endTime" label="活动结束时间" />
      <el-table-column label="时间状态">
        <template slot-scope="scope">
          <div>{{ scope.row.state.toString()==='1'?'进行中':'' || scope.row.state.toString()==='2'?'未开始':'' || scope.row.state.toString()==='3'?'已结束':'' }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="状态">
        <template slot-scope="scope">
          <div>{{ scope.row.status.toString()==='0'?'失效':'' || scope.row.status.toString()==='1'?'生效':'' }}</div>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="130">
        <template slot-scope="scope">
          <div style="display:flex">
            <el-button
              type="text"
              size="small"
              style="margin-right:5px"
              @click.native.prevent="selectChange(scope.$index, scope.row.options[0].value)"
            >{{ scope.row.options[0].label }}</el-button>
            <el-button
              v-if="scope.row.options.length === 2"
              type="text"
              size="small"
              style="margin-right:5px"
              @click.native.prevent="selectChange(scope.$index, scope.row.options[1].value)"
            >{{ scope.row.options[1].label }}</el-button>
            <el-select
              v-if="scope.row.options.length>2"
              v-model="scope.row.selectValue"
              size="mini"
              placeholder="更多"
              @change="selectChange(scope.$index,scope.row.selectValue)"
            >
              <el-option
                v-for="item in scope.row.options.slice(1)"
                :key="item.id"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="推广设置" append-to-body :visible.sync="dialogVisible" width="70%">
      <div style="text-align:center">
        <el-input v-model="input" placeholder="请输入内容" style="width:300px" />
        <el-button
          v-clipboard:error="onError"
          v-clipboard:copy="input"
          v-clipboard:success="onCopy"
          type="primary"
        >复制连接</el-button>
        <div>
          <!-- <img src alt /> -->
        </div>
        <el-button type="primary" plain @click="downloadIamge">下载二维码</el-button>
      </div>
    </el-dialog>
    <div class="block">
      <el-pagination
        :total="pageTotal"
        :current-page="currentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>
<script>
// import _ from 'lodash'
import VueClipboard from 'vue-clipboard2'
import Vue from 'vue'
Vue.use(VueClipboard)
import {
  normalActivityList,
  setNormalActivity,
  queryStoreByOrgId
} from '@/api/coupon'
import { mapGetters } from 'vuex'
export default {
  name: 'TurntableIndex',
  components: {},
  props: {},
  data() {
    return {
      input: '11',
      pageTotal: 1,
      currentPage: 1,
      pageSize: 10,
      region: '',
      keyword: '',
      tableData: [],
      storeData: [{ id: '0', stName: '全部', stCode: '' }],
      storeCode: '',
      dialogVisible: false,
      show: false
    }
  },
  computed: {
    ...mapGetters(['merCode'])
  },
  watch: {},
  beforeCreate() {},
  created() {
    this.getData()
    this.getStore()
  },
  beforeMount() {},
  mounted() {},
  beforeUpdate() {},
  updated() {},
  beforeDestroy() {},
  destroyed() {},
  methods: {
    // 下载二维码
    downloadIamge() {
      var alink = document.createElement('a')
      alink.href = this.programData.programImg
      alink.download = 'pic' // 图片名
      alink.click()
    },
    onCopy(e) {
      this.$message({
        message: '复制成功！',
        type: 'success'
      })
    },
    // 复制失败
    onError(e) {
      this.$message({
        message: '复制失败！',
        type: 'error'
      })
    },
    getData() {
      this.show = true
      const p = {
        activeName: this.keyword,
        activityTemplateCode: this.$route.query.code,
        currentPage: this.currentPage,
        pageSize: this.pageSize,
        state: this.region,
        storeCode: this.storeCode
      }
      normalActivityList(p).then(res => {
        this.tableData = res.data.records
        for (const i of this.tableData) {
          this.$set(i, 'selectValue', '')
          const state = i.state // 状态
          const status = i.status // 生效
          if (state === 1 && status === 1) {
            i.options = [
              {
                id: 2,
                value: '2',
                label: '编辑'
              },
              {
                id: 3,
                value: '3',
                label: '失效'
              },
              {
                id: 4,
                value: '4',
                label: '推广'
              }
            ]
          } else if (state === 2 && status === 1) {
            i.options = [
              {
                id: 5,
                value: '2',
                label: '编辑'
              },
              {
                id: 6,
                value: '5',
                label: '删除'
              },
              {
                id: 7,
                value: '4',
                label: '推广'
              }
            ]
          } else if (
            (state === 3 && status === 1) ||
            (state === 1 && status === 0) ||
            (state === 2 && status === 0) ||
            (state === 3 && status === 0)
          ) {
            i.options = [
              {
                id: 8,
                value: '1',
                label: '查看'
              },
              {
                id: 9,
                value: '5',
                label: '删除'
              }
            ]
          }
        }
        this.pageTotal = res.data.total
        this.show = false
      })
    },
    getStore() {
      const param = {
        currentPage: 1,
        merCode: this.merCode,
        orgId: '',
        pageSize: 9999,
        storeProperty: ''
      }
      queryStoreByOrgId(param)
        .then(res => {
          console.log('_loadStoresList-------', res)
          res.data.data.map(st => {
            this.storeData.push({
              stCode: st.stCode,
              stName: st.stName,
              id: st.id
            })
          })
        })
        .catch(() => {})
    },
    selectChange(index, val) {
      console.log(index, val)
      if (val === '5') {
        this.$confirm('删除该活动, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            const p = {
              id: this.tableData[index].id,
              state: 1
            }
            setNormalActivity(p).then(res => {
              if (res.code === '10000') {
                this.$message({
                  message: res.msg,
                  type: 'success',
                  duration: 5 * 1000
                })
              }
              this.currentPage = 1
              this.getData()
            })
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            })
          })
      } else if (val === '3') {
        const p = {
          id: this.tableData[index].id,
          state: 2
        }
        setNormalActivity(p).then(res => {
          if (res.code === '10000') {
            this.$message({
              message: res.msg,
              type: 'success',
              duration: 5 * 1000
            })
            this.currentPage = 1
            this.getData()
          }
        })
      } else if (val === '4') {
        this.dialogVisible = true
      } else if (val === '2' || val === '1') {
        // 编辑或查看
        this.$router.push({ path: '/marketings/activity-manage/turntable/add' })
      }
    },
    changeOption(val) {
      console.log(val)
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.currentPage = 1
      this.getData()
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.getData()
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss">
.turntable-index-model {
  .explain {
    margin: 20px 0;
    font-size: 13px;
  }
  .el-table--medium th,
  // .el-table--medium td {
  //   padding: 2px;
  // }
  // .el-table thead th {
  //   height: 50px;
  // }
  .search-form {
    margin-top: 10px;
    .search-item {
      .el-input {
        width: 180px;
      }
    }
  }
  .block {
    margin-top: 30px;
  }
  .el-pagination {
    text-align: right;
  }
}
</style>
