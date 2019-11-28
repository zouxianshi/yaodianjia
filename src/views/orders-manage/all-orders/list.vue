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
              v-model="listQuery.orderStatus"
              filterable
              placeholder="订单状态"
              @change="handleChangeOrderStatus"
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
        <el-radio-button :label="2">待付款</el-radio-button>
        <el-radio-button :label="3">
          待发货
          <template>
            <span class="badge">11</span>
          </template>
        </el-radio-button>
        <el-radio-button :label="4">待收货</el-radio-button>
        <el-radio-button :label="5">待提货</el-radio-button>
        <el-radio-button :label="6">已完成</el-radio-button>
        <el-radio-button :label="7">待退款</el-radio-button>
        <el-radio-button :label="8">退货中</el-radio-button>
        <el-radio-button :label="9">退款完成</el-radio-button>
        <el-radio-button :label="10">已取消</el-radio-button>
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
                    <div><el-button type="primary" size="mini">立即发货</el-button></div>
                  </template>
                  <template>
                    <div>待提货</div>
                    <div><el-button type="primary" size="mini">确认提货</el-button></div>
                  </template>
                  <template>
                    <div>已发货</div>
                  </template>
                  <template>
                    <div>待退款</div>
                    <div class="order_btn">
                      <el-button type="warning" size="mini">拒绝</el-button>
                      <el-button type="success" size="mini">退款</el-button>
                    </div>
                  </template>
                  <template>
                    <div>退货中</div>
                    <div><el-button type="primary" size="mini">收到退货</el-button></div>
                  </template>
                  <template>
                    <div>退款完成</div>
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
</template>
<script>
import mixins from '@/utils/mixin'
import Pagination from '@/components/Pagination'
import { mapGetters } from 'vuex'
// import { getTypeTree } from '@/api/group'
import { getStoreGoodsList } from '@/api/store-goods'
import { getStoreList } from '@/api/depot'
export default {
  components: { Pagination },
  mixins: [mixins],
  data() {
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
    handleChangeOrderStatus(val) { // 订单状态改变时触发
      this.storeList.map(v => {
        if (v.id === val) {
          this.chooseStore = v
        }
      })
      this.listQuery.currentPage = 1
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

.order_btn button{
  width: 40px;
  text-align: center;
  padding-left:0;
  padding-right:0;
}
</style>
