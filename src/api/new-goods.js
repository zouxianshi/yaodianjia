import request from '@/utils/request'
import config from '@/utils/config'

// // 获取分组
// export function getStoreGoods(params) {
//   return request({
//     url: `${config.merGoods}/1.0/store-spec`,
//     method: 'post',
//     data: params
//   })
// }

// 获取新品申请记录
export function getNewGoodsRecord(params) {
  return request({
    url: `${config.merGoods}/1.0/commodity/newRecord`,
    method: 'post',
    data: params
  })
}

// 删除新品申请
export function deleteGoods(params) {
  return request({
    url: `${config.merGoods}/1.0/commodity`,
    method: 'delete',
    data: params
  })
}
