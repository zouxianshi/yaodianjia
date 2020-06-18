<template>
  <div class="app-container">
    <div class="store-goods-wrapper">
      <el-radio-group v-model="listQuery.status" size="small" @change="radioChange">
        <el-radio-button :label="1">在售</el-radio-button>
        <el-radio-button :label="0">下架</el-radio-button>
        <el-radio-button :label="2">售馨</el-radio-button>
        <el-radio-button :label="3">锁定</el-radio-button>
        <el-radio-button :label="4">统计</el-radio-button>
      </el-radio-group>
      <section @keydown.enter="_loadList">
        <div class="search-form" style="margin-top:20px;margin-bottom:10px">
          <div v-if="listQuery.status !== 4" class="search-item">
            <span class="label-name">选择门店</span>
            <el-select
              v-model="listQuery.storeId"
              size="small"
              filterable
              placeholder="请输入关键词"
              :remote-method="remoteMethod"
              :loading="selectloading"
              @change="handleChangeStore"
            >
              <el-option
                v-for="(item,index) in storeList"
                :key="index"
                :label="item.stName"
                :value="item.id"
              />
            </el-select>
          </div>
          <div class="search-item">
            <span class="label-name">商品分组</span>
            <el-cascader
              ref="groupRef"
              v-model="groupId"
              class="cascader"
              :props="defaultProps"
              :options="groupData"
              size="small"
              @change="handleChangeGroup"
            />
          </div>
          <div class="search-item">
            <span class="label-name">商品信息</span>
            <el-input
              v-model.trim="listQuery.erpOrName"
              style="width:200px"
              size="small"
              placeholder="请输入商品名称/编码"
            />
          </div>
          <div class="search-item">
            <span class="label-name">条形码</span>
            <el-input
              v-model.trim="listQuery.barCode"
              style="width:200px"
              size="small"
              placeholder="条形码"
            />
          </div>
        </div>
        <div class="search-form" style="margin-bottom:10px">
          <div class="search-item">
            <span class="label-name">批准文号</span>
            <el-input
              v-model.trim="listQuery.approvalNumber"
              style="width:200px"
              size="small"
              placeholder="批准文号"
            />
          </div>
          <div class="search-item">
            <span class="label-name">药品类型</span>
            <el-select
              v-model="listQuery.drugType"
              filterable
              size="small"
              placeholder="请选择"
              @change="_loadList"
            >
              <el-option label="全部" value />
              <el-option label="甲类OTC" value="0" />
              <el-option label="处方药" value="1" />
              <el-option label="乙类OTC" value="2" />
              <el-option label="OTC" value="4" />
            </el-select>
          </div>
          <div class="search-item">
            <span class="label-name">商品类型</span>
            <el-select
              v-model="listQuery.commodityType"
              filterable
              size="small"
              placeholder="普通商品/组合商品"
              @change="handleChangeCommodityType"
            >
              <el-option label="普通商品" value="1" />
              <el-option label="组合商品" value="2" />
            </el-select>
          </div>
          <div v-if="listQuery.status !== 4" class="search-item">
            <span class="label-name">锁定状态</span>
            <el-select
              v-model="listQuery.lockFlag"
              filterable
              size="small"
              placeholder="请选择"
              @change="_loadList"
            >
              <el-option label="全部" value />
              <el-option label="锁定库存" :value="2" />
              <el-option label="锁定价格" :value="1" />
              <el-option label="锁定库存价格" :value="3" />
              <el-option v-if="listQuery.status!==3" label="未锁定" :value="0" />
            </el-select>
          </div>
          <div class="search-item">
            <span class="label-name">橱窗图</span>
            <el-select
              v-model="listQuery.hasMainPic"
              placeholder="选择橱窗图"
              size="small"
              @change="_loadList"
            >
              <el-option label="有" :value="true" />
              <el-option label="无" :value="false" />
            </el-select>
          </div>
        </div>
        <div class="search-form">
          <div class="search-item" style="padding-left:75px;">
            <el-button type="primary" size="small" @click="_loadList">查询</el-button>
            <el-button type size="small" @click="resetQuery">重置</el-button>
            <span style="margin-left:10px">
              <el-button type="primary" size="small" @click="handleExport">
                导出
                <i class="el-icon-download el-icon--right" />
              </el-button>
              <export-table :is-statistic="listQuery.status === 4" />
            </span>
          </div>
        </div>
        <div v-if="listQuery.status === 4" class="search-form">
          <div class="search-item" style="padding-left:75px;">
            <p class="tips-txt">
              商品库(自营)商品数：{{ statisticData && statisticData.totalNum }} 未同步到的商品：
              <el-button
                class="hover-underline"
                type="text"
                @click="handleShowNotAsyncDialog"
              >{{ statisticData && statisticData.notSyncNum }}</el-button>
            </p>
          </div>
        </div>
      </section>
      <div class="table-box">
        <div v-if="listQuery.status !== 4" class="choose-num">
          <div>
            <el-button
              v-if="listQuery.status!==1&&listQuery.status!==2"
              type="primary"
              size="small"
              @click="handleBatchUpDown(1)"
            >批量上架</el-button>
            <el-button
              v-if="listQuery.status!==0"
              type="danger"
              size="small"
              @click="handleBatchUpDown(0)"
            >批量下架</el-button>
            <el-button type="warning" size="small" @click="handleLock(0)">锁定库存价格</el-button>
            <el-button type="warning" size="small" @click="handleLock(1)">解锁库存价格</el-button>
            <!-- listQuery.storeId -->
            <el-button
              v-if="listQuery.status !== 3"
              type="info"
              size="small"
              @click="handleSynchro"
            >批量同步库存价格{{ multipleSelection.length?`(已选${multipleSelection.length}条)`:`(共${total}条)` }}</el-button>
            <!-- <el-button
              v-if="listQuery.status !== 3"
              type
              size="small"
              @click="handleSynchroBefore"
            >批量同步库存价格</el-button>-->
            <el-button type="warning" size="small" @click="handleBatchUpdate">批量编辑价格</el-button>
          </div>
          <span>已选中（{{ multipleSelection.length }}）个</span>
        </div>
        <el-table
          v-if="listQuery.status !== 4"
          key="1"
          v-loading="loading"
          :data="tableData"
          stripe
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55" />
          <el-table-column align="left" min-width="140" :show-overflow-tooltip="true" label="门店信息">
            <template slot-scope="scope">
              <div>
                <p class="ellipsis">门店编号：{{ scope.row.storeCode }}</p>
                <p class="ellipsis">门店名称：{{ scope.row.storeName }}</p>
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="orCode"
            align="left"
            min-width="120"
            label="商品图片"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <template v-if="scope.row.mainPic">
                <el-image
                  style="width: 70px; height: 70px"
                  :src="showImg(scope.row.mainPic)+'?x-oss-process=style/w_80'"
                  lazy
                  fit="contain"
                  @click="onLook(scope.row.mainPic)"
                />
              </template>
              <template v-else>
                <p class>暂未上传</p>
              </template>
            </template>
          </el-table-column>
          <el-table-column align="left" min-width="150" show-overflow-tooltip label="商品信息">
            <template slot-scope="scope">
              <div>
                <p>{{ scope.row.name }}</p>
                <p class="ellipsis">
                  <span
                    v-for="(item,index) in scope.row.specSkuList"
                    :key="index"
                  >{{ item.skuKeyName }}：{{ item.skuValue }}{{ index===scope.row.specSkuList.length-1?'':',' }}</span>
                </p>
                <p v-if="scope.row.barCode" class="ellipsis" v-text="'条码：'+scope.row.barCode" />
                <p class="ellipsis">{{ scope.row.approvalNumber }}</p>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="erpCode" label="商品编码" align="left" />
          <el-table-column prop="mprice" label="参考价格" align="left" />
          <el-table-column prop="createTime" align="left" min-width="120" label="门店价格">
            <template slot-scope="scope">
              <div class="edit-tip">
                <span style="display:inline-block;margin-right:10px" v-text="scope.row.price" />
                <i
                  v-if="scope.row.commodityType!==2"
                  class="el-icon-edit"
                  size="mini"
                  circle
                  @click="handleEditData(scope.row,'price')"
                />
              </div>
            </template>
          </el-table-column>
          <el-table-column align="left" min-width="120" label="门店库存">
            <template slot-scope="scope">
              <div class="edit-tip">
                <span style="display:inline-block;margin-right:10px" v-text="scope.row.stock" />
                <i
                  v-if="scope.row.commodityType!==2"
                  class="el-icon-edit"
                  size="mini"
                  circle
                  @click="handleEditData(scope.row,'stock')"
                />
              </div>
            </template>
          </el-table-column>
          <el-table-column align="left" min-width="120" label="锁定状态">
            <template slot-scope="scope">
              <div>
                <span v-if="scope.row.lockFlag===1">锁定价格</span>
                <span v-else-if="scope.row.lockFlag===2">锁定库存</span>
                <span v-else-if="scope.row.lockFlag===3">锁定库存价格</span>
                <span v-else-if="scope.row.lockFlag===0">未锁定</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="address" align="left" fixed="right" label="操作" min-width="150">
            <template slot-scope="scope">
              <!-- <el-button type="" size="mini" @click="handleListEdit(scope.row)">编辑</el-button> -->
              <el-button
                v-if="scope.row.status===0"
                type="primary"
                size="mini"
                @click="handleUpDown(scope.row)"
              >上架</el-button>
              <el-button v-else type="danger" size="mini" @click="handleUpDown(scope.row)">下架</el-button>
            </template>
          </el-table-column>
        </el-table>

        <el-table
          v-else
          key="2"
          v-loading="loading"
          :data="tableData"
          stripe
          style="width: 100%"
          @selection-change="handleSelectionChange"
          @sort-change="handleSortChange"
        >
          <el-table-column type="selection" width="55" />
          <el-table-column
            prop="orCode"
            align="left"
            min-width="120"
            label="商品图片"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <template v-if="scope.row.mainPic">
                <el-image
                  style="width: 70px; height: 70px"
                  :src="showImg(scope.row.mainPic)+'?x-oss-process=style/w_80'"
                  lazy
                  fit="contain"
                  @click="onLook(scope.row.mainPic)"
                />
              </template>
              <template v-else>
                <p class>暂未上传</p>
              </template>
            </template>
          </el-table-column>
          <el-table-column align="left" min-width="150" show-overflow-tooltip label="商品信息">
            <template slot-scope="scope">
              <div>
                <p>{{ scope.row.name }}</p>
                <p class="ellipsis">
                  <span
                    v-for="(item,index) in scope.row.specSkuList"
                    :key="index"
                  >{{ item.skuKeyName }}：{{ item.skuValue }}{{ index===scope.row.specSkuList.length-1?'':',' }}</span>
                </p>
                <p v-if="scope.row.barCode" class="ellipsis" v-text="'条码：'+scope.row.barCode" />
                <p class="ellipsis">{{ scope.row.approvalNumber }}</p>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="erpCode" label="商品编码" align="left" />
          <el-table-column prop="mprice" label="参考价格" align="left" />
          <el-table-column
            prop="saleStoreNum"
            min-width="90"
            sortable="custom"
            label="在售门店数"
            align="left"
          >
            <template slot-scope="scope">
              <el-button
                class="hover-underline"
                type="text"
                @click="handleStoreNumClick(1, scope.row.erpCode)"
              >{{ scope.row.saleStoreNum }}</el-button>
            </template>
          </el-table-column>
          <el-table-column
            prop="notSaleStoreNum"
            min-width="90"
            sortable="custom"
            label="下架门店数"
            align="left"
          >
            <template slot-scope="scope">
              <el-button
                class="hover-underline"
                type="text"
                @click="handleStoreNumClick(0, scope.row.erpCode)"
              >{{ scope.row.notSaleStoreNum }}</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="totalStock" sortable="custom" label="总库存" align="left" />
          <el-table-column
            prop="soldOutStoreNum"
            min-width="90"
            sortable="custom"
            label="售罄门店数"
            align="left"
          >
            <template slot-scope="scope">
              <el-button
                class="hover-underline"
                type="text"
                @click="handleStoreNumClick(2, scope.row.erpCode)"
              >{{ scope.row.soldOutStoreNum }}</el-button>
            </template>
          </el-table-column>
          <el-table-column
            prop="lockStoreNum"
            min-width="90"
            sortable="custom"
            label="锁定门店数"
            align="left"
          >
            <template slot-scope="scope">
              <el-button
                class="hover-underline"
                type="text"
                @click="handleStoreNumClick(3, scope.row.erpCode)"
              >{{ scope.row.lockStoreNum }}</el-button>
            </template>
          </el-table-column>
        </el-table>

        <div class="table-footer">
          <pagination
            :total="total"
            :page.sync="listQuery.currentPage"
            :limit.sync="listQuery.pageSize"
            :page-sizes="[10,20,30,50,100,200]"
            @pagination="_loadList"
          />
        </div>
      </div>
      <el-image-viewer v-if="isShowImg" :on-close="onCloseImg" :url-list="srcList" />
    </div>
    <lock
      :is-show="lockDialogVisible"
      :lock-type="lockType"
      :goods-list="multipleSelection"
      @complete="lockDialogVisible=false;_loadList()"
      @close="lockDialogVisible=false"
    />
    <batchUpdate
      :is-show="importAllVisible"
      :spec-data="specData"
      @complete="importAllVisible=false;getList()"
      @close="importAllVisible=false"
    />
    <el-dialog
      :title="`修改${type=='price'?'价格':'库存'}`"
      :visible.sync="isShow"
      width="20%"
      append-to-body
      :close-on-click-modal="false"
    >
      <el-form ref="editData" :model="editData" :rules="editRules">
        <el-form-item label :prop="type=='price'?'price':'stock'">
          <el-input v-model="editData[type]" size="small" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="isShow = false">取 消</el-button>
        <el-button
          type="primary"
          size="small"
          :loading="subLoading"
          @click="handleSetPriceStock"
        >确 定</el-button>
      </span>
    </el-dialog>
    <not-async-dialog
      :is-show="isShowNotAsyncDialog"
      :content="erpCodes"
      @closed="isShowNotAsyncDialog=false"
    />

    <el-dialog
      title="下架提醒"
      :visible.sync="isShowTipsDialog"
      append-to-body
      @closed="handleTipsDialogCancel"
    >
      <p style="line-height: 1.5;" v-html="tipsDialogContent" />
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="handleTipsDialogCancel">取 消</el-button>
        <el-button type="primary" size="small" @click="handleTipsDialogDefinite">确 定</el-button>
      </div>
    </el-dialog>

    <el-backtop target=".app-container" :bottom="100" />
  </div>
