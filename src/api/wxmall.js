import request from '@/utils/request'
const api_wxmall = '/mer-manager'

// 查询（综合条件）轮播,公告,分类广告列表数据
export function getTableList(params) {
  console.log('params', params)
  return request({
    url: `${api_wxmall}/1.0/pageset/_search`,
    method: 'post',
    data: params
  })
}

// 查询单个轮播,公告,分类广告详情
export function getPageSetDetail(params) {
  return request({
    url: `${api_wxmall}/1.0/pageset/_searchCmsCode`,
    method: 'post',
    data: params
  })
}

// 新增轮播,公告,分类广告
export function addPageSet(params) {
  return request({
    url: `${api_wxmall}/1.0/pageset`,
    method: 'post',
    data: params
  })
}

// 批量新增轮播,公告,分类广告
export function mutilAddPageSet(params) {
  return request({
    url: `${api_wxmall}/1.0/pageset/_batch`,
    method: 'post',
    data: params
  })
}

// 修改轮播,公告,分类广告
export function editPageSet(params) {
  return request({
    url: `${api_wxmall}/1.0/pageset`,
    method: 'put',
    data: params
  })
}

// 修改轮播,公告,分类广告状态
export function editPageSetStatus(params) {
  return request({
    url: `${api_wxmall}/1.0/pageset/_updateStatus`,
    method: 'put',
    data: params
  })
}

