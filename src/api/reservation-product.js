import request from '@/utils/request'
import config from '@/utils/config'

// 获取预约商品列表
export function getResevation(params) {
  return request({
    url: `${config.merGoods}/1.0/b/store/_query`,
    method: 'POST',
    data: params
  })
}
