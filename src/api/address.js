import request from '@/utils/request'
const customer = '/customer'
/**
 * 查三联地址
 * @param {*} areaType integer($int32)地区等级(1,国家;2.省份;3.市;4.地区(县)),例：如果查省份，则传2
 * @param {*} parentId 查省的时候为空，其他就传当前选择的省市id
 */
export function getAddress(params) {
  return request({
    url: `${customer}/1.0/area/_search`,
    method: 'post',
    data: params
  })
}

/**
 * 获取腾讯地图查询地址
 * @param {*} params
 */
export function getLocation(params) {
  return request({
    url: `${customer}/1.0/map/wx/place/suggestion`,
    method: 'post',
    data: params
  })
}
