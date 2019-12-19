import request from '@/utils/request'
import config from '@/utils/config'

class CustomerService {
  /**
   * 连接客服IMServer
   */
  connectToIMServer() {
    const webSocketURL = process.env.VUE_APP_WEBSOCKET_BASE || 'ws://middle.dev.ydjia.cn:5416/ws'
    return new WebSocket(webSocketURL)
  }

  /**
   * 查询商家客服列表
   * @param {object} params
   */
  queryMerSupportStaffList(params) {
    return request({
      url: `${config.merGoods}/1.0/csd-staff/_search`,
      method: 'post',
      data: params
    })
  }

  /**
   * 删除客服
   */
  delSupportStaff(params) {
    return request({
      url: `${config.merGoods}/1.0/csd-staff/${params.id}`,
      method: 'delete',
      data: params
    })
  }

  // 查询客服消息列表
  querySupportMsgList(params) {
    return request({
      url: `${config.merGoods}/1.0/csd-msg/_search`,
      method: 'post',
      data: params
    })
  }

  /**
   * 查询用户个人资料
   */
  queryUserInfoById(params) {
    return request({
      url: `${config.merGoods}/1.0/csd-user/info`,
      method: 'post',
      data: params
    })
  }

  /**
   * 统计用户购买记录
   */
  queryUserBoughtRecord(params) {
    return request({
      url: `${config.merGoods}/1.0/order-info/userCount/${params.memberId}`,
      method: 'get',
      data: params
    })
  }

  /**
   * 根据会员id获取订单列表
   */
  queryUserOrderList(params) {
    return request({
      url: `${config.merGoods}/1.0/order-info/list`,
      method: 'post',
      data: params
    })
  }

  /**
   * 查询客服历史会话列表
   */
  querySupportHistoryConversationList(params) {
    return request({
      url: `${config.merGoods}/1.0/csd-record/user`,
      method: 'post',
      data: params
    })
  }

  /**
   * 文件上传
   */
  fileUpload(params) {
    console.log('prams', params)
    return request({
      url: `${config.merGoods}/1.0/file/_upload`,
      method: 'post',
      data: params,
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })
  }

  // 查询历史消息
  queryHistoryMessage(params) {
    return request({
      url: `${config.merGoods}/1.0/csd-staff/_msg`,
      method: 'post',
      data: params
    })
  }

  // 删除客服消息
  delSupportMsg(params) {
    return request({
      url: `${config.merGoods}/1.0/csd-msg/${params.id}`,
      method: 'delete',
      data: params
    })
  }

  // 查询商家员工列表
  queryMerStaffList(params) {
    return request({
      url: `${config.merGoods}/1.0/csd-staff/emp`,
      method: 'post',
      data: params
    })
  }

  // 新增客服
  addSupportStaff(params) {
    return request({
      url: `${config.merGoods}/1.0/csd-staff`,
      method: 'post',
      data: params
    })
  }

  // 根据id查询客服人员信息
  querySupportStaffById(params) {
    return request({
      url: `${config.merGoods}/1.0/csd-staff`,
      method: 'get',
      data: params
    })
  }

  // 更新客服人员信息
  updateSupportStaff(params) {
    return request({
      url: `${config.merGoods}/1.0/csd-staff`,
      method: 'put',
      data: params
    })
  }

  // 新增客服消息
  addSupportMsg(params) {
    return request({
      url: `${config.merGoods}/1.0/csd-msg`,
      method: 'post',
      data: params
    })
  }

  // 更新客服消息
  updateSupportMsg(params) {
    return request({
      url: `${config.merGoods}/1.0/csd-msg`,
      method: 'put',
      data: params
    })
  }
}

export default new CustomerService()
