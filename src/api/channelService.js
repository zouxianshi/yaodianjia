import request from '@/utils/request'
import config from '@/utils/config'

export function jumpAuthUrl() {
  return request({
    url: `${config.merGoods}/1.0/weeChatOpen/jumpAuthUrl/666666`,
    method: 'get'
  })
}
