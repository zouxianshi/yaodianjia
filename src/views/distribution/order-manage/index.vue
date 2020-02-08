<template>
  <div class="container">
    <div class="header-panel">
      <div class="box">
        <div
          class="item frist"
          :class="orderStatus === '' && 'active'"
          @click="changeTableItem('')"
        >
          全部
        </div>
        <div class="cutoff" />
        <div
          class="item"
          :class="orderStatus === 'SUCCESS' && 'active'"
          @click="changeTableItem('SUCCESS')"
        >
          待到货
        </div>
        <div class="cutoff" />
        <div
          class="item"
          :class="orderStatus === 'ARRIVED' && 'active'"
          @click="changeTableItem('ARRIVED')"
        >
          待核销
        </div>
        <div class="cutoff" />
        <div
          class="item last"
          :class="orderStatus === 'COMPLETE' && 'active'"
          @click="changeTableItem('COMPLETE')"
        >
          已完成
        </div>
      </div>
      <el-select
        v-model="selectStore.storeName"
        filterable
        placeholder="选择门店"
        class="search"
        @change="selectChange"
      >
        <el-option
          v-for="item in storeListData"
          :key="item.id"
          :label="item.storeName"
          :value="{ storeName: item.storeName, id: item.id }"
        />
      </el-select>
      <div class="search-container">
        <div class="search-item" @keyup.enter="forSearch()">
          <el-input
            v-model="orderNum"
            placeholder="请输入预约单号搜索"
            prefix-icon="el-icon-search"
            class="search"
          />
        </div>
        <div class="search-btns" style="margin-left:10px;">
          <el-button
            type="primary"
            size="small"
            @click.stop="forSearch()"
          >搜 索</el-button>
        </div>
      </div>
    </div>
    <div class="table-panel">
      <table-card
        :table-data="orderListData"
        @button-click="setDialogContent"
      />
    </div>
    <div class="pagination-panel">
      <el-pagination
        :current-page="currentPage"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalCount"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
    <el-dialog
      :title="dialogTitle"
      :visible.sync="dialogVisible"
      append-to-body
    >
      <el-table :data="dialogContent">
        <el-table-column property="pic" label="商品图片" width="150">
          <div
            style="width: 72px;
    height: 72px;position: relative;"
          >
            <img
              :src="showImg(dialogContent[0] && dialogContent[0].productImgUrl)"
              style="width: 72px;
    height: 72px;z-index:2;position: absolute;"
            >
            <div
              class="dialog-pic"
              style="width: 72px;
    height: 72px;
    text-align: center;
    line-height: 72px;
    font-size: 14px;
    color: #9b9b9b;
    background-color: #ebebeb;z-index:1;position: absolute;"
            >
              暂无图片
            </div>
          </div></el-table-column>
        <el-table-column
          property="productName"
          label="商品名称/编号"
          width="200"
        />
        <el-table-column property="productPrice" label="单价" />
        <el-table-column property="productCount" label="数量" />
      </el-table>
      <div style="display:flex;flex-direction:row;margin-top:40px;">
        <div style="color:#000;font-size:14px">预约单号：</div>
        <div style="color:#000;font-size:14px;margin-left:20px;">
          {{ dialogContent[0] && dialogContent[0].id }}
        </div>
      </div>
      <div
        v-if="dialogContent[0] && dialogContent[0].status === 'ARRIVED'"
        style="display:flex;flex-direction:row;margin-top:40px;"
      >
        <div style="color:#000;font-size:14px">预约人：</div>
        <div style="color:#000;font-size:14px;margin-left:20px;">
          {{ dialogContent[0] && dialogContent[0].personName }}
        </div>
      </div>
      <div
        v-if="dialogContent[0] && dialogContent[0].status === 'ARRIVED'"
        style="display:flex;flex-direction:row;margin-top:40px;"
      >
        <div style="color:#000;font-size:14px">身份证号：</div>
        <div style="color:#000;font-size:14px;margin-left:20px;">
          {{ dialogContent[0] && dialogContent[0].personId }}
        </div>
      </div>
      <div
        v-if="dialogContent[0] && dialogContent[0].status === 'SUCCESS'"
        style="display:flex;flex-direction:row;margin-top:40px;"
      >
        <div style="color:#000;font-size:14px">收货门店：</div>
        <div style="color:#000;font-size:14px;margin-left:20px;">
          {{ dialogContent[0].address }}
        </div>
      </div>
      <div
        style="display:flex;flex-direction:row;margin-top:40px;justify-content: center;"
      >
        <el-button @click="closeDialog">取消</el-button>
        <el-button
          type="primary"
          @click="updateOrderStatusService"
        >确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import tableCard from './table-card/index.vue'
