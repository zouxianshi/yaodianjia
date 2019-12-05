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
              v-model="listQuery.orderSearchType"
              filterable
              placeholder="请输入关键词"
              :remote-method="remoteMethod"
              :loading="selectloading"
            >
              <el-option label="订单号" value="1" />
              <el-option label="收货人姓名" value="2" />
              <el-option label="收货人手机" value="3" />
              <el-option label="会员卡号" value="4" />
            </el-select>
          </div>
          <div class="search-item">
            <el-input
              v-model.trim="listQuery.searchValue"
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
                v-model="dateSelect"
                type="datetimerange"
                :picker-options="pickerOptions"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                align="right"
                format="yyyy-MM-dd HH:mm:ss"
                value-format="yyyy-MM-dd HH:mm:ss"
                @change="chooseTimeRange"
              />
            </div>
          </div>
        </div>
        <div class="search-form" style="margin-bottom:10px">
          <div class="search-item">
            <span class="label-name">商品名称</span>
            <el-input
              v-model.trim="listQuery.proName"
              size="small"
              placeholder="商品名称"
            />
          </div>
          <div class="search-item">
            <span class="label-name">订单类型</span>
            <el-select
              v-model="listQuery.orderType"
              filterable
              placeholder="订单类型"
              @change="handleChangeCommodityType"
            >
              <el-option label="处方药" value="R" />
              <el-option label="正常订单" value="N" />
              <el-option label="虚拟商品订单" value="V" />
            </el-select>
          </div>
          <div class="search-item">
            <span class="label-name">订单来源</span>
            <el-select
              v-model="listQuery.orderSource"
              filterable
              placeholder="订单来源"
              @change="handleChangeCommodityType"
            >
              <el-option label="微商城" value="1" />
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
              <el-option label="待付款" value="2" />
              <el-option label="待发货" value="4" />
              <el-option label="待收货" value="6" />
              <el-option label="待提货" value="7" />
              <el-option label="已完成" value="12" />
              <el-option label="待退款" value="10" />
              <!-- <el-option label="退货中" value="10" /> -->
              <el-option label="退款完成" value="30" />
              <el-option label="已取消" value="20" />
              <el-option label="退货中" value="8" />  <!--待退货  == 退货中-->
            </el-select>
          </div>
          <div class="search-item">
            <span class="label-name">收货方式</span>
            <el-select
              v-model="listQuery.receive"
              filterable
              placeholder="收货方式"
              @change="handleChangeCommodityType"
            >
              <!-- <el-option label="全部" value="0" /> -->
              <el-option label="普通快递" value="0" />
              <el-option label="配送上门" value="1" />
              <el-option label="门店自提" value="2" />
            </el-select>
          </div>
          <div class="search-item">
            <span class="label-name">配送方式</span>
            <el-select
              v-model="listQuery.distribution"
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
          <!-- <div class="search-item">
            <span class="label-name">接单员工</span>
            <el-select
              v-model="listQuery.empId"
              filterable
              placeholder="接单员工"
              @change="handleChangeCommodityType"
            >
              <el-option label="选择员工" value="1" />
              <el-option label="张三" value="2" />
              <el-option label="本本" value="3" />
            </el-select>
          </div> -->
          <div class="search-item">
            <span class="label-name">支付方式</span>
            <el-select
              v-model="listQuery.payment"
              filterable
              placeholder="支付方式"
              @change="handleChangeCommodityType"
            >
              <!-- <el-option label="全部" value="1" /> -->
              <el-option label="在线支付" value="0" />
              <el-option label="货到付款" value="1" />
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
        v-model="listQuery.orderStatus"
        size="small"
        @change="_loadList"
      >
        <el-radio-button label="">全部</el-radio-button>
        <el-radio-button label="2">待付款</el-radio-button>
        <el-radio-button label="4">
          待发货
          <template>
            <span class="badge">11</span>
          </template>
        </el-radio-button>
        <el-radio-button label="6">待收货</el-radio-button>
        <el-radio-button label="7">待提货</el-radio-button>
        <el-radio-button label="12">已完成</el-radio-button>
        <!-- <el-radio-button label="8">待退货</el-radio-button> -->
        <el-radio-button label="10">待退款</el-radio-button>
        <el-radio-button label="8">退货中</el-radio-button>
        <el-radio-button label="30">退款完成</el-radio-button>
        <el-radio-button label="20">已取消</el-radio-button>
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
          <div v-for="(item,index) in tableData" :key="index" class="order-table-body">
            <div class="order-detail-header">
              <div class="header-left">
                <div class="header-cell">
                  订单编号：
                </div>
                <div class="header-cell">
                  {{ item.serialNumber }}（{{ item.orderType | orderType }}）
                </div>
              </div>
              <div class="header-right">
                <div class="header-cell" @click="orderDetail(item.id)">
                  订单详情
                </div>
              </div>
            </div>
            <div class="order-detail-body">
              <div class="body-cell cell-left">
                <div class="goods-list">
                  <div v-for="(list,index2) in item.detailList" :key="index2" class="goods-item">
                    <div class="goods-img padding10">
                      <img src="" width="100" height="100">
                      <div
                        v-if="list.mpic && list.mpic!==''"
                      >
                        <div class="x-image__preview">
                          <el-image
                            fit="scale-down"
                            :src="showImg(list.mpic)"
                            :preview-src-list="[list.mpic]"
                          />
                        </div>
                      </div>
                      <div v-else style="line-height: 32px">暂无上传</div>
                    </div>
                    <div class="goods-info padding10">
                      <div class="goods-name" title="list.commodityName">{{ list.commodityName }}</div>
                      <div class="goods-state">({{ list.status }})</div>
                      <div class="goods-number marginTop20">{{ list.commodityCode }}</div>
                    </div>
                    <div class="goods-info padding10">
                      <div class="goods-price">￥{{ list.commodityPrice }}</div>
                      <div class="goods-num">({{ list.commodityNumber }}件)</div>
                      <div class="goods-remark marginTop20" @click="dialogRefundReasonVisible = true">查看退款理由</div>
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
                  <div>{{ item.orderTime }}</div>
                </div>
              </div>
              <div class="body-cell cell-right padding10">
                <div class="cell-text">
                  <template v-if="item.orderStatus===2">
                    <div>待付款</div>
                  </template>
                  <template v-if="item.orderStatus===4">
                    <div>待发货</div>
                    <div><el-button type="primary" size="mini" @click="dialogDeliveryVisible = true">立即发货</el-button></div>
                  </template>
                  <template v-if="item.orderStatus===7">
                    <div>待提货</div>
                    <div><el-button type="primary" size="mini" @click="dialogPickUpVisible = true">确认提货</el-button></div>
                  </template>
                  <!-- <template v-if="item.orderStatus===2">
                    <div>已发货</div>
                  </template> -->
                  <template v-if="item.orderStatus===10">
                    <div>待退款</div>
                    <div class="order_btn">
                      <el-button type="warning" size="mini" @click="dialogPendingRefundVisible = true">拒绝</el-button>
                      <el-button type="success" size="mini" @click="dialogPendingAgreeVisible = true">退款</el-button>
                    </div>
                  </template>
                  <template v-if="item.orderStatus===8">
                    <div>待退货</div>
                    <div><el-button type="primary" size="mini" @click="dialogConfirmReturnVisible = true">收到退货</el-button></div>
                  </template>
                  <template v-if="item.orderStatus===30">
                    <div>退款完成</div>
                  </template>
                  <template v-if="item.orderStatus===20">
                    <div>已取消</div>
                  </template>
                  <template v-if="item.orderStatus===12">
                    <div>已完成</div>
                  </template>
                </div>
              </div>
              <div class="body-cell cell-right padding10"><div class="cell-text">微商城</div></div>
              <div class="body-cell cell-right padding10"><div class="cell-text">{{ item.activityDiscountAmont }}</div></div>
              <div class="body-cell cell-right padding10">
                <div class="cell-text">
                  <div>￥{{ item.actuallyPaid }}</div>
                  <div>（含运费{{ item.actualFreightAmount }}元）</div>
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

    <!-- 立即发货弹出框 -->
    <el-dialog title="请选择发货商品" :show-close="false" width="40%" :visible.sync="dialogDeliveryVisible" append-to-body>
      <el-table
        ref="multipleTable"
        border
        size="small"
        :data="tableData"
        style="width: 100%;margin-top: 20px"
        max-height="256"
        @select-all="handleSelectAllChange"
        @select="handleSelect"
      >
        <el-table-column type="selection" align="center" width="50" />
        <el-table-column align="center" label="商品图片" width="120">
          <template slot-scope="scope">
            <div
              v-if="scope.row.mainPic && scope.row.mainPic!==''"
              class="x-img-mini"
              style="width: 60px; height: 36px"
            >
              <div class="x-image__preview">
                <el-image
                  fit="scale-down"
                  :src="showImg(scope.row.mainPic)"
                  :preview-src-list="[scope.row.imageUrl]"
                />
              </div>
            </div>
            <div v-else style="line-height: 32px">暂无上传</div>
          </template>
        </el-table-column>
        <el-table-column prop="commodityName" label="商品名称" min-width="150">
          <template slot-scope="scope">
            <div>{{ scope.row.name }}</div>
            <div>商品编码222222</div>
          </template>
        </el-table-column>
        <el-table-column prop="commodityName" label="单价/数量" align="right" min-width="150">
          <template slot-scope="scope">
            <div>规格 {{ scope.row.name }}</div>
            <div>￥90.00(3件)</div>
          </template>
        </el-table-column>
      </el-table>

      <!-- <el-form :model="form">
        <el-form-item label="活动名称" label-width="200">
          <el-input v-model="form.name" autocomplete="off" />
        </el-form-item>
        <el-form-item label="活动区域" label-width="200">
          <el-select v-model="form.region" placeholder="请选择活动区域">
            <el-option label="区域一" value="shanghai" />
            <el-option label="区域二" value="beijing" />
          </el-select>
        </el-form-item>
      </el-form> -->
      <el-form class="marginTop20">
        <el-form-item label="订单号：" prop="22113333333333" :label-width="labelWidth" />
        <!-- 普通发货 -->
        <template>
          <el-form-item label="快递公司：" :label-width="labelWidth">
            <el-select placeholder="请选择活动区域">
              <el-option label="申通" value="申通" />
              <el-option label="圆通" value="圆通" />
            </el-select>
          </el-form-item>
          <el-form-item label="快递单号：" prop="2333" :label-width="labelWidth">
            <el-input autocomplete="off" style="width:200px;" value="222" placeholder="请输入快递单号" size="small" />
          </el-form-item>
        </template>
        <!-- 配送发货 -->
        <template>
          <el-form-item label="配送员：" :label-width="labelWidth">
            <el-select placeholder="搜索">
              <el-option label="张三 131111111133" value="张三 131111111133" />
              <el-option label="李四 132323233332" value="李四 132323233332" />
            </el-select>
          </el-form-item>
          <el-form-item label="当前已选：" prop="李四 132323233332" :label-width="labelWidth" />
          <el-form-item label="常用配送员：" prop="2333" :label-width="labelWidth">
            <el-button type="">李国</el-button>
            <el-button type="">王一</el-button>
            <el-button type="">李大</el-button>
          </el-form-item>
        </template>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogDeliveryVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogDeliveryVisible = false">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 待退款 拒绝-->
    <el-dialog
      title="提示"
      :visible.sync="dialogPendingRefundVisible"
      width="30%"
      :before-close="handleClose"
      append-to-body
      :show-close="false"
    >
      <div>拒绝订单201905067591的退款吗？</div>
      <div>拒绝退款后买家将不能再次发起申请，请确保与买家协商一致后再拒绝 <a href="">联系买家</a></div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogPendingRefundVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogPendingRefundVisible = false">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 待退款 同意-->
    <el-dialog
      title="退款确认"
      :visible.sync="dialogPendingAgreeVisible"
      width="30%"
      :before-close="handleClose"
      append-to-body
      :show-close="false"
    >
      <el-form class="marginTop20">
        <el-form-item label="请输入退款金额：" :label-width="labelWidth">
          <el-input autocomplete="off" style="width:200px;" value="32" placeholder="请输入退款金额" size="small" />
        </el-form-item>
        <el-form-item label="快递单号：" prop="2333" :label-width="labelWidth">
          <div><span class="color-red">￥21.00</span> <span class="color-gray">(不可大于商品实付金额)</span></div>
        </el-form-item>
        <el-form-item label="请输入密码：" :label-width="labelWidth">
          <el-input autocomplete="off" style="width:200px;" value="33" placeholder="请输入密码" size="small" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogPendingAgreeVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogPendingAgreeVisible = false">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 待提货 确认提货-->
    <el-dialog
      title="请输入提货码"
      :visible.sync="dialogPickUpVisible"
      width="30%"
      :before-close="handleClose"
      append-to-body
      :show-close="false"
    >
      <el-form class="marginTop20">
        <el-input autocomplete="off" style="width:340px;margin-left:30px;" value="" placeholder="请输入提货码" size="small" />
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogPickUpVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogPickUpVisible = false">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 确认退货 收到退货-->
    <el-dialog
      title="确认退货"
      :visible.sync="dialogConfirmReturnVisible"
      width="30%"
      :before-close="handleClose"
      append-to-body
      :show-close="false"
    >
      <div style="text-align:center;font-size:18px">确认收到退货吗？</div>
      <div class="color-gray marginTop20" style="text-align:center">同意退款后将退回该待退款订单中的货款</div>
      <el-form class="marginTop20">
        <el-form-item label="请输入退款金额：" :label-width="labelWidth">
          <el-input autocomplete="off" style="width:200px;" value="" placeholder="请输入退款金额" size="small" />
        </el-form-item>
        <el-form-item label="快递单号：" prop="2333" :label-width="labelWidth">
          <div><span class="color-red">￥21.00</span> <span class="color-gray">(不可大于商品实付金额)</span></div>
        </el-form-item>
        <el-form-item label="请输入密码：" :label-width="labelWidth">
          <el-input autocomplete="off" style="width:200px;" value="" placeholder="请输入密码" size="small" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogConfirmReturnVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogConfirmReturnVisible = false">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 退款理由 -->
    <el-dialog
      title="退款理由"
      :visible.sync="dialogRefundReasonVisible"
      width="30%"
      :before-close="handleClose"
      append-to-body
      :show-close="false"
    >
      <el-form class="marginTop20">
        <el-form-item label="退款原因：" :label-width="labelWidth100">
          <!-- <template slot-scope="scope"> -->
          <div>退款原因</div>
          <!-- </template> -->
        </el-form-item>
        <el-form-item label="退款说明：" :label-width="labelWidth100">
          <!-- <template slot-scope="scope"> -->
          <div>退款说明退款说明退款说明退款说明退款说明退款说明退款说明退款说明退款说明退款说明退款说明退款说明</div>
          <!-- </template> -->
        </el-form-item>
        <el-form-item label="图片凭证：" :label-width="labelWidth100">
          <!-- <template slot-scope="scope"> -->
          <div><img src="" width="100" height="100"> <img src="" width="100" height="100"> <img src="" width="100" height="100"></div>
          <!-- </template> -->
        </el-form-item>
        <div class="float-right">
          <a href="">联系买家</a>
        </div>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogRefundReasonVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogRefundReasonVisible = false">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>
