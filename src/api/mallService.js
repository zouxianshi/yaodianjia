import request from '@/utils/request'
import config from '@/utils/config'

/**
 * 保存大json
 */
export function saveStructure(data) {
  return request({
    url: `${config.merGoods}/1.0/cms-dim`,
    method: 'post',
    data
  })
}
/**
 * 保存组件
 */
export function saveAssembly(data) {
  return request({
    url: `${config.merGoods}/1.0/cms-dim/_create`,
    method: 'post',
    data
  })
}

/**
 * 内部链接
 */

export function getInternalLink(data) {
  return request({
    url: `${config.merGoods}/1.0/internal-link/_search`,
    method: 'post',
    data
  })
}
