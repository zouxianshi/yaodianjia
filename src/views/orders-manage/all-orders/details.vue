<template>
  <div class="app-container">
    <div class="store-goods-wrapper">
      <div class="wrapper">
        <div class="item">
          <div class="item-left">订单号：201905066703</div>
          <div class="item-right"><el-button type="primary" size="mini">补推至ERP</el-button></div>
        </div>
        <div class="item">
          <div class="item-left">
            <div class="color-red item-text">已关闭</div>
          </div>
          <div class="item-right">
            <el-tag type="success">在线支付</el-tag>
            <el-tag type="warning">普通快递</el-tag>
          </div>
        </div>
      </div>

      <!-- 商品购买信息 -->
      <div class="info">
        <div class="info-item">
          <div class="title">购买人信息</div>
          <div class="con">账号：13147029739</div>
          <div class="con">会员卡：201911261</div>
          <div class="con">姓名：金慧慧</div>
          <div class="con">身份证号：371324198801045240</div>
        </div>
        <div class="info-item">
          <div class="title">收货人信息</div>
          <div class="con">姓名：肖徐</div>
          <div class="con">电话：13874646464</div>
          <div class="con">
            <div class="lh18">地址：湖南省 长沙市 望城区 千金大药房(自在城店)（S101(雷锋大道)） 嗲嗲</div>
          </div>
          <div class="con">服务：无</div>
          <div class="con">发票：不要发票</div>
          <div class="con">备注：</div>
        </div>
        <div class="info-item">
          <div class="title">订单信息</div>
          <div class="con">下单时间：2019-11-27 16:50:12</div>
          <div class="con">下单门店：B2C商城</div>
          <div class="con">发货门店：海典大药房总部</div>
          <div class="con">收货方式：送货上门</div>
          <div class="con">订单来源：药店加微信B2C</div>
          <div class="con">订单类型：普通订单</div>
          <div class="con">配送方式：快递配送</div>
        </div>
        <div class="info-item">
          <div class="title">付款信息</div>
          <div class="con">付款方式：在线支付</div>
          <div class="con">商品总额：￥21.00</div>
          <div class="con">运费：￥7.00</div>
          <div class="con">优惠：￥10.00</div>
          <div class="con">应付总额：￥18.0</div>
        </div>
        <div class="info-item">
          <div class="title">操作人信息</div>
          <div class="con">推广员：	无</div>
          <div class="con">退款操作人：	无</div>
          <div class="con">退款申请时间：	</div>
          <div class="con">退款处理时间：	</div>
        </div>
      </div>

      <!-- 物流信息 -->
      <div class="info">
        <div class="info-item info-left">
          <div class="title">配送信息</div>
          <div class="con">配送方式：快递配送</div>
          <div class="con">快递公司：盛辉物流</div>
          <div class="con">发货门店：海典大药房总部</div>
          <div class="con">快递单号：222222</div>
        </div>
        <div class="info-item info-right">
          <div class="title">物流信息</div>
          <div class="block">
            <el-timeline>
              <el-timeline-item
                v-for="(logistical, index) in logisticals"
                :key="index"
                :icon="logistical.icon"
                :type="logistical.type"
                :color="logistical.color"
                :size="logistical.size"
                :timestamp="logistical.timestamp"
                :hide-timestamp="true"
                :placement="bottom"
              >
                {{ logistical.content }}
              </el-timeline-item>
            </el-timeline>
          </div>
        </div>
      </div>

      <!-- 商品 -->
      <div class="table-box">
        <div class="detail-table">
          <div class="detail-table-header">
            <div class="header-left">
              <div class="header-cell">商品名称</div>
              <div class="header-cell">&nbsp;</div>
              <div class="header-cell">商品编码</div>
            </div>
            <div class="header-middle">
              <div class="header-cell">单价（元）</div>
              <div class="header-cell">数量</div>
              <div class="header-cell">小计（元）</div>
              <div class="header-cell">药店加优惠</div>
              <div class="header-cell">状态</div>
            </div>
            <div class="header-right">
              <div class="header-cell">运费（元）</div>
            </div>
          </div>

          <div class="detail-table-body">
            <div class="body-cell body-left">
              <div class="detail-list">
                <div class="detail-item">
                  <div class="detail-item-left">
                    <div class="item-cell cell-con">
                      <div class="cell-text"><img src="" width="100" height="100"></div>
                    </div>
                    <div class="item-cell cell-con">
                      <div class="cell-text">2222</div>
                    </div>
                    <div class="item-cell cell-con">
                      <div class="cell-text">2222</div>
                    </div>
                  </div>
                  <div class="detail-item-middle">
                    <div class="item-cell cell-con">
                      <div class="cell-text">2222</div>
                    </div>
                    <div class="item-cell cell-con">
                      <div class="cell-text">2222</div>
                    </div>
                    <div class="item-cell cell-con">
                      <div class="cell-text">2222</div>
                    </div>
                    <div class="item-cell cell-con">
                      <div class="cell-text">2222</div>
                    </div>
                    <div class="item-cell cell-con">
                      <div class="cell-text">2222</div>
                    </div>
                  </div>
                </div>
                <div class="detail-item">
                  <div class="detail-item-left">
                    <div class="item-cell cell-con">
                      <div class="cell-text"><img src="" width="100" height="100"></div>
                    </div>
                    <div class="item-cell cell-con">
                      <div class="cell-text">2222</div>
                    </div>
                    <div class="item-cell cell-con">
                      <div class="cell-text">2222</div>
                    </div>
                  </div>
                  <div class="detail-item-middle">
                    <div class="item-cell cell-con">
                      <div class="cell-text">2222</div>
                    </div>
                    <div class="item-cell cell-con">
                      <div class="cell-text">2222</div>
                    </div>
                    <div class="item-cell cell-con">
                      <div class="cell-text">2222</div>
                    </div>
                    <div class="item-cell cell-con">
                      <div class="cell-text">2222</div>
                    </div>
                    <div class="item-cell cell-con">
                      <div class="cell-text">2222</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="body-cell body-right">
              <div class="cell-text">￥7.00元</div>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>
