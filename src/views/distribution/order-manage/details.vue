<template>
  <div v-loading="loading" class="details-container">
    <div class="info-panel">
      <div class="orderNum">预约单号：{{ order.id }}</div>
      <div class="orderStatus">
        {{
          order.status === 'SUCCESS'
            ? '待到货'
            : order.status === 'ARRIVED'
              ? '待核销'
              : order.status === 'COMPLETE'
                ? '已完成'
                : order.status === 'CANCEL'
                  ? '取消预约'
                  : '其他'
        }}
      </div>
    </div>

    <div class="details-panel">
      <div class="item-panel">
        <div class="title">预约人信息</div>
        <div class="panel">
          <div class="item">姓名：{{ order.memberPersonName }}</div>
          <div class="item">身份证号：{{ order.memberPersonId }}</div>
          <div class="item">联系方式：{{ order.memberMobilePhone }}</div>
        </div>
      </div>
      <div class="cut-off" />
      <div class="item-panel">
        <div class="title">提货信息</div>
        <div class="panel">
          <div class="item">提货门店：{{ order.storeName }}</div>
          <div class="item">提货地址：{{ order.storeAddress }}</div>
          <div class="item">联系电话：0731-12345566</div>
        </div>
      </div>
    </div>

    <div class="details-panel">
      <div class="item-panel">
        <div class="title">预约单信息</div>
        <div class="panel">
          <div class="item">下单时间：{{ order.createTime }}</div>
          <div v-if="order.status === 'COMPLETE'" class="item">
            完成时间：2020-02-07 10:00
          </div>
          <div class="item">提货门店：{{ order.storeName }}</div>
          <div class="item">预约单来源：微信小程序</div>
        </div>
      </div>
      <div class="cut-off" />
      <div class="item-panel">
        <div class="title">操作人信息</div>
        <div class="panel">
          <div class="item">推广员：{{ order.updateUser || '无' }}</div>
        </div>
      </div>
    </div>

    <div class="table-panel">
      <div class="title">预约商品信息</div>
      <el-table :data="order.details">
        <el-table-column label="商品图片">
          <div>
            <img alt="img">
          </div>
        </el-table-column>
        <el-table-column label="商品名称" />
        <el-table-column label="品牌" />
        <el-table-column label="单价" />
        <el-table-column label="数量" />
      </el-table>
    </div>
  </div>
</template>

<script>
import DistributionService from '@/api/distributionService'
export default {
  data: () => {
    return {
      order: {},
      loading: true
    }
  },
  mounted() {
    const { id } = this.$route.query
    this.queryDetailsService(id)
  },
  methods: {
    async queryDetailsService(id) {
      const { data, code } = await DistributionService.queryOrderDetailsById(id)
      this.loading = false
      if (code === '10000') {
        this.order = data
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.details-container {
  overflow-y: scroll;
  height: 80vh;
  .info-panel {
    margin: 20px 62px 0 28px;
    height: 110px;
    background: rgba(250, 250, 250, 1);
    border: 1px solid rgba(232, 232, 232, 1);
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    justify-content: center;
    padding-left: 30px;
    .orderNum {
      color: #000000;
      font-size: 16px;
      margin-bottom: 16px;
    }
    .orderStatus {
      color: #ff1e3a;
      font-size: 20px;
    }
  }

  .details-panel {
    position: relative;
    margin: 20px 62px 0 28px;
    border: 1px solid rgba(232, 232, 232, 1);
    height: 204px;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    .item-panel {
      flex: 1;
      display: flex;
      flex-direction: column;
      flex-wrap: wrap;
      .title {
        border-left: 3px solid #3297f7;
        padding-left: 12px;
        margin: 20px 0 0 21px;
        color: #000000;
        font-size: 18px;
        height: 20px;
        line-height: 20px;
      }
      .panel {
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        margin-left: 28px;
        margin-top: 16px;
        .item {
          color: #4a4a4a;
          font-size: 16px;
          margin: 6px 0;
        }
      }
    }
    .cut-off {
      position: absolute;
      width: 1px;
      height: 169px;
      border: 1px dashed rgba(232, 232, 232, 1);
      left: 0px;
      right: 0px;
      bottom: 0px;
      top: 0px;
      margin: auto;
    }
  }
  .table-panel {
    margin: 20px 62px 0 28px;
    border: 1px solid rgba(232, 232, 232, 1);
    .title {
      border-left: 3px solid #3297f7;
      padding-left: 12px;
      margin: 20px 0 20px 21px;
      color: #000000;
      font-size: 18px;
      height: 20px;
      line-height: 20px;
    }
  }
}
</style>
