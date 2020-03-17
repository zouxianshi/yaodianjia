<template>
  <div>订单状态</div>

</template>

<script>
export default {
  data() {
    return {

    }
  },
  methods: {
    orderStatus(_data) {
      let orderStatus_value = ''
      switch (_data.orderStatus.toString()) {
        case '2':
          orderStatus_value = '待付款'
          break
        case '4':
          orderStatus_value = '待发货'
          break
        case '7':
          orderStatus_value = '待提货'
          break
        case '6':
          orderStatus_value = '已发货'
          break
        case '8':
          orderStatus_value = '退货中'
          break
        case '10':
          orderStatus_value = '待退款'
          break
        case '12':
          orderStatus_value = '已完成'
          break
        case '20':
          orderStatus_value = '已取消'
          break
        case '30':
          orderStatus_value = '退款完成'
          break
        default:
          return
      }
      // 处理门店自提且待收货的字段；
      if (_data.deliveryType === 2 && _data.orderStatus.toString() === '6') {
        orderStatus_value = '待提货'
      }
      // 当前状态为处方单；
      // if (_data.prescriptionSheetMark.toString() === '1') {

      // } else {

      // }
      return orderStatus_value
    }
  }
  /**
   * 订单状态处理
   * prescriptionSheetMark：处方单标识 1 是处方单  0 是普通订单
   * deliveryType：物流类型 0普通快递1配送上门2门店自提
   * orderStatus：订单状态 2.待付款 4.待发货 6.待收货 8.待退货 10.待退款 12.已完成 20.已取消 30.退款完成
   * 首先判断商品物流1类型；如果为0 / 1
   * 待付款 待发货 待收货（待提货/已发货主要根据deliveryType来判断） 待退款 已完成 已取消 退款完成
   *
   *
   * 待付款 待发货 待收货（待提货/已发货主要根据deliveryType来判断） 待退款 已完成 已取消 退款完成
   *
   * 订单状态 + 需求单状态
   *
   */
}
</script>

<style>

</style>