<script>
import mixins from '@/utils/mixin'
import { mapGetters } from 'vuex'
export default {
  mixins: [mixins],
  data() {
    return {
      tableData: [],
      dialogVisible: false,
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
      logisticals: [{ // 物流信息
        content: '2019-10-14 07:24:31[淮北市]离开【淮北邮件处理中心】,下一站【淮北濉溪韩村支局】',
        timestamp: '2019-10-14 07:24:31',
        color: 'red'
      }, {
        content: '2019-10-13 12:37:49[淮北市]到达【淮北邮件处理中心】',
        timestamp: '2019-10-13 12:37:49',
        size: 'large'
      }, {
        content: '2019-10-10 14:05:59[合肥市]到达【合肥中心】',
        timestamp: '2019-10-10 14:05:59',
        size: 'large'
      }, {
        content: '2019-10-10 12:56:13[合肥市]【邮政合肥市包裹业务局】已收件,揽投员:周磊,电话:15156693985',
        timestamp: '2019-10-10 12:56:13'
      }],
      subLoading: false
    }
  },
  computed: {
    ...mapGetters(['merCode', 'name'])
  },
  created() {

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

// 商品状态
.wrapper{
  width: 100%;
  border: 1px solid #dfe6ec;
  background:#fafafa;
  padding:20px;
  margin-bottom: 20px;
  .item{
    clear: both;
    vertical-align: middle;
    margin-bottom: 10px;
    height: 30px;
    .item-left{
      float: left;
      line-height: 32px;
      .item-text{
        font-size: 20px;
        font-weight: bold;
      }
    }
    .item-right{
      float:right;
    }
  }
}

//商品购买信息
.info{
  border: 1px solid #dfe6ec;
  padding: 10px 0;
  display: flex;
  color: #606266;
  margin-bottom: 20px;
  .info-item{
    padding:10px;
    width: 20%;
    border-right:1px dashed #dfe6ec;
    line-height: 28px;
    overflow: hidden;
    word-break: break-all;
    &:nth-last-child(1){
      border:none;
    }
    .title{
      line-height: 16px;
      font-size: 16px;
      border-left: #409eff 2px solid;
      padding-left: 10px;
      margin-bottom: 16px;
    }
    .con{
      font-size: 14px;
      .lh18{
        line-height: 18px;
      }
    }
  }
  .info-right{
    flex:1;
  }
}

.el-timeline-item__content {
     color:inherit
     }
.el-timeline li:first-child{ color:red!important;}

// 详情表格
.detail-table{
  display: flex;
  flex-direction:column;
  justify-content: flex-start;
  .detail-table-header{
    //width: 100%;
    background: #ebebeb;
    display: flex;
    justify-content:flex-start;
    align-items: center;
    border: 1px solid #dfe6ec;
    border-bottom: none;
    color: #606266;
    // padding: 10px;
    .header-left{
      display:flex;
      width: 30vw;
      .header-cell{
        flex:1;
        text-align: center;
      }
    }
    .header-middle{
      display:flex;
      // width: 60vw;
      justify-content: space-between;
      .header-cell{
        flex:1 ;
        text-align: center;
        width: 8vw;
      }
    }
    .header-right{
      display:flex;
      width: 10vw;
      .header-cell{
        //width: 8vw;
        flex:1 ;
        text-align: center;
        padding:10px;
      }
    }
    .header-cell{
       flex:1 ;
       padding:10px;
    }
  }
  .detail-table-body{
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    // padding:10px;
    border: 1px solid #dfe6ec;
    border-bottom: none;
    align-items: stretch;
    color: #606266;
    .body-left{
      display: flex;
      justify-content: flex-start;
      align-items: center;
      .detail-list{
        border-right: 1px solid #dfe6ec;
        .detail-item{
          display: flex;
          justify-content: flex-start;
          align-items: center;
          .detail-item-left{
            display: flex;
            justify-content: flex-start;
            align-items: center;
            width: 30vw;
            border-right: 1px solid #dfe6ec;
            .item-cell{
              flex:1;
              text-align: center;
              width: 8vw;
              padding:10px;
              // border-right: 1px solid #ccc;
              border-bottom:1px solid #dfe6ec;
              height: 120px;
              .cell-text{
                text-align: center;
              }
            }
            .cell-con{
                display: flex;
                align-items: center;
                justify-content: center;
            }
          }
          .detail-item-middle{
            display: flex;
            justify-content: center;
            align-items: center;
            .item-cell{
              flex:1;
              text-align: center;
              width: 8vw;
              height: 120px;
              padding:10px;
              border-bottom:1px solid #dfe6ec;
              border-right: 1px solid #dfe6ec;
              &:nth-last-child(1){
                border-right: none;
              }
              .cell-text{
                text-align: center;
              }
            }
            .cell-con{
                display: flex;
                align-items: center;
                justify-content: center;
            }
          }
        }
      }
    }
    .body-cell{
      flex: 1;
      text-align: center;
    }
    .body-right{
      display: flex;
      justify-content: flex-start;
      align-items: center;
      border-bottom: 1px solid #dfe6ec;
      .cell-text{
        flex:1;
      }
    }
  }
}
</style>
