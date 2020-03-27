<template>
  <div class="app-container">
    <div class="mate-wrapper">
      <div class="mate-info">
        <ul class="product-box">
          <li class="product-list">
            <p class="title">当前产品</p>
            <p v-if="pairData.erpCode" class="title">ERP编码：{{ pairData.erpCode }}</p>
            <span class="line-status" />
            <div class="info">
              <p>名称：<span class="word-txt" v-text="pairData.name" /></p>
              <p>规格：<span class="word-txt" v-text="pairData.packStandard" /></p>
              <p>企业：<span class="word-txt" v-text="pairData.manufacture" /></p>
              <p>条码：<span class="word-txt" v-text="pairData.barCode" /></p>
              <p>批准文号：<span class="word-txt" v-text="pairData.approvalNumber" /></p>
            </div>
          </li>
          <li class="product-list">
            <p class="title">
              当前所选药店加平台库产品</p>
            <p class="title">&nbsp;</p>
            <span class="line-status" />
            <div class="info">
              <p>名称：<span v-if="currentRow" :class="{'yellow-bg':currentRow.name&&currentRow.name!==pairData.name}" v-text="currentRow.name" /></p>
              <div class="specs-item">
                <span>规格：</span>
                <div>
                  <p v-for="(item,index) in currentRow.specSkuList" :key="index"> {{ item.skuKeyName }}：{{ item.skuValue }}</p>
                </div>
              </div>
              <p>企业：<span v-if="currentRow" class="word-txt" :class="{'yellow-bg':currentRow.manufacture&&currentRow.manufacture!==pairData.manufacture}" v-text="currentRow.manufacture" /></p>
              <p>条码：<span v-if="currentRow" class="word-txt" :class="{'yellow-bg':currentRow.barCode&&currentRow.barCode!==pairData.barCode}" v-text="currentRow.barCode" /></p>
              <p>批准文号：<span v-if="currentRow" class="word-txt" :class="{'yellow-bg':currentRow.approvalNumber&&currentRow.approvalNumber!==pairData.approvalNumber}" v-text="currentRow.approvalNumber" /></p>
            </div>
          </li>
        </ul>
        <div class="right-operate">
          <template v-if="$route.query.from==='pair'">
            <p>
              <el-button
                type="primary"
                size="small"
                :loading="subLoading"
                @click="handleAddGoods"
              >确认对码</el-button>
            </p>
            <a href="#/goods-manage/apply">
              <el-button size="small">申请新品</el-button>
            </a>
          </template>
          <!-- <template v-else-if="$route.query.from==='is_pair'">
            <el-button
              type="primary"
              size="small"
              :loading="subLoading"
              @click="handleAgainCode"
            >重新对码</el-button>
          </template> -->
        </div>
      </div>
      <div class="search-box" @keydown.enter="checkAdult">
        <div class="search-form">
          <div class="search-item">
            <span class="label-name">商品名称：</span>
            <el-input
              v-model="searchForm.name"
              placeholder=""
              size="small"
            />
          </div>
          <div class="search-item">
            <span class="label-name">条形码：</span>
            <el-input
              v-model="searchForm.barCode"
              placeholder=""
              size="small"
            />
          </div>
          <div class="search-item">
            <span class="label-name">生产企业：</span>
            <el-input
              v-model="searchForm.manufacture"
              placeholder=""
              size="small"
            />
          </div>
        </div>
        <div class="search-form">
          <div class="search-item">
            <span class="label-name">批准文号：</span>
            <el-input
              v-model="searchForm.approvalNumber"
              placeholder=""
              size="small"
            />
          </div>
          <div class="search-item">
            <el-button type="primary" size="small" @click="checkAdult">查询</el-button>
            <el-button type="" size="small" @click="resetQuery">重置</el-button>
          </div>
        </div>
      </div>
      <div class="table-box">
        <p class="title">为您匹配到的药店加平台产品库中与之匹配的产品：</p>
        <el-table
          ref="singleTable"
          v-loading="loading"
          :data="tableData"
          stripe
          highlight-current-row
          style="width: 100%"
          @current-change="handleCurrentChange"
        >
          <el-table-column
            align="left"
            min-width="120"
            label="商品名称"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <div :class="{'is_pair':scope.row.commodity}">
                <span v-text="scope.row.name" />
                <p v-if="scope.row.commodity&&scope.row.id!==pairData.platformCode">
                  <el-tag type="warning" size="mini">已匹配其他商品</el-tag>
                </p>
                <p v-if="scope.row.id===pairData.platformCode">
                  <el-tag type="warning" size="mini">已对码</el-tag>
                </p>
              </div>
              <div v-if="scope.row.commodity" class="bind-info">
                <p>当前该数据对应的ERP产品资料为：{{ scope.row.commodity.name }}
                  <span v-for="(item,index) in pairData.specSkuList" :key="index">
                    {{ item.skuKeyName }}：{{ item.skuValue }}{{ index===scope.row.specSkuList.length-1?'':',' }}
                  </span>
                  <span v-text="scope.row.commodity.manufacture" />
                  <span v-text="scope.row.commodity.barCode" />
                  <span v-text="scope.row.commodity.approvalNumber" />
                </p>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="packStandard"
            align="left"
            min-width="120"
            show-overflow-tooltip
            label="规格"
          >
            <template slot-scope="scope">
              <span v-for="(item,index) in scope.row.specSkuList" :key="index">
                {{ item.skuKeyName }}：{{ item.skuValue }}{{ index===scope.row.specSkuList.length-1?'':',' }}
              </span>
            </template>
          </el-table-column>
          <el-table-column
            prop="manufacture"
            align="left"
            min-width="120"
            label="生产企业"
          />
          <el-table-column
            prop="barCode"
            align="left"
            label="条形码"
            :show-overflow-tooltip="true"
            min-width="120"
          />
          <el-table-column
            prop="approvalNumber"
            align="left"
            label="批准文号"
            :show-overflow-tooltip="true"
            min-width="120"
          />
          <el-table-column
            prop="merUserNum"
            align="left"
            min-width="125"
            label="使用商家数量"
          />
          <el-table-column
            prop="matchScore"
            align="left"
            min-width="125"
            label="匹配得分"
          >
            <template slot-scope="scope">
              <span v-text="scope.row.matchScore" />
              <p
                v-if="scope.row.id===pairData.platformCode"
              >
                <!-- <el-button type="text" size="mini" @click="handleRemoveRelation(scope.row)">解除对码关系</el-button> -->
              </p>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>
