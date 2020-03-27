<template>
  <div class="app-container">
    <div class="store-goods-wrapper">
      <el-radio-group v-model="listQuery.status" size="small" @change="_loadList">
        <el-radio-button :label="1">在售</el-radio-button>
        <el-radio-button :label="0">下架</el-radio-button>
        <el-radio-button :label="2">售馨</el-radio-button>
        <el-radio-button :label="3">锁定</el-radio-button>
      </el-radio-group>
      <section @keydown.enter="_loadList">
        <div class="search-form" style="margin-top:20px;margin-bottom:10px">
          <div class="search-item">
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
            <el-input v-model.trim="listQuery.erpOrName" size="small" placeholder="请输入商品名称/编码" />
          </div>
          <div class="search-item">
            <span class="label-name">条形码</span>
            <el-input v-model.trim="listQuery.barCode" size="small" placeholder="条形码" />
          </div>
        </div>
        <div class="search-form" style="margin-bottom:10px">
          <div class="search-item">
            <span class="label-name">批准文号</span>
            <el-input v-model.trim="listQuery.approvalNumber" style="width：200px" size="small" placeholder="批准文号" />
          </div>
          <div class="search-item">
            <span class="label-name">药品类型</span>
            <el-select
              v-model="listQuery.drugType"
              filterable
              size="small"
              placeholder="请选择"
            >
              <el-option label="甲类OTC" value="0" />
              <el-option label="处方药" value="1" />
              <el-option label="乙类OTC" value="2" />
              <el-option label="非处方药" value="3" />
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
              <export-table />
            </span>
          </div>
        </div>
      </section>
      <div class="table-box">
        <div class="choose-num">
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
            <el-button type size="small" @click="handleLock">批量锁定库存价格</el-button>
            <!-- listQuery.storeId -->
            <el-button
              v-if="listQuery.status !== 3"
              type
              size="small"
              @click="handleSynchro"
            >批量同步库存价格{{ multipleSelection.length?`(已选${multipleSelection.length}条)`:`(共${total}条)` }}</el-button>
            <!-- <el-button
              v-if="listQuery.status !== 3"
              type
              size="small"
              @click="handleSynchroBefore"
            >批量同步库存价格</el-button>-->
          </div>
          <span>已选中（{{ multipleSelection.length }}）个</span>
        </div>
        <el-table
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
                  :preview-src-list="[`${showImg(scope.row.mainPic)}?x-oss-process=style/w_800`]"
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
    </div>
    <el-dialog
      title="锁定库存价格"
      :visible.sync="dialogVisible"
      width="30%"
      append-to-body
      :close-on-click-modal="false"
    >
      <el-form ref="lockForm" :model="formData" :rules="rules" label-width="100px" size="small">
        <el-form-item label="锁定商品属性">
          <el-checkbox-group v-model="lockFlag">
            <el-checkbox :label="1">价格</el-checkbox>
            <el-checkbox :label="2">库存</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="定时解锁设置">
          <el-checkbox
            v-model="formData.unlockType"
            :true-label="1"
            :false-label="0"
            @change="unlockTypeChange"
          >定时解锁</el-checkbox>
        </el-form-item>
        <el-form-item v-if="formData.unlockType===1" label="解锁时间" prop="unlockTime">
          <el-date-picker
            v-model="formData.unlockTime"
            value-format="yyyy-MM-dd HH:mm:ss"
            type="datetime"
            class="custom-class"
            placeholder="选择日期时间"
          />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" size="small" :loading="subLoading" @click="handleSubmitLock">确 定</el-button>
      </span>
    </el-dialog>
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
    <el-backtop target=".app-container" :bottom="100" />
  </div>