<script>
import mixins from '@/utils/mixin'
import Pagination from '@/components/Pagination'
import { mapGetters } from 'vuex'
// import { getTypeTree } from '@/api/group'
// import { getStoreGoodsList } from '@/api/store-goods'
import { getStoreList } from '@/api/depot'
import { getOrderList } from '@/api/order'
export default {
  components: { Pagination },
  filters: {
    orderType: function(value) {
      if (value === 'N') {
        return '正常订单'
      }
      if (value === 'R') {
        return '处方药'
      }
      if (value === 'V') {
        return '虚拟商品订单'
      }
    }
  },
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
      // value1: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
      dateSelect: [], // 选择下单时间
      keyword: '',
      tableData: [
        {
          'activityDiscountAmont': 0,
          'actualFreightAmount': 7,
          'actuallyPaid': 130.00,
          'amountTobepaid': 0,
          'cancelName': 'string',
          'cancelReason': 'string',
          'cancelTime': '2019-12-05T03:14:34.723Z',
          'couponDeduction': 0,
          'deliveryCode': 0,
          'deliveryType': 0,
          'detailList': [
            {
              'commodityCode': 'string',
              'commodityId': 'string',
              'commodityName': 'string',
              'commodityNumber': 0,
              'commodityPrice': 0,
              'commodityType': 0,
              'costPrice': 0,
              'couponAmount': 0,
              'createName': 'string',
              'createTime': '2019-12-05T03:14:34.723Z',
              'id': '1',
              'isCombinedCommodity': 0,
              'isMainCommodity': 0,
              'isPromotion': 0,
              'isvalid': 0,
              'mainCommodityCode': 'string',
              'merCode': 'string',
              'modifyName': 'string',
              'modifyTime': '2019-12-05T03:14:34.723Z',
              'mpic': 'string',
              'mprice': 0,
              'orderId': 'string',
              'packageId': 'string',
              'promotionId': 'string',
              'returnRequestId': 'string',
              'skuValue': 'string',
              'status': 0,
              'totalActualAmount': 0,
              'totalAmount': 0
            },
            {
              'commodityCode': 'string',
              'commodityId': 'string',
              'commodityName': 'string',
              'commodityNumber': 0,
              'commodityPrice': 0,
              'commodityType': 0,
              'costPrice': 0,
              'couponAmount': 0,
              'createName': 'string',
              'createTime': '2019-12-05T03:14:34.723Z',
              'id': '2',
              'isCombinedCommodity': 0,
              'isMainCommodity': 0,
              'isPromotion': 0,
              'isvalid': 0,
              'mainCommodityCode': 'string',
              'merCode': 'string',
              'modifyName': 'string',
              'modifyTime': '2019-12-05T03:14:34.723Z',
              'mpic': 'string',
              'mprice': 0,
              'orderId': 'string',
              'packageId': 'string',
              'promotionId': 'string',
              'returnRequestId': 'string',
              'skuValue': 'string',
              'status': 0,
              'totalActualAmount': 0,
              'totalAmount': 0
            }
          ],
          'id': '3334444444444',
          'integralDeduction': 0,
          'isBorderOrder': 0,
          'isInvoice': 0,
          'isLocked': 0,
          'isNew': 0,
          'isNewCustomer': 0,
          'isPageOrder': 0,
          'isPushErp': 0,
          'lockedName': 'string',
          'lockedTime': '2019-12-05T03:14:34.723Z',
          'memberId': 0,
          'merCode': 'string',
          'orderMessage': 'string',
          'orderRemark': 'string',
          'orderStatus': 4,
          'orderTime': '2019-12-05 03:14:34',
          'orderType': 'N',
          'originalFreightAmount': 0,
          'otherDiscountAmont': 0,
          'payMode': 0,
          'payStatus': 0,
          'payTime': '2019-12-05T03:14:34.723Z',
          'payType': 0,
          'prescriptionSheetMark': 'string',
          'prescriptionStatus': 0,
          'pushErpTime': '2019-12-05T03:14:34.723Z',
          'refundAmount': 0,
          'serialNumber': '1111111111111',
          'sourceChannel': 'string',
          'sourceMedia': 'string',
          'storeId': 'string',
          'storeName': 'string',
          'systemCheck': 0,
          'totalActualOrderAmount': 0,
          'totalGoodsNumber': 0,
          'totalOrderAmount': 0
        }
      ],
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
        'distribution': '', // 配送方式
        'empId': '', // 接单员工
        'endDate': '', // 下单结束时间
        'merCode': '',
        'orderSearchType': '', // 订单搜索类型 1.订单号 2.收货人姓名 3.收货人手机 4.会员卡号
        'orderSource': '', // 订单来源 1.微商城
        'orderStatus': '', // 订单状态 2.待付款 4.待发货 6.待收货(门店自提=待提货) ===已发货 8.待退货 10.待退款 12.已完成 20.已取消 30.退款完成
        'orderType': '', // 订单类型 1.微商城订单
        'payment': '', // 支付方式
        'proName': '', // 商品名称
        'receive': '', // 收货方式
        'searchValue': '', // 搜索内容
        'startDate': '', // 下单开始时间
        'storeId': '' // 下单门店id
      },
      storeList: [],
      subLoading: false,
      editData: 0,
      type: 'price',
      isShow: false,
      dialogDeliveryVisible: false, // 立即发货
      dialogPendingRefundVisible: false, // 退款拒绝
      dialogPendingAgreeVisible: false, // 退款同意
      dialogPickUpVisible: false, // 确认提货
      dialogConfirmReturnVisible: false, // 确认退货
      dialogRefundReasonVisible: false, // 查看退款理由
      labelWidth: '170px',
      labelWidth100: '100px',
      mySelectList: [] // 选择的商品
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
        'distribution': '', // 配送方式
        'empId': '', // 接单员工
        'endDate': '', // 下单结束时间
        'merCode': this.merCode,
        'orderSearchType': '', // 订单搜索类型 1.订单号 2.收货人姓名 3.收货人手机 4.会员卡号
        'orderSource': '', // 订单来源 1.微商城
        'orderStatus': '', // 订单状态 2.待付款 4.待发货 6.待收货(门店自提=7.待提货) 8.待退货 10.待退款 12.已完成 20.已取消 30.退款完成
        'orderType': '', // 订单类型 1.微商城订单
        'payment': '', // 支付方式
        'proName': '', // 商品名称
        'receive': '', // 收货方式
        'searchValue': '', // 搜索内容
        'startDate': '', // 下单开始时间
        'storeId': '' // 下单门店id
      }
      this.dateSelect = '' // 下单时间置空
      this.getList()
    },
    getList() {
      this._loadStoreList().then(res => {
        if (res) {
          // this.listQuery.storeId = res[0] ? res[0].id : ''
          // this.chooseStore = res[0]

          this._loadList()
        }
      })
    },
    _loadList() {
      this.loading = true
      getOrderList(this.listQuery).then(res => {
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
    chooseTimeRange(date) { // 时间选择
      if (date && date.length !== 0) {
        this.listQuery.startDate = this.dateSelect[0]
        this.listQuery.endDate = this.dateSelect[1]
      }
    },
    orderDetail(id) { // 跳转订单详情
      this.$router.push({
        path: '/orders-manage/all-orders/details',
        query: { id: id }
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
    handleClose() {
      this.reset()
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
    // 选取商品 表格选取（全选/反选），更新 mySelectList
    handleSelectAllChange(allList) {
      this.tableData.forEach(item => {
        const index = this.mySelectList.findIndex(mItem => {
          return mItem.commodityId === item.commodityId
        })
        // this.referPrice = item.mprice
        // item.price = ''
        // this.number = 0
        if (index > -1) {
          if (allList.length > 0) {
            console.log('已存在' + item.commodityId + ':' + item.commodityName)
          } else {
            // 反选
            this.mySelectList.splice(index, 1)
          }
        } else {
          this.mySelectList.push(item)
        }
      })
      // console.log('mySelectList:', this.mySelectList)
    },
    reset() {
      this.pager = {
        current: 1,
        size: 10,
        total: 0
      }
      this.search = {
        keyWord: ''
      }
    },
    // 选取商品 表格选取（单选/取消），更新 mySelectList
    handleSelect(val, row) {
      const index = this.mySelectList.findIndex(mItem => {
        return mItem.commodityId === row.commodityId
      })
      if (index > -1) {
        this.mySelectList.splice(index, 1)
      } else {
        this.mySelectList.push(row)
      }
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
          cursor: pointer;
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
.color-red{color:red;}
.color-gray{color:#aaa;}
.float-right{float:right}
</style>
