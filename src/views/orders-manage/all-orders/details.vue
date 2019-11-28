<template>
  <div class="app-container">
    <div class="store-goods-wrapper">
      <div class="wrapper">
        <div class="item">
          <div class="item-left">左边</div>
          <div class="item-right">右边</div>
        </div>
        <div class="item">
          1行
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
export default {
  components: { Pagination },
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
  background:#ebebeb;
}

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