import DistributionService from '@/api/distributionService'
export default {
  components: { tableCard },
  data() {
    return {
      storeListData: [],
      selectStore: { storeName: '全部', id: '' },
      dialogVisible: false,
      dialogTitle: '',
      dialogContent: [],
      orderStatus: '',
      orderNum: '',
      currentPage: 1,
      pageSize: 10,
      orderListData: [],
      totalCount: 0
    }
  },
  watch: {
    orderNum(newValue) {
      this.orderNum = newValue
    }
  },
  mounted() {
    this.getStoreListServie()
  },
  methods: {
    selectChange(e) {
      this.selectStore = e
      this.getOrderListByTypeService()
    },
    /*  */
    handleSizeChange(e) {
      this.pageSize = e
      this.getOrderListByTypeService()
    },
    handleCurrentChange(e) {
      this.currentPage = e
      this.getOrderListByTypeService()
    },
    /* 搜索 */
    forSearch() {
      this.getOrderListByTypeService()
    },
    /* 查询门店列表 */
    async getStoreListServie() {
      const { data, code } = await DistributionService.queryStoreList({
        pageSize: 100
      })
      if (code === '10000') {
        this.storeListData = [{ storeName: '全部', id: '' }].concat(data.data)

        this.getOrderListByTypeService()
      }
    },
    /**
     * 查询订单
     */
    async getOrderListByTypeService() {
      const params = {
        currentPage: this.currentPage,
        orderId: this.orderNum,
        orderStatus: this.orderStatus,
        pageSize: this.pageSize,
        storeId: this.selectStore.id
      }
      const { data, code } = await DistributionService.queryOrderListByType(
        params
      )
      if (code === '10000') {
        this.orderListData = data.data
        this.totalCount = data.totalCount
        // this.orderListData = [
        //   {
        //     address: 'string',
        //     createTime: '2020-02-05T15:18:19.333Z',
        //     id: 0,
        //     memberId: 0,
        //     merCode: 'string',
        //     mobilePhone: 'string',
        //     personId: 'string',
        //     personName: 'string',
        //     productCount: 0,
        //     productId: 0,
        //     productImgUrl: 'string',
        //     productName: 'string',
        //     productPrice: 0,
        //     projectCountPerMember: 0,
        //     projectDaysPerMember: 0,
        //     projectLimitPerMember: 0,
        //     status: 'SUCCESS',
        //     storeName: 'string'
        //   }
        // ]
      }
      console.warn('getOrderListByTypeService _________________ ', data)
    },
    /* 核销 */
    async updateOrderStatusService() {
      const params = {
        id: this.dialogContent[0].id,
        status:
          this.dialogContent[0].status === 'SUCCESS' ? 'ARRIVED' : 'COMPLETE'
      }
      console.log('updateOrderStatusService ________________ ')
      const { data, code } = await DistributionService.updateOrderStatus(params)
      if (code === '10000') {
        console.log(data)
        this.closeDialog()
        this.getOrderListByTypeService()
      }
    },

    /* 切换展示数据类型 */
    changeTableItem(type) {
      if (this.orderStatus === type) return
      this.orderStatus = type
      this.currentPage = 1
      this.getOrderListByTypeService()
    },
    /* table-card 组件按钮点击 */
    setDialogContent(obj) {
      this.dialogVisible = true
      if (obj.status === 'ARRIVED') {
        this.dialogTitle = '确认核销'
      } else if (obj.status === 'SUCCESS') {
        this.dialogTitle = '确认到货 (签收后预约单进入核销状态，请提醒用户上门)'
      }
      this.dialogContent = [obj]
    },
    closeDialog() {
      this.dialogVisible = false
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;

  .header-panel {
    padding: 10px 25px;
    display: flex;
    flex-direction: row;
    align-items: center;
    .search-container {
      display: flex;
      flex-direction: row;
      align-items: center;
    }
    .search {
      width: 284px;
      margin-left: 44px;
    }
    .box {
      border-radius: 6px;
      display: flex;
      flex-direction: row;
      border: 1px solid #d7d7d7;
      flex-shrink: 0;
      .cutoff {
        width: 1px;
        background-color: #d7d7d7;
      }
      .item {
        padding: 12px;
        font-size: 14px;
        background: #fff;
        color: #4a4a4a;
        cursor: pointer;
        display: inline-block;
        &.frist {
          border-radius: 6px 0 0 6px;
        }
        &.last {
          border-radius: 0 6px 6px 0;
        }
        &.active {
          color: #fff;
          background: #157de8;
        }
      }
    }
  }
  .table-panel {
    padding: 0 25px;
  }
  .pagination-panel {
    padding: 0 25px;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    margin: 10px 0 20px 0;
  }
  .dialog-pic {
    width: 72px;
    height: 72px;
    text-align: center;
    line-height: 72px;
    font-size: 14px;
    color: #9b9b9b;
    background-color: #ebebeb;
  }
}
</style>
