import request from '@/utils/request'
import config from '@/utils/config'

class LiveRequest {
  getLiveList() {
    return request({
      url: `${config.get}`,
      method: 'get'
    })
  }
}

export default new LiveRequest()