<script>
import { getMatchList, setMateCode, mateAgain, removeMateCode } from '@/api/depot'
import { setAuditGoods } from '@/api/examine'
import { mapGetters } from 'vuex'
import { findArray } from '@/utils/index'
export default {
  data() {
    var _checkReason = (rule, value, callback) => {
      if (!value) {
        if (this.rejectForm.id === '3') {
          return callback(new Error('请填写其他拒绝原因'))
        }
      }
    }
    return {
      searchForm: {
        name: '',
        barCode: '',
        manufacture: '',
        approvalNumber: ''
      },
      total: 0,
      loading: false,
      tableData: [],
      goodsInfoVisible: false,
      rejectVisible: false,
      rejectForm: {},
      expand: false,
      rules: {
        id: [{ required: true, message: '请选择驳回原因', trigger: 'blur' }],
        reason: [{ validator: _checkReason, trigger: 'blur' }]
      },
      currentRow: {},
      subLoading: false,
      pairData: {},
      storeTableData: [],
      isMate: {}
    }
  },
  computed: {
    ...mapGetters(['name'])
  },
  created() {
    const data = sessionStorage.getItem('mate')
    console.log('里1111111')
    console.log(data)
    this.pairData = JSON.parse(data)
    this._loadMatchList()
  },
  methods: {
    resetQuery() {
      this.searchForm = {
        name: '',
        barCode: '',
        manufacture: '',
        approvalNumber: ''
      }
      this.checkAdult()
    },
    _loadMatchList() {
      this.loading = true
      getMatchList(this.$route.query.id).then(res => {
        this.tableData = res.data
        this.storeTableData = JSON.parse(JSON.stringify(res.data))
        if (res.data.length !== 0) {
          let data = {}
          if (this.$route.query.from === 'is_pair') {
            this.tableData.map(v => {
              if (v.id === this.pairData.platformCode) {
                data = v
              }
            })
          } else {
            data = this.tableData[0]
          }
          this.$refs.singleTable.setCurrentRow(data)
          this.currentRow = data
          this.isMate = data
        }
        this.loading = false
      }).catch(() => {
        this.loading = false
      })
    },
    checkAdult() {
      const tempFilter = this.searchForm
      const arrayData = JSON.parse(JSON.stringify(this.storeTableData))
      // 筛选
      const resultArr = arrayData.filter(
        (item) => {
          let flag = false
          for (const key in tempFilter) {
            if (item[key] && item[key].toString().indexOf(tempFilter[key].toString()) >= 0) {
              flag = true
              console.log('找到了')
            } else {
              flag = false
              break
            }
          }
          if (flag) {
            return item
          }
        }
      )
      this.tableData = resultArr
      if (this.tableData.length !== 0) {
        this.$refs.singleTable.setCurrentRow(this.tableData[0])
        this.currentRow = this.tableData[0]
      } else {
        this.currentRow = {}
      }
    },
    handleCurrentChange(val) { // 选择表格中某条数据选中
      this.currentRow = val
    },
    handleRemoveRelation(row) { // 解除对码关系
      this.$confirm('是否确认解除对码关系', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        const data = JSON.parse(JSON.stringify(this.pairData))
        data.commodityId = ''
        data.platformCode = ''
        data.specId = 0
        data.status = 0
        data.reason = '手动解除对码'
        removeMateCode(data).then(res => {
          this.$message({
            message: '操作成功',
            type: 'success'
          })
          this.pairData.platformCode = ''
          sessionStorage.setItem('mate', JSON.stringify(this.pairData))
          this._loadMatchList()
        })
      }).catch(() => {})
    },
    handleAddGoods() { // 确定对码
      if (!this.currentRow.id) {
        this.$message({
          message: '未选择任何商品',
          type: 'warning'
        })
        return
      }
      this.subLoading = true
      const data = JSON.parse(JSON.stringify(this.pairData))
      data.barCode = this.currentRow.barCode
      data.platformCode = this.currentRow.id
      setMateCode(data).then(res => {
        this.$message({
          message: '确认对码成功',
          type: 'success'
        })
        const storeData = JSON.parse(sessionStorage.getItem('mateList')) // 读取缓存数据
        const findIndex = findArray(storeData, { id: this.$route.query.id })
        if (findIndex > -1 && findIndex !== storeData.length - 1) { // 如果在该数据中找到了，且不是最后一条，那么自动到条
          this.$router.replace(`/goods-manage/mate-details?id=${storeData[parseInt(findIndex) + 1].id}&from=pair`)
          this.pairData = storeData[parseInt(findIndex) + 1]
          sessionStorage.setItem('mate', JSON.stringify(storeData[parseInt(findIndex) + 1]))
          this._loadMatchList()
        } else {
          this.$router.go(-1)
        }
        this.subLoading = false
      }).catch(() => {
        this.subLoading = false
      })
    },
    handleAgainCode() { // 重新对码
      if (!this.currentRow.id) {
        this.$message({
          message: '未选择任何商品',
          type: 'warning'
        })
        return
      }
      const data = {
        id: this.$route.query.id,
        productId: this.currentRow.id,
        userName: this.name
      }
      this.$confirm(`是否确定从${this.isMate.name}更改为${this.currentRow.name}`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.subLoading = true
        mateAgain(data).then(res => {
          this.$message({
            message: '操作成功',
            type: 'success'
          })
          const storeData = JSON.parse(sessionStorage.getItem('mateList')) // 读取缓存数据
          const findIndex = findArray(storeData, { id: this.$route.query.id })
          if (findIndex > -1 && findIndex !== storeData.length - 1) {
            this.$router.replace(`/goods-manage/mate-details?id=${storeData[parseInt(findIndex) + 1].id}&from=pair`)
            this.pairData = storeData[parseInt(findIndex) + 1]
            sessionStorage.setItem('mate', JSON.stringify(storeData[parseInt(findIndex) + 1]))
            this._loadMatchList()
          } else {
            this.$router.go(-1)
          }
        }).catch(() => {
          this.subLoading = false
        })
      }).catch(() => {})
    },
    handleAudit(type) {
      if (type === 1) {
        const data = {
          'auditReason': '',
          'auditStatus': type,
          'ids': [
            this.$route.query.id
          ],
          'userName': this.name
        }
        this._AuditRequest(data)
      } else {
        this.rejectVisible = true
      }
    },
    handleReject() {
      let reason = ''
      if (this.rejectForm.id === '1') {
        reason = '药店加平台已存在改商品'
      } else if (this.rejectForm.id === '2') {
        reason = '商品信息不够规范合格'
      } else {
        reason = this.rejectForm.reason
      }
      const data = {
        'auditReason': reason,
        'auditStatus': '0',
        'ids': [
          this.$route.query.id
        ],
        'userName': this.name
      }
      this.$refs['rejectForm'].validate((valid) => {
        if (valid) {
          this._AuditRequest(data)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    _AuditRequest(data) { // 审核请求
      this.subLoading = true
      setAuditGoods(data).then(res => {
        this.$message({
          message: '操作成功',
          type: 'success'
        })
        this.$router.go(-1)
      }).catch(_ => {
        this.subLoading = false
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.el-drawer__body {
  overflow-y: scroll;
  height: 100%;
}
.mate-wrapper {
  height: 101%;
  .mate-info {
    display: flex;
  }
  .specs-item{
    display: flex;
    margin-bottom: 5px;
    .name{
      width: 50px;
    }
}
  .yellow-bg{
    background: yellow;
    display: inline-block;
    padding:5px;
  }
  .is_pair{
    height: 100px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .bind-info{
    position: absolute;
    bottom: 10px;
    z-index: 3;
  }
  .product-box {
    display: flex;
    justify-content: space-between;
    padding: 0 10px;
    flex: 1;
    .product-list {
      background: #f6f7fb;
      padding: 10px;
      margin-right: 10px;
      width: 50%;
      .line-status{
        display: block;
        height: 6px;
        width: 50px;
        margin-bottom: 10px;
        border-radius: 5px;
        background: #147de8;
      }
      .title {
        margin-bottom: 10px;
      }
      .info {
        color: #333;
        font-size: 14px;
        p {
          margin-bottom: 5px;
        }
        .word-txt{
          white-space: normal;
          word-break: break-all;
        }
      }
    }
  }
  .right-operate {
    flex: 0 0 100px;
    padding-right: 20px;
    p {
      margin-bottom: 12px;
    }
  }
  .search-box {
    margin-top: 20px;
    background: #f6f7fb;
    padding: 20px 12px 10px 12px;
    margin-left: 10px;
    .search-form {
      margin-bottom: 10px;
    }
    .el-input {
      width: 200px;
    }
  }
  .table-box {
    padding: 10px;
    .title {
      margin-bottom: 10px;
      color: #333;
    }
  }
}
.modal-body {
  display: flex;
  .info-text {
    width: 50%;
    height: 360px;
    overflow-y: auto;
    color: #333;
    font-size: 14px;
    p {
      margin-bottom: 10px;
    }
  }
  .info-image{
    height: 360px;
    overflow-y: auto;
    .other-image{
      li{
        display: inline-block;
        margin-right: 2px;
      }
    }
  }

}
</style>