</template>
<script>
// import download from '@hydee/download'
import mixins from '@/utils/mixin'
import Pagination from '@/components/Pagination'
import exportTable from './export-table'
import { mapGetters } from 'vuex'
import { getTypeTree, exportData, exportStatisticData } from '@/api/group'
import lock from './_source/lock'
import batchUpdate from './_source/batchUpdate'
import notAsyncDialog from './_source/not-async-dialog'
import ElImageViewer from '@/components/imageViewer/imageViewer'
import {
  getStoreGoodsList,
  getStoreGoodsStatisticsList,
  getStoreGoodsStatisticsSyncNumber,
  setUpdatePriceStock,
  setUpdateStoreData,
  getMyStoreList,
  setSynchro
} from '@/api/store-goods'

export default {
  components: { Pagination, exportTable, ElImageViewer, lock, batchUpdate, notAsyncDialog },
  mixins: [mixins],
  data() {
    const _checkFloat = (rule, value, callback) => {
      const reg = /(^([0-9]+|0)$)|(^(([0-9]+|0)\.([0-9]{1,2}))$)/
      if (value) {
        if (value <= 0) {
          if (rule.field === 'stock') {
            if (value < 0) {
              callback(new Error('请输入大于等于0的值'))
            }
            return callback()
          }
          callback(new Error('请输入大于0的值'))
        } else {
          if (rule.field === 'stock') {
            if (!/^\d+$/.test(value)) {
              return callback(new Error('库存只能输入正整数'))
            }
          }
          if (!reg.test(value)) {
            return callback(new Error('只能设置最多两位小数的正数'))
          }
          if (value > 99999999) {
            callback(new Error('最多只能输入8位数'))
          } else {
            callback()
          }
        }
      } else {
        if (value === 0) {
          if (rule.field === 'stock') {
            return callback()
          }
          callback(new Error('请输入大于0的值'))
        } else {
          callback(new Error('不能为空'))
        }
      }
    }
    return {
      keyword: '',
      tableData: [],
      multipleSelection: [],
      lockDialogVisible: false,
      importAllVisible: false,
      defaultProps: {
        children: 'children',
        label: 'name',
        value: 'id'
      },
      lockType: 0,
      editRules: {
        price: [{ required: true, validator: _checkFloat, trigger: 'blur' }],
        stock: [{ required: true, validator: _checkFloat, trigger: 'blur' }]
      },
      groupData: [],
      chooseStore: {},
      loading: false,
      selectloading: false,
      listQuery: {
        drugType: '',
        commodityType: '',
        lockFlag: '',
        approvalNumber: '',
        barCode: '',
        groupId: '',
        manufacture: '',
        storeId: '',
        status: 1,
        auditStatus: 1,
        currentPage: 1,
        sortMethod: null,
        sortType: null
      },
      storeList: [],
      groupId: [],
      subLoading: false,
      editData: 0,
      type: 'price',
      isShow: false,
      srcList: [],
      isShowImg: false,
      statisticData: null,
      isShowNotAsyncDialog: false,
      isShowTipsDialog: false,
      tipsDialogContent: '',
      cacheSetUpDownParams: {}
    }
  },
  computed: {
    ...mapGetters(['merCode', 'name']),
    erpCodes() {
      return ((this.statisticData && this.statisticData.erpCodes) || []).join(',')
    }
  },
  created() {
    this.getList()
    this._loadTypeList()
  },
  methods: {
    onLook(url) {
      this.srcList = [`${this.showImg(url)}?x-oss-process=style/w_800`]
      this.isShowImg = true
    },
    onCloseImg() {
      this.isShowImg = false
    },
    resetQuery() {
      this.listQuery = {
        approvalNumber: '',
        barCode: '',
        erpOrName: '',
        erpCode: '',
        groupId: '',
        manufacture: '',
        name: '',
        storeId: this.listQuery.storeId,
        status: this.listQuery.status,
        auditStatus: this.listQuery.auditStatus,
        commodityType: '',
        currentPage: 1
      }
      this.$refs.groupRef.clearCheckedNodes
      this.groupId = ['']
      this.getList()
    },

    getList(status) {
      this._loadStoreList().then(res => {
        if (res) {
          if (!status) {
            this.listQuery.storeId = res[1] ? res[1].id : ''
          }
          // this.chooseStore = res[
          this._loadList()
        }
      })
    },
    radioChange() {
      // 锁定标签下，需清空锁定状态搜索栏
      if (this.listQuery.status === 3 && this.listQuery.lockFlag === 0) {
        this.listQuery.lockFlag = ''
      }
      this._loadList()
    },
    async _loadList() {
      const { sortMethod, sortType } = this.listQuery

      if (this.listQuery.storeId === '') {
        if (
          this.listQuery.name === '' &&
          this.listQuery.erpCode === ''
        ) {
          this.$message({
            message: '选择全部门店时，请输入商品名称或商品编码',
            type: 'warning'
          })
          return
        }
      }
      try {
        this.loading = true
        let res = null
        // 如果是统计页签则调用统计数据查询接口
        if (this.listQuery.status === 4) {
          res = await getStoreGoodsStatisticsList({
            ...this.listQuery,
            erpCodeOrName: this.listQuery.erpOrName,
            ...(sortMethod ? { sortMethod } : {}),
            ...(sortType ? { sortType } : {})
          })
          const numRes = await getStoreGoodsStatisticsSyncNumber({
            merCode: this.merCode
          })
          this.statisticData = numRes.data
        } else {
          res = await getStoreGoodsList(this.listQuery)
        }
        this.loading = false
        const { data, totalCount } = res.data
        if (data.length === 0 && this.listQuery.currentPage !== 1) {
          console.log(this.listQuery)
          this.listQuery.currentPage--
          this._loadList()
        }
        if (data) {
          this.tableData = data
          this.total = totalCount
        }
      } catch (error) {
        console.log(error)
        this.tableData = []
        this.total = 0
        this.loading = false
      }
    },
    _loadTypeList() {
      // 获取分组
      getTypeTree({ merCode: this.merCode, type: 2, use: true }).then(res => {
        this.groupData = res.data
        this.groupData.unshift({ name: '全部', id: '' })
      })
    },
    _loadStoreList(val = '') {
      // 加载门店数据
      return new Promise((resolve, reject) => {
        const loading = this.$loading({
          lock: true,
          text: '数据初始化中....',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        })
        getMyStoreList({
          pageSize: 10000,
          currentPage: 1,
          storeName: val,
          onlineStatus: 1,
          status: 1
        })
          .then(res => {
            const { data } = res.data
            data.unshift({ id: '', stName: '全部' })
            this.storeList = data
            this.selectloading = false
            loading.close()
            resolve(data)
          })
          .catch(err => {
            this.selectloading = false
            loading.close()
            reject(err)
          })
      })
    },
    handleSynchroBefore() {
      // 同步价格
      const ary = []
      if (this.multipleSelection.length === 0) {
        this.$message({
          message: '请选择商品',
          type: 'warning'
        })
        return
      }
      this.multipleSelection.map(v => {
        ary.push({
          erpCode: v.erpCode,
          storeSpecId: v.storeSpecId
        })
      })
      const findIndex = this.storeList.findIndex(mItem => {
        return mItem.id === this.listQuery.storeId
      })
      const data = {
        merCode: this.merCode,
        storeCode: this.storeList[findIndex].stCode,
        storeId: this.listQuery.storeId,
        specs: ary
      }
      setSynchro(data)
        .then(res => {
          this.$message({
            message: '价格同步成功',
            type: 'success'
          })
          this.getList()
        })
        .catch(err => {
          console.log(err)
        })
    },
    handleSynchro() {
      if (!this.listQuery.storeId) {
        this.$message({
          message: '无法同步全部门店商品，请选择指定门店',
          type: 'warning'
        })
        return
      }
      const ary = []
      // 同步价格
      /**
       * 分为两种
       * 1.同步查询出来的数据
       * 2.同步勾选的数据
       */
      if (this.multipleSelection.length === 0 && this.total === 0) {
        this.$message({
          message: '请选择商品',
          type: 'warning'
        })
        return
      }
      // 弹窗确认
      this.$confirm(
        `确认要将当前所选${this.multipleSelection.length ||
          this.total}条商品的价格库存数据从erp同步到线上吗？`,
        '',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      )
        .then(() => {
          let data = {}
          // 店铺code
          const findIndex = this.storeList.findIndex(mItem => {
            return mItem.id === this.listQuery.storeId
          })
          if (this.multipleSelection.length) {
            this.multipleSelection.map(v => {
              ary.push({
                erpCode: v.erpCode,
                storeSpecId: v.storeSpecId
              })
            })
            data = {
              merCode: this.merCode,
              storeCode: this.storeList[findIndex].stCode,
              storeId: this.listQuery.storeId,
              specs: ary,
              syncType: 1 // 单个门店部分商品
            }
          } else {
            // 当前同步所有查询出来的数据；
            data = {
              merCode: this.merCode,
              storeCode: this.storeList[findIndex].stCode,
              storeId: this.listQuery.storeId,
              specs: ary,
              syncType: 2 // 单个门店所有商品
            }
          }
          // 调用接口同步
          setSynchro(data)
            .then(res => {
              this.$message({
                message: '价格同步成功',
                type: 'success'
              })
              this.getList('noReset')
            })
            .catch(err => {
              console.log(err)
            })
        })
        .catch(() => {
          return
        })
    },
    handleChangeGroup(val) {
      console.log(val)
      this.listQuery.groupId = val[val.length - 1]
      this._loadList()
    },
    remoteMethod(val) {
      this.selectloading = true
    },
    handleChangeStore(val) {
      // 门店选择改变时触发
      this.storeList.map(v => {
        if (v.id === val) {
          this.chooseStore = v
        }
      })
      this.listQuery.currentPage = 1
      this._loadList()
    },
    handleChangeCommodityType(val) {
      // 商品类型改变时触发
      this.storeList.map(v => {
        if (v.id === val) {
          this.chooseStore = v
        }
      })
      this._loadList()
    },
    // 处理商品数据导出
    async handleExport() {
      if (this.listQuery.storeId === '') {
        if (
          this.listQuery.name === '' &&
          this.listQuery.erpCode === ''
        ) {
          this.$message({
            message: '选择全部门店时，请输入商品名称或商品编码',
            type: 'warning'
          })
          return
        }
      }
      console.log(!!this.listQuery.lockFlag)
      // if (this.listQuery.lockFlag) {
      //   this.listQuery.lockFlag = null
      // }
      try {
        let res = null
        if (this.listQuery.status === 4) {
          res = await exportStatisticData({
            ...this.listQuery,
            specIds: (this.multipleSelection || []).map(item => item.specId)
          })
        } else {
          res = await exportData({
            ...this.listQuery,
            lockFlag: this.listQuery.lockFlag ? [this.listQuery.lockFlag] : [],
            storeId: this.listQuery.storeId ? [this.listQuery.storeId] : []
          })
        }
        if (res.code === '10000') {
          this.$alert(
            '门店商品列表正在导出中，稍后请点击【查看并导出记录】下载导出文件',
            '门店商品导出',
            {
              confirmButtonText: '好的',
              center: true,
              roundButton: true,
              confirmButtonClass: 'hydee_alert_btn'
            }
          )
        }
      } catch (error) {
        console.log('error', error)
      }
    },
    handleLock(lockType) {
      if (this.multipleSelection.length === 0) {
        this.$message({
          message: `请先选择要${
            lockType === 0 ? '锁定' : '解锁'
          }库存价格的数据`,
          type: 'warning'
        })
        return
      }
      this.lockType = lockType
      this.lockDialogVisible = true
    },
    handleBatchUpdate() {
      this.importAllVisible = true
    },
    handleSetPriceStock() {
      this.$refs['editData'].validate(valid => {
        if (valid) {
          this.subLoading = true
          const data = {
            commodityId: this.editData.commodityId,
            price: this.editData.price,
            specId: this.editData.id,
            stock: this.editData.stock,
            storeId: this.editData.storeId,
            merCode: this.merCode
          }

          setUpdatePriceStock({ list: [data] })
            .then(res => {
              this.subLoading = false
              this.$message({
                message: '修改成功',
                type: 'success'
              })
              this._loadList()
              this.isShow = false
            })
            .catch(() => {
              this.subLoading = false
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    handleTipsDialogCancel() {
      this.isShowTipsDialog = false
      this.cacheSetUpDownParams = {}
    },
    handleTipsDialogDefinite() {
      this._SetUpDown({ ...this.cacheSetUpDownParams, isDelete: true })
    },
    handleUpDown(row) {
      // 单个上下级
      const status = row.status === 0 ? 1 : 0
      const data = {
        isAll: false,
        status: status,
        updateList: [
          {
            specId: row.id,
            storeId: row.storeId
          }
        ],
        userName: this.name,
        merCode: this.merCode
      }
      this._SetUpDown(data)
    },
    _SetUpDown(data) {
      // 执行上下架请求
      setUpdateStoreData(data).then(res => {
        if (
          res.code === '10000' &&
          res.data &&
          (res.data.code === 1 || res.data.code === 2)
        ) {
          // 校验不通过
          this.isShowTipsDialog = true
          this.tipsDialogContent =
            res.data.code === 1
              ? '该商品正在参与活动，下架后将从活动中自动去除该商品。确认继续操作吗？'
              : `<p>如下商品正在参与活动，下架后将从活动中自动去除该商品。确认继续操作吗？</p><p>商品编码：${(
                res.data.erpList || []
              ).join('、')}</p>`
          this.cacheSetUpDownParams = data
        } else {
          this.$message({
            message: '操作成功',
            type: 'success'
          })
          this.isShowTipsDialog = false
          this._loadList()
        }
      })
    },
    handleBatchUpDown(status) {
      // 批量上下架
      const ary = []
      if (this.multipleSelection.length === 0) {
        this.$message({
          message: '请选择上下架的数据',
          type: 'warning'
        })
        return
      }
      this.multipleSelection.map(v => {
        ary.push({
          specId: v.id,
          storeId: v.storeId
        })
      })
      const data = {
        isAll: false,
        specIds: ary,
        status: status,
        updateList: ary,
        userName: this.name,
        merCode: this.merCode
      }
      this._SetUpDown(data)
    },

    handleEditData(row, key) {
      this.editData = JSON.parse(JSON.stringify(row))
      this.type = key
      this.isShow = true
      this.$nextTick(_ => {
        this.$refs.editData.clearValidate()
      })
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    handleSortChange(val) {
      const { order, prop } = val
      let sortMethod = null
      let sortType = null
      switch (order) {
        case 'ascending':
          sortMethod = 1
          break
        case 'descending':
          sortMethod = 2
          break
      }
      switch (prop) {
        case 'saleStoreNum':
          sortType = 1
          break
        case 'notSaleStoreNum':
          sortType = 2
          break
        case 'totalStock':
          sortType = 3
          break
        case 'soldOutStoreNum':
          sortType = 4
          break
        case 'lockStoreNum':
          sortType = 5
          break
      }

      this.$set(this.listQuery, 'sortMethod', sortMethod)
      this.$set(this.listQuery, 'sortType', sortType)
      this._loadList()
    },
    handleStoreNumClick(type, erpCode) {
      this.$set(this.listQuery, 'status', type)
      this.$set(this.listQuery, 'storeId', '')
      this.$set(this.listQuery, 'erpOrName', erpCode)
      this.$nextTick(() => {
        this._loadList()
      })
    },
    handleClick() {
      this.$router.push('/goods-manage/mate')
    },
    handleShowNotAsyncDialog() {
      this.isShowNotAsyncDialog = true
    }
  }
}
</script>
<style lang="scss">
// .el-picker-panel__footer {
//   .el-button--text {
//     display: none;
//   }
// }
</style>
<style lang="scss" scoped>
.lock-tip {
  color: #999999;
  font-size: 14px;
  margin: 44px 0 0 4px;
  span {
    color: red;
  }
}
.store-goods-wrapper {
  .search-form {
    .search-item {
      .label-name {
        width: 60px;
      }
      .el-input {
        width: 180px;
      }
      .tips-txt {
        color: #999999;
        font-size: 14px;
      }
    }
  }

  .cascader {
    .el-input {
      width: 300px !important;
    }
  }
  .choose-num {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .edit-tip {
    i {
      cursor: pointer;
      &:hover {
        color: #409eff;
      }
    }
  }
  .hover-underline {
    color: #409eff;
    cursor: pointer;
  }
  .hover-underline:hover {
    text-decoration-line: underline;
  }
}
</style>
