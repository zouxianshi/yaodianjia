<template>
  <div class="app-container">
    <div class="store-goods-wrapper">

      <section @keydown.enter="_loadList">
        <div
          class="search-form"
          style="margin-top:20px;margin-bottom:10px"
        >
          <div class="search-item">
            <span class="label-name">订单搜索</span>
            <el-select
              v-model="listQuery.storeId"
              filterable
              placeholder="请输入关键词"
              :remote-method="remoteMethod"
              :loading="selectloading"
              @change="handleChangeStore"
            >
              <el-option label="订单号" value="订单号" />
              <el-option label="收货人姓名" value="收货人姓名" />
              <el-option label="收货人手机" value="收货人手机" />
              <el-option label="会员卡号" value="会员卡号" />
            </el-select>
          </div>
          <div class="search-item">
            <el-input
              v-model.trim="listQuery.name"
              size="small"
              placeholder=""
            />
          </div>
        </div>
        <div class="search-form" style="margin-bottom:10px">
          <div class="search-item">
            <div class="block">
              <span class="label-name">下单时间</span>
              <el-date-picker
                v-model="value2"
                type="datetimerange"
                :picker-options="pickerOptions"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                align="right"
              />
            </div>
          </div>
        </div>
        <div class="search-form" style="margin-bottom:10px">
          <div class="search-item">
            <span class="label-name">商品名称</span>
            <el-input
              v-model.trim="listQuery.barCode"
              size="small"
              placeholder="商品名称"
            />
          </div>
          <div class="search-item">
            <span class="label-name">订单类型</span>
            <el-select
              v-model="listQuery.commodityType"
              filterable
              placeholder="订单类型"
              @change="handleChangeCommodityType"
            >
              <el-option label="全部" value="1" />
              <el-option label="普通订单" value="2" />
              <el-option label="处方药订单" value="3" />
              <el-option label="积分订单" value="4" />
            </el-select>
          </div>
          <div class="search-item">
            <span class="label-name">订单来源</span>
            <el-select
              v-model="listQuery.commodityType"
              filterable
              placeholder="订单来源"
              @change="handleChangeCommodityType"
            >
              <el-option label="全部" value="1" />
              <el-option label="微商城" value="2" />
              <el-option label="小程序" value="3" />
            </el-select>
          </div>
        </div>
        <div class="search-form" style="margin-bottom:10px">
          <div class="search-item">
            <span class="label-name">订单状态</span>
            <el-select
              v-model="listQuery.commodityType"
              filterable
              placeholder="订单状态"
              @change="handleChangeCommodityType"
            >
              <el-option label="全部" value="0" />
              <el-option label="待付款" value="1" />
              <el-option label="待发货" value="2" />
              <el-option label="待收货" value="3" />
              <el-option label="待提货" value="4" />
              <el-option label="已完成" value="5" />
              <el-option label="待退款" value="6" />
              <el-option label="退货中" value="7" />
              <el-option label="退款完成" value="8" />
              <el-option label="已取消" value="9" />
            </el-select>
          </div>
          <div class="search-item">
            <span class="label-name">收货方式</span>
            <el-select
              v-model="listQuery.commodityType"
              filterable
              placeholder="收货方式"
              @change="handleChangeCommodityType"
            >
              <el-option label="全部" value="1" />
              <el-option label="普通快递" value="2" />
              <el-option label="配送上门" value="3" />
              <el-option label="门店自提" value="4" />
            </el-select>
          </div>
          <div class="search-item">
            <span class="label-name">配送方式</span>
            <el-select
              v-model="listQuery.commodityType"
              filterable
              placeholder="配送方式"
              @change="handleChangeCommodityType"
            >
              <el-option label="全部" value="1" />
              <el-option label="快递配送" value="2" />
              <el-option label="门店员工配送" value="3" />
            </el-select>
          </div>
        </div>
        <div class="search-form" style="margin-bottom:10px">
          <div class="search-item">
            <span class="label-name">所在门店</span>
            <el-select
              v-model="listQuery.commodityType"
              filterable
              placeholder="所在门店"
              @change="handleChangeCommodityType"
            >
              <el-option label="搜索" value="1" />
              <el-option label="海典麓谷店" value="2" />
              <el-option label="海典麓谷店2" value="3" />
            </el-select>
          </div>
          <div class="search-item">
            <span class="label-name">接单员工</span>
            <el-select
              v-model="listQuery.commodityType"
              filterable
              placeholder="接单员工"
              @change="handleChangeCommodityType"
            >
              <el-option label="选择员工" value="1" />
              <el-option label="张三" value="2" />
              <el-option label="本本" value="3" />
            </el-select>
          </div>
          <div class="search-item">
            <span class="label-name">支付方式</span>
            <el-select
              v-model="listQuery.commodityType"
              filterable
              placeholder="支付方式"
              @change="handleChangeCommodityType"
            >
              <el-option label="全部" value="1" />
              <el-option label="在线支付" value="2" />
              <el-option label="货到付款" value="3" />
              <el-option label="到店支付" value="4" />
            </el-select>
          </div>
        </div>
        <div class="search-form" style="margin-bottom:10px;margin-left:80px">
          <div class="search-item">
            <el-button type="primary" size="small" @click="_loadList">查询</el-button>
            <el-button type="" size="small" @click="resetQuery">重置</el-button>
          </div>
        </div>
      </section>
      <el-radio-group
        v-model="listQuery.status"
        size="small"
        @change="_loadList"
      >
        <el-radio-button :label="1">全部</el-radio-button>
        <el-radio-button :label="0">待付款</el-radio-button>
        <el-radio-button :label="2">
          待发货
          <template>
            <span class="badge">11</span>
          </template>
        </el-radio-button>
        <el-radio-button :label="3">待收货</el-radio-button>
        <el-radio-button :label="2">待提货</el-radio-button>
        <el-radio-button :label="3">已完成</el-radio-button>
        <el-radio-button :label="2">待退款</el-radio-button>
        <el-radio-button :label="3">退货中</el-radio-button>
        <el-radio-button :label="2">退款完成</el-radio-button>
        <el-radio-button :label="3">已取消</el-radio-button>
      </el-radio-group>
      <div class="table-box">
        <div class="order-table">
          <div class="order-table-header">
            <div class="header-left">
              <div class="header-cell">商品</div>
              <div class="header-cell">商品编号</div>
              <div class="header-cell">单价/数量</div>
            </div>
            <div class="header-cell">收货人</div>
            <div class="header-cell">下单时间</div>
            <div class="header-cell">订单状态</div>
            <div class="header-cell">订单来源</div>
            <div class="header-cell">优惠金额</div>
            <div class="header-cell">实付金额</div>
          </div>
          <div class="order-table-body">
            <div class="order-detail-header">
              <div class="header-left">
                <div class="header-cell">
                  订单编号：
                </div>
                <div class="header-cell">
                  888888***********（处方药订单）
                </div>
              </div>
              <div class="header-right">
                <div class="header-cell">
                  订单详情
                </div>
              </div>
            </div>
            <div class="order-detail-body">
              <div class="body-cell cell-left">
                <div class="goods-list">
                  <div class="goods-item">
                    <div class="goods-img padding10">
                      <img src="" width="100" height="100">
                    </div>
                    <div class="goods-info padding10">
                      <div class="goods-name" title="邦迪创可贴邦迪创可贴">邦迪创可贴</div>
                      <div class="goods-state">(退款完成)</div>
                      <div class="goods-number marginTop20">000001</div>
                    </div>
                    <div class="goods-info padding10">
                      <div class="goods-price">￥90.00</div>
                      <div class="goods-num">(1件)</div>
                      <div class="goods-remark marginTop20">查看退款理由</div>
                    </div>
                  </div>

                  <div class="goods-item">
                    <div class="goods-img padding10">
                      <img src="" width="100" height="100">
                    </div>
                    <div class="goods-info padding10">
                      <div class="goods-name" title="邦迪创可贴邦迪创可贴">邦迪创可贴</div>
                      <div class="goods-state">(退款完成)</div>
                      <div class="goods-number marginTop20">000001</div>
                    </div>
                    <div class="goods-info padding10">
                      <div class="goods-price">￥90.00</div>
                      <div class="goods-num">(1件)</div>
                      <div class="goods-remark marginTop20">查看退款理由</div>
                    </div>
                  </div>

                  <div class="goods-item">
                    <div class="goods-img padding10">
                      <img src="" width="100" height="100">
                    </div>
                    <div class="goods-info padding10">
                      <div class="goods-name" title="邦迪创可贴邦迪创可贴">邦迪创可贴</div>
                      <div class="goods-state">(退款完成)</div>
                      <div class="goods-number marginTop20">000001</div>
                    </div>
                    <div class="goods-info padding10">
                      <div class="goods-price">￥90.00</div>
                      <div class="goods-num">(1件)</div>
                      <div class="goods-remark marginTop20">查看退款理由</div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="body-cell cell-right padding10">
                <div class="cell-text">
                  <div>收货人</div>
                  <div>131****9723</div>
                </div>
              </div>
              <div class="body-cell cell-right padding10">
                <div class="cell-text">
                  <div>2019-01-11</div>
                  <div>12:11:12</div>
                </div>
              </div>
              <div class="body-cell cell-right padding10">
                <div class="cell-text">
                  <template>
                    <div>待付款</div>
                  </template>
                  <template>
                    <div>待发货</div>
                    <div><input type="button" value="立即发货"></div>
                  </template>
                  <template>
                    <div>待提货</div>
                  </template>
                  <template>
                    <div>待发货</div>
                    <div><input type="button" value="立即发货"></div>
                  </template>
                  <template>
                    <div>已发货</div>
                  </template>
                  <template>
                    <div>待退款</div>
                    <div><input type="button" value="拒绝"> <input type="button" value="退款"></div>
                  </template>
                  <template>
                    <div>退货中</div>
                    <div><input type="button" value="收到退货"></div>
                  </template>
                  <template>
                    <div>已取消</div>
                  </template>
                  <template>
                    <div>已完成</div>
                  </template>
                </div>
              </div>
              <div class="body-cell cell-right padding10"><div class="cell-text">微商城</div></div>
              <div class="body-cell cell-right padding10"><div class="cell-text">0.00</div></div>
              <div class="body-cell cell-right padding10">
                <div class="cell-text">
                  <div>￥90.00</div>
                  <div>（含运费0.00元）</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- <div class="table-box">
        <div class="listheader">
          <div class="goods_title">
            <div class="padding10"><span>商品</span></div>
            <div class="padding10"><span>商品编码</span></div>
            <div class="padding10"><span>单价/数量</span></div>
          </div>

          <div class="padding10"><span>收货人</span></div>
          <div class="padding10"><span>下单时间</span></div>
          <div class="padding10"><span>订单来源</span></div>
          <div class="padding10"><span>优惠金额</span></div>
          <div class="padding10"><span>实付金额</span></div>
        </div>

        <div class="order_detail_title">
          <div class="left">订单号：23222223223（处方药订单）</div>
          <div class="right">订单详情</div>
        </div>
        <div class="listheader">
          <div class="order_shop_con border_right">
            <div class="goods_list">
              <div class="goods_item">
                <div class="goods_img">
                  <div><img width="100" height="100" src="https://centermerchant-test.oss-cn-shanghai.aliyuncs.com/ydjia-merchant-manager/666666/img/20191121/baba62d52f7642498ce66e9aa4102dda.jpg"></div>
                </div>
                <div class="good_item_center">
                  <p>邦迪创可贴</p>
                  <p class="color_red">(退款完成)</p>
                  <p>0000001</p>
                </div>
                <div class="goods_item_right">
                  <p>90(件)</p>
                  <p>(1件)</p>
                  <p class="color_green">查看退款理由</p>
                </div>
              </div>

              <div class="goods_item">
                <div class="goods_img">
                  <div><img width="100" height="100" src="https://centermerchant-test.oss-cn-shanghai.aliyuncs.com/ydjia-merchant-manager/666666/img/20191121/baba62d52f7642498ce66e9aa4102dda.jpg"></div>
                </div>
                <div class="good_item_center">
                  <p>邦迪创可贴</p>
                  <p>(退款完成)</p>
                  <p>0000001</p>
                </div>
                <div class="goods_item_right">
                  <p>90（件）</p>
                  <p>(1件)</p>
                  <p>查看退款理由</p>
                </div>
              </div>
            </div>
          </div>
          <div class="padding10 border_right"><span class="sort">收货人</span></div>
          <div class="padding10 border_right"><span class="sort">下单时间</span></div>
          <div class="padding10 border_right"><span class="sort">订单来源</span></div>
          <div class="padding10 border_right"><span class="sort">优惠金额</span></div>
          <div class="padding10"><span>实付金额</span></div>
        </div>

      </div> -->

      <div class="table-footer">
        <pagination
          :total="total"
          :page.sync="listQuery.currentPage"
          :limit.sync="listQuery.pageSize"
          @pagination="_loadList"
        />
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
      pickerOptions: { // 时间控件相关
        shortcuts: [{
          text: '今天',
          onClick(picker) {
            const end = new Date()
            let start = new Date()
            const year = new Date().getFullYear()
            const month = new Date().getMonth() + 1
            const day = new Date().getDate()
            start = year + '-' + month + '-' + day + ' ' + '00:00:00'
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '昨天',
          onClick(picker) {
            let end = new Date()
            let start = new Date()
            const year = new Date().getFullYear()
            const month = new Date().getMonth() + 1
            const day = new Date().getDate() - 1
            start = year + '-' + month + '-' + day + ' ' + '00:00:00'
            end = year + '-' + month + '-' + day + ' ' + '23:59:59'
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近7天',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近30天',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }
        // }, {
        //   text: '最近三个月',
        //   onClick(picker) {
        //     const end = new Date()
        //     const start = new Date()
        //     start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
        //     picker.$emit('pick', [start, end])
        //   }
        // }
        ]
      },
      value1: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
      value2: '',
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
      if (!this.listQuery.storeId) {
        this.$message({
          message: '请选择门店',
          type: 'error'
        })
        return
      }
      this.loading = true
      console.log('this.listQuery--xf:', this.listQuery)
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
//订单详情
.order-table{
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  // height: 100vh;

  .order-table-header{
    background: #ebebeb;
    padding: 10px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    border: solid 1px #dfe6ec;

    .header-left{
      display: flex;
      justify-content: flex-start;
      align-items: center;
      width: 30vw;
      .header-cell{
        flex: 1;
        text-align: center;
      }
    }
    .header-cell{
      color: #606266;
      font-size: 14px;
      flex: 1;
      text-align: center;
    }
  }
  .order-table-body{
    margin: 10px 0 0 0;
    border: solid 1px #dfe6ec;
    .order-detail-header{
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: solid 1px #dfe6ec;
      padding:10px;
      background:#f8f8f9;
      .header-left{
        display: flex;
        justify-content: flex-start;
        align-items: center;
        .header-cell{
          color: #606266;
          font-size: 14px;

        }
      }
      .header-right{
        .header-cell{
          color: blue;
          font-size: 14px;
        }
      }
    }
    .order-detail-body{
      display: flex;
      justify-content: center;
      align-items: stretch;
      .body-cell{
        flex: 1;
        font-size: 14px;
        color: #606266;
        line-height: 22px;
        &:nth-last-child(1){
          border-right: none;
        }
        &.cell-left{
          border-right: 1px solid #dfe6ec
        }
        &.cell-right{
          display: flex;
          justify-content: center;
          align-items: center;
          flex: 1;
          border-right: 1px solid #dfe6ec;
          .cell-text{
            text-align: center;
          }
        }
        .goods-list{
          width: 30vw;
          .goods-item{
            display: flex;
            // justify-content: flex-start;
            // align-items: center;
            border-bottom: solid 1px #dfe6ec;
            &:nth-last-child(1){
              border-bottom: none;
            }
            .goods-img{
              width: 100px;
              height: 100px;
              overflow: hidden;
              img{
                width: 100%;
                height: 100%;
              }
            }
            .goods-info{
              flex: 1;
              .goods-name{
                text-align: left;
                overflow: hidden;
                text-overflow:ellipsis;
                white-space:nowrap;
                width: 200px;
              }
              .goods-state{
                color:red;
                text-align: left;
              }
              .goods-number{
                text-align: left;
              }
            }
            .goods-info{
              flex: 1;
              .goods-price{
                text-align: right;
              }
              .goods-num{
                text-align: right;
              }
              .goods-remark{
                text-align: right;
                color: green;
                align-items: flex-end;
                align-content:space-between;
              }
            }
          }
        }
      }
    }
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
.badge{
  background: red;
  color:#fff;
  position: absolute;
  top: 3px;
  border-radius: 50%;
  padding: 2px;
  right: 10px;
}

.padding10{padding:10px;}
.marginTop20{ margin-top: 20px;}

.el-date-range-picker{left:270px!important} //时间控件弹出框
.el-radio-button--small .el-radio-button__inner{padding:12px 30px}
</style>
