<template>
  <div class="app-container">
    <div class="mate-wrapper">
      <div class="mate-info">
        <ul class="product-box">
          <li class="product-list">
            <p class="title">当前产品</p>
            <p class="title">
              ERP编码：
              <span v-if="currentRow">{{ pairData.erpCode }}</span>
            </p>
            <span class="line-status" />
            <div class="info">
              <p>
                名称：
                <span v-text="pairData.name" />
              </p>
              <div class="specs-item">
                <span>规格：</span>
                <div>
                  <p
                    v-for="(item,index) in pairData.specSkuList"
                    :key="index"
                  >{{ item.skuKeyName }}：{{ item.skuValue }}</p>
                </div>
              </div>
              <p>
                企业：
                <span v-text="pairData.manufacture" />
              </p>
              <p>
                条码：
                <span v-text="pairData.barCode" />
              </p>
              <p>
                批准文号：
                <span v-text="pairData.approvalNumber" />
              </p>
            </div>
          </li>
          <li class="product-list">
            <p class="title">当前所选商品库产品</p>
            <p class="title">
              ERP编码：
              <span v-if="currentRow">{{ currentRow.erpCode }}</span>
            </p>
            <span class="line-status" />
            <div class="info">
              <p>
                名称：
                <span
                  v-if="currentRow"
                  :class="{'yellow-bg':currentRow.name&&currentRow.name!==pairData.name}"
                  v-text="currentRow.name"
                />
              </p>
              <div class="specs-item">
                <span>规格：</span>
                <div :class="{'yellow-bg':isShowBg}">
                  <p
                    v-for="(item,index) in currentRow.specSkuList"
                    :key="index"
                  >{{ item.skuKeyName }}：{{ item.skuValue }}</p>
                </div>
              </div>
              <p>
                企业：
                <span
                  v-if="currentRow"
                  :class="{'yellow-bg':currentRow.manufacture&&currentRow.manufacture!==pairData.manufacture}"
                  v-text="currentRow.manufacture"
                />
              </p>
              <p>
                条码：
                <span
                  v-if="currentRow"
                  :class="{'yellow-bg':currentRow.barCode&&currentRow.barCode!==pairData.barCode}"
                  v-text="currentRow.barCode"
                />
              </p>
              <p>
                批准文号：
                <span
                  v-if="currentRow"
                  :class="{'yellow-bg':currentRow.approvalNumber&&currentRow.approvalNumber!==pairData.approvalNumber}"
                  v-text="currentRow.approvalNumber"
                />
              </p>
            </div>
          </li>
        </ul>
        <div class="right-operate">
          <p>
            <el-button type="primary" size="small" @click="goodsInfoVisible=true">查看商品详情</el-button>
          </p>
          <el-button type="danger" size="small" @click="rejectVisible=true">拒绝</el-button>
        </div>
      </div>
      <div class="search-box" @keydown.enter="checkAdult">
        <div class="search-form">
          <div class="search-item">
            <span class="label-name">商品名称：</span>
            <el-input v-model="searchForm.name" placeholder size="small" />
          </div>
          <div class="search-item">
            <span class="label-name">条形码：</span>
            <el-input v-model="searchForm.barCode" placeholder size="small" />
          </div>
          <div class="search-item">
            <span class="label-name">生产企业：</span>
            <el-input v-model="searchForm.manufacture" placeholder size="small" />
          </div>
        </div>
        <div class="search-form">
          <div class="search-item">
            <span class="label-name">批准文号：</span>
            <el-input v-model="searchForm.approvalNumber" placeholder size="small" />
          </div>
          <div class="search-item">
            <el-button type="primary" size="small" @click="checkAdult">查询</el-button>
            <el-button type size="small" @click="resetQuery">重置</el-button>
          </div>
        </div>
      </div>
      <div class="table-box">
        <p class="title">为您匹配到的您的商品库与之匹配的产品：</p>
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
            prop="name"
            align="left"
            min-width="120"
            label="商品名称"
            show-overflow-tooltip
          />
          <el-table-column align="left" min-width="120" label="规格" show-overflow-tooltip>
            <template slot-scope="scope">
              <span
                v-for="(item,index) in scope.row.specSkuList"
                :key="index"
              >{{ item.skuKeyName }}：{{ item.skuValue }}{{ index===scope.row.specSkuList.length-1?'':',' }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="manufacture" align="left" min-width="120" label="生产企业" />
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
          <el-table-column prop="matchScore" align="left" min-width="125" label="匹配得分" />
        </el-table>
      </div>
    </div>
    <el-dialog
      title="产品详情"
      :visible.sync="goodsInfoVisible"
      append-to-body
      :close-on-click-modal="false"
      width="800px"
    >
      <div class="modal-body">
        <div class="info-text">
          <p>
            商品名称：
            <span v-text="pairData.name" />
          </p>
          <div class="specs-item">
            <span>商品规格：</span>
            <div>
              <p
                v-for="(item,index) in pairData.specSkuList"
                :key="index"
              >{{ item.skuKeyName }}：{{ item.skuValue }}</p>
            </div>
          </div>
          <p>
            生产企业：
            <span v-text="pairData.manufacture">12321</span>
          </p>
          <p>
            搜索关键词：
            <span v-text="pairData.keyWord" />
          </p>
          <p>
            批准文号：
            <span v-text="pairData.approvalNumber" />
          </p>
          <!-- <p>是否药品：<span v-text="pariData."/></p> -->
          <p>
            处方分类：
            <span v-if="pairData.drugType===0">甲类OTC</span>
            <span v-else-if="pairData.drugType===1">处方药</span>
            <span v-else-if="pairData.drugType===2">乙类OTC</span>
            <span v-else>非处方药</span>
          </p>
          <p>
            是否含有麻黄碱：
            <span v-text="pairData.hasEphedrine===1?'包含':'不包含'" />
          </p>
          <p>
            品牌名称：
            <span v-text="pairData.brandName" />
          </p>
          <p>
            通用名：
            <span v-text="pairData.commonName" />
          </p>
          <p>
            功能疗效：
            <span v-text="pairData.keyFeature" />
          </p>
          <!-- <p>用法用量：<span v-text="pairData"/></p> -->
          <!-- <p>不良反应：<span/></p> -->
        </div>
        <div class="info-image">
          <p style="margin-bottom:10px">商品图片：</p>
          <div class="main-img">
            <!-- <el-image
              v-if="pairData.mainPic"
              :src="showImg(pairData.mainPic)"
              fit="contain"
              style="width: 300px; height: 300px"
            >
              <div slot="placeholder" class="image-slot">
                加载中
                <span class="dot">...</span>
              </div>
            </el-image>-->
            <div class="no-image-content">
              <div class="no-image-text">暂无上传</div>
            </div>
          </div>
          <ul class="other-image">
            <li v-for="(item,index) in imgList" :key="index" class>
              <el-image
                :src="showImg(item.picUrl)"
                fit="contain"
                style="width: 100px; height: 100px"
              >
                <div slot="placeholder" class="image-slot">
                  加载中
                  <span class="dot">...</span>
                </div>
              </el-image>
            </li>
          </ul>
        </div>
      </div>
      <span slot="footer" class="ext-center">
        <el-button type="primary" size="small" @click="handleAudit(1)">通 过</el-button>
        <el-button type="danger" size="small" @click="handleAudit(0)">拒 绝</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="选择拒绝原因"
      append-to-body
      close-on-click-modal
      :visible.sync="rejectVisible"
      width="30%"
    >
      <div class="modal-body">
        <el-form
          ref="rejectForm"
          :model="rejectForm"
          :rules="rules"
          label-width="100px"
          size="small"
        >
          <el-form-item label="选择原因" prop="id">
            <el-select v-model="rejectForm.id" placeholder>
              <el-option label="药店加平台已存在改商品" value="1" />
              <el-option label="商品信息不够规范合格" value="2" />
              <el-option label="其他原因" value="3" />
            </el-select>
          </el-form-item>
          <div v-show="rejectForm.id==='3'">
            <el-form-item label="驳回原因" prop="reason">
              <el-input
                v-model="rejectForm.reason"
                maxlength="127"
                show-word-limit
                placeholder="输入原因"
                type="textarea"
                :rows="2"
              />
              <span v-show="is_err" class="tip">请填写驳回原因</span>
            </el-form-item>
          </div>
        </el-form>
      </div>
      <span slot="footer">
        <el-button type="primary" size="small" :loading="subLoading" @click="handleReject">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { setComAddGoods } from '@/api/depot'
import { setAuditGoods, getExamineMatchList } from '@/api/examine'
import { getGoodsImgAry } from '@/api/new-goods'
import { mapGetters } from 'vuex'
export default {
  data() {
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
      rules: {
        id: [{ required: true, message: '请选择驳回原因', trigger: 'blur' }]
      },
      currentRow: {},
      subLoading: false,
      pariData: {},
      storeTableData: [],
      isMate: {},
      imgList: [],
      is_err: false
    }
  },
  computed: {
    ...mapGetters(['name'])
  },
  created() {
    this._loadMatchList()
    const data = sessionStorage.getItem('mate')
    this.pairData = JSON.parse(data)
    this._loadImgList()
  },
  methods: {
    isShowBg() {
      let pairInfo = ''
      this.pairData.specSkuList.map(v => {
        pairInfo = +v.skuValue
      })
      let currentInfo = ''
      this.currentRow.specSkuList.map(v => {
        currentInfo = +v.skuValue
      })
      return pairInfo === currentInfo
    },
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
      const data = JSON.parse(sessionStorage.getItem('mate'))
      const params = {
        approvalNumber: data.approvalNumber,
        barCode: data.barCode,
        manufacture: data.manufacture,
        merCode: data.merCode,
        name: data.name
      }
      getExamineMatchList(params)
        .then(res => {
          this.tableData = res.data
          this.storeTableData = JSON.parse(JSON.stringify(res.data))
          if (res.data.length !== 0) {
            this.$refs.singleTable.setCurrentRow(this.tableData[0])
            this.currentRow = this.tableData[0]
            this.isMate = this.tableData[0]
          }
          this.loading = false
        })
        .catch(() => {
          this.loading = false
        })
    },
    checkAdult() {
      const tempFilter = this.searchForm
      const arrayData = JSON.parse(JSON.stringify(this.storeTableData))
      // 筛选
      const resultArr = arrayData.filter(item => {
        let flag = false
        for (const key in tempFilter) {
          if (
            item[key] &&
            item[key].toString().indexOf(tempFilter[key].toString()) >= 0
          ) {
            flag = true
          } else {
            flag = false
            break
          }
        }
        if (flag) {
          return item
        }
      })
      this.tableData = resultArr
      if (this.tableData.length !== 0) {
        this.$refs.singleTable.setCurrentRow(this.tableData[0])
        this.currentRow = this.tableData[0]
      } else {
        this.currentRow = {}
      }
    },
    handleCurrentChange(val) {
      this.currentRow = val
    },
    _loadImgList() {
      // 加载图片
      getGoodsImgAry(this.$route.query.id).then(res => {
        if (res.data.length > 0) {
          res.data.splice(0, 1)
          this.imgList = res.data
        }
      })
    },
    handleAddGoods() {
      // 确定对码
      this.subLoading = true
      setComAddGoods({ ids: [this.currentRow.id], userName: this.name })
        .then(res => {
          this.$message({
            message: '确认对码成功',
            type: 'success'
          })
          this.$router.go(-1)
        })
        .catch(() => {
          this.subLoading = false
        })
    },
    handleAudit(type) {
      if (type === 1) {
        const data = {
          auditReason: '',
          auditStatus: type,
          ids: [this.$route.query.id],
          userName: this.name
        }
        this._AuditRequest(data)
      } else {
        this.rejectVisible = true
      }
    },
    handleReject() {
      let reason = ''
      if (!this.rejectForm.id) {
        this.$message({
          message: '请选择拒绝原因',
          type: 'error'
        })
        return
      }
      if (this.rejectForm.id === '1') {
        reason = '药店加平台已存在改商品'
      } else if (this.rejectForm.id === '2') {
        reason = '商品信息不够规范合格'
      } else {
        reason = this.rejectForm.reason
      }
      const data = {
        auditReason: reason,
        auditStatus: '0',
        ids: [this.$route.query.id],
        userName: this.name
      }
      if (this.rejectForm.id === '3') {
        if (!data.auditReason) {
          this.is_err = true
          return
        } else {
          this.is_err = false
          this._AuditRequest(data)
        }
      } else {
        this._AuditRequest(data)
      }
    },
    _AuditRequest(data) {
      // 审核请求
      this.subLoading = true
      setAuditGoods(data)
        .then(res => {
          this.$message({
            message: '操作成功',
            type: 'success'
          })
          this.$router.go(-1)
        })
        .catch(_ => {
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
.specs-item {
  display: flex;
  margin-bottom: 5px;
  .name {
    width: 50px;
  }
}
.mate-wrapper {
  height: 101%;
  .mate-info {
    display: flex;
  }
  .yellow-bg {
    background: yellow;
    display: inline-block;
    padding: 5px;
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
      .line-status {
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
  .info-image {
    height: 360px;
    overflow-y: auto;
    .other-image {
      li {
        display: inline-block;
        margin-right: 2px;
      }
    }
    .no-image-content {
      width: 300px;
      height: 300px;
      background-color: #fbfdff;
      border: 1px solid #c0ccda;
      border-radius: 6px;
      vertical-align: middle;
      display: table-cell;
    }
    .no-image-text {
      font-size: 16px;
      text-align: center;
      color: #c0ccda;
    }
  }
}
</style>
