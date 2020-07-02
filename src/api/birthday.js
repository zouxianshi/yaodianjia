import request from '@/utils/request'
import config from '@/utils/config'

export function birthdayOperate(params) {
  return request({
    url: `${config.merGoods}/1.0/market/birthdayOperate?status=${params.status}&templateCode=TC006&merCode=${params.merCode}`,
    method: 'post',
    data: {}
  })
}