</template>
<script>
// import download from '@hydee/download'
import mixins from '@/utils/mixin'
import Pagination from '@/components/Pagination'
import exportTable from './export-table'
import { mapGetters } from 'vuex'
import { getTypeTree, exportData } from '@/api/group'
import {
  getStoreGoodsList,
  setLockPrice,
  setUpdatePriceStock,
  setUpdateStoreData,
  getMyStoreList,
  setSynchro
} from '@/api/store-goods'
export default {
  components: { Pagination, exportTable },
  mixins: [mixins],
  data() {
    const _checkTime = (rule, value, callback) => {
      if (value) {
        const chooseTime = Date.parse(new Date(value))
        const nowTime = Date.parse(new Date())
        if (chooseTime < nowTime) {
          callback(new Error('选择时间必须大于当前时间'))
        } else {
          callback()
        }
      } else {
        if (this.formData.unlockType === 1) {
          callback(new Error('请选择解锁时间'))
        } else {
          callback()
        }
      }
    }
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
      dialogVisible: false,
      defaultProps: {
        children: 'children',
        label: 'name',
        value: 'id'
      },
      lockFlag: [],
      formData: {
        lockFlag: 0,
        lockList: [],
        unlockTime: '',
        unlockType: 0
      },
      rules: {
        unlockTime: [{ validator: _checkTime, trigger: 'change' }]
      },
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
        approvalNumber: '',
        barCode: '',
        groupId: '',
        manufacture: '',
        storeId: '',
        status: 1,
        auditStatus: 1,
        currentPage: 1
      },
      storeList: [],
      groupId: [],
      subLoading: false,
      editData: 0,
      type: 'price',
      isShow: false
    }
  },
  computed: {
    ...mapGetters(['merCode', 'name'])
  },
  created() {
    this.getList()
    this._loadTypeList()
  },
  methods: {
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
    unlockTypeChange() {
      // 定时解锁 chang
      this.formData.unlockTime = ''
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
    _loadList() {
      if (this.listQuery.storeId === '') {
        if (
          this.listQuery.name === '' &&
          this.listQuery.erpCode === '' &&
          this.listQuery.barCode === ''
        ) {
          this.$message({
            message: '选择全部门店时，请输入商品名称或商品编码、条形码',
            type: 'warning'
          })
          return
        }
      }
      this.loading = true
      getStoreGoodsList(this.listQuery)
        .then(res => {
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
        })
        .catch(() => {
          this.loading = false
        })
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
    handleExport() {
      if (this.listQuery.storeId === '') {
        if (
          this.listQuery.name === '' &&
          this.listQuery.erpCode === '' &&
          this.listQuery.barCode === ''
        ) {
          this.$message({
            message: '选择全部门店时，请输入商品名称或商品编码、条形码',
            type: 'warning'
          })
          return
        }
      }
      exportData({
        ...this.listQuery,
        storeId: this.listQuery.storeId ? [this.listQuery.storeId] : []
      }).then(res => {
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
      })
    },
    handleLock() {
      if (this.multipleSelection.length === 0) {
        this.$message({
          message: '请先选择要锁定库存价格的数据',
          type: 'warning'
        })
        return
      }
      this.dialogVisible = true
      this.lockFlag = []
      this.formData.unlockType = 0
      this.formData.unlockTime = ''
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
        this.$message({
          message: '操作成功',
          type: 'success'
        })
        this._loadList()
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
    handleSubmitLock() {
      // 执行锁定请求
      const ary = []
      // 获取规格id
      this.multipleSelection.map(v => {
        ary.push({
          specId: v.id,
          storeId: v.storeId
        })
      })
      this.formData.lockList = ary
      if (this.lockFlag.length === 0) {
        // 全部锁定
        this.formData.lockFlag = 0
      }
      if (this.lockFlag.includes(1)) {
        // 锁定价格
        this.formData.lockFlag = 1
      }
      if (this.lockFlag.includes(2)) {
        this.formData.lockFlag = 2 // 锁定库存
      }
      if (this.lockFlag.includes(2) && this.lockFlag.includes(1)) {
        this.formData.lockFlag = 3 // 锁定价格和库存
      }

      this.$refs['lockForm'].validate(valid => {
        if (valid) {
          if (
            this.formData.unlockType === 1 &&
            this.formData.unlockTime !== '' &&
            this.lockFlag.length === 0
          ) {
            this.$message({
              message: '请选择锁定属性',
              type: 'error'
            })
            return
          }
          this.subLoading = true
          setLockPrice(this.formData)
            .then(res => {
              this.$message({
                message: '操作成功',
                type: 'success'
              })
              this.dialogVisible = false
              this.subLoading = false
              this._loadList()
            })
            .catch(() => {
              this.subLoading = false
              this.dialogVisible = false
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
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
    handleClick() {
      this.$router.push('/goods-manage/mate')
    }
  }
}
</script>
<style lang="scss">
.el-picker-panel__footer {
  .el-button--text {
    display: none;
  }
}
</style>
<style lang="scss" scoped>
.store-goods-wrapper {
  .search-form {
    .search-item {
      .label-name {
        width: 60px;
      }
      .el-input {
        width: 180px;
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
}
</style>
