import request from '@/utils/request'
import config from '@/utils/config'
/**
 * 导出订单
 */
export function exportData(params) {
  return request({
    url: `${config.merGoods}/1.0/task/_exportOrderTask`,
    method: 'post',
    data: params
  })
}

/**
 * 查询导出记录
 */
export function getExportRecord(params) {
  return request({
    url: `${config.merGoods}/1.0/task/_query`,
    method: 'post',
    data: params
  })
}
