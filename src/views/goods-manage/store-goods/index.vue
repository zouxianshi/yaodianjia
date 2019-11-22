<template>
  <div class="app-container">
    <div class="store-goods-wrapper">
      <el-radio-group
        v-model="listQuery.status"
        size="small"
        @change="_loadList"
      >
        <el-radio-button :label="1">在售</el-radio-button>
        <el-radio-button :label="0">下架</el-radio-button>
        <el-radio-button :label="2">售馨</el-radio-button>
        <el-radio-button :label="3">锁定</el-radio-button>
      </el-radio-group>
      <section @keydown.enter="_loadList">
        <div
          class="search-form"
          style="margin-top:20px;margin-bottom:10px"
        >
          <div class="search-item">
            <span class="label-name">选择门店</span>
            <el-select
              v-model="listQuery.storeId"
              filterable
              placeholder="请输入关键词"
              :remote-method="remoteMethod"
              :loading="selectloading"
              @change="handleChangeStore"
            >
              <el-option v-for="(item,index) in storeList" :key="index" :label="item.stName" :value="item.id" />
            </el-select>
          </div>
          <div class="search-item">
            <span class="label-name">商品名称</span>
            <el-input
              v-model.trim="listQuery.name"
              size="small"
              placeholder="商品名称"
            />
          </div>
          <div class="search-item">
            <span class="label-name">ERP编码</span>
            <el-input
              v-model.trim="listQuery.erpCode"
              size="small"
              placeholder="ERP编码"
            />
          </div>
          <div class="search-item">
            <span class="label-name">批准文号</span>
            <el-input
              v-model.trim="listQuery.approvalNumber"
              size="small"
              placeholder="批准文号"
            />
          </div>
        </div>
        <div class="search-form">
          <div class="search-item">
            <span class="label-name">条形码</span>
            <el-input
              v-model.trim="listQuery.barCode"
              size="small"
              placeholder="条形码"
            />
          </div>
          <div class="search-item">
            <span class="label-name">生产企业</span>
            <el-input
              v-model.trim="listQuery.manufacture"
              size="small"
              placeholder="生产企业"
            />
          </div>
          <div class="search-item">
            <span class="label-name">商品分组</span>
            <el-cascader
              v-model="groupId"
              style="width:300px"
              class="cascader"
              :props="defaultProps"
              :options="groupData"
              size="small"
              @change="handleChangeGroup"
            />
          </div>
          <div class="search-item">
            <span class="label-name">商品类型</span>
            <el-select
              v-model="listQuery.commodityType"
              filterable
              placeholder="普通商品/组合商品"
              @change="handleChangeCommodityType"
            >
              <el-option label="普通商品" value="1" />
              <el-option label="组合商品" value="2" />
            </el-select>
          </div>
          <div class="search-item">
            <el-button type="primary" size="small" @click="_loadList">查询</el-button>
            <el-button type="" size="small" @click="resetQuery">重置</el-button>
          </div>
        </div>
      </section>
      <div class="table-box">
        <div class="choose-num">
          <div>
            <el-button v-if="listQuery.status!==1&&listQuery.status!==2" type="primary" size="small" @click="handleBatchUpDown(1)">批量上架</el-button>
            <el-button v-if="listQuery.status!==0" type="danger" size="small" @click="handleBatchUpDown(0)">批量下架</el-button>
            <el-button type="" size="small" @click="handleLock">批量锁定库存价格</el-button>
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
          <el-table-column
            type="selection"
            width="55"
          />
          <el-table-column
            align="left"
            min-width="140"
            :show-overflow-tooltip="true"
            label="门店信息"
          >
            <template slot-scope="scope">
              <div>
                <p class="ellipsis">门店编号：{{ chooseStore.stCode }}</p>
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
                  :src="showImg(scope.row.mainPic)"
                  lazy
                  fit="contain"
                  :preview-src-list="[`${showImg(scope.row.mainPic)}`]"
                />
              </template>
              <template v-else>
                <p class="">暂未上传</p>
              </template>
            </template>
          </el-table-column>
          <el-table-column
            align="left"
            min-width="150"
            label="商品信息"
          >
            <template slot-scope="scope">
              <div>
                <p>{{ scope.row.name }}</p>
                <p>{{ scope.row.approvalNumber }}</p>
              </div>
            </template></el-table-column>
          <el-table-column
            prop="erpCode"
            label="ERP编码"
            align="left"
          />
          <el-table-column
            prop="mprice"
            label="参考价格"
            align="left"
          />
          <el-table-column
            prop="createTime"
            align="left"
            min-width="120"
            label="门店价格"
          >
            <template slot-scope="scope">
              <div class="edit-tip">
                <span style="display:inline-block;margin-right:10px" v-text="scope.row.price" />
                <i class="el-icon-edit" size="mini" circle @click="handleEditData(scope.row,'price')" />
              </div>
            </template>
          </el-table-column>
          <el-table-column
            align="left"
            min-width="120"
            label="门店库存"
          >
            <template slot-scope="scope">
              <div class="edit-tip">
                <span style="display:inline-block;margin-right:10px" v-text="scope.row.stock" />
                <i class="el-icon-edit" size="mini" circle @click="handleEditData(scope.row,'stock')" />
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="address"
            align="left"
            fixed="right"
            label="操作"
            min-width="150"
          >
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
          <el-checkbox v-model="formData.unlockType" :true-label="1" :false-label="0" @change="unlockTypeChange">定时解锁</el-checkbox>
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
        <el-form-item label="" :prop="type=='price'?'price':'stock'">
          <el-input v-model="editData[type]" size="small" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="isShow = false">取 消</el-button>
        <el-button type="primary" size="small" :loading="subLoading" @click="handleSetPriceStock">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import mixins from '@/utils/mixin'
