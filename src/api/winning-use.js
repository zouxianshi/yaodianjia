import request from '@/utils/request'
import config from '@/utils/config'

// 获奖中奖记录列表
export function queryWinningList(params) {
  return request({
    url: `${config.merGoods}/1.0/activityPrize/getPrizeLog`,
    method: 'post',
    data: params
  })
}
// 导出中奖记录
export function exportPrizeList(params) {
  return request({
    url: `${config.merGoods}/1.0/activityPrize/exportPrizeList`,
    method: 'post',
    data: params
  })
}

// 核销列表
export function prizeUseList(params) {
  return request({
    url: `${config.merGoods}/1.0/activityPrize/queryLotteryEntityPrizeList`,
    method: 'post',
    data: params
  })
}

// 核销实物
export function hexiaoPrize(params) {
  return request({
    url: `${config.merGoods}/1.0/activityPrize/writeOffEntityPrize/${params.merCode}/${params.prizeId}`,
    method: 'post',
    data: {}
  })
}
