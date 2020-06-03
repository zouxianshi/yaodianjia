import request from '@/utils/request'
import config from '@/utils/config'
// import qs from 'qs'
// 新增或修改商户配置信息
export function editMerChantsearch(params) {
  return request({
    url: `${config.merGoods}/1.0/merSet/_searchByMerCode?${params}`,
    method: 'post'
  })
}
// 新增或修改商户配置信息
export function editMerChantSet(params) {
  return request({
    url: `${config.merGoods}/1.0/merSet/editMerChantSet`,
    method: 'post',
    data: params
  })
}
