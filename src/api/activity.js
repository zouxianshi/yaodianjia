import request from '@/utils/request'
import config from '@/utils/config'

export function getAssembleList(params) {
  return request({
    url: `${config.merGoods}/1.0/admin/activityGroup`,
    method: 'post',
    data: params
  })
}

// 获取冲突列表
export function getConflict(params) {
  return request({
    url: `${config.merGoods}/1.0/admin/activityGroup`,
    method: 'post',
    data: params
  })
}

// 创建赠品
export function createGift(params) {
  return request({
    url: `${config.merGoods}/1.0/admin/activityGroup`,
    method: 'post',
    data: params
  })
}

// 创建加价购
export function createAddPriceAct(params) {
  return request({
    url: `${config.merGoods}/1.0/admin/activityGroup`,
    method: 'post',
    data: params
  })
}

/**
 * 方法说明 活动商品查询
 * @method POST
 * @for 所属类名
 * @param {brandName} 参数名 商品品牌
 * @param {currentPage} 参数名 当前页，从第1页开始，不传默认为1
 * @param {groupType} 参数名 boolean 拼团、秒杀、特惠活动不查组合商品，true是，false其他活动
 * @param {merCode} 参数名 商家编码
 * @param {pageSize} 参数名 每页显示条数，不传默认20
 * @param {searchKeyWord} 参数名 搜索关键词，商品名称/商品编码
 * @param {firstTypeId} 参数名 一级分组ID
 * @param {secondTypeId} 参数名 二级分组ID
 * @param {threeTypeId} 参数名 三级分组ID
 * @param {skuIds} 参数名 sku集合
 * @param {storeIds} 参数名 门店ID集合[],为null查询所有
 * @return {返回值类型} 返回值说明
 */
export function queryActivityCommGoods(params) {
  return request({
    url: `${config.merGoods}/1.0/comm-spec/activityComm`,
    method: 'post',
    data: params
  })
}
