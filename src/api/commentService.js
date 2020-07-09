import request from '@/utils/request'
import config from '@/utils/config'
// 评论设置业务接口

/**
 * 查询商品评价接口
 * @param {} params 入参
 */
export function queryCommentList(params) {
  return request({
    url: `${config.merGoods}/1.0/commodity-comment/searchByCommodity`,
    method: 'post',
    data: params
  })
}

/**
 * 增加商品评价接口
 * @param {} params 入参
 */
export function addComment(params) {
  return request({
    url: `${config.merGoods}/1.0/commodity-comment`,
    method: 'post',
    data: params
  })
}

/**
 * 增加商品评价设置接口
 * @param {} params 入参
 */
export function postCommentSetting(params) {
  return request({
    url: `${config.merGoods}/1.0/commodityCommentSet/_set`,
    method: 'post',
    data: params
  })
}

/**
 * 查询商品评价设置接口
 * @param {} params 入参
 */
export function queryCommentSetting(params) {
  return request({
    url: `${config.merGoods}/1.0/commodityCommentSet/searchByMerCode/${params.merCode}`,
    method: 'get',
    data: params
  })
}

/**
 * 更新商品评价接口
 * @param {} params 入参
 */
export function putComment(params) {
  return request({
    url: `${config.merGoods}/1.0/commodity-comment`,
    method: 'put',
    data: params
  })
}

/**
 * 删除商品评价接口
 * @param {} params 入参
 */
export function delComment(params) {
  return request({
    url: `${config.merGoods}/1.0/commodity-comment/${params.id}`,
    method: 'delete',
    data: params
  })
}

/**
 * 更新活动
 * @param {} params 入参
 */
export function updateActivity(params) {
  return request({
    url: `${config.merGoods}/1.0/merchantSwitch/activityOpenOrClose`,
    method: 'post',
    data: params
  })
}

/**
 * 查询活动
 * @param {} params 入参
 */
export function queryActivity(params) {
  return request({
    url: `${config.merGoods}/1.0/merchantSwitch/searchActivityStatus`,
    method: 'post',
    data: params
  })
}

/**
 * 查询商品列表
 * @param {} params 入参
 */
export function queryCommodityList(params) {
  return request({
    url: `${config.merGoods}/1.0/commodity-comment/_search`,
    method: 'post',
    data: params
  })
}
