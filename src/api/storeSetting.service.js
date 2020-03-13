import request from '@/utils/request'
import store from '@/store'
import config from '@/utils/config'

export function getWeappSetting() {
  return request({
    url: `${config.merGoods}/1.0/sys/mini/${store.state.user.merCode}`,
    method: 'get'
  })
}
