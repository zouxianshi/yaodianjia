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
              v-model.trim="listQuery.manufacture"
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
              v-model.trim="keyword"
              size="small"
              placeholder="条形码"
            />
          </div>
          <div class="search-item">
            <span class="label-name">生产企业</span>
            <el-input
              v-model.trim="keyword"
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
            <el-button type="primary" size="small" @click="_loadList">查询</el-button>
            <el-button type="" size="small" @click="resetQuery">重置</el-button>
          </div>
        </div>
      </section>
      <div class="table-box">
        <div class="choose-num">
          <div>
            <el-button v-if="listQuery.status!==1" type="primary" size="small" @click="handleBatchUpDown(1)">批量上架</el-button>
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
                <p>门店编号：{{ chooseStore.stCode }}</p>
                <p>门店名称：{{ scope.row.storeName }}</p>
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
              <template v-if="scope.row.stPath">
                <el-image
                  style="width: 100px; height: 100px"
                  :src="scope.row.stPath"
                  lazy
                  fit="contain"
                  :preview-src-list="[`${scope.row.stPath}`]"
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
                v-if="listQuery.status!==1"
                type="primary"
                size="mini"
                @click="handleUpDown(scope.row)"
              >上架</el-button>
              <el-button v-if="listQuery.status!==0" type="danger" size="mini" @click="handleUpDown(scope.row)">下架</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div class="table-footer">
          <pagination
            :total="total"
            :page.sync="listQuery.currentPage"
            :limit.sync="listQuery.pageSize"
            @pagination="getList"
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
      <el-form ref="lockForm" :model="formData" label-width="100px" size="small">
        <el-form-item label="锁定商品属性">
          <el-checkbox-group v-model="lockFlag">
            <el-checkbox :label="1">价格</el-checkbox>
            <el-checkbox :label="2">库存</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="定时解锁设置">
          <el-checkbox v-model="formData.unlockType" :true-label="1" :false-label="0">定时解锁</el-checkbox>
        </el-form-item>
        <el-form-item label="解锁时间">
          <el-date-picker
            v-model="formData.unlockTime"
            value-format="yyyy-MM-dd HH:mm:ss"
            type="datetime"
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
      <el-input v-model="editData[type]" size="small" />
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
      groupData: [],
      chooseStore: {},
      loading: false,
      selectloading: false,
      listQuery: {
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
        'auditStatus': this.listQuery.auditStatus
      }
      this.getList()
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
      getTypeTree({ merCode: this.merCode, type: 2 }).then(res => {
        this.groupData = res.data
        this.groupData.unshift({ name: '全部', id: '' })
      })
    },
    _loadStoreList(val = '') { // 加载门店数据
      return new Promise((resolve, reject) => {
        getStoreList({ pageSize: 100, currentPage: 1, storeName: val }).then(res => {
          const { data } = res.data
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
      this.$nextTick(() => {
        setTimeout(() => {
          this.$refs.lockForm.resetField()
        }, 500)
      })
    },
    handleSetPriceStock() {
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
      this.subLoading = true
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
      setLockPrice(this.formData).then(res => {
        this.$message({
          message: '操作成功',
          type: 'success'
        })
        this.dialogVisible = false
        this.subLoading = false
      }).catch(() => {
        this.subLoading = true
        this.dialogVisible = false
      })
    },
    handleEditData(row, key) {
      this.editData = JSON.parse(JSON.stringify(row))
      this.type = key
      this.isShow = true
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
