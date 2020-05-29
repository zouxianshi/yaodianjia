<template>
  <div class="app-container turntable-guagua-model">
    <el-button
      type="primary"
      size="mini"
      @click="() => $router.push({path:'/marketings/activity-manage/turntable/add', query: {code: this.$route.query.code }})"
    >新建活动</el-button>
    <div class="explain" />
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
      <div class="search-item" />
    </div>
    <el-table v-loading="show" :data="tableData" style="width: 100%" empty-text="刮刮乐暂未上架任何活动">
      <el-table-column prop="date" label="活动类型" width="120">
        <template>
          <div>刮刮乐</div>
        </template>
      </el-table-column>
      <el-table-column prop="activityDetailName" label="活动名称" />
      <el-table-column label="活动方式">
        <template slot-scope="scope">
          <div>{{ scope.row.joinRule.toString()==='0'?'渠道':'' || scope.row.joinRule.toString()==='1'?'免费参与':'' || scope.row.joinRule.toString()==='2'?'海贝参与':'' || scope.row.joinRule.toString()==='3'?'活动参与':'' }}</div>
        </template>
      </el-table-column>
      <el-table-column label="抽奖次数">
        <template slot-scope="scope">
          <div>{{ sweepstakes(scope.row.countType,scope.row.countRule) }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="beginTime" label="活动开始时间" />
      <el-table-column prop="endTime" label="活动结束时间" />
      <el-table-column label="时间状态" min-width="80" align="center">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.state.toString()==='2'" size="small" type="info">未开始</el-tag>
          <el-tag v-if="scope.row.state.toString()==='1'" size="small" type="success">进行中</el-tag>
          <el-tag v-if="scope.row.state.toString()==='3'" size="small" type="danger">已结束</el-tag>
          <!-- <div>{{ scope.row.state.toString()==='1'?'进行中':'' || scope.row.state.toString()==='2'?'未开始':'' || scope.row.state.toString()==='3'?'已结束':'' }}</div> -->
        </template>
      </el-table-column>
      <el-table-column prop="name" label="状态" min-width="80" align="center">
        <template slot-scope="scope">
          <div>
            <el-tag v-if="scope.row.status.toString()==='1'" size="small">生效</el-tag>
            <el-tag v-else size="small" type="danger">已失效</el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="150">
        <template slot-scope="scope">
          <div style="display:flex;font-size:16px;align-items: center">
            <el-button
              type="text"
              size="medium"
              style="margin-right:5px"
              @click.native.prevent="handleCommand(composeValue(scope.$index, scope.row.options[0].value))"
            >{{ scope.row.options[0].label }}</el-button>
            <span style="padding: 0px 10px; color: rgb(153, 153, 153);">|</span>
            <el-dropdown v-if="scope.row.options.length>2" size="medium" @command="handleCommand">
              <span class="el-dropdown-link">
                更多
                <i class="el-icon-arrow-down el-icon--right" />
              </span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item
                  v-for="item in scope.row.options.slice(1)"
                  :key="item.id"
                  :command="composeValue(scope.$index,item.value)"
                  :disabled="!item.isActive"
                >{{ item.label }}</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      title="推广设置"
      append-to-body
      :visible.sync="dialogVisible"
      :before-close="handleClose"
      width="70%"
    >
      <div style="text-align:center">
        <el-input v-model="input" placeholder="请输入内容" style="width:300px" />
        <el-button
          v-clipboard:error="onError"
          v-clipboard:copy="input"
          v-clipboard:success="onCopy"
          type="primary"
        >复制连接</el-button>
        <div v-loading="loading">
          <img :src="imageUrl" style="width:300px;height:300px">
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
  queryStoreByOrgId,
  queryQrCode
} from '@/api/coupon'
import { mapGetters } from 'vuex'
export default {
  name: 'TurntableIndex',
  components: {},
  props: {},
  data() {
    return {
      input: '',
      imageUrl: '',
      pageTotal: 1,
      currentPage: 1,
      pageSize: 10,
      region: '',
      keyword: '',
      tableData: [],
      storeData: [{ id: '0', stName: '全部', stCode: '' }],
      storeCode: '',
      dialogVisible: false,
      show: false,
      loading: false
    }
  },
  computed: {
    ...mapGetters(['merCode'])
  },
  created() {
    this.getData()
    this.getStore()
  },
  methods: {
    sweepstakes(countType, countRule) {
      if (Number(countType) === 1) {
        if (Number(countRule) === 0) {
          return `每人可抽不限次数`
        } else {
          return `每人可抽${countRule}次`
        }
      } else {
        if (Number(countRule) === 0) {
          return `每天可抽不限次数`
        } else {
          return `每天可抽${countRule}次`
        }
      }
    },
    composeValue(index, val) {
      return {
        index: index,
        val: val
      }
    },
    handleClose() {
      this.input = ''
      this.imageUrl = ''
      this.dialogVisible = false
    },
    // 下载二维码
    downloadIamge() {
      var alink = document.createElement('a')
      alink.href = this.imageUrl
      alink.download = 'qrCode' // 图片名
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
                label: '编辑',
                isActive: true
              },
              {
                id: 3,
                value: '3',
                label: '失效',
                isActive: true
              },
              {
                id: 4,
                value: '4',
                label: '推广',
                isActive: true
              },
              {
                id: 5,
                value: '5',
                label: '删除',
                isActive: false
              }
            ]
          } else if (state === 2 && status === 1) {
            i.options = [
              {
                id: 2,
                value: '2',
                label: '编辑',
                isActive: true
              },
              {
                id: 3,
                value: '3',
                label: '失效',
                isActive: false
              },
              {
                id: 4,
                value: '4',
                label: '推广',
                isActive: true
              },
              {
                id: 5,
                value: '5',
                label: '删除',
                isActive: true
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
                id: 1,
                value: '1',
                label: '查看',
                isActive: true
              },
              {
                id: 3,
                value: '3',
                label: '失效',
                isActive: false
              },
              {
                id: 4,
                value: '4',
                label: '推广',
                isActive: false
              },
              {
                id: 5,
                value: '5',
                label: '删除',
                isActive: true
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
    handleCommand(command) {
      console.log(command)
      if (command.val === '5') {
        this.$confirm('确认删除吗, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            const p = {
              id: this.tableData[command.index].id,
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
      } else if (command.val === '3') {
        this.$confirm('该活动失效, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            const p = {
              id: this.tableData[command.index].id,
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
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            })
          })
      } else if (command.val === '4') {
        this.dialogVisible = true
        this.loading = true
        const p = {
          activityId: this.tableData[command.index].id,
          type: 1
        }
        queryQrCode(p).then(res => {
          if (res.code === '10000') {
            this.input = res.data.qrcodeUrl
            this.imageUrl = res.data.qrCodeImg
            this.loading = false
          }
        })
      } else if (command.val === '2' || command.val === '1') {
        // 编辑或查看
        this.$router.push({
          path: '/marketings/activity-manage/turntable/add',
          query: {
            id: this.tableData[command.index].id,
            code: this.$route.query.code
          }
        })
      }
    },
    selectChange(index, val) {},
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
.turntable-guagua-model {
  .explain {
    margin: 20px 0;
    font-size: 13px;
  }
  .el-dropdown {
    font-size: 14px;
    color: #147de8;
  }
  .el-table--medium th,
  .el-dropdown-link {
    cursor: pointer;
  }
  .el-icon-arrow-down {
    font-size: 12px;
  }
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