import Pagination from '@/components/Pagination'
import { mapGetters } from 'vuex'
import { getTypeTree } from '@/api/group'
import { getStoreGoodsList, setLockPrice, setUpdatePriceStock } from '@/api/store-goods'
import { getStoreList, setBatchUpdown } from '@/api/depot'
export default {
  components: { Pagination },
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
        'lockFlag': 0,
        'specIds': [],
        'storeId': '',
        'unlockTime': '',
        'unlockType': 0
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
        'commodityType': '',
        'approvalNumber': '',
        'barCode': '',
        'erpCode': '',
        'groupId': '',
        'manufacture': '',
        'name': '',
        'storeId': '',
        'status': 1,
        'auditStatus': 1
      },
      storeList: [],
      groupId: '',
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
        'approvalNumber': '',
        'barCode': '',
        'erpCode': '',
        'groupId': '',
        'manufacture': '',
        'name': '',
        'storeId': '',
        'status': this.listQuery.status,
        'auditStatus': this.listQuery.auditStatus,
        'commodityType': ''
      }
      this.getList()
    },
    unlockTypeChange() { // 定时解锁 chang
      this.formData.unlockTime = ''
    },
    getList() {
      this._loadStoreList().then(res => {
        if (res) {
          this.listQuery.storeId = res[0] ? res[0].id : ''
          this.chooseStore = res[0]
          this._loadList()
        }
      })
    },
    _loadList() {
      this.loading = true
      getStoreGoodsList(this.listQuery).then(res => {
        this.loading = false
        const { data, totalCount } = res.data
        if (data) {
          this.tableData = data
          this.total = totalCount
        }
      }).catch(() => {
        this.loading = false
      })
    },
    _loadTypeList() { // 获取分组
      getTypeTree({ merCode: this.merCode, type: 2, use: true }).then(res => {
        this.groupData = res.data
        this.groupData.unshift({ name: '全部', id: '' })
      })
    },
    _loadStoreList(val = '') { // 加载门店数据
      return new Promise((resolve, reject) => {
        getStoreList({ pageSize: 100, currentPage: 1, storeName: val, onlineStatus: 1 }).then(res => {
          const { data } = res.data
          data.unshift({ id: '', stName: '全部' })
          this.storeList = data
          this.selectloading = false
          resolve(data)
        }).catch((err) => {
          this.selectloading = false
          reject(err)
        })
      })
    },
    handleChangeGroup(val) {
      this.listQuery.groupId = val[val.length - 1]
    },
    remoteMethod(val) {
      this.selectloading = true
    },
    handleChangeStore(val) { // 门店选择改变时触发
      this.storeList.map(v => {
        if (v.id === val) {
          this.chooseStore = v
        }
      })
      this.listQuery.currentPage = 1
      this._loadList()
    },
    handleChangeCommodityType(val) { // 商品类型改变时触发
      this.storeList.map(v => {
        if (v.id === val) {
          this.chooseStore = v
        }
      })
      this._loadList()
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
      this.$refs['editData'].validate((valid) => {
        if (valid) {
          this.subLoading = true
          const data = {
            'commodityId': this.editData.commodityId,
            'price': this.editData.price,
            'specId': this.editData.id,
            'stock': this.editData.stock,
            'storeId': this.editData.storeId,
            'merCode': this.merCode
          }

          setUpdatePriceStock({ list: [data] }).then(res => {
            this.subLoading = false
            this.$message({
              message: '修改成功',
              type: 'success'
            })
            this._loadList()
            this.isShow = false
          }).catch(() => {
            this.subLoading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    handleUpDown(row) { // 单个上下级
      const status = row.status === 0 ? 1 : 0
      const data = {
        'isAll': false,
        'specIds': [
          row.id
        ],
        'status': status,
        'storeIds': [
          this.listQuery.storeId
        ],
        'userName': this.name
      }
      this._SetUpDown(data)
    },
    _SetUpDown(data) { // 执行上下架请求
      setBatchUpdown(data).then(res => {
        this.$message({
          message: '操作成功',
          type: 'success'
        })
        this._loadList()
      })
    },
    handleBatchUpDown(status) { // 批量上下架
      const ary = []
      if (this.multipleSelection.length === 0) {
        this.$message({
          message: '请选择上下架的数据',
          type: 'warning'
        })
        return
      }
      this.multipleSelection.map(v => {
        ary.push(v.id)
      })
      const data = {
        'isAll': false,
        'specIds': ary,
        'status': status,
        'storeIds': [
          this.listQuery.storeId
        ],
        'userName': this.name
      }
      this._SetUpDown(data)
    },
    handleSubmitLock() { // 执行锁定请求
      const ary = []
      // 获取规格id
      this.multipleSelection.map(v => {
        ary.push(v.id)
      })
      this.formData.specIds = ary
      this.formData.storeId = this.listQuery.storeId

      if (this.lockFlag.length === 0) { // 全部锁定
        this.formData.lockFlag = 0
      }
      if (this.lockFlag.includes(1)) { // 锁定价格
        this.formData.lockFlag = 1
      }
      if (this.lockFlag.includes(2)) {
        this.formData.lockFlag = 2 // 锁定库存
      }
      if (this.lockFlag.includes(2) && this.lockFlag.includes(1)) {
        this.formData.lockFlag = 3 // 锁定价格和库存
      }

      this.$refs['lockForm'].validate((valid) => {
        if (valid) {
          if (this.formData.unlockType === 1 && this.formData.unlockTime !== '' && this.lockFlag.length === 0) {
            this.$message({
              message: '请选择锁定属性',
              type: 'error'
            })
            return
          }
          this.subLoading = true
          setLockPrice(this.formData).then(res => {
            this.$message({
              message: '操作成功',
              type: 'success'
            })
            this.dialogVisible = false
            this.subLoading = false
            this._loadList()
          }).catch(() => {
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
.el-picker-panel__footer{
  .el-button--text{
    display: none
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
  .cascader{
      .el-input{
          width: 300px!important
      }
  }
  .choose-num{
      display: flex;
      justify-content: space-between;
      align-items: center;
  }
  .edit-tip{
    i{
      cursor: pointer;
      &:hover{
        color: #409eff
      }
    }
  }
}
</style>
