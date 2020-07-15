/**
 * get link addr type Array
 */
export const pageTypeList = [
  {
    name: '商城页面',
    code: 1
  },
  {
    name: '活动页面',
    code: 2
  },
  {
    name: '商品列表',
    code: 3
  }
  // {
  //   name: '商品详情',
  //   code: 99
  // },
  // {
  //   name: '商品详情',
  //   code: 4
  // }
]

/**
 * handler specId is array
 * @param {data} array
 * @param {specId} string
 */
export const saIsId = (data, specId) => _.map(data, v => v.specId).includes(specId)

