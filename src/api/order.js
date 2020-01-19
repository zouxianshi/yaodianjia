import request from '@/utils/request'
import config from '@/utils/config'
// import qs from 'qs'
// 获取订单列表数据
export function getOrderList(params) {
  return request({
    url: `${config.merGoods}/1.0/order-info`,
    method: 'post',
    data: params
  })
}

// 根据订单明细id获取退货退款申请单
export function getRefundReturn(detailId) {
  return request({
    url: `${config.merGoods}/1.0/order-return/${detailId}`,
    method: 'get'
  })
}

// 决断是否需要再次输入密码
export function getCheckPwd(data) {
  return request({
    url: `${config.merGoods}/1.0/order-return/checkPwd`,
    method: 'get'
  })
}

// 多条件查询员工
export function employeeSearch(data) {
  console.log('data:', data)
  return request({
    url: `${config.merGoods}/1.0/employee/_search`,
    method: 'post',
    data
  })
}

// 拒绝退款
export function setRejectRefund(data) {
  return request({
    url: `${config.merGoods}/1.0/order-return/_reject`,
    method: 'post',
    data
  })
}

// 同意退款
export function setAgreeRefund(data) {
  return request({
    url: `${config.merGoods}/1.0/order-return/_agree`,
    method: 'post',
    data
  })
}

// 验证明细退款是否是最后一笔退款明细
export function getRefundFreight(data) {
  return request({
    url: `${config.merGoods}/1.0/order-return/_check`,
    method: 'post',
    data
  })
}

// 统计待发货数量
export function getCountReceived(data) {
  return request({
    url: `${config.merGoods}/1.0/order-info/countReceived`,
    method: 'post',
    data
  })
}

// 获取待发货的商品数据
export function getUnReceiveData(data) {
  return request({
    url: `${config.merGoods}/1.0/order-detail/unReceived`,
    method: 'post',
    data
  })
}

// 获取快递公司
export function getExpressCompany(data) {
  return request({
    url: `${config.merGoods}/1.0/express-company/_query`,
    method: 'post',
    data
  })
}

// 获取常用配送员
export function getEmployeeUsual(merCode) {
  return request({
    url: `${config.merGoods}/1.0/employee/getUsual/${merCode}`,
    method: 'get'
  })
}

// 立即发货
export function setOrderSend(data) {
  return request({
    url: `${config.merGoods}/1.0/order-detail/_send`,
    method: 'post',
    data
  })
}

// 获取订单详情
export function getOrderDetail(data) {
  return request({
    url: `${config.merGoods}/1.0/order-info/get`,
    method: 'post',
    data
  })
}

// 补推到ERP
export function setPushErp(orderId) {
  return request({
    url: `${config.merGoods}/1.0/order-info/pushMq/${orderId}`,
    method: 'get'
  })
}

// 获取商家订单配置
export function getOrderSetUp(mercode) {
  return request({
    url: `${config.merGoods}/1.0/order-setup/${mercode}`,
    method: 'get'
  })
}

// 更新商家订单配置
export function updateOrderSetUp(data) {
  return request({
    url: `${config.merGoods}/1.0/order-setup`,
    method: 'post',
    data
  })
}
